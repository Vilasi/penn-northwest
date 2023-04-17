function setHeight() {
  for (let i = 1; i <= 100; i++) {
    const elements = document.getElementsByClassName(`h-${i}`);

    for (const element of elements) {
      element.style.maxHeight = `${i}%`;
    }
  }
}

setHeight();
