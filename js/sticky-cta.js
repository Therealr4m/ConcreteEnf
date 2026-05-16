const stickyCta = document.getElementById("stickyCta");

window.addEventListener("scroll", () => {

  if (window.scrollY > 700) {
    stickyCta.classList.add("show");
  } else {
    stickyCta.classList.remove("show");
  }

});