const headerLinks = document.querySelectorAll('.header-links');
const membershipButtons = document.querySelector('#membership-buttons');
console.log(headerLinks);

for (let article of membershipButtons.children) {
  article.addEventListener('mouseover', (e) => {
    article.style.cursor = 'pointer';
  });

  article.addEventListener('click', (e) => {
    console.log('hi');
    window.location.href = '#test';
  });
}
