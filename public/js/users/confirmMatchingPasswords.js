const passwordForm = document.querySelector('#password-form');
const passwordInputs = document.querySelectorAll('.password-input');
const warningDiv = document.querySelector('#warning-div');
const password1 = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// Prevent form submission if the passwords do not match
//-- Append a warning to the warning div if they dont
passwordForm.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log('Form Submitted');
  if (password1.value !== password2.value) {
    const p = document.createElement('p');
    const small = document.createElement('small');
    small.textContent = 'Passwords do not match';
    small.classList.add('text-danger');

    p.append(small);
    warningDiv.append(p);
  } else {
    passwordForm.submit();
  }
});

// Remove the warning if the user focuses on the password inputs
for (let input of passwordInputs) {
  input.addEventListener('focus', () => {
    warningDiv.innerHTML = '';
  });
}
