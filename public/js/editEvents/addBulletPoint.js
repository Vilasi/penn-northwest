//* This file adds/removes new bulletPoint time input fields to the event edit page

const bulletPointsAppendingDiv = document.querySelector(
  '#bulletPointsAppendingDiv'
);
const addBulletPointsButton = document.querySelector('#addBulletPointsButton');

const extantBulletPoints = document.querySelectorAll('.extantBulletPoints');

// This creates a new div full of input fields
let bulletPointDivId = extantBulletPoints.length;
addBulletPointsButton.addEventListener('click', (e) => {
  const div = document.createElement('div');
  div.classList.add('row');
  div.setAttribute('data-bullet-point-id', bulletPointDivId);
  div.innerHTML = `<div class="extantBulletPoints row" data-bullet-point-id="${bulletPointDivId}"><div class="mb-3 col-lg-11"><label class="form-label">Bullet point descriptor</label><input type="text" name="event[bulletPoints]" class="form-control" required /></div><div class="mb-3 col-lg-1 d-flex flex-column align-items-end justify-content-end"><button data-delete-bullet-point-id="${bulletPointDivId}" class="btn btn-sm btn-danger bulletPointDeleteButton" type="button">X</button></div></div>`;

  bulletPointsAppendingDiv.append(div);
  bulletPointDivId++;
});

// This removes input field divs, including ones that are already present on the page
bulletPointsAppendingDiv.addEventListener('click', (e) => {
  if (e.target.classList.contains('bulletPointDeleteButton')) {
    const deleteButtonId = e.target.dataset.deleteBulletPointId;
    const matchingDiv = [...bulletPointsAppendingDiv.children].find(
      (div) => div.dataset.bulletPointId === deleteButtonId
    );

    matchingDiv.remove();
  }
});
