const User = require('../models/users');
const joiValidations = require('../validations/joiSchemas.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendPasswordResetEmail = require('../utils/middleware/sendPasswordResetEmail.js');
const sendPasswordResetConfirmationEmail = require('../utils/middleware/sendPasswordConfirmationEmail.js');

module.exports.getRegisterPage = (req, res) => {
  res.render('users/register');
};

//* Register new user
module.exports.registerUser = async (req, res, next) => {
  // Bot Detector
  if (req.body.honeypot) {
    req.flash('error', 'Bot detected');
    return res.redirect('/');
  }

  //* Make and register the new user
  //? Validations will have already been completed in a Joi middleware
  try {
    const { firstName, lastName, email, username, company, password } =
      req.body.register;
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      company: company,
    });
    const registeredUser = await User.register(newUser, password);
    if (!registeredUser) {
      req.flash(
        'error',
        'There was an error creating your account. Please try again.'
      );
      res.redirect('/register');
    }

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash(
        'success',
        `User ${username} with ${company} successfully created!`
      );
      return res.redirect('/');
    });
  } catch (err) {
    //This handles "Email already in use" errors
    if (err.code === 11000) {
      req.flash('error', 'Email address already in use.');
    } else {
      req.flash('error', err.message);
    }
    res.redirect('/register');
  }
};

module.exports.getLoginPage = (req, res) => {
  res.render('users/login');
};

module.exports.loginHoneypot = async (req, res, next) => {
  if (req.body.honeypot) {
    req.flash('error', 'Bot detected');
    return res.redirect('/');
  } else {
    next();
  }
};

module.exports.afterLoginRedirect = async (req, res, next) => {
  req.flash('success', `Welcome back, ${req.user.username}!`);
  return res.redirect('/');
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
};

module.exports.getForgotPasswordPage = (req, res, next) => {
  res.render('users/forgot-password');
};

module.exports.sendPasswordResetEmail = async (req, res, next) => {
  // Bot detection is being done in the joi validation middleware function for this one
  const { email } = req.body.email;

  const user = await User.findOne({ email: email });

  // If no user is found, show a generic message (security reasons) and redirect to forgot-password
  if (!user) {
    req.flash(
      'success',
      'If an account is found with that email address, an email will be sent to it with instructions on how to reset your password.'
    );
    return res.redirect('/forgot-password');
  }

  // Generate a crypto token to be used in the JWT secret
  const cryptoToken = crypto.randomBytes(32).toString('hex');
  const secret = process.env.JWT_SECRET + cryptoToken;

  // Save the generated secret to the user document
  user.token = secret;
  const savedUser = await user.save();

  // If an error occurs while saving the user, show an error message and redirect to forgot-password
  if (!savedUser) {
    req.flash('error', 'There was an error sending email. Please try again.');
    console.log(
      'Error Saving JWT Token to User Doc. FILE: CONTROLLERS/USERS.JS LINE 111'
        .red
    );
    return res.redirect('/forgot-password');
  }

  // Construct the payload to be signed into the JWT
  const payload = {
    email: user.email,
    id: user._id,
  };

  // Sign a JWT token with the secret and payload, set expiration to 20 minutes
  const token = jwt.sign(payload, secret, {
    expiresIn: '20m',
  });

  // Create a link with the token to be sent in the password reset email - send email with sendPasswordResetEmail util function
  const link = `${process.env.SERVER_URL}/reset-password/${user._id}/${token}`;
  console.log(link);
  sendPasswordResetEmail(link, user, process.env.SERVER_URL);

  // After sending the email, show a success message (generic) and redirect to forgot-password
  req.flash(
    'success',
    'If an account is found with that email address, an email will be sent to it with instructions on how to reset your password.'
  );
  return res.redirect('/forgot-password');
};

module.exports.getResetPasswordPage = async (req, res, next) => {
  const { id, token } = req.params;

  // Retrieve the user from the database using the provided ID
  const user = await User.findById(id);

  // Check if the user is found, or if they have a token - redirect and flash message if falsey
  if (!user || !user.token) {
    console.log(
      'RESET PASSWORD ERROR -- user variable falsey, user or user token missin==========/controllers/users.js LINE 149=============='
        .red
    );
    req.flash(
      'error',
      'There was an error communicating with the database. Please try again.'
    );

    return res.redirect('/forgot-password');
  }

  // Store the user.token as the JWT secret
  const secret = user.token;

  try {
    // Verify the JWT token using the secret
    const payload = jwt.verify(token, secret);

    return res.render('users/reset-password', { username: user.username });
  } catch (error) {
    // Log the JWT verification error for debugging purposes
    console.log(
      'ERROR VERIFYING JWT TOKEN. What follows is the jwt error message:'.red
    );
    console.log(error.message);

    // Handle specific JWT error for invalid signature which could indicate the link has expired
    if (error.message === 'invalid signature') {
      req.flash(
        'error',
        'The password reset link has expired. Please try again.'
      );
      return res.redirect('/forgot-password');
    } else {
      // Handle general JWT verification errors
      req.flash(
        'error',
        'There was an error verifying your password reset link. Please try again.'
      );
      return res.redirect('/forgot-password');
    }
  }
};

module.exports.resetPassword = async (req, res, next) => {
  //Bot detection honeypot is done in the joi validation middleware function for this one
  const { password, password2 } = req.body.passwords;
  const { id, token } = req.params;

  // Redirect back to the password reset page if the passwords do not match -- For backend/postman attacks
  if (password !== password2) {
    req.flash('error', 'Passwords do not match.');
    return res.redirect(req.originalUrl);
  }

  const user = await User.findById(id);
  if (!user || !user.token) {
    console.log(
      'ERROR FINDING USER OR USER TOKEN======= controllers/users.js -> Line 221'
        .red
    );
    req.flash(
      'error',
      'There was an error communicating with the database. Please try again.'
    );
    return res.redirect(req.originalUrl);
  }

  const secret = user.token;
  try {
    const payload = jwt.verify(token, secret);
    const userUpdateCheck = await user.setPassword(password);
    const newUser = await user.save();

    if (!newUser || !userUpdateCheck) {
      console.log(
        'ERROR UPDATING USER PASSWORD======= controllers/users.js -> Line 237'
          .red
      );
      req.flash(
        'error',
        'There was an error communicating with the database. Please try again.'
      );
      return res.redirect(req.originalUrl);
    }

    console.log(userUpdateCheck);
    sendPasswordResetConfirmationEmail(user, process.env.SERVER_URL);

    req.flash('success', 'Password successfully reset.');
    return res.redirect('/login');
  } catch (error) {
    console.log(
      'ERROR VERIFYING JWT TOKEN. What follows is the jwt error message:'.red
    );
    console.log(error.message);

    if (error.message === 'invalid signature') {
      req.flash(
        'error',
        'The password reset link has expired. Please try again.'
      );
      return res.redirect('/forgot-password');
    } else {
      // Handle general JWT verification errors
      req.flash(
        'error',
        'There was an error verifying your password reset. Please try again.'
      );
      return res.redirect('/forgot-password');
    }
  }
};

module.exports.getForgotUsernamePage = (req, res, next) => {
  res.render('users/forgot-username');
};

module.exports.sendUsernameEmail = async (req, res, next) => {
  //Honeypot is handled in the joi validation middleware function for this one
  const { email } = req.body.email;
  const user = await User.findOne({ email: email });
  return res.send(user);

  req.flash(
    'success',
    'If an account is found with that email address, an email will be sent to it with your username.'
  );
  res.redirect('/login');
};
