const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
sgMail.setApiKey(apiKey);

function sendMessage(att) {
  const message = {
    to: `${att.email}`, // Change to your recipient
    from: 'penn.northwest.member.contact@gmail.com', // Change to your verified sender
    subject: `${att.eventName} Event Registration Confirmation`,
    text: `Event Registration Confirmation:\nCongrats, ${att.attendantName}, you are registered for ${att.eventName}!\nThe event will be at <strong>${att.location}</strong>.\nThe date and time is: ${att.dateTime}\nLooking forward to seeing you there!`,
    html: `
    <h1>Event Registration Confirmation:</h1>
    <p>Congrats, ${att.attendantName}, you are registered for <strong>${att.eventName}</strong>!</p>
    <p>The event will be at <strong>${att.location}</strong>.</p>
    <p>The date and time is: <strong>${att.dateTime}</strong></p>
    <p>Looking forward to seeing you there!</p>
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
