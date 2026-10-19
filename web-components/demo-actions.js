// This function is also embedded in downloaded examples: keep it self-contained.
export function bindDemoActions(root) {
  const toggles = [...root.querySelectorAll("sipplay-selection-toggle")];
  const primaryToggle = toggles[0];
  for (const toggle of toggles.slice(1)) {
    for (const attribute of ["duration", "bounce"]) toggle.setAttribute(attribute, primaryToggle.getAttribute(attribute));
  }
  const onSelectionChange = (event) => {
    if (event.target.localName !== "sipplay-selection-toggle") return;
    for (const toggle of toggles) if (toggle !== event.target) toggle.active = event.detail.active;
    const status = root.querySelector("[data-selection-status]");
    if (status) status.textContent = event.detail.active ? "已选中" : "未选中";
  };
  root.addEventListener("motion-change", onSelectionChange);
  const countdown = root.querySelector("motion-countdown");
  if (countdown) countdown.setAttribute("to", new Date(Date.now() + 185000).toISOString());
  root.onclick = (event) => {
    const action = event.target.closest("[data-demo-action]")?.dataset.demoAction;
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
