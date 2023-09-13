//* This module triggers a popup alert that prevents the event from being deleted until the user confirms it

const deleteEventButtons = document.querySelectorAll('.delete-document-button');
const deleteForms = document.querySelectorAll('.delete-document-form');
let message = '';

deleteEventButtons.forEach((button, index) => {
  button.addEventListener('click', (e) => {
    switch (button.textContent) {
      case 'Delete Account':
        message =
          'Are you sure you want to delete account? All user information will be deleted and the user account will not be recoverable.';
        break;
      case 'Promote to Admin':
        message =
          'Are you sure you want to promote account? They will gain full admin privileges and the action will be irreversible except by a developer with database access.';
        break;

      default:
        message =
          'Are you sure you want to delete document? All associated records (attendants, user info, etc) will be deleted.';
        break;
    }

    e.preventDefault();
    const userConfirmed = window.confirm(message);

    if (userConfirmed) {
      deleteForms[index].submit();
    }
  });
});
