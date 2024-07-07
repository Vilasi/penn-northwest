//* This file adds/removes bullet points functionality/fields to the events form
// Get the reference to the 'Add Bullet Point' button and the container for appending bullet point divs
const addBulletPointButton = document.querySelector('#bulletPointsButton');
const appendingBulletDiv = document.querySelector('#bulletPointsAppendingDiv');

// Initialize an iterator to keep track of the div instances
let divIterator = 0;

//* Add a click event listener to the 'Add Bullet Point' button
addBulletPointButton.addEventListener('click', (e) => {
  e.preventDefault();

  // Create new div elements for bullet point and delete button
  const bulletPointDiv = document.createElement('div');
  const deleteDiv = document.createElement('div');

  // Apply appropriate classes to the created div elements
  bulletPointDiv.classList.add(
    'mb-3',
    'col-lg-11',
    `div-instance-${divIterator}`
  );
  deleteDiv.classList.add(
    'mb-3',
    'col-sm-1',
    'd-flex',
    'align-items-end',
    `div-instance-${divIterator}`
  );

  // Set inner HTML content for the bullet point and delete button divs
  bulletPointDiv.innerHTML = `<input required type="text" name="event[bulletPoints]" class="form-control" placeholder="Add a short event descriptor." />`;
  deleteDiv.innerHTML = `<button class="${divIterator} delete-bullet-button btn btn-danger">Delete</button>`;

  // Append the created div elements to the container
  appendingBulletDiv.append(bulletPointDiv);
  appendingBulletDiv.append(deleteDiv);

  // Increment the div iterator for unique class instances
  divIterator += 1;
});

// Add a click event listener to the container to handle bullet point deletion
eventForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-bullet-button')) {
    e.preventDefault();

    // Get the class name for identifying the elements to delete
    const classForDeletion = `div-instance-${e.target.classList.item(0)}`;

    // Iterate through the children of the container in reverse order
    for (let i = appendingBulletDiv.children.length - 1; i >= 0; i--) {
      // Check if the current child element has the class for deletion
      if (appendingBulletDiv.children[i].classList.contains(classForDeletion)) {
        // Remove the identified child element
        appendingBulletDiv.children[i].remove();
      }
    }
  }
});
