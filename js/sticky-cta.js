const stickyCta = document.getElementById("stickyCta");

let hasAppeared = false;

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;

  // trigger after scrolling
  if (scrollY > 825 && !hasAppeared) {

    hasAppeared = true;

    stickyCta.classList.add("show");

    // hide again after 6 seconds
    setTimeout(() => {
      stickyCta.classList.remove("show");

      // allow it to appear again later
      setTimeout(() => {
        hasAppeared = false;
      }, 12000);

    }, 8000);
  }

});