const express = require('express');
const router = express.Router({ mergeParams: true });

//* Import Controller
const admin = require('../controllers/admin');
//* Middleware
const isLoggedIn = require('../utils/middleware/isLoggedIn');
const isAdmin = require('../utils/middleware/isAdmin');

router.route('/').get(isLoggedIn, isAdmin, admin.adminIndex);

module.exports = router;
