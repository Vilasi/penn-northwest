//* This function sends an email after a membership application is submitted
//! Check the process.env if this is not working!
function sendMessage(application) {
  const test = process.env.SENDGRID_EMAIL_API_KEY;
  console.log(test);
}

module.exports = sendMessage;
