import { motionMotions, normalizeMotionValues } from "./catalog.js?v=20261019-motion";
import { motionDemoMarkup, motionDemoCSS, mountMotionDemo } from "./demos.js?v=20261019-motion";
const params = new URLSearchParams(location.search);
const entry = motionMotions.find(item => item.id === params.get("id"));
const root = document.querySelector("#demo");
const style = document.createElement("style");
style.textContent = motionDemoCSS;
document.head.append(style);
let controller;
let values = {};
let paused = false;
const notify = (status, message = "") => parent.postMessage({ type: "sipplay-web-preview", id: entry?.id, status, message }, location.origin);
function render() {
  controller?.destroy();
  document.title = `${entry.name} · Motion`;
  document.body.classList.toggle("compact", params.has("compact"));
  root.innerHTML = motionDemoMarkup[entry.id];
  controller = mountMotionDemo(root, entry.id, normalizeMotionValues(entry, values), params.has("compact"));
  if (paused) controller.finish();
  notify("ready");
}
window.addEventListener("message", event => {
  if (event.source !== parent || event.origin !== location.origin || event.data?.type !== "sipplay-web-command" || !controller) return;
  const { command } = event.data;
  if (command === "configure") { values = event.data.values; render(); }
  if (command === "replay") { paused = false; render(); }
  if (command === "play") { paused = false; controller.play(); }
  if (command === "pause") { paused = true; controller.pause(); }
  if (command === "poster") { paused = true; controller.finish(); }
  if (command === "background" && /^#[0-9a-f]{6}$/i.test(event.data.color)) document.documentElement.style.setProperty("--demo-bg", event.data.color);
});
window.addEventListener("pagehide", () => controller?.destroy());
try { if (!entry) throw new Error("未找到 Motion 示例"); render(); }
catch (error) { root.textContent = "示例加载失败，请刷新重试。"; notify("error", error.message); }
