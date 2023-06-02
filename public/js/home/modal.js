//* This file will control the modal openings in the Services section on the home.ejs page

const modalButton = document.querySelector('#modal-test-button');
const dialog = document.querySelector('#modal-test');

modalButton.addEventListener('click', (e) => {
  dialog.showModal();
});
