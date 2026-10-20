// This function is also embedded in downloaded examples: keep it self-contained.
export function bindDemoActions(root) {
  const toggles = [...root.querySelectorAll("sipplay-selection-toggle,sipplay-layer-stack-toggle,sipplay-profile-rise-toggle,sipplay-wrench-turn-toggle,sipplay-pin-toggle,sipplay-pin-reveal,sipplay-voice-wave,sipplay-bell-ring-toggle")];
  const primaryToggle = toggles[0];
  for (const toggle of toggles.slice(1)) {
    for (const attribute of ["duration", "bounce", "strength"]) {
      if (primaryToggle.hasAttribute(attribute)) toggle.setAttribute(attribute, primaryToggle.getAttribute(attribute));
    }
    // This example starts on connection: replay after inheriting edited parameters.
    if (["sipplay-pin-reveal", "sipplay-voice-wave"].includes(toggle.localName) && toggle.active) toggle.apply(toggle.reducedMotion.matches);
  }
  const onSelectionChange = (event) => {
    if (!toggles.includes(event.target)) return;
    for (const toggle of toggles) if (toggle !== event.target) toggle.active = event.detail.active;
    const status = root.querySelector("[data-selection-status]");
    if (status) status.textContent = event.detail.active ? (status.dataset.activeText || "已选中") : (status.dataset.inactiveText || "未选中");
  };
  root.addEventListener("motion-change", onSelectionChange);
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
  return () => root.removeEventListener("motion-change", onSelectionChange);
}
