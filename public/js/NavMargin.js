const nav = document.querySelector('nav');
const main = document.querySelector('#main');

// console.log(nav);
// console.log('Hello there!');
// console.log(window.getComputedStyle(nav));

// //* Get the total height of the nav bar
// const style = window.getComputedStyle(nav);
// const height = nav.offsetHeight;

// console.log(height);

// console.log(main.style.marginTop);

// main.style.marginTop = `${height + 16}px`;

function repositionMain() {
  //   const style = window.getComputedStyle(nav);
  const height = nav.offsetHeight;
  main.style.marginTop = `${height + 32}px`;
}
repositionMain();

window.addEventListener('resize', repositionMain);
