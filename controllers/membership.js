const path = require('path');
const joi = require('../validations/joiSchemas.js');
const createError = require('http-errors');
const sendMessage = require('../utils/middleware/sendMemberEmail.js');
const validateReCaptcha = require('../utils/middleware/reCaptchaValidate.js');

//* Import Middleware
const memberSorter = require('../utils/memberSorter.js');

//* Import Models
const Application = require('../models/applications.js');
const Member = require('../models/members.js');

module.exports.deleteMember = async (req, res, next) => {
  const { id } = req.params;
  const member = await Member.findByIdAndDelete(id);
  if (!member) {
    req.flash('error', 'The member was not found in the database.');
    return res.redirect('/membership');
  }

  req.flash(
    'success',
    `Member Deleted. Name: ${member.name}. Website: ${member.href}`
  );
  res.redirect('/membership');
};

module.exports.deleteApplication = async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findByIdAndDelete(id);
  if (!application) {
    req.flash('error', `Database Error: Application with ID ${id} not found.`);
    res.redirect('/admin');
  }

  req.flash(
    'success',
    `${application.companyName} Application Form Successfully Deleted`
  );
  res.redirect('/admin');
};

module.exports.getMembershipBrochure = (req, res, next) => {
  //? These resolve the root directory of the project and then joins that to the location of the pdf
  const rootDir = path.resolve(__dirname, '../');
  const filePath = path.join(
    rootDir,
    '/public/assets/pdf/membership-brochure.pdf'
  );

  return res.sendFile(filePath);
};

module.exports.getLevelsBrochure = (req, res, next) => {
  //? These resolve the root directory of the project and then joins that to the location of the pdf
  const rootDir = path.resolve(__dirname, '../');
  const filePath = path.join(
    rootDir,
    '/public/assets/pdf/membership-levels.pdf'
  );

  return res.sendFile(filePath);
};

//* Membership Application Submission Functionality
module.exports.handleApplicationForm = async (req, res, next) => {
  // Honeypot Catch Field
  if (req.body.honey) {
    return res.redirect('/pages/error');
  }

  // Validate reCAPTCHA response
  const captchaValidateBoolean = await validateReCaptcha(req);

  // If reCAPTCHA validation fails, display an error message and redirect to the membership application page
  if (!captchaValidateBoolean) {
    req.flash(
      'error',
      'The captcha check failed to validate. Please retry the membership application, or contact us directly.'
    );
    return res.redirect('/membership');
  }

  const application = req.body.application;

  // Create a new Membership document based on the application data
  const newApplicationDoc = new Application(application);

  //* Make Document Error Handler
  // If there is an issue creating the new document, return an error using the next middleware function
  if (!newApplicationDoc) {
    return next(
      createError(
        500,
        'There was an issue processing your application. Please try again later.'
      )
    );
  }

  const submittedApplication = await newApplicationDoc.save();

  // Display a success message and redirect to the membership page
  req.flash(
    'success',
    `Thank you, ${application.submittedBy}, your application has been submitted! You will hear from us soon.`
  );

  //? EMAIL SENDER
  // Send an email using the application data
  sendMessage(application);

  res.redirect('/membership');
};

module.exports.postNewMember = async (req, res, next) => {
  const newMember = req.body.newMember;
  console.log('A new member document has been detected: ', newMember);
  const member = new Member(newMember);

  try {
    const createdMember = await member.save();
    req.flash(
      'success',
      `New member created, Name: ${createdMember.name}. Website: ${createdMember.href}`
    );

    res.redirect('/membership');
  } catch (error) {
    next(error);
  }
};

module.exports.renderMembershipPage = async (req, res, next) => {
  //TODO Error Handle This
  const members = await Member.find({});
  const sortedMembers = memberSorter(members);

  const user = req.user || null;

  res.render('pages/membership', { members: sortedMembers, user });
};

//
