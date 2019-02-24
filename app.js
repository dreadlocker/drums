window.onload = function () {
  // check device
  if (navigator.userAgent.indexOf('Mobile') > -1) {
    // remove text for mouse if phone is used
    document.getElementById('forMobile').textContent = '';

    const buttonsNL = document.querySelectorAll("div[data-key]");
    buttonsNL.forEach(button => {
      button.addEventListener("touchend", resizeElement);
      button.addEventListener("touchstart", playSound);
    })
  } else {
    // play sounds on keyboard key press
    window.addEventListener("keydown", e => {
      const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
      const element = document.querySelector(`div[data-key="${e.keyCode}"]`);

      if (!audio) return;

      element.id = "scale";
      audio.currentTime = 0; // restart sound on every click
      audio.play();
      setTimeout(() => (element.id = ""), 100);
    });

    /* play sonunds on mouse click
    !!! addEventListeners only on 1 element at a time */
    let mainDiv = document.getElementById("wrapper");
    // attach event listener to whole container of elements that we want to addEventListeners to
    mainDiv.addEventListener("mouseover", function (e) {
      // check if the element has attribute data-key=""
      const isValidKey = e.srcElement.dataset.key;
      if (e.target && isValidKey) {
        let domElement = e.target;
        domElement.addEventListener("mouseup", resizeElement);
        domElement.addEventListener("mouseleave", resetScale);
        domElement.addEventListener("mousedown", playSound);
      }
    });
  }

  function playSound(e) {
    e.preventDefault(); // double click won't mark the text
    this.id = "scale";
    const audio = document.querySelector(
      `audio[data-key="${this.dataset.key}"]`
    );
    audio.currentTime = 0; // restart sound on every click
    audio.play();
  }

  function resizeElement(e) {
    resetId(e, "mouseup", resizeElement);
  }

  function resetScale(e) {
    resetId(e, "mouseleave", resetScale);
  }

  function resetId(e, eventHandler, funcName) {
    return (e.target.id =
      "" && e.target.removeEventListener(eventHandler, funcName));
  }
}