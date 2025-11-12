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
  const logoImage = document.querySelector('#logo-image');
  const homegrownLogoImage = document.querySelector('#homegrown-logo-image');
  const hrElements = document.querySelectorAll('hr.m-0');
  const elementsToHide = document.querySelectorAll('.scroll-hide');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    navbar.classList.add('scroll');
    logoImage.classList.add('logo-resize');
    homegrownLogoImage.classList.add('homegrown-logo-resize');
    hrElements.forEach((hr) => hr.classList.add('scroll'));
    elementsToHide.forEach((el) => {
      return el.classList.add('to-hide');
    });
  } else {
    navbar.classList.remove('scroll');
    logoImage.classList.remove('logo-resize');
    homegrownLogoImage.classList.remove('homegrown-logo-resize');
    hrElements.forEach((hr) => hr.classList.remove('scroll'));
    elementsToHide.forEach((el) => {
      return el.classList.remove('to-hide');
    });
  }
});

//* Track mouse position on entire page for radial gradient effect on blue background
document.addEventListener('DOMContentLoaded', function () {
  const mainElement = document.querySelector('#main');
  if (mainElement) {
    document.addEventListener('mousemove', function (e) {
      const rect = mainElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mainElement.style.setProperty('--mouse-x', x + '%');
      mainElement.style.setProperty('--mouse-y', y + '%');
    });
  }

  //* Track mouse position on nav-tab buttons for radial gradient effect
  document.querySelectorAll('.nav-tabs .nav-link').forEach((link) => {
    link.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      this.style.setProperty('--mouse-x', x + '%');
      this.style.setProperty('--mouse-y', y + '%');
    });
  });
});