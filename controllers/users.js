const User = require('../models/users');
const joiValidations = require('../validations/joiSchemas.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const sendPasswordResetEmail = require('../utils/middleware/sendPasswordResetEmail.js');

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
  // console.log(joiValidations.registrationSchema);
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
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    req.flash(
      'success',
      'If an account is found with that email address, an email will be sent to it with instructions on how to reset your password.'
    );
    return res.redirect('/forgot-password');
  }

  // Generate signing secret and save it to User Doc
  const cryptoToken = crypto.randomBytes(32).toString('hex');
  const secret = process.env.JWT_SECRET + cryptoToken;

  user.token = secret;
  const savedUser = await user.save();

  if (!savedUser) {
    req.flash('error', 'There was an error sending email. Please try again.');
    console.log(
      'Error Saving JWT Token to User Doc. FILE: CONTROLLERS/USERS.JS LINE 111'
        .red
    );
    return res.redirect('/forgot-password');
  }

  const payload = {
    email: user.email,
    id: user._id,
  };

  // Sign token and send it to user via email
  const token = jwt.sign(payload, secret, {
    expiresIn: '20m',
  });

  const link = `${process.env.SERVER_URL}/reset-password/${user._id}/${token}`;
  //TODO Send email with above link
  sendPasswordResetEmail(link, user, process.env.SERVER_URL);

  req.flash(
    'success',
    'If an account is found with that email address, an email will be sent to it with instructions on how to reset your password.'
  );
  return res.redirect('/forgot-password');
};

module.exports.getResetPasswordPage = async (req, res, next) => {
  console.log(req.params);
  res.send(req.params);
};

// try {
// } catch (error) {
//   req.flash('error', 'There was an error sending the email.');
//   console.log('ERROR SIGNING JWT TOKEN')
//   return res.redirect('/forgot-password');
// }
