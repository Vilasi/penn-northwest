const adminNavButton = document.querySelectorAll('.adminNavButton');
const dataSections = document.querySelectorAll('.data-sections');

//* Load section state
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('buttonIndex')) {
    const index = localStorage.getItem('buttonIndex');
    const btn = document.querySelector(`[data-button-index="${index}"]`);

    hideSections(btn);
    showSection(btn);
  }
});

//* Click Listener for Admin Panel Button Statefulness Functionality -  hide/show sections
adminNavButton.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    // Set the state in localStorage
    localStorage.setItem('buttonIndex', btn.dataset.buttonIndex);

    // Hide/Show relevant sections
    hideSections(btn);
    showSection(btn);
  });
});

//* Begin statefulness function definitions
function hideSections(button) {
  for (let btn of adminNavButton) {
    btn.classList.remove('active');
    btn.removeAttribute('aria-selected', 'true');
    btn.setAttribute('aria-current', 'false');

    // This hides every section on any button press . The proper one will be unhidden in the below showSection function
    dataSections.forEach((section) => section.classList.add('d-none'));
  }
  button.classList.add('active');
  button.setAttribute('aria-current', 'true');
}

// This iterates through the clicked button's classes and matches them with each data sections classes to show
// When there is one match (there will only be one match) is removed the d-none class.
// This will ensure that only the correct section is shown on the correct button press
function showSection(button) {
  for (let attribute of button.classList) {
    for (let section of dataSections) {
      for (let identifier of section.classList) {
        if (identifier === attribute) {
          section.classList.remove('d-none');
        }
      }
    }
  }
}
