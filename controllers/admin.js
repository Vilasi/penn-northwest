const User = require('../models/users');
const Member = require('../models/members');
const Event = require('../models/events');
const Attendant = require('../models/attendants');
const Application = require('../models/applications');

const memberSorter = require('../utils/memberSorter.js');
const getTodaysDate = require('../utils/getTodaysDate.js');

module.exports.adminIndex = async (req, res, next) => {
  //TODO Admin authentication protect this route
  console.log(
    'BELOW IS THE REQ.USER========================================================='
      .red
  );
  console.log(req.user);
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

module.exports.promoteToAdmin = async (req, res, next) => {
  const { id } = req.params;

  const adminAccount = await User.findById(req.user._id);
  if (!adminAccount) {
    req.flash('error', 'Database Error, Admin account could not be located.');
    return res.redirect('/admin');
  }

  const userToPromote = await User.findByIdAndUpdate(
    id,
    { role: 'admin' },
    { new: true }
  );
  if (!userToPromote) {
    req.flash('error', 'Error, Promote to Admin operation failed.');
    return res.redirect('/admin');
  }

  const newAdmin = userToPromote.username;
  adminAccount.actionsLog.push(
    `Promoted user ${newAdmin} to Admin on ${getTodaysDate()}`
  );
  const updatedAdminLog = await adminAccount.save();

  req.flash(
    'success',
    `User ${newAdmin} has been successfully update to Admin.`
  );
  res.redirect('/admin');
};

//TODO Implement the following for looping through the event attendees
// for (let event of data.events) {
//   for (let attendant of event.attendees) {
//     console.log(attendant);
//   }
// }
