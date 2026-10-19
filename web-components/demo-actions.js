// This function is also embedded in downloaded examples: keep it self-contained.
export function bindDemoActions(root) {
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
}
