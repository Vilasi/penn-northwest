//! Users Routes
const users = require('../controllers/users.js');
const passport = require('passport');
//* Import models
const User = require('../models/users.js');
//* Import Validation Middleware
const {
  registrationValidation,
} = require('../utils/middleware/joiValidations.js');
//* Import Express and Initialize Router
const express = require('express');
const router = express.Router({ mergeParams: true });

router
  .route('/login')
  .get(users.getLoginPage)
  .post(
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureMessage: true,
      failureFlash: true,
    }),
    users.afterLoginRedirect
  );

router
  .route('/register')
  .get(users.getRegisterPage)
  .post(registrationValidation, users.registerUser);

router.route('/logout').post(users.logout);

module.exports = router;
