//! Users Routes
const users = require('../controllers/users.js');
//* Import models
const User = require('../models/users.js');

//* Import Validation Middleware
const registrationValidation = require('../utils/middleware/registrationValidation.js');

const express = require('express');
const router = express.Router({ mergeParams: true });

router.route('/login').get(users.getLoginPage);

router
  .route('/register')
  .get(users.getRegisterPage)
  .post(registrationValidation, users.registerUser);

module.exports = router;
