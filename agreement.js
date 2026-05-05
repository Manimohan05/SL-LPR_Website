(function () {
  "use strict";

  const continueButton = document.querySelector(".agreement-continue");
  if (!continueButton) {
    return;
  }

  continueButton.addEventListener("click", function () {
    const now = Date.now().toString();
    localStorage.setItem("sllprAgreementAccepted", "true");
    localStorage.setItem("sllprAgreementAcceptedAt", now);
  });
})();
