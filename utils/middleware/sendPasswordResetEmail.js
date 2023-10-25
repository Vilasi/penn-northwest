//* This module sends a password reset email to the user
const sgMail = require('@sendgrid/mail');
const apiKey = process.env.SENDGRID_EMAIL_API_KEY;
sgMail.setApiKey(apiKey);

function sendPasswordResetEmail(link, user, url) {
  const message = {
    to: `${user.email}`, // Change to your recipient
    from: 'penn.northwest.member.contact@gmail.com', // Change to your verified sender
    subject: `Penn Northwest Password Reset Requested`,
    text: `Hello, ${user.firstName}\nWe received a request to reset your password for your Penn Northwest Development Corporation account. If you did not make this request, please ignore this email. Otherwise, please click the link below to reset your password:\n${link}\nThis link will expire in 20 minutes, so please use it right away.\nFor security reasons:\nAlways make sure you're on our official site (${url}) before entering any personal information.\nNever share your password or the above link with anyone.\nConsider using a strong, unique password that you don't use on other sites.\nIf you have any issues or questions, please contact our support team at info@penn-northwest.com or 724-662-3705.\nThank you for choosing Penn Northwest Development Corporation!\nBest regards,\nThe PNDC Team`,
    html: `
    <p>Hello, ${user.firstName}</p>
    <p>We received a request to reset your password for your Penn Northwest Development Corporation account. If you did not make this request, please ignore this email. Otherwise, please click the link below to reset your password:</p>
    <a href="${link}">Reset Password</a>
    <p>This link will expire in 20 minutes, so please use it right away.</p>
    
    <h3>For security reasons:</h3>
        <ul>
            <li>Always make sure you're on our official site (${url}) before entering any personal information.</li>
            <li>Never share your password or the above link with anyone.</li>
            <li>Consider using a strong, unique password that you don't use on other sites.</li>
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

module.exports = sendPasswordResetEmail;
