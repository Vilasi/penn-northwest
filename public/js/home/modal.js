//* This file will control the modal openings in the Services section on the home.ejs page

const modalButton = document.querySelector('#modal-test-button');
const dialog = document.querySelector('#modal-test');

modalButton.addEventListener('click', (e) => {
  dialog.showModal();
});

//* This allows the user to close the modal if they click outside of it
// dialog.addEventListener('click', (e) => {
//   const dialogDimensions = dialog.getBoundingClientRect();
//   console.log(dialogDimensions);
//   console.log(e);
//   if (
//     e.clientX < dialogDimensions.left ||
//     e.clientX > dialogDimensions.right ||
//     e.clientY < dialogDimensions.top ||
//     e.clientY > dialogDimensions.bottom
//   ) {
//     dialog.close();
//   }
// });
