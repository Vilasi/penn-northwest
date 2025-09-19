const User = require('../models/users');
const Member = require('../models/members');
const Event = require('../models/events');
const Attendant = require('../models/attendants');
const Application = require('../models/applications');

const memberSorter = require('../utils/memberSorter.js');
const getTodaysDate = require('../utils/getTodaysDate.js');
const fileAdminLog = require('../utils/middleware/fileAdminLog');
const { Parser } = require('json2csv');


module.exports.adminIndex = async (req, res, next) => {
  const data = {};

  //? Users lookup
  const users = await User.find({});
  if (!users) {
    data.users = null;
  } else {
    data.users = users;
  }

  //? Members lookup
  const members = await Member.find({});
  const sortedMembers = memberSorter(members);
  if (!members) {
    data.members = null;
  } else {
    data.members = sortedMembers;
  }

  //? Events lookup
  const events = await Event.find({}).populate('attendees').sort({ position: 1 });
  if (!events) {
    data.events = null;
  } else {
    data.events = events;
  }

  //? Membership Applications Lookup
  const applications = await Application.find({});
  if (!applications) {
    data.applications = null;
  } else {
    data.applications = applications;
  }
  //   console.log(data);

  res.render('admin/index', { data });
};

module.exports.deleteEvent = async (req, res, next) => {
  const { id } = req.params;
  const deletedEvent = await Event.findById(id);

  if (!deletedEvent) {
    req.flash('error', 'Error. User was not deleted.');
    return res.redirect('/admin');
  }

  const deletedPosition = deletedEvent.position; 


  // Delete the event
  await Event.findByIdAndDelete(id);


  if (deletedEvent.attendees.length > 0) {
    for (let attendee of deletedEvent.attendees) {
      const deletedAttendant = await Attendant.findByIdAndDelete(attendee);
      console.log('deletedAttendant:======================'.red);
      console.log(deletedAttendant);
    }
  }

   try {
      // Find remaining events and shift positions only for affected ones
    const remainingEvents = await Event.find().sort({ position: 1 });

    const bulkOps = remainingEvents
      .filter(event => event.position > deletedPosition) // Only shift events AFTER the deleted one
      .map(event => ({
        updateOne: {
          filter: { _id: event._id },
          update: { $inc: { position: -1 } } // Decrement position by 1
        }
      }));

    if (bulkOps.length > 0) await Event.bulkWrite(bulkOps);


    // const remainingEvents = await Event.find();

    // const bulkOps = remainingEvents.map((event, index) => ({
    //   updateOne: {
    //     filter: { _id: event._id },
    //     update: { $set: { position: index } }
    //   }
    // }));
    // await Event.bulkWrite(bulkOps);

  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send({ message: "Error deleting event" });
  }

  // This deletes the relevant image in the cloudinary photo repo
  const filename = deletedEvent.image.filename;
  await cloudinary.uploader.destroy(filename);


  // Log delete action to admin actionsLog
  const logSuccess = await fileAdminLog(
    req.user,
    `Deleted Event ${deletedEvent.name} on ${getTodaysDate()}`
  );

  // If actionsLog fails, display an error message and redirect
  if (!logSuccess) {
    req.flash('error', 'Admin not found');
    return res.redirect('/admin');
  }

  req.flash('success', `Event ${deletedEvent.name} successfully deleted.`);
  res.redirect('/admin');
};

module.exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    req.flash('error', 'Error. User was not deleted.');
    return res.redirect('/admin');
  }

  // Log delete action to admin actionsLog
  const logSuccess = await fileAdminLog(
    req.user,
    `Deleted User Account ${deletedUser.username} on ${getTodaysDate()}`
  );

  // If actionsLog fails, display an error message and redirect
  if (!logSuccess) {
    req.flash('error', 'Admin not found');
    return res.redirect('/admin');
  }

  req.flash(
    'success',
    `User account ${deletedUser.username} successfully deleted.`
  );
  res.redirect('/admin');
};

module.exports.promoteToAdmin = async (req, res, next) => {
  const { id } = req.params;

  // Find and update the user's role to 'admin', and return the updated user
  const userToPromote = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true }
  );

  // If the user to promote is not found, display an error message and redirect
  if (!userToPromote) {
    req.flash('error', 'Error, Promote to Admin operation failed.');
    return res.redirect('/admin');
  }

  // Get the username of the newly promoted admin user
  const newAdmin = userToPromote.username;

  // Log promotion action to admin actionsLog
  const logSuccess = await fileAdminLog(
    req.user,
    `Promoted user ${newAdmin} to Admin on ${getTodaysDate()}`
  );

  // If logging fails, display an error message and redirect
  if (!logSuccess) {
    req.flash('error', 'Admin not found');
    return res.redirect('/admin');
  }

  // Redirect on success
  req.flash(
    'success',
    `User ${newAdmin} has been successfully update to Admin.`
  );
  res.redirect('/admin');
};

exports.updateEventOrder = async (req, res) => {
  try {
    const { order } = req.body;

    if (!order || !Array.isArray(order)) {
      return res.status(400).send({ message: "Invalid order data" });
    }

    const bulkOps = order.map(({ id, position }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { position } }
      }
    }));

    await Event.bulkWrite(bulkOps);
    res.status(200).send({ message: "Event order updated successfully" });
  } catch (error) {
    console.error("Error updating event order:", error);
    res.status(500).send({ message: "Error updating event order" });
  }
};

exports.downloadAttendantsCSV = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate('attendees')
      .lean();

    if (!event || !event.attendees || event.attendees.length === 0) {
       req.flash('error', 'Event currently has no attendees');
      return res.redirect('/admin');
    }

    // Flatten attendees and guests into rows
    const flattenedRows = [];

    for (const att of event.attendees) {
      // Main attendee row
      flattenedRows.push({
        attendantName: att.attendantName,
        email: att.email,
        ticketQuantity: att.ticketQuantity,
        sponsorship: att.sponsorship,
        dateTime: att.dateTime,
        type: 'Primary'
      });

      // Guest rows
      for (const guest of att.guestNames) {
        flattenedRows.push({
          attendantName: guest,
          email: att.email,
          // ticketQuantity: '', // guests may not have this
          sponsorship: att.sponsorship,
          dateTime: att.dateTime,
          type: 'Guest'
        });
      }
    }

    const fields = [
      'attendantName',
      'email',
      'ticketQuantity',
      'sponsorship',
      'dateTime',
      'type'
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(flattenedRows);

    res.header('Content-Type', 'text/csv');
    res.attachment(`event_${req.params.eventId}_attendees.csv`);
    res.send(csv);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).send('Server error while generating CSV.');
  }
};



//TODO Add admin account deletion
