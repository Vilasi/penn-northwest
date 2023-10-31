const axios = require('axios');

/**
 * Validates a reCAPTCHA response by communicating with the Google reCAPTCHA API.
 * @param {Object} req - The request object containing the reCAPTCHA response in req.body['g-recaptcha-response'].
 * @returns {Promise<boolean>} - A promise that resolves to true if the reCAPTCHA response is valid, and false otherwise.
 */

async function validateReCaptcha(req) {
  console.log('THIS IS THE RECAPTCHA VALIDATOR');
  // Check if the reCAPTCHA response exists in the request body
  if (!req.body['g-recaptcha-response']) {
    return false;
  }

  try {
    // Send a POST request to the Google reCAPTCHA API to verify the response
    const response = await axios({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params: {
        secret: `${process.env.RECAPTCHA_BACKEND_KEY}`,
        response: req.body['g-recaptcha-response'],
      },
    });

    // Extract the verification result from the response data
    const captchaVerificationResults = response.data.success;
    console.log(
      'BELOW IS THE CAPTCHA RESULT (from reCaptchavalidate.js file)----------------------------------'
        .red
    );
    console.log(response.data);
    console.log(captchaVerificationResults);
    return captchaVerificationResults;
  } catch (err) {
    console.log(err);
    return false; // Return false to indicate the failure of the verification process
  }
}

module.exports = validateReCaptcha;
