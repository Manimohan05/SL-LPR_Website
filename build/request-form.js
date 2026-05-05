(function () {
  "use strict";

  const agreementCheckbox = document.getElementById("agreement");
  const submitButton = document.getElementById("submit-request");
  const warning = document.getElementById("agreement-warning");
  const requestForm = document.getElementById("access-request-form");

  if (!agreementCheckbox || !submitButton || !requestForm) {
    return;
  }

  const acceptedFlag = localStorage.getItem("sllprAgreementAccepted");
  const acceptedAtRaw = localStorage.getItem("sllprAgreementAcceptedAt");
  const acceptedAt = acceptedAtRaw ? Number(acceptedAtRaw) : 0;
  const maxAgreementAgeMs = 1000 * 60 * 60 * 24 * 30;
  const hasValidAgreement =
    acceptedFlag === "true" &&
    Number.isFinite(acceptedAt) &&
    Date.now() - acceptedAt <= maxAgreementAgeMs;

  if (!hasValidAgreement && warning) {
    warning.hidden = false;
  }

  function syncSubmitState() {
    submitButton.disabled = !agreementCheckbox.checked || !hasValidAgreement;
  }

  agreementCheckbox.addEventListener("change", syncSubmitState);

  requestForm.addEventListener("submit", function (event) {
    if (!hasValidAgreement || !agreementCheckbox.checked) {
      event.preventDefault();
      if (warning) {
        warning.hidden = false;
      }
    }
  });

  syncSubmitState();
})();
