(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var statusEl = document.getElementById("formStatus");

  var validators = {
    name: function (v) { return v.trim().length > 1; },
    phone: function (v) { return /^[6-9]\d{9}$/.test(v.trim().replace(/[\s-]/g, "")); },
    location: function (v) { return v.trim().length > 3; },
    service: function (v) { return v.trim().length > 0; },
    datetime: function (v) { return v.trim().length > 1; }
  };

  function fieldWrap(input) {
    return input.closest(".form-field");
  }

  function showError(input) {
    var wrap = fieldWrap(input);
    if (wrap) wrap.classList.add("has-error");
  }

  function clearError(input) {
    var wrap = fieldWrap(input);
    if (wrap) wrap.classList.remove("has-error");
  }

  function validateField(input) {
    var rule = validators[input.name];
    if (!rule) return true;
    var ok = rule(input.value);
    if (ok) clearError(input);
    else showError(input);
    return ok;
  }

  Object.keys(validators).forEach(function (name) {
    var input = form.elements[name];
    if (!input) return;
    input.addEventListener("blur", function () { validateField(input); });
    input.addEventListener("input", function () {
      if (fieldWrap(input).classList.contains("has-error")) validateField(input);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var allValid = true;
    Object.keys(validators).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      if (!validateField(input)) allValid = false;
    });

    statusEl.classList.remove("is-success", "is-error");

    if (!allValid) {
      statusEl.textContent = "Please fix the highlighted fields and try again.";
      statusEl.classList.add("is-error");
      var firstError = form.querySelector(".form-field.has-error input, .form-field.has-error select");
      if (firstError) firstError.focus();
      return;
    }

    var payload = {
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      location: form.elements.location.value.trim(),
      service: form.elements.service.value,
      datetime: form.elements.datetime.value.trim(),
      message: form.elements.message.value.trim()
    };

    // Booking requests are delivered via a pre-filled WhatsApp message to
    // Aquashift's number, rather than a server backend. This needs no
    // account/API key and matches the WhatsApp-first booking flow used
    // everywhere else on the site.
    var lines = [
      "Hi Aquashift, I'd like to book a service.",
      "Name: " + payload.name,
      "Phone: " + payload.phone,
      "Location: " + payload.location,
      "Service: " + payload.service,
      "Preferred date/time: " + payload.datetime
    ];
    if (payload.message) lines.push("Message: " + payload.message);

    var waUrl = "https://wa.me/919995566866?text=" + encodeURIComponent(lines.join("\n"));
    window.open(waUrl, "_blank", "noopener");

    statusEl.textContent =
      "WhatsApp is opening with your booking details filled in — just hit send there to reach Aquashift.";
    statusEl.classList.add("is-success");
    form.reset();
  });
})();
