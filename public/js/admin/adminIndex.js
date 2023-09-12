const adminNavButton = document.querySelectorAll('.adminNavButton');
const dataSections = document.querySelectorAll('.data-sections');
console.log(adminNavButton);
console.log(dataSections);

// Admin Panel Button Functionality
adminNavButton.forEach((btn) => {
  //This adds/removes the 'active' class on click
  btn.addEventListener('click', (e) => {
    for (let btn of adminNavButton) {
      btn.classList.remove('active');
      btn.removeAttribute('aria-selected', 'true');
      btn.setAttribute('aria-current', 'false');

      // This hides every section on any button press . The proper one will be unhidden in the below loops
      dataSections.forEach((section) => section.classList.add('d-none'));
    }
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'true');

    // This iterates through the clicked button's classes and matches them with each data sections classes to show
    // When there is one match (there will only be one match) is removed the d-none class.
    // This will ensure that only the correct section is shown on the correct button press
    for (let attribute of btn.classList) {
      for (let section of dataSections) {
        for (let identifier of section.classList) {
          if (identifier === attribute) {
            section.classList.remove('d-none');
          }
        }
      }
    }
  });
});
