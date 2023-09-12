const adminNavButton = document.querySelectorAll('.adminNavButton');
console.log(adminNavButton);

// Admin Panel Button Functionality
adminNavButton.forEach((btn) => {
  //This adds/removes the 'active' class on click
  btn.addEventListener('click', (e) => {
    for (let btn of adminNavButton) {
      btn.classList.remove('active');
      btn.removeAttribute('aria-selected', 'true');
      btn.setAttribute('aria-current', 'false');
    }
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'true');
  });
});
