function setMaxWidth() {
  for (let i = 1; i <= 100; i++) {
    const elements = document.getElementsByClassName(`mw-${i}`);

    for (const element of elements) {
      element.style.maxWidth = `${i}%`;
    }
  }
}

setMaxWidth();
