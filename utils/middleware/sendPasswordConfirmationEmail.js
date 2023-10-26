//* This module sends a password reset confirmation email to the user
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
sgMail.setApiKey(apiKey);

function sendPasswordResetConfirmationEmail(user, url) {
  const message = {
    to: `${user.email}`,
    from: 'penn.northwest.member.contact@gmail.com',
    subject: `Penn Northwest Password Reset Requested`,

    text: `Dear ${user.firstName},\n\nWe received a request to reset the password for your PNDC account associated with this email address. If you made this request, please disregard this email. Your password has been reset successfully.\n\nIf you did not make this request, it's possible someone else is trying to access your account. Please contact our support immediately at info@penn-northwest.com or 724-662-3705 and we'll help you secure your account.\n\nFor your security, please consider the following steps:\n1. Always make sure you're on our official site (${url}) before entering any personal information.\n2. Never share your password or the above link with anyone.\n3. Consider using a strong, unique password that you don't use for any other online service.\n\nIf you have any issues or questions, please contact our support team at info@penn-northwest.com or 724-662-3705.\n\nThank you for choosing Penn Northwest Development Corporation!\n\nBest regards,\nThe PNDC Team`,

    html: `
    <p>Dear ${user.firstName},</p>
    <p>We received a request to reset the password for your PNDC account associated with this email address. If you made this request, please disregard this email. Your password has been reset successfully.</p>
    <p>If you did not make this request, it's possible someone else is trying to access your account. Please contact our support immediately at <a href="mailto:info@penn-northwest.com">info@penn-northwest.com</a> and we'll help you secure your account.</a></p>
    
    <h3>For your security, please consider the following steps:</h3>
    <ul>
        <li>Always make sure you're on our official site (${url}) before entering any personal information.</li>
        <li>Never share your password or any personal information with anyone.</li>
        <li>Consider using a strong, unique password that you don't use for any other online service, or a password management service.</li>
    </ul>
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
    });
}

module.exports = sendPasswordResetConfirmationEmail;
