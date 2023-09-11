const express = require('express');
const router = express.Router({ mergeParams: true });

//* Import DB Models
const User = require('../models/users');
const Member = require('../models/members');
const Event = require('../models/events');
const Attendant = require('../models/attendants');
const Application = require('../models/applications');

router.route('/').get((req, res) => {
  console.log(User);
  console.log(Member);
  console.log(Event);
  console.log(Attendant);
  console.log(Application);
  res.render('admin/index');
});

module.exports = router;
