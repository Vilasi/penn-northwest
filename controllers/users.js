const User = require('../models/users');
const joiValidations = require('../validations/joiValidations.js');

module.exports.getLoginPage = (req, res) => {
  // console.log(joiValidations.registrationSchema);
  res.render('users/login');
};

module.exports.getRegisterPage = (req, res) => {
  res.render('users/register');
};

//* /register POST
module.exports.registerUser = async (req, res) => {
  // const registrationData = req.body.register;

  res.send('Looks good!');
};
