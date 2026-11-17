/**
 * Contact form handler for the "free sample" request form.
 *
 * The form is processed by Netlify Forms (see data-netlify on the <form>).
 * This script sends it in the background so the visitor stays on the page,
 * then shows the confirmation message. Without JavaScript the form still
 * works: the browser posts it normally and Netlify redirects to "/?sent=1".
 */
(function () {
  "use strict";

  var CONTACT_EMAIL = "centervillewebco@gmail.com";
  var SUBMIT_LABEL = "Request my free sample";

  var form = document.getElementById("sample-form");
  if (!form) return;

  var fields = document.getElementById("sample-form-fields");
  var done = document.getElementById("sample-form-done");
  var button = form.querySelector('button[type="submit"]');
  var errorBox = document.getElementById("sample-form-error");

  function showConfirmation() {
    fields.hidden = true;
    done.hidden = false;
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function setSending(isSending) {
    button.disabled = isSending;
    button.textContent = isSending ? "Sending..." : SUBMIT_LABEL;
  }

  // Visitors without JavaScript are redirected back with ?sent=1.
  if (new URLSearchParams(window.location.search).has("sent")) {
    showConfirmation();
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    errorBox.hidden = true;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSending(true);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Form request failed: " + response.status);
        showConfirmation();
      })
      .catch(function () {
        setSending(false);
        showError("That didn't send. Please email us at " + CONTACT_EMAIL + " instead.");
      });
  });
})();
