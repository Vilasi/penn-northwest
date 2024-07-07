//* This module sends an email to the user when they register for a free event
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
const verifiedSender = process.env.SENDGRID_VERIFIED_SENDER;
sgMail.setApiKey(apiKey);

function sendPaidEventReceipt(att, receipt_url) {
  const message = {
    to: `${att.email}`, // Change to your recipient
    from: verifiedSender, // Change to your verified sender
    subject: `${att.eventName} Event Registration Confirmation`,
    text: `Event Registration Confirmation:\nCongrats, ${att.attendantName}, you are registered for ${att.eventName}!\nThe event will be at <strong>${att.location}</strong>.\nThe date and time is: ${att.dateTime}\nLooking forward to seeing you there!\nFollow the following link to view your receipt in your browser: ${receipt_url}`,
    html: `
    <h1>Event Registration Confirmation:</h1>
    <p>Congrats, ${att.attendantName}, you are registered for <strong>${att.eventName}</strong>!</p>
    <p>The event will be at <strong>${att.location}</strong>.</p>
    <p>The date and time is: <strong>${att.dateTime}</strong></p>
    <p>You've purchased ${att.ticketQuantity} ticket(s).
    <p>Your sponsorship, ${att.sponsorship}, includes ${att.sponsorshipTickets} tickets.
    <p>Looking forward to seeing you there!</p>
    <a href="${receipt_url}">Click Here to View Your Receipt</a> 
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

module.exports = sendPaidEventReceipt;
