

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const menu = document.getElementById("side-menu");
  const toggle = document.getElementById("menu-toggle");
  const close = document.getElementById("menu-close");
  const overlay = document.getElementById("menu-overlay");

  if (!header || !menu || !toggle || !close || !overlay) return;

  const dropdowns = menu.querySelectorAll("details");
  let previouslyFocused = null;

  function openMenu() {
    previouslyFocused = document.activeElement;

    menu.classList.add("active");
    overlay.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");

    document.body.style.overflow = "hidden";
    close.focus();
  }

  function closeMenu(restoreFocus = false) {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");

    dropdowns.forEach(function (dropdown) {
      dropdown.open = false;
    });

    document.body.style.overflow = "";

    if (restoreFocus) {
      toggle.focus();
    } else if (previouslyFocused && previouslyFocused.focus) {
      previouslyFocused.focus();
    }
  }

  toggle.addEventListener("click", function () {
    if (menu.classList.contains("active")) {
      closeMenu(true);
    } else {
      openMenu();
    }
  });

  close.addEventListener("click", function () {
    closeMenu(true);
  });

  overlay.addEventListener("click", function () {
    closeMenu(true);
  });

  // Keep only one dropdown open at a time.
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("toggle", function () {
      if (dropdown.open) {
        dropdowns.forEach(function (other) {
          if (other !== dropdown) {
            other.open = false;
          }
        });
      }
    });
  });

  // Close the menu after selecting a destination.
  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu(false);
    });
  });

  // Escape closes the menu.
  document.addEventListener("keydown", function (event) {
    if (!menu.classList.contains("active")) return;

    if (event.key === "Escape") {
      closeMenu(true);
      return;
    }

    // Basic keyboard focus containment.
    if (event.key === "Tab") {
      const focusable = Array.from(
        menu.querySelectorAll(
          'a[href], button:not([disabled]), summary'
        )
      ).filter(function (element) {
        return element.getClientRects().length > 0;
      });

      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Reset mobile menu state if the page is resized.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 480 && menu.classList.contains("active")) {
      closeMenu(false);
    }
  });
});

