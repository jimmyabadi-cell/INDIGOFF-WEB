/** Popup del newsletter (se muestra una vez; ver el efecto en Main). */
export function newsletterVals(self, t, keys) {
  var v = {};
  var st = self.state;
  keys.newsletter = function (e) {
    if (e.key === "Escape" && st.nlOpen) {
      try {
        window.localStorage.setItem("indigoff_nl", "closed");
      } catch (x) {}
      self.setState({ nlOpen: false });
    }
  };
  var nlMark = function (val) {
    try {
      window.localStorage.setItem("indigoff_nl", val);
    } catch (e) {}
  };
  v.nlOn = !!st.nlOpen;
  v.nlDone = !!st.nlDone;
  v.nlForm = !st.nlDone;
  v.nlEmail = st.nlEmail || "";
  v.nlErr = !!st.nlErr;
  v.nlInput = function (e) {
    self.setState({ nlEmail: e.target.value, nlErr: false });
  };
  v.nlClose = function () {
    if (!st.nlDone) nlMark("closed");
    self.setState({ nlOpen: false });
  };
  v.nlLoading = !!st.nlLoading;
  v.nlSubmit = function () {
    var em = (st.nlEmail || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) {
      self.setState({ nlErr: true });
      return;
    }
    self.setState({ nlLoading: true, nlErr: false });
    // Solo se confirma si el servidor aceptó la suscripción; si falla, el popup sigue abierto con el error.
    var fail = function () {
      self.setState({ nlErr: "failed", nlLoading: false });
    };
    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: em }),
    })
      .then(function (r) {
        if (r.ok) {
          nlMark("subscribed");
          self.setState({ nlDone: true, nlLoading: false });
        } else if (r.status === 400) {
          self.setState({ nlErr: true, nlLoading: false });
        } else fail();
      })
      .catch(fail);
  };
  v.nlTitle = t("home.newsletter.title");
  v.nlText = t("home.newsletter.text");
  v.nlEmailLbl = t("home.newsletter.email");
  v.nlCta = t("home.newsletter.subscribe");
  v.nlNo = t("home.newsletter.noThanks");
  v.nlCloseLbl = t("common.menu.close");
  v.nlErrText = t(st.nlErr === "failed" ? "home.newsletter.failed" : "home.newsletter.invalid");
  v.nlThanks = t("home.newsletter.thanks");
  v.nlThanksText = t("home.newsletter.thanksText");
  v.nlContinue = t("home.newsletter.continue");
  return v;
}
