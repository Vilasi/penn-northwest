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

//* Edit Event validation middleware:
const editEventValidation = async (req, res, next) => {
  const event = req.body.event;
  const result = joiValidations.editEventSchema.validate(event);

  console.log('Edit Event Validations Passed:'.green);
  console.log(result);

  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error:'.yellow);
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

   console.log("Before conversion - Type of guestNames:" .yellow, typeof attendantData.guestNames);
  console.log("Before conversion - guestNames:" .yellow, attendantData.guestNames);


  // Ensure guestNames is properly parsed as an array
  if (typeof attendantData.guestNames === "string") {
    try {
      attendantData.guestNames = JSON.parse(attendantData.guestNames);

      // If parsing results in something other than an array, fix it
      if (!Array.isArray(attendantData.guestNames)) {
        attendantData.guestNames = [];
      }
    } catch (error) {
      attendantData.guestNames = []; // Fallback to empty array if parsing fails
    }
  }

  attendantData.guestNames = Array.isArray(attendantData.guestNames) ? attendantData.guestNames : [];


  console.log("After conversion - Type of guestNames:", typeof attendantData.guestNames);
  console.log("After conversion - guestNames:", attendantData.guestNames);

  const result = joiValidations.paidEventSchema.validate(attendantData);
 
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/events');
  } else {
    next();
  }
};



const freeEventValidation = async (req, res, next) => {
  const freeAttendantData = req.body.attendant;
  

  // console.log("Before conversion - Type of guestNames:".yellow, typeof freeAttendantData.guestNames);
  // console.log("Before conversion - guestNames:".yellow, freeAttendantData.guestNames);


  // // Ensure guestNames is properly parsed as an array
  // if (typeof freeAttendantData.guestNames === "string") {
  //   try {
  //     freeAttendantData.guestNames = JSON.parse(freeAttendantData.guestNames);

  //     // If parsing results in something other than an array, fix it
  //     if (!Array.isArray(freeAttendantData.guestNames)) {
  //       freeAttendantData.guestNames = [];
  //     }
  //   } catch (error) {
  //     freeAttendantData.guestNames = []; // Fallback to empty array if parsing fails
  //   }
  // }

  // freeAttendantData.guestNames = Array.isArray(freeAttendantData.guestNames) ? freeAttendantData.guestNames : [];

  // console.log("After conversion - Type of guestNames:", typeof freeAttendantData.guestNames);
  // console.log("After conversion - guestNames:", freeAttendantData.guestNames);

  const result = joiValidations.freeEventSchema.validate(freeAttendantData);

  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/events');
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

const resetPasswordValidation = async (req, res, next) => {
  // Bot detector

  //TODO Investigate why this is triggering erroneously
  // if (req.body.honeypot) {
  //   req.flash('error', 'Bot detected');
  //   return res.redirect('/');
  // }

  const email = req.body.email;

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
  //TODO Investigate why this is triggering erroneously
  // if (req.body.honeypot) {
  //   req.flash('error', 'Bot detected');
  //   return res.redirect('/');
  // }

  const passwords = req.body.passwords;
  const result = joiValidations.matchingPasswordSchema.validate(passwords);

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

const requestUsernameEmailValidation = async (req, res, next) => {
  //TODO Investigate why this is triggering erroneously
  // if (req.body.honeypot) {
  //   req.flash('error', 'Bot detected');
  //   return res.redirect('/');
  // }

  const email = req.body.email;
  const result = joiValidations.requestUsernameEmailSchema.validate(email);

  //* Validation error handler
  if (result.error) {
    const message = result.error.details[0].message;
    req.flash('error', message);
    console.log('Joi Error'.yellow);
    console.log(result.error.details[0].message);

    return res.redirect('/forgot-username');
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
  requestUsernameEmailValidation,
  matchingPasswordValidation,
  membershipApplicationValidation,
  newMemberValidation,
  editEventValidation,
};
