//! Users Routes
const users = require('../controllers/users.js');
const User = require('../models/users.js');
const express = require('express');
const router = express.Router({ mergeParams: true });

module.exports = router;
