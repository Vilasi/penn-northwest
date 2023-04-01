window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    navbar.classList.add('scroll');
  } else {
    navbar.classList.remove('scroll');
  }
});
