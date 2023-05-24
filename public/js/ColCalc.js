const FORM = document.querySelector('form');

FORM.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInputs = makeRequest(e.target.children);
  //   Example Output: [ "jezebel ", "ca", "clark-pa", "45000" ]
  window.location.href = `https://www.bestplaces.net/cost-of-living/${userInputs[0]}-${userInputs[1]}/${userInputs[2]}/${userInputs[3]}`;
});

function makeRequest(children) {
  const valueArray = [];
  for (let child of children) {
    for (let el of child.children) {
      if (el.classList.contains('userInput')) {
        valueArray.push(el.value);
      }
    }
  }

  valueArray[0] = lowerCase(valueArray[0]);
  valueArray[0] = replaceWhiteSpace(valueArray[0]);

  return valueArray;
}

function lowerCase(str) {
  return str.toLowerCase();
}

function replaceWhiteSpace(str) {
  return str.replace(/ /g, '-');
}
