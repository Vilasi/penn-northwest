const mcidaModalButton = document.querySelector('#mcida-modal-button');
const mcidaDialog = document.querySelector('#mcida-dialog');
const mcidaDialogCloseButton = document.querySelector(
  '#mcida-dialog-close-button'
);

// console.log(mcidaDialog);

mcidaModalButton.addEventListener('click', (e) => {
  console.log('test');

  mcidaDialog.showModal();
});

mcidaDialogCloseButton.addEventListener('click', () => {
  mcidaDialog.close();
});

mcidaDialog.addEventListener('click', (e) => {
  const dialogDimensions = mcidaDialog.getBoundingClientRect();
  console.log(dialogDimensions);
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    mcidaDialog.close();
  }
});
