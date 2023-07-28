//* This takes the members array of objects and sorts them alphabetically (using Unicode)
// Also removes any empty names
function memberSorter(arr) {
  const filteredArray = arr.filter((obj) => obj.name.length > 0);

  return filteredArray.sort(function (a, b) {
    const nameA = a.name.toUpperCase(); // ignore case
    const nameB = b.name.toUpperCase(); // ignore case
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names are equal
    return 0;
  });
}

module.exports = memberSorter;
