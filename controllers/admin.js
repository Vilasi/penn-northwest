const User = require('../models/users');
const Member = require('../models/members');
const Event = require('../models/events');
const Attendant = require('../models/attendants');
const Application = require('../models/applications');

const memberSorter = require('../utils/memberSorter.js');
const getTodaysDate = require('../utils/getTodaysDate.js');
const fileAdminLog = require('../utils/middleware/fileAdminLog');

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
  const events = await Event.find({}).populate('attendees');
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
  const deletedEvent = await Event.findByIdAndDelete(id);
  if (!deletedEvent) {
    req.flash('error', 'Error. User was not deleted.');
    return res.redirect('/admin');
  }

  if (deletedEvent.attendees.length > 0) {
    for (let attendee of deletedEvent.attendees) {
      const deletedAttendant = await Attendant.findByIdAndDelete(attendee);
      console.log('deletedAttendant:======================'.red);
      console.log(deletedAttendant);
    }
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

//TODO Add admin account deletion
