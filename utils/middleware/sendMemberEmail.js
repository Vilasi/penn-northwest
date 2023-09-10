const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
sgMail.setApiKey(apiKey);

//* This function sends an email after a membership application is submitted
//---- param [app] is short for application
//! Check the process.env if this is not working!

//TODO Change the `to` field to actual membership application recipient
function sendMessage(app) {
  const message = {
    to: `vilasicoding@gmail.com`, //TODO Change to your recipient
    from: 'penn.northwest.member.contact@gmail.com', // Change to your verified sender
    subject: `Membership Application from ${app.submittedBy} at ${app.companyName}`,
    text: `Company: ${app.companyName}\nWebsite: ${app.website}\nRepresentative: ${app.representative}\nEmail: ${app.email}\nPhone Number: ${app.phone}\nAddress: ${app.address}, ${app.city}, ${app.state} ${app.zip}\nCompany Type: ${app.companyType}\n\nDescription: ${app.descriptionOfBusiness}\n\nAffiliations: ${app.affiliations}\n\nAnnual Contribution: ${app.annualContribution}\n\nSubmitted By: ${app.submittedBy}\nSubmitter Title: ${app.submitterTitle}`,
    html: `
    <h1>Application:</h1>
    <p><strong>Company:</strong> ${app.companyName}</p>
    <p><strong>Website:</strong> ${app.website}</p>
    <p><strong>Representative:</strong> ${app.representative}</p>
    <p><strong>Email:</strong> ${app.email}</p>
    <p><strong>Phone Number:</strong> ${app.phone}</p>
    <p>
    <strong>Address:</strong> ${app.address}, ${app.city}, ${app.state} ${app.zip}
    </p>
    <p><strong>Company Type:</strong> ${app.companyType}</p>
    <p><strong>Description:</strong> ${app.descriptionOfBusiness}</p>
    <p><strong>Affiliations:</strong> ${app.affiliations}</p>
    <p><strong>Annual Contribution:</strong> ${app.annualContribution}</p>
    <p><strong>Submitted By:</strong> ${app.submittedBy}</p>
    <p><strong>Submitter Title:</strong> ${app.submitterTitle}</p>
    `,
  };

  sgMail
    .send(message)
    .then(() => {
      console.log('Email Sent!');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = sendMessage;
