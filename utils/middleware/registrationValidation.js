const joiValidations = require('../../validations/joiValidations');

const registrationValidation = async (req, res, next) => {
  //   console.log(req.body.register);
  const registrationData = req.body.register;
  //   console.log(registrationData);

  const result = joiValidations.registrationSchema.validate(registrationData);
  //   console.log(result.error.details[0].message);

  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);

    return res.redirect('/register');
  } else {
    next();
  }
};

module.exports = registrationValidation;
