// Shared by every page: footer year, small-screen menu, photo viewer.
(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Small-screen menu
  var menuButton = document.querySelector(".menu-button");
  var nav = document.getElementById("site-nav");

  function setMenu(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "Close" : "Menu";
    nav.classList.toggle("is-open", open);
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  // Photo viewer. Pages call Cre8tiveViewer.open(photos, index).
  var viewer = document.getElementById("viewer");
  if (!viewer) return;

  var image = viewer.querySelector(".viewer-image");
  var caption = viewer.querySelector(".viewer-caption");
  var count = viewer.querySelector(".viewer-count");
  var closeButton = viewer.querySelector(".viewer-close");
  var photos = [];
  var current = 0;
  var lastFocus = null;
  var touchX = null;

  function show(index) {
    current = (index + photos.length) % photos.length;
    var photo = photos[current];
    image.src = photo.src;
    image.alt = photo.alt;
    caption.textContent = photo.caption || "";
    count.textContent = (current + 1) + " / " + photos.length;
  }

  function open(list, index) {
    photos = list;
    lastFocus = document.activeElement;
    show(index);
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function close() {
    viewer.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  viewer.querySelector(".viewer-prev").addEventListener("click", function () { show(current - 1); });
  viewer.querySelector(".viewer-next").addEventListener("click", function () { show(current + 1); });
  closeButton.addEventListener("click", close);

  // Swipe left and right on phones
  image.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  image.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  document.addEventListener("keydown", function (e) {
    if (viewer.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "Tab") {
      // Keep keyboard focus inside the viewer
      var buttons = viewer.querySelectorAll("button");
      var first = buttons[0];
      var last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  window.Cre8tiveViewer = { open: open };
})();
