(function () {
  /*
   * Google Analytics 4 setup
   * Paste the real GA4 measurement ID below when it is available.
   * Leave this empty until then. Do not add a fake measurement ID.
   *
   * Example format only: G-XXXXXXXXXX
   */
  const GA4_MEASUREMENT_ID = "";

  const allowedEvents = new Set([
    "game_open",
    "game_start",
    "game_complete",
    "game_restart",
    "answer_correct",
    "answer_incorrect",
    "review_start"
  ]);

  function cleanParams(params) {
    const base = {
      game: document.body?.dataset.game || document.title,
      mode: document.body?.dataset.mode || "default",
      level: document.body?.dataset.level || "default"
    };
    return { ...base, ...(params || {}) };
  }

  function track(eventName, params) {
    if (!allowedEvents.has(eventName)) return;
    const detail = cleanParams(params);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...detail });
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, detail);
    }
    window.dispatchEvent(new CustomEvent("nari-analytics", { detail: { eventName, params: detail } }));
  }

  window.NariAnalytics = {
    events: [...allowedEvents],
    track
  };

  if (GA4_MEASUREMENT_ID) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body?.dataset.game) {
      track("game_open");
    }
  });
})();
