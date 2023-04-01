const nav = document.querySelector('nav');
const main = document.querySelector('#main');
const navButton = document.querySelector('#toggle-button');

function isEven(number) {
  return number % 2 === 0;
}

// console.log(nav);
// console.log('Hello there!');
// console.log(window.getComputedStyle(nav));

// //* Get the total height of the nav bar
// const style = window.getComputedStyle(nav);
// const height = nav.offsetHeight;

// console.log(height);

// console.log(main.style.marginTop);

// main.style.marginTop = `${height + 16}px`;

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
navButton.addEventListener('click', repositionMainOnClick);

window.addEventListener('resize', repositionMain);
// navButton.addEventListener('click', repositionMain);

// const nav = document.querySelector('nav');
// const height = nav.offsetHeight;
