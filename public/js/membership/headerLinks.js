const headerLinks = document.querySelectorAll('.header-links');
const membershipButtons = document.querySelector('#membership-buttons');
console.log(headerLinks);

//* Article functionality
//? This loop ensures that every article within the membershipButtons section has href behavior/functionality
for (let article of membershipButtons.children) {
  article.addEventListener('mouseover', (e) => {
    article.style.cursor = 'pointer';
  });

  //* Provides a href intra-page link to the header buttons
  article.addEventListener('click', (e) => {
    const classlist = e.target.classList;

    if (classlist.contains('incentives-link-anchor')) {
      window.location.href = '#membership-incentives';
    }
    if (classlist.contains('signup-link-anchor')) {
      window.location.href = '#signup';
    }
    if (classlist.contains('member-list-link-anchor')) {
      window.location.href = '#member-list';
    }
  });
}
