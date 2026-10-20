// This function is also embedded in downloaded examples: keep it self-contained.
export function bindDemoActions(root) {
  const toggles = [...root.querySelectorAll("sipplay-user-page-toggle,sipplay-plus-selection-toggle,sipplay-home-settle-toggle,sipplay-liquid-rise-toggle,sipplay-chat-bubble-toggle,sipplay-preview-tabs,sipplay-white-selection-toggle,sipplay-selection-toggle,sipplay-layer-stack-toggle,sipplay-profile-rise-toggle,sipplay-wrench-turn-toggle,sipplay-pin-toggle,sipplay-pin-reveal,sipplay-voice-wave")];
  const primaryToggle = toggles[0];
  for (const toggle of toggles.slice(1)) {
    for (const attribute of ["duration", "bounce", "strength", "flow-duration"]) {
      if (primaryToggle.hasAttribute(attribute)) toggle.setAttribute(attribute, primaryToggle.getAttribute(attribute));
    }
    // This example starts on connection: replay after inheriting edited parameters.
    if (["sipplay-pin-reveal", "sipplay-voice-wave", "sipplay-liquid-rise-toggle"].includes(toggle.localName) && toggle.active) toggle.apply(toggle.reducedMotion.matches);
  }
  const onSelectionChange = (event) => {
    if (!toggles.includes(event.target)) return;
    for (const toggle of toggles) if (toggle !== event.target) toggle.active = event.detail.active;
    const status = root.querySelector("[data-selection-status]");
    if (status) status.textContent = event.detail.active ? (status.dataset.activeText || "已选中") : (status.dataset.inactiveText || "未选中");
  };
  root.addEventListener("motion-change", onSelectionChange);
  const bells = [...root.querySelectorAll("sipplay-bell-ring-toggle")];
  for (const bell of bells.slice(1)) {
    for (const attribute of ["duration", "click-duration", "strength"]) {
      if (bells[0].hasAttribute(attribute)) bell.setAttribute(attribute, bells[0].getAttribute(attribute));
    }
  }
  const onBellAction = event => {
    if (!bells.includes(event.target)) return;
    for (const bell of bells) if (bell !== event.target) bell.perform(event.detail.action, false);
  };
  const onNotificationRequest = event => {
    if (!bells.includes(event.target)) return;
    const status = root.querySelector("[data-bell-status]");
    if (status) status.textContent = "已发出通知触发事件";
  };
  root.addEventListener("motion-action", onBellAction);
  root.addEventListener("notification-request", onNotificationRequest);
  const clocks = [...root.querySelectorAll("sipplay-history-clock")];
  for (const clock of clocks.slice(1)) {
    for (const attribute of ["duration", "bounce"]) {
      if (clocks[0].hasAttribute(attribute)) clock.setAttribute(attribute, clocks[0].getAttribute(attribute));
    }
  }
  const onHistoryReplay = event => {
    if (!clocks.includes(event.target)) return;
    for (const clock of clocks) if (clock !== event.target) clock.replay(false);
    const status = root.querySelector("[data-history-status]");
    if (status) status.textContent = event.target.reducedMotion.matches ? "已收稳" : "播放中";
  };
  const onHistoryFinish = event => {
    if (!clocks.includes(event.target)) return;
    const status = root.querySelector("[data-history-status]");
    if (status) status.textContent = "已收稳";
  };
  root.addEventListener("motion-replay", onHistoryReplay);
  root.addEventListener("motion-finish", onHistoryFinish);
  const warnings = [...root.querySelectorAll("sipplay-warning-nudge")];
  for (const warning of warnings.slice(1)) {
    for (const attribute of ["duration", "strength"]) {
      if (warnings[0].hasAttribute(attribute)) warning.setAttribute(attribute, warnings[0].getAttribute(attribute));
    }
  }
  const onWarningReplay = event => {
    if (!warnings.includes(event.target)) return;
    for (const warning of warnings) if (warning !== event.target) warning.replay(false);
    const status = root.querySelector("[data-warning-status]");
    if (status) status.textContent = event.target.reducedMotion.matches ? "已收稳" : "提醒中";
  };
  const onWarningFinish = event => {
    if (!warnings.includes(event.target)) return;
    const status = root.querySelector("[data-warning-status]");
    if (status) status.textContent = "已收稳";
  };
  root.addEventListener("motion-replay", onWarningReplay);
  root.addEventListener("motion-finish", onWarningFinish);
  const onBottomNavChange = event => {
    if (event.target.localName !== "sipplay-bottom-bar") return;
    const status = root.querySelector("[data-bottom-bar-status]");
    if (status) status.textContent = `当前：${event.detail.label}`;
  };
  root.addEventListener("nav-change", onBottomNavChange);
  const countdown = root.querySelector("motion-countdown");
  if (countdown) countdown.setAttribute("to", new Date(Date.now() + 185000).toISOString());
  root.onclick = (event) => {
    const action = event.target.closest("[data-demo-action]")?.dataset.demoAction;
    if (action === "pin-replay") {
      for (const toggle of toggles) {
        if (toggle.active) toggle.apply(toggle.reducedMotion.matches);
        else toggle.active = true;
      }
      const status = root.querySelector("[data-selection-status]");
      if (status) status.textContent = status.dataset.activeText || "已选中";
    }
    if (action === "open-dialog") root.querySelector("motion-dialog").show();
    if (action === "close-dialog") root.querySelector("motion-dialog").close();
    if (action === "theme-icon") {
      const icon = root.querySelector("motion-theme-icon");
      icon.setAttribute("mode", icon.getAttribute("mode") === "light" ? "dark" : "light");
    }
    const charts = { chart: ["motion-chart", 5], pie: ["motion-pie", 3], sparkline: ["motion-sparkline", 8] };
    if (charts[action]) {
      const [tag, length] = charts[action];
      root.querySelector(tag).setAttribute("values", Array.from({ length }, () => 15 + Math.floor(Math.random() * 75)).join(","));
    }
  };
  return () => {
    root.removeEventListener("nav-change", onBottomNavChange);
    root.removeEventListener("motion-change", onSelectionChange);
    root.removeEventListener("motion-replay", onHistoryReplay);
    root.removeEventListener("motion-finish", onHistoryFinish);
    root.removeEventListener("motion-replay", onWarningReplay);
    root.removeEventListener("motion-finish", onWarningFinish);
    root.removeEventListener("motion-action", onBellAction);
    root.removeEventListener("notification-request", onNotificationRequest);
  };
}
