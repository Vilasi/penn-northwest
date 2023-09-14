//*This applies client-side validations (from Bootstrap) and programmatically executes Google's reCaptcha
//*--Only submitting the form once both are validated.

const memberApplicationForm = document.querySelector(
  '#member-application-form'
);

let isCaptchaComplete = false;

function validateMemberFormAndCaptcha(event) {
  if (event) event.preventDefault();

  // Add was-validated class and check if the form is valid
  memberApplicationForm.classList.add('was-validated');
  let formIsValid = memberApplicationForm.checkValidity();

  if (formIsValid && !isCaptchaComplete) {
    console.log('captcha not yet completed.');
    grecaptcha.execute(); // If form is valid but captcha is not complete, execute captcha
  } else if (isCaptchaComplete && formIsValid) {
    console.log('form really submitted.');
    memberApplicationForm.removeEventListener(
      'submit',
      validateMemberFormAndCaptcha
    );
    memberApplicationForm.submit(); // If form is valid and captcha is complete, submit form
  }
}

memberApplicationForm.addEventListener('submit', validateMemberFormAndCaptcha);

window.onSubmit = function () {
  console.log('captcha completed.');
  isCaptchaComplete = true;

  // Once the captcha is completed, attempt to submit form
  validateMemberFormAndCaptcha();
};
