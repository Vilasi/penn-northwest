//* This animates the background color change of the Navbar on scroll
// window.addEventListener('scroll', function () {
//   const navbar = document.querySelector('.navbar');
//   const scrollPosition = window.scrollY;

//   if (scrollPosition > 0) {
//     navbar.classList.add('scroll');
//   } else {
//     navbar.classList.remove('scroll');
//   }
// });

window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const hrElements = document.querySelectorAll('hr.m-0');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    navbar.classList.add('scroll');
    hrElements.forEach((hr) => hr.classList.add('scroll'));
  } else {
    navbar.classList.remove('scroll');
    hrElements.forEach((hr) => hr.classList.remove('scroll'));
  }
});
