//* Repositions main content based on size of navbar
const nav = document.querySelector('nav');
const main = document.querySelector('#main');
const navButton = document.querySelector('#toggle-button');

function isEven(number) {
  return number % 2 === 0;
}

//* Repositions the main content based on the height of the nav on page load or resize
function repositionMain() {
  const height = nav.offsetHeight;
  main.style.paddingTop = `${height}px`;
}
repositionMain();

//* Repositions the main content on mobile when the mobile nav dropdown button is clicked
let timesClicked = 0;
const startingHeight = nav.offsetHeight;
function repositionMainOnClick() {
  timesClicked++;
  if (isEven(timesClicked)) {
    console.log(true);
    main.style.paddingTop = `${startingHeight}px`;
  } else {
    console.log(false);
    main.style.paddingTop = `${nav.offsetHeight}px`;
  }
  console.log(timesClicked);
}

//* Event Listeners
navButton.addEventListener('click', repositionMainOnClick);
window.addEventListener('resize', repositionMain);
window.addEventListener('scroll', repositionMain);
