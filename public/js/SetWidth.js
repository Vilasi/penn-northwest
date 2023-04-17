function setWidth() {
  for (let i = 1; i <= 100; i++) {
    const elements = document.getElementsByClassName(`w-${i}`);

    for (const element of elements) {
      element.style.width = `${i}%`;
    }
  }
}

setWidth();
