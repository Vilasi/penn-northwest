//! Users Routes
const users = require('../controllers/users.js');
const User = require('../models/users.js');
const express = require('express');
const router = express.Router({ mergeParams: true });

router.route('/login').get(users.getLoginPage);

router.route('/register').get(users.getRegisterPage);

module.exports = router;
