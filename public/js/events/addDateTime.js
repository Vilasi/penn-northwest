//* This file adds more date/time elements to the dom
const addDateButton = document.querySelector('#addDateButton');
const appendingDiv = document.querySelector('#dateAppendingDiv');

console.log(addDateButton);
console.log(appendingDiv);

addDateButton.addEventListener('click', (e) => {
  console.log(e);
  e.preventDefault();
  const dateDiv = document.createElement('div');
  const timeDiv = document.createElement('div');

  dateDiv.classList.add('mb-3', 'col-lg-6');
  timeDiv.classList.add('mb-3', 'col-lg-6');

  dateDiv.innerHTML = `<label for="date" class="form-label">Enter event date</label><input class="w-100 form-control" type="date" name="event[date]" required/>`;
  timeDiv.innerHTML = `<label for="time" class="form-label">Event Time</label><input class="form-control" type="time" name="event[time]" required/>`;

  appendingDiv.append(dateDiv, timeDiv);
});

//!!SAVE THIS FOR LATER IN THE EVENTS ADD EVENT CARD
//  <div class="card-header text-center">
//           Hello <%= currentUser.firstName %>. Create New Event.
//         </div>
