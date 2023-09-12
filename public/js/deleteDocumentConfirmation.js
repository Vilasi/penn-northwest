//* This module triggers a popup alert that prevents the event from being deleted until the user confirms it

const deleteEventButtons = document.querySelectorAll('.delete-document-button');
const deleteForms = document.querySelectorAll('.delete-document-form');

deleteEventButtons.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      'Are you sure you want to delete document? If document is an Event, all attendants records will be deleted.'
    );

    if (userConfirmed) {
      deleteForms[index].submit();
    }
  });
});
