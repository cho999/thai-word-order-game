(function () {
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
    window.dispatchEvent(new CustomEvent("nari-analytics", { detail: { eventName, params: detail } }));
  }

  window.NariAnalytics = {
    events: [...allowedEvents],
    track
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body?.dataset.game) {
      track("game_open");
    }
  });
})();
