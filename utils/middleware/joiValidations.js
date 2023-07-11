const joiValidations = require('../../validations/joiSchemas');

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

const membershipApplicationValidation = async (req, res, next) => {
  const application = req.body.application;
  const result =
    joiValidations.membershipApplicationSchema.validate(application);

  //* Validation error handler
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);

    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);
    return res.redirect('/membership');
  } else {
    next();
  }
};

module.exports = { registrationValidation, membershipApplicationValidation };
