const path = require('path');
const joi = require('../validations/joiSchemas.js');
const createError = require('http-errors');
const sendMessage = require('../utils/sendMemberEmail.js');
const Membership = require('../models/memberships.js');

module.exports.renderMembershipPage = async (req, res) => {
  res.render('pages/membership');
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

module.exports.handleMembershipForm = async (req, res, next) => {
  const application = req.body.application;
  const newMembershipDoc = new Membership(application);

  //* Make Document Error Handler
  if (!newMembershipDoc) {
    return next(
      createError(
        500,
        'There was an issue processing your application. Please try again later.'
      )
    );
  }

  const submittedApplication = await newMembershipDoc.save();
  console.log(submittedApplication);

  req.flash(
    'success',
    `Thank you, ${application.submittedBy}, your application has been submitted! You will hear from us soon.`
  );

  sendMessage(application);
  // console.log(newMembershipDoc);
  // console.log(createError);
  // console.log(application);

  res.redirect('/membership');
};
