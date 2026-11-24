// "Ask me about a date" form on book.html.
(function () {
  "use strict";

  var config = window.CRE8TIVE || {};
  var form = document.getElementById("inquiry");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var sendButton = form.querySelector(".send");
  var date = form.querySelector("#date");
  var unsure = form.querySelector("#date-unsure");
  var contact = form.querySelector("#contact");
  var occasions = form.querySelector(".occasions");

  var LABELS = { family: "Family session", event: "Event or party", portrait: "Portrait or headshot", milestone: "Milestone", other: "Something else" };

  // "Not sure yet" clears and turns off the date.
  unsure.addEventListener("change", function () {
    date.disabled = unsure.checked;
    if (unsure.checked) date.value = "";
  });

  // The keyboard on phones matches how they want to be reached.
  form.addEventListener("change", function (e) {
    if (e.target.name === "contact_by") {
      contact.type = e.target.value === "Email" ? "email" : "tel";
      contact.autocomplete = e.target.value === "Email" ? "email" : "tel";
    }
    if (e.target.name === "occasion") occasions.removeAttribute("aria-invalid");
    if (e.target.getAttribute("aria-invalid") === "true") e.target.removeAttribute("aria-invalid");
  });

  contact.type = form.querySelector("input[name=contact_by]:checked").value === "Email" ? "email" : "tel";

  // book.html?type=family picks the occasion (used by the prices on Home)
  var preset = new URLSearchParams(location.search).get("type");
  var presetInput = preset && form.querySelector("input[name=occasion][value='" + preset.replace(/[^a-z]/g, "") + "']");
  if (presetInput) presetInput.checked = true;

  function validate() {
    var problems = [];
    var first = null;
    form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });

    function flag(el, message, focusEl) {
      el.setAttribute("aria-invalid", "true");
      problems.push(message);
      if (!first) first = focusEl || el;
    }

    if (!form.querySelector("input[name=occasion]:checked")) {
      flag(occasions, "the occasion", form.querySelector("input[name=occasion]"));
    }
    var name = form.querySelector("#name");
    if (!name.value.trim()) flag(name, "your name");

    var how = form.querySelector("input[name=contact_by]:checked").value;
    var value = contact.value.trim();
    var isEmail = /^\S+@\S+\.\S+$/.test(value);
    var isPhone = value.replace(/\D/g, "").length >= 10;
    if (how === "Email" && !isEmail) flag(contact, "an email address");
    else if (how !== "Email" && !isPhone) flag(contact, "a phone number with area code");

    return { ok: problems.length === 0, first: first, problems: problems };
  }

  function summary(data) {
    var lines = [];
    data.forEach(function (value, key) {
      if (key === "_gotcha" || !String(value).trim()) return;
      if (key === "occasion") value = LABELS[value] || value;
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
    window.scrollTo({ top: thanks.getBoundingClientRect().top + window.scrollY - 110 });
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
    var occasion = LABELS[data.get("occasion")];

    // Until the Formspree link is filled in, fall back to the visitor's email app.
    var endpoint = String(config.formEndpoint || "").trim();
    if (!/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint) || /YOUR_FORM_ID/.test(endpoint)) {
      window.location.href = "mailto:" + config.email +
        "?subject=" + encodeURIComponent("Photo inquiry: " + occasion) +
        "&body=" + encodeURIComponent(summary(data));
      done(true);
      return;
    }

    sendButton.disabled = true;
    sendButton.setAttribute("aria-busy", "true");
    status.className = "form-status";
    status.textContent = "Sending\u2026";

    data.set("occasion", occasion);
    if (unsure.checked) data.set("date", "Not sure yet");
    data.delete("date_unsure");
    // Formspree uses "email" as the reply-to, so she can just press Reply.
    if (data.get("contact_by") === "Email") data.set("email", contact.value.trim());
    data.append("_subject", "New inquiry: " + occasion + " from " + form.querySelector("#name").value.trim());

    // Give up after 20 seconds so nobody waits on a spinning button.
    var controller = window.AbortController ? new AbortController() : null;
    var timer = controller && setTimeout(function () { controller.abort(); }, 20000);

    fetch(endpoint, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        status.textContent = "";
        done(false);
      })
      .catch(failed)
      .then(function () {
        if (timer) clearTimeout(timer);
        sendButton.disabled = false;
        sendButton.removeAttribute("aria-busy");
      });
  });

  // Nothing typed is lost: the form stays filled in so they can try again.
  function failed() {
    status.className = "form-status is-error";
    status.textContent = "";
    status.appendChild(document.createTextNode("Sorry, that didn\u2019t send. Your note is still here, so please try again. Or reach me directly: "));
    if (config.phone) {
      var tel = document.createElement("a");
      tel.href = "tel:+1" + config.phone.replace(/\D/g, "").slice(-10);
      tel.textContent = "call or text " + config.phone;
      status.appendChild(tel);
      status.appendChild(document.createTextNode(", or email "));
    } else {
      status.appendChild(document.createTextNode("email "));
    }
    var mail = document.createElement("a");
    mail.href = "mailto:" + config.email;
    mail.textContent = config.email;
    status.appendChild(mail);
    status.appendChild(document.createTextNode("."));
  }
})();
