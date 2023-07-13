async function validateReCaptcha(req, res, next) {
  console.log('The member application request body is as follows:'.yellow);
  console.log(req.body['g-recaptcha-response']);
  next();
}

module.exports = validateReCaptcha;
