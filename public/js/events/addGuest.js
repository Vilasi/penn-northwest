// Attach event listeners to each event form individually
document.querySelectorAll('.event-form').forEach(form => {
  if(form.querySelector('#free-email-addon')) return;
  const ticketQuantityInput = form.querySelector('.ticketQuantity');
  const guestNameInput = form.querySelector('.guestNameInput');
  const addGuestButton = form.querySelector('.addGuest');

  // Listen for Enter key press on the guest name input within this specific form
  guestNameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      addGuestName(form);
    }
  });

  // Listen for the click on the Add Guest button within this specific form
  addGuestButton.addEventListener('click', function () {
    addGuestName(form);
  });

  // Disable guest name input initially
  guestNameInput.disabled = true;
  addGuestButton.disabled = true;

  // Listen for changes in ticket quantity
  ticketQuantityInput.addEventListener('input', function () {
    const ticketCount = parseInt(ticketQuantityInput.value, 10);
    
    if (ticketCount > 1) {
      guestNameInput.disabled = false;
      addGuestButton.disabled = false;
    } else {
      guestNameInput.disabled = true;
      addGuestButton.disabled = true;
    }
  });
});

// Function to add guest name from a given form
function addGuestName(form) {
  const guestNameInput = form.querySelector('.guestNameInput');
  const guestList = form.querySelector('.guestList');
  const guestNamesField = form.querySelector('.guestNamesField');
  
  if (guestNameInput.value.trim() !== '') {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex align-items-center';
    listItem.textContent = guestNameInput.value;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-sm ms-2';
    removeButton.textContent = '❌';
    removeButton.id = "removeGuestButton";
    removeButton.addEventListener('click', function () {
      listItem.remove();
      updateGuestNames(form);
    });

    listItem.appendChild(removeButton);
    guestList.appendChild(listItem);

    updateGuestNames(form);
    guestNameInput.value = ''; // Clear input field
  }
}

// Function to update hidden input field with guest names for the correct form
function updateGuestNames(form) {
  const guestNamesField = form.querySelector('.guestNamesField');
  const guestListItems = form.querySelectorAll('.guestList li');
  
  // Extract guest names and store them as an array
  const guestNames = Array.from(guestListItems).map(item => item.firstChild.textContent.trim());

  console.log(guestNames); // Debugging log to verify correct names

  // Ensure the data is submitted as an actual array instead of a JSON string
  guestNamesField.value = guestNames.length > 0 ? JSON.stringify(guestNames) : "[]";
}
