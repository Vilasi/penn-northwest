//! Events Routes
const express = require('express');
const router = express.Router({ mergeParams: true });

//* Import Controllers
const events = require('../controllers/events.js');

//* Import Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn.js');

router.route('/').get(async (req, res) => {
  res.render('pages/events');
});

module.exports = router;
