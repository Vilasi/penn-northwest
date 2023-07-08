const joiValidations = require('../../validations/joiValidations');

//* Handles validation for the user registration form
const registrationValidation = async (req, res, next) => {
  const registrationData = req.body.register;

  const result = joiValidations.registrationSchema.validate(registrationData);

  //* Validation error handler
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);

    return res.redirect('/register');
  } else {
    next();
  }
};

module.exports = registrationValidation;
