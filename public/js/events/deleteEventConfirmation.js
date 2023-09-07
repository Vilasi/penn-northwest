//* This module triggers a popup alert that prevents the event from being deleted until the user confirms it

const deleteEventButtons = document.querySelectorAll('.delete-event-button');
const deleteForms = document.querySelectorAll('.delete-form');

deleteEventButtons.forEach((button, index) => {
  console.log(button, index);
  console.log(deleteForms[index]);

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      'Are you sure you want to delete event? Attendants records will be deleted.'
    );

    if (userConfirmed) {
      deleteForms[index].submit();
    }
  });
});
