//* This module sends the user their username, if a user was found in the database
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
const verifiedSender = process.env.SENDGRID_VERIFIED_SENDER;
sgMail.setApiKey(apiKey);

function sendUsernameEmail(user, url) {
  const message = {
    to: `${user.email}`,
    from: verifiedSender,
    subject: `Penn Northwest Username Requested`,
    text: `Hello, ${user.firstName}\nWe received a request for you username at ${url}.\nYour username is: ${user.username}\nIf you have any issues or questions, please contact our support team at info@penn-northwest.com or 724-662-3705.\nThank you for choosing Penn Northwest Development Corporation!\nConsider using a strong, unique password that you don't use on other sites.\nIf you have any issues or questions, please contact our support team at info@penn-northwest.com or 724-662-3705.\nThank you for choosing Penn Northwest Development Corporation!\nBest regards,\nThe PNDC Team`,
    html: `
    <p>Hello, ${user.firstName}</p>
    <p>We received a request for you username at ${url}.</p>
    <p>Your username is:</p>
    <p><strong>${user.username}</strong></p>
    <p>If you have any issues or questions, please contact our support team at <a href="mailto:info@penn-northwest.com">info@penn-northwest.com</a> or 724-662-3705.</p>
    <p>Thank you for choosing Penn Northwest Development Corporation!</p>
    <p>Best regards,<br>The PNDC Team</p>
    `,
  };

  sgMail
    .send(message)
    .then(() => {
      console.log('Password Reset Email Sent');
    })
    .catch((err) => {
      console.log(err);
      console.log(err.response.body.errors);
    });
}

module.exports = sendUsernameEmail;
