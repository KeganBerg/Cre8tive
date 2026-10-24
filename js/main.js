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

  menuButton.addEventListener("click", function () {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Work filters
  var sheet = document.querySelector(".sheet");
  var filters = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".frame-item");

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.dataset.filter;
      filters.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === button));
      });
      items.forEach(function (item) {
        item.hidden = category !== "all" && item.dataset.category !== category;
      });
      sheet.classList.toggle("is-filtered", category !== "all");
    });
  });

  // Photo viewer
  var viewer = document.getElementById("viewer");
  var viewerImage = viewer.querySelector(".viewer-image");
  var viewerCount = viewer.querySelector(".viewer-count");
  var closeButton = viewer.querySelector(".viewer-close");
  var current = 0;
  var lastFocus = null;

  function shown() {
    return Array.prototype.filter
      .call(items, function (item) { return !item.hidden; })
      .map(function (item) { return item.querySelector("img"); });
  }

  function show(index) {
    var images = shown();
    current = (index + images.length) % images.length;
    viewerImage.src = images[current].src;
    viewerImage.alt = images[current].alt;
    viewerCount.textContent = (current + 1) + " / " + images.length;
  }

  function openViewer(img) {
    lastFocus = document.activeElement;
    show(shown().indexOf(img));
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }

  function closeViewer() {
    viewer.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".frame-open").forEach(function (button) {
    var img = button.querySelector("img");
    button.setAttribute("aria-label", "View larger: " + img.alt);
    button.addEventListener("click", function () { openViewer(img); });
  });

  viewer.querySelector(".viewer-prev").addEventListener("click", function () { show(current - 1); });
  viewer.querySelector(".viewer-next").addEventListener("click", function () { show(current + 1); });
  closeButton.addEventListener("click", closeViewer);

  document.addEventListener("keydown", function (e) {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeViewer();
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

  // Inquiry form
  // Without a backend, the form opens the visitor's email app with the message
  // filled in. To receive messages directly instead, see the README.
  var form = document.getElementById("inquiry");
  var status = form.querySelector(".form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var invalid = null;
    form.querySelectorAll("[required]").forEach(function (field) {
      var ok = field.value.trim() !== "" && (field.type !== "email" || /^\S+@\S+\.\S+$/.test(field.value));
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok && !invalid) invalid = field;
    });

    if (invalid) {
      status.textContent = "Please add your name, a valid email and a few details.";
      status.className = "form-status is-error";
      invalid.focus();
      return;
    }

    var data = new FormData(form);
    var body = [
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Session: " + data.get("type"),
      "Date: " + (data.get("date") || "not set"),
      "",
      data.get("message")
    ].join("\n");

    window.location.href = "mailto:" + form.dataset.email +
      "?subject=" + encodeURIComponent("Photo inquiry: " + data.get("type")) +
      "&body=" + encodeURIComponent(body);

    status.textContent = "Thank you. Your email app should open with the message ready to send.";
    status.className = "form-status";
  });
})();
