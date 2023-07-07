const User = require('../models/users');

module.exports.getLoginPage = (req, res) => {
  res.render('users/login');
};

module.exports.getRegisterPage = (req, res) => {
  res.render('users/register');
};
