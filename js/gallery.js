// Builds the photo rows and sections from data/portfolio.js.
//   <ul class="strip" data-row="family">                Home: one row per kind of session
//   <ul class="strip" data-row="portraits milestones">   (several kinds share a row)
//   <ul class="story" data-story="events">              My work: one section per kind
//   <span data-count="family"></span>                    how many photos of that kind
(function () {
  "use strict";

  var all = window.PORTFOLIO || [];

  function of(kinds) {
    var list = kinds.split(" ");
    return all.filter(function (p) { return list.indexOf(p.category) !== -1; });
  }

  // One tappable photo. Tapping opens the full-screen viewer on that set.
  function item(photos, i, className) {
    var photo = photos[i];
    var li = document.createElement("li");
    if (className) li.className = className;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "shot bracketed";
    button.setAttribute("aria-label", "See full screen: " + photo.alt);
    button.addEventListener("click", function () { window.Cre8tiveViewer.open(photos, i); });

    var img = document.createElement("img");
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = "lazy";
    button.appendChild(img);
    li.appendChild(button);

    if (photo.caption) {
      var cap = document.createElement("p");
      cap.className = "cap";
      cap.textContent = photo.caption;
      li.appendChild(cap);
    }
    return li;
  }

  // Takes turns between kinds, so a shared row shows some of each.
  function mixed(kinds) {
    var lists = kinds.split(" ").map(of);
    var out = [];
    for (var i = 0; out.length < all.length && lists.some(function (l) { return l[i]; }); i++) {
      lists.forEach(function (l) { if (l[i]) out.push(l[i]); });
    }
    return out;
  }

  // Home rows: up to six photos (four show on a computer, all six swipe on a phone).
  document.querySelectorAll("[data-row]").forEach(function (row) {
    var photos = mixed(row.dataset.row).slice(0, 6);
    photos.forEach(function (_, i) { row.appendChild(item(photos, i)); });
  });

  // My work sections read like an album page: one wide photo, then three, then two.
  var PATTERN = ["s-big", "", "", "", "s-half", "s-half"];
  document.querySelectorAll("[data-story]").forEach(function (section) {
    var photos = of(section.dataset.story);
    var wide = photos.findIndex(function (p) { return p.shape === "wide"; });
    if (wide > 0) photos.unshift(photos.splice(wide, 1)[0]);  // lead with a wide photo
    photos.forEach(function (_, i) { section.appendChild(item(photos, i, PATTERN[i % PATTERN.length])); });
  });

  document.querySelectorAll("[data-count]").forEach(function (el) {
    el.textContent = Math.min(of(el.dataset.count).length, el.closest(".hint") ? 6 : Infinity);
  });
})();
