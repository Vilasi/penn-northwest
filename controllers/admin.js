const User = require('../models/users');
const Member = require('../models/members');
const Event = require('../models/events');
const Attendant = require('../models/attendants');
const Application = require('../models/applications');

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
  if (!members) {
    data.members = null;
  } else {
    data.members = members;
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

  res.render('admin/index', { data });
};

//TODO Implement the following for looping through the event attendees
// for (let event of data.events) {
//   for (let attendant of event.attendees) {
//     console.log(attendant);
//   }
// }
