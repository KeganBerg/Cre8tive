// Inquiry form on book.html.
(function () {
  "use strict";

  var config = window.CRE8TIVE || {};
  var form = document.getElementById("inquiry");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var sendButton = form.querySelector(".send");
  var details = form.querySelectorAll("[data-details]");
  var phone = form.querySelector("#phone");
  var phoneNote = form.querySelector(".phone-note");

  // Show only the questions for the chosen session type. Hidden sets are
  // disabled so their answers are not sent.
  function showDetails() {
    var chosen = form.querySelector("input[name=session]:checked");
    var type = chosen ? chosen.value : "";
    details.forEach(function (set) {
      var on = set.dataset.details === type;
      set.hidden = !on;
      set.disabled = !on;
    });
  }

  // A phone number is required when they'd rather be called or texted.
  function updatePhone() {
    var how = form.querySelector("input[name=contact_by]:checked");
    var needed = how && how.value !== "Email";
    phone.required = needed;
    phoneNote.textContent = needed ? "" : "(optional)";
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "session") showDetails();
    if (e.target.name === "contact_by") updatePhone();
    if (e.target.getAttribute("aria-invalid") === "true") e.target.removeAttribute("aria-invalid");
  });

  // book.html?type=family preselects a session (used by the rates on the home page)
  var preset = new URLSearchParams(location.search).get("type");
  var presetInput = preset && form.querySelector("input[name=session][value='" + preset.replace(/[^a-z]/g, "") + "']");
  if (presetInput) presetInput.checked = true;
  showDetails();
  updatePhone();

  function validate() {
    var problems = [];
    var first = null;

    form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });

    function flag(el, message) {
      el.setAttribute("aria-invalid", "true");
      problems.push(message);
      if (!first) first = el;
    }

    if (!form.querySelector("input[name=session]:checked")) {
      flag(form.querySelector("input[name=session]"), "what we're photographing");
    }
    var name = form.querySelector("#name");
    if (!name.value.trim()) flag(name, "your name");
    var email = form.querySelector("#email");
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) flag(email, "a valid email");
    if (phone.required && phone.value.replace(/\D/g, "").length < 10) flag(phone, "a phone number we can reach you on");

    return { ok: problems.length === 0, first: first, problems: problems };
  }

  function summary(data) {
    var lines = [];
    data.forEach(function (value, key) {
      if (key === "_gotcha" || !String(value).trim()) return;
      lines.push(key.replace(/_/g, " ").replace(/^./, function (c) { return c.toUpperCase(); }) + ": " + value);
    });
    return lines.join("\n");
  }

  function done(viaEmailApp) {
    var thanks = document.getElementById("thanks");
    var name = form.querySelector("#name").value.trim().split(" ")[0];
    thanks.querySelector(".thanks-name").textContent = name ? ", " + name : "";
    thanks.querySelector(".thanks-email-app").hidden = !viaEmailApp;
    form.hidden = true;
    thanks.hidden = false;
    thanks.focus({ preventScroll: true });
    window.scrollTo({ top: thanks.getBoundingClientRect().top + window.scrollY - 48 });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Bots fill in the hidden field; people never see it.
    if (form.querySelector("[name=_gotcha]").value) return;

    var check = validate();
    if (!check.ok) {
      status.textContent = "Please add " + check.problems.join(", ") + ".";
      status.className = "form-status is-error";
      check.first.focus();
      return;
    }

    var data = new FormData(form);
    var chosen = data.get("session");

    if (!config.formEndpoint) {
      window.location.href = "mailto:" + config.email +
        "?subject=" + encodeURIComponent("Photo inquiry: " + chosen) +
        "&body=" + encodeURIComponent(summary(data));
      done(true);
      return;
    }

    sendButton.disabled = true;
    status.className = "form-status";
    status.textContent = "Sending…";
    data.append("_subject", "New inquiry: " + chosen);

    fetch(config.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        done(false);
      })
      .catch(function () {
        sendButton.disabled = false;
        status.className = "form-status is-error";
        status.innerHTML = "";
        status.appendChild(document.createTextNode("Sorry, that didn't send. Please try again, or email us at "));
        var link = document.createElement("a");
        link.href = "mailto:" + config.email;
        link.textContent = config.email;
        status.appendChild(link);
        status.appendChild(document.createTextNode("."));
      });
  });
})();
