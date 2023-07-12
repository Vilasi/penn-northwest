const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
sgMail.setApiKey(apiKey);

//* This function sends an email after a membership application is submitted
//---- param [app] is short for application
//! Check the process.env if this is not working!
function sendMessage(app) {
  const message = {
    to: 'joeyvila@gmail.com', // Change to your recipient
    from: 'penn.northwest.member.contact@gmail.com', // Change to your verified sender
    subject:
      'MEMBERSHIP APPLICATION from ${app.submittedBy} ${app.companyName}',
    text: `Company: ${app.companyName}\nWebsite: ${app.website}\nRepresentative: ${app.representative}\nEmail: ${app.email}\nPhone Number: ${app.phone}\nAddress: ${app.address}, ${app.city}, ${app.state} ${app.zip}\nCompany Type: ${app.companyType}\n\nDescription: ${app.descriptionOfBusiness}\n\nAffiliations: ${app.affiliations}\n\nAnnual Contribution: ${app.annualContribution}\n\nSubmitted By: ${app.submittedBy}\nSubmitter Title: ${app.submitterTitle}`,
  };
}

module.exports = sendMessage;
