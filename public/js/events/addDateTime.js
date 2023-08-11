//* This file adds more date/time elements to the dom
const addDateButton = document.querySelector('#addDateButton');
const appendingDiv = document.querySelector('#dateAppendingDiv');

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

  // Add CSS classes to the date and time div elements for styling.
  dateDiv.classList.add('mb-3', 'col-lg-6');
  timeDiv.classList.add('mb-3', 'col-lg-6');

  // Set innerHTML of the date and time div elements to create input fields.
  dateDiv.innerHTML = `<label for="date" class="form-label">Enter event date</label><input class="w-100 form-control" type="date" name="event[dates]" required/>`;
  timeDiv.innerHTML = `<label for="time" class="form-label">Event Time</label><input class="form-control" type="time" name="event[time]" required/>`;

  // Append the date and time div elements to the container 'appendingDiv'.
  appendingDiv.append(dateDiv, timeDiv);
});

//!!SAVE THIS FOR LATER IN THE EVENTS ADD EVENT CARD
//  <div class="card-header text-center">
//           Hello <%= currentUser.firstName %>. Create New Event.
//         </div>
