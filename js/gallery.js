// Builds photo grids from data/portfolio.js.
//   <ul class="sheet" data-gallery="featured">  the home page highlights
//   <ul class="sheet" data-gallery="all">       the Work page, with category buttons
(function () {
  "use strict";

  var LABELS = { events: "Events", portraits: "Portraits", family: "Family", milestones: "Milestones" };
  var all = window.PORTFOLIO || [];

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  // Arrange photos into full rows: a wide print beside a tall one, or three
  // tall prints. Leftovers share a row in halves. Returns [{photo, span}].
  function layout(photos) {
    var wide = photos.filter(function (p) { return p.shape === "wide"; });
    var tall = photos.filter(function (p) { return p.shape !== "wide"; });
    var out = [];
    var lastMixed = false;
    var flip = false;

    function add(photo, span) { out.push({ photo: photo, span: span }); }

    while (wide.length || tall.length) {
      if (tall.length >= 3 && (lastMixed || !wide.length)) {
        add(tall.shift(), 4); add(tall.shift(), 4); add(tall.shift(), 4);
        lastMixed = false;
      } else if (wide.length && tall.length) {
        if (flip) { add(tall.shift(), 4); add(wide.shift(), 8); }
        else { add(wide.shift(), 8); add(tall.shift(), 4); }
        flip = !flip;
        lastMixed = true;
      } else if (wide.length >= 2) {
        add(wide.shift(), 6); add(wide.shift(), 6);
      } else if (wide.length) {
        add(wide.shift(), 12);
      } else {
        while (tall.length) add(tall.shift(), 6);
      }
    }
    return out;
  }

  function render(sheet, photos) {
    var cells = layout(photos);
    var ordered = cells.map(function (c) { return c.photo; });
    sheet.innerHTML = "";

    cells.forEach(function (cell, i) {
      var photo = cell.photo;
      var li = document.createElement("li");
      li.className = "frame-item span-" + cell.span + (photo.shape === "wide" ? " is-wide" : " is-tall");

      var button = document.createElement("button");
      button.type = "button";
      button.className = "frame-open";
      button.setAttribute("aria-label", "View larger: " + photo.alt);
      button.addEventListener("click", function () { window.Cre8tiveViewer.open(ordered, i); });

      var img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt;
      img.loading = "lazy";
      button.appendChild(img);

      var cap = document.createElement("p");
      cap.className = "caption";
      cap.innerHTML = '<span class="frame">' + pad(i + 1) + "</span> ";
      cap.appendChild(document.createTextNode(photo.caption || LABELS[photo.category]));

      li.appendChild(button);
      li.appendChild(cap);
      sheet.appendChild(li);
    });
  }

  document.querySelectorAll("[data-gallery]").forEach(function (sheet) {
    if (sheet.dataset.gallery === "featured") {
      render(sheet, all.filter(function (p) { return p.featured; }));
      return;
    }

    // Work page: category buttons filter the grid.
    var tabs = document.querySelectorAll("[data-tab]");
    var empty = document.querySelector(".sheet-empty");

    function show(key) {
      var photos = key === "all" ? all : all.filter(function (p) { return p.category === key; });
      tabs.forEach(function (tab) {
        tab.setAttribute("aria-pressed", String(tab.dataset.tab === key));
      });
      render(sheet, photos);
      if (empty) empty.hidden = photos.length > 0;
    }

    tabs.forEach(function (tab) {
      var key = tab.dataset.tab;
      var n = key === "all" ? all.length : all.filter(function (p) { return p.category === key; }).length;
      tab.querySelector(".count").textContent = n;
      tab.addEventListener("click", function () { show(key); });
    });

    show("all");
  });
})();
