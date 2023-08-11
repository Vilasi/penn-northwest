const addBulletPointButton = document.querySelector('#bulletPointsButton');
const appendingBulletDiv = document.querySelector('#bulletPointsAppendingDiv');

console.log(addBulletPointButton);
console.log(appendingDiv);

addBulletPointButton.addEventListener('click', (e) => {
  e.preventDefault();

  const bulletPointDiv = document.createElement('div');

  bulletPointDiv.classList.add('mb-3', 'col-lg-12');

  bulletPointDiv.innerHTML = `<input type="text" name="event[descriptor]" class="form-control" placeholder="Add a short event descriptor." />`;

  appendingBulletDiv.append(bulletPointDiv);
});
