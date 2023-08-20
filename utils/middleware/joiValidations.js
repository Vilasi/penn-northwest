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
  } else {
    next();
  }

  // console.log('THIS IS FROM THE EVENT VALIDATIONS'.red);
  // console.log(event);
  next();
};

//* Handles validation for the image upload
const imageUploadValidation = async (req, res, next) => {
  //If an image upload from multer-storage-cloudinary is detected, validate it
  if (req.file) {
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
  registrationValidation,
  membershipApplicationValidation,
  newMemberValidation,
};
