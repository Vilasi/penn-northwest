/**
 ** ScrollIn Animation Effect
 *
 * This function adds an animation effect to elements with the class "scrollIn" as they come into view
 * when scrolling down the page. It uses the Intersection Observer API to detect when these elements
 * intersect with the viewport or their containing parent, and then applies the "show" class to trigger
 * the animation.
 *
 * @param {NodeList} scrollInElems - A NodeList of elements with the class "scrollIn" that should be animated.
 * @returns {void}
 */

const scrollInElems = document.querySelectorAll('.scrollIn');

// Create an Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

// Observe each element in the NodeList to apply the animation when they come into view
scrollInElems.forEach((el) => observer.observe(el));
