const User = require('../models/users');
const joiValidations = require('../validations/joiSchemas.js');

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

// module.exports.preLoginUrlSave = async (req, res, next) => {

// }
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
