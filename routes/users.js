//! Users Routes
const users = require('../controllers/users.js');
const passport = require('passport');
//* Import models
const User = require('../models/users.js');
//* Import Validation Middleware
const {
  registrationValidation,
  resetPasswordValidation,
  matchingPasswordValidation,
  requestUsernameEmailValidation,
} = require('../utils/middleware/joiValidations.js');
//* Import Express and Initialize Router
const express = require('express');
const router = express.Router({ mergeParams: true });

router
  .route('/login')
  .get(users.getLoginPage)
  .post(
    users.loginHoneypot,
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

router
  .route('/forgot-password')
  .get(users.getForgotPasswordPage)
  .post(resetPasswordValidation, users.sendPasswordResetEmail);

router
  .route('/reset-password/:id/:token')
  .get(users.getResetPasswordPage)
  .post(matchingPasswordValidation, users.resetPassword);

router
  .route('/forgot-username')
  .get(users.getForgotUsernamePage)
  .post(requestUsernameEmailValidation, users.sendUsernameEmail);

module.exports = router;
