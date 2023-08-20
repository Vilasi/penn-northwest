//* This file adds more date/time elements to the dom and adds deletion functionality.
const addDateButton = document.querySelector('#addDateButton');
const appendingDiv = document.querySelector('#dateAppendingDiv');
// divInstance is for tagging the divs for deletion
let divInstance = 0;

/**
 * Event listener for the 'Add Date' button.
 * This function creates and appends date and time input fields to the DOM.
 *
 * @param {Event} e - The click event object.
 */
addDateButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Create div elements for the date and time input fields.
  const dateDiv = document.createElement('div');
  const timeDiv = document.createElement('div');
  const deleteDiv = document.createElement('div');

  // Add CSS classes to the date and time div elements for styling.
  dateDiv.classList.add('mb-3', 'col-lg-6', `div-instance-${divInstance}`);
  timeDiv.classList.add('mb-3', 'col-lg-5', `div-instance-${divInstance}`);
  deleteDiv.classList.add(
    'mb-3',
    'col-sm-1',
    'd-flex',
    'align-items-end',
    `div-instance-${divInstance}`,
    'delete-date-button'
  );

  // Set innerHTML of the date and time div elements to create input fields.
  //-- Also creates a delete button, the first class of which contains the index for targeting deletion
  dateDiv.innerHTML = `<label for="date" class="form-label">Enter event date</label><input class="w-100 form-control" type="date" name="event[dates]" required/>`;
  timeDiv.innerHTML = `<label for="time" class="form-label">Event Time</label><input class="form-control" type="time" name="event[times]" required/>`;
  deleteDiv.innerHTML = `<button class="${divInstance} btn btn-danger delete-date-button">Delete</button>`;

  // Append the date and time div elements to the container 'appendingDiv'.
  appendingDiv.append(dateDiv, timeDiv, deleteDiv);
  divInstance += 1;
});

//* The following event listener handles the deletion of additional date/time instances when the "delete-date-button" is clicked.
// It prevents the default behavior of the click event to avoid any unintended actions.
// It identifies the specific class associated with the instance to be deleted.
// Then, it iterates through the child elements of the "appendingDiv" to find and remove the corresponding element with the identified class.
const eventForm = document.querySelector('#add-event-form');

eventForm.addEventListener('click', (e) => {
  // Check if the clicked element has the class "delete-date-button"
  if (e.target.classList.contains('delete-date-button')) {
    e.preventDefault();

    // Generate the class name to target the specific instance for deletion
    const classForDeletion = `div-instance-${e.target.classList.item(0)}`;

    // Iterate through the child elements of "appendingDiv" in reverse order
    for (let i = appendingDiv.children.length - 1; i >= 0; i--) {
      // Check if the current child element has the class for deletion
      if (appendingDiv.children[i].classList.contains(classForDeletion)) {
        // Remove the identified child element
        appendingDiv.children[i].remove();
      }
    }
  }
});

//!!SAVE THIS FOR LATER IN THE EVENTS ADD EVENT CARD
//  <div class="card-header text-center">
//           Hello <%= currentUser.firstName %>. Create New Event.
//         </div>
