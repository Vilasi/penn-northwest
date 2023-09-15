//* This file will control the modal/dialog openings in the Services section on the home.ejs page
console.log('h1');
const dialogs = document.querySelectorAll('.dialog');
const modalButtons = document.querySelectorAll('.modal-button');

//* This function opens the appropriately indexed modal
function openModal(index) {
  const intIndex = Number(index);
  dialogs[intIndex].showModal();
}

//* This adds an event listener to all buttons, and fires the openModal function, passing the appropriate dataset index number
for (let modalButton of modalButtons) {
  modalButton.addEventListener('click', (e) => {
    const modalIndex = modalButton.dataset.modalIndexNumber;
    openModal(modalIndex);
  });
}

//* This allows the user to close the modal if they click outside of it
for (let dialog of dialogs) {
  dialog.addEventListener('click', (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });
}
