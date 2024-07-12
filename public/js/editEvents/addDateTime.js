//* This file adds/removes new date time input fields to the event edit page

const dateTimeAppendingDiv = document.querySelector('#date-time-appending-div');
const addDateTimeButton = document.querySelector('#addDateTimeButton');

const extantDateTimes = document.querySelectorAll('.extantDateTimes');

// This creates a new div full of input fields
let dateTimeDivId = extantDateTimes.length;
addDateTimeButton.addEventListener('click', (e) => {
  const div = document.createElement('div');
  div.classList.add('row');
  div.setAttribute('data-date-time-id', dateTimeDivId);
  div.innerHTML = `<div class="mb-3 col-lg-4"><label for="date" class="form-label">Enter event date</label><input class="w-100 form-control" type="date" name="event[dates]" required /></div><div class="mb-3 col-lg-4"><label for="time" class="form-label">Start Time</label><input class="form-control" name="event[startTimes]" type="time" required /></div><div class="mb-3 col-lg-3"><label for="time" class="form-label">End Time</label><input class="form-control" name="event[endTimes]" type="time" required /></div><div class="mb-3 col-lg-1 d-flex flex-column align-items-end justify-content-end"><button data-delete-date-time-id="${dateTimeDivId}" class="btn btn-sm btn-danger dateTimeDeleteButton" type="button">X</button></div>`;

  dateTimeAppendingDiv.append(div);
  dateTimeDivId++;
});

// This removes input field divs, including ones that are already present on the page
dateTimeAppendingDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('dateTimeDeleteButton')) {
    const deleteButtonId = e.target.dataset.deleteDateTimeId;
    const matchingDiv = [...dateTimeAppendingDiv.children].find(
      (div) => div.dataset.dateTimeId === deleteButtonId
    );

    matchingDiv.remove();
  }
});
