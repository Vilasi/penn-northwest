const joiValidations = require('../../validations/joiSchemas');

//* Event creation validation middleware:
const eventValidation = async (req, res, next) => {
  const event = req.body.event;
  const result = joiValidations.eventSchema.validate(event);

  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/events');
  }

  next();
};

//* Handles validation for the image upload
const imageUploadValidation = async (req, res, next) => {
  //If an image upload from multer-storage-cloudinary is detected, validate it
  if (req.file) {
    console.log(
      'BELOW IS THE REQ.FILE---------------------------------------'.red
    );
    console.log(req.file);
    const image = {
      url: req.file.path,
      filename: req.file.filename,
    };

    const result = joiValidations.imageSchema.validate(image);

    //Detect if image validation fails, pass to next middleware if it passes
    if (result.error) {
      const message = result.error.details[0].message;
      req.flash('error', message);
      return res.redirect('/events');
    } else {
      console.log('Image validation passed');
      next();
    }
  } else {
    next();
  }
};

//* Validates the attendant data using Joi, flashes an error message if validation fails, and redirects to '/events' or proceeds if validation is successful.
const paidEventValidation = async (req, res, next) => {
  const attendantData = req.body.attendant;
  const result = joiValidations.paidEventSchema.validate(attendantData);

  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/events');
  } else {
    console.log('ATTENDANT VALIDATION SUCCESS!!!!'.green);
    next();
  }
};

const freeEventValidation = async (req, res, next) => {
  const freeAttendantData = req.body.attendant;
  const result = joiValidations.freeEventSchema.validate(freeAttendantData);

  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/events');
  } else {
    console.log('ATTENDANT VALIDATION SUCCESS!!!!'.green);
    next();
  }
};

//* Handles validation for the user registration form
const registrationValidation = async (req, res, next) => {
  const registrationData = req.body.register;

  const result = joiValidations.registrationSchema.validate(registrationData);

  //* Validation error handler
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/register');
  } else {
    next();
  }
};

const resetPasswordValidation = async (req, res, next) => {
  const email = req.body;
  const result = joiValidations.resetPasswordSchema.validate(email);

  //* Validation error handler
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/forgot-password');
  } else {
    next();
  }
};

const matchingPasswordValidation = async (req, res, next) => {
  const passwords = req.body;
  const result = joiValidations.matchingPasswordSchema.validate(passwords);
  console.log('FROM THE JOI VALIDATIONS FILE'.red);

  //* Validation error handler
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect(req.originalUrl);
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

const newMemberValidation = async (req, res, next) => {
  const result = joiValidations.newMemberSchema.validate(req.body);

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

module.exports = {
  eventValidation,
  imageUploadValidation,
  paidEventValidation,
  freeEventValidation,
  registrationValidation,
  resetPasswordValidation,
  matchingPasswordValidation,
  membershipApplicationValidation,
  newMemberValidation,
};
