const adminNavButton = document.querySelectorAll('.adminNavButton');
console.log(adminNavButton);

// Admin Panel Button Functionality
adminNavButton.forEach((btn) => {
  //This adds/removes the 'active' class on click
  btn.addEventListener('click', (e) => {
    for (let btn of adminNavButton) {
      btn.classList.remove('active');
    }
    btn.classList.add('active');
  });
});
