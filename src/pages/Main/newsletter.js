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
  v.nlSubmit = function () {
    var em = (st.nlEmail || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em)) {
      self.setState({ nlErr: true });
      return;
    }
    nlMark("subscribed");
    self.setState({ nlDone: true, nlErr: false });
  };
  v.nlTitle = t("home.newsletter.title");
  v.nlText = t("home.newsletter.text");
  v.nlEmailLbl = t("home.newsletter.email");
  v.nlCta = t("home.newsletter.subscribe");
  v.nlNo = t("home.newsletter.noThanks");
  v.nlCloseLbl = t("common.menu.close");
  v.nlErrText = t("home.newsletter.invalid");
  v.nlThanks = t("home.newsletter.thanks");
  v.nlThanksText = t("home.newsletter.thanksText");
  v.nlContinue = t("home.newsletter.continue");
  return v;
}
