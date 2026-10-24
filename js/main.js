(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) closeNav();
  });

  // Portfolio filters
  var filters = document.querySelectorAll(".filter");
  var items = document.querySelectorAll(".gallery-item");

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.dataset.filter;
      filters.forEach(function (b) {
        var active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      items.forEach(function (item) {
        item.hidden = category !== "all" && item.dataset.category !== category;
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById("lightbox");
  var lightboxImage = lightbox.querySelector(".lightbox-image");
  var current = 0;
  var lastFocus = null;

  function visibleImages() {
    return Array.prototype.filter
      .call(items, function (item) { return !item.hidden; })
      .map(function (item) { return item.querySelector("img"); });
  }

  function show(index) {
    var images = visibleImages();
    current = (index + images.length) % images.length;
    lightboxImage.src = images[current].src;
    lightboxImage.alt = images[current].alt;
  }

  function openLightbox(img) {
    lastFocus = document.activeElement;
    show(visibleImages().indexOf(img));
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll(".gallery-open").forEach(function (button) {
    button.addEventListener("click", function () {
      openLightbox(button.querySelector("img"));
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { show(current - 1); });
  lightbox.querySelector(".lightbox-next").addEventListener("click", function () { show(current + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) {
      if (e.key === "Escape") closeNav();
      return;
    }
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "Tab") {
      // Keep keyboard focus inside the lightbox
      var buttons = lightbox.querySelectorAll("button");
      var first = buttons[0];
      var last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Contact form
  // Without a backend, the form opens the visitor's email app with the message
  // filled in. To receive messages directly instead, see the README.
  var form = document.getElementById("contact-form");
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
      status.textContent = "Please fill in your name, a valid email and a short message.";
      status.className = "form-status is-error";
      invalid.focus();
      return;
    }

    var data = new FormData(form);
    var subject = "Photo session inquiry: " + data.get("type");
    var body = [
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Phone: " + (data.get("phone") || "-"),
      "Session: " + data.get("type"),
      "Preferred date: " + (data.get("date") || "-"),
      "",
      data.get("message")
    ].join("\n");

    window.location.href = "mailto:" + form.dataset.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    status.textContent = "Thank you! Your email app should open with your message ready to send.";
    status.className = "form-status is-success";
  });
})();
