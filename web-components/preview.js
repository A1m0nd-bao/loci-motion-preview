import { webMotions, exampleMarkup, normalizeValues } from "./catalog.js?v=20261019-profile-pop";
import { demoCSS } from "./demo-styles.js?v=20261019-profile-pop";
import { bindDemoActions } from "./demo-actions.js?v=20261019-profile-pop";
import { defineSelectionToggle, selectionDemoCSS } from "./selection-toggle.js?v=20261019-profile-pop";
import { defineLayerStackToggle, layerStackDemoCSS } from "./layer-stack-toggle.js?v=20261019-profile-pop";
import { defineProfileRiseToggle, profileRiseDemoCSS } from "./profile-rise-toggle.js?v=20261019-profile-pop";

const params = new URLSearchParams(location.search);
const entry = webMotions.find((item) => item.id === params.get("id"));
const root = document.querySelector("#demo");
const style = document.createElement("style");
style.textContent = demoCSS + selectionDemoCSS + layerStackDemoCSS + profileRiseDemoCSS;
document.head.append(style);
let runtime;
let values = {};
let isPaused = false;
let cleanupDemo;
const customElementsInDemo = () => [...root.querySelectorAll("sipplay-selection-toggle,sipplay-layer-stack-toggle,sipplay-profile-rise-toggle")];

function notify(status, message = "") {
  parent.postMessage({ type: "sipplay-web-preview", id: entry?.id, status, message }, location.origin);
}

// Card frames do not receive pointer input: a click opens the full interactive
// example. Demonstrate pointer primitives when the parent card is hovered.
function compactPointerPreview(active) {
  if (!params.has("compact")) return;
  const element = root.querySelector("[data-motion]");
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const point = { clientX: rect.left + rect.width * 0.8, clientY: rect.top + rect.height * 0.25 };
  if (entry.custom && element.active !== active) element.toggle();
  if (entry.id === "motion-hover" || entry.id === "motion-tilt") {
    element.dispatchEvent(new MouseEvent(active ? "mouseenter" : "mouseleave", point));
  }
  if (entry.id === "motion-magnetic" || entry.id === "motion-tilt") {
    element.dispatchEvent(new MouseEvent(active ? "mousemove" : "mouseleave", point));
  }
  if (entry.id === "motion-press") {
    element.dispatchEvent(new PointerEvent(active ? "pointerdown" : "pointerup", { ...point, pointerType: "mouse", button: 0 }));
  }
}

async function render() {
  cleanupDemo?.();
  runtime?.cancelAll(root);
  root.replaceChildren();
  document.body.classList.toggle("compact", params.has("compact"));
  document.body.classList.toggle("scroll-demo", entry.category === "滚动动效");
  document.title = `${entry.name} · ${entry.id}`;
  // All markup comes from the local curated catalog, never query-string HTML.
  root.innerHTML = exampleMarkup(entry, values);
  cleanupDemo = bindDemoActions(root);
  await Promise.all([...root.querySelectorAll("[data-motion]")].map((el) => el.updateComplete));
  await new Promise(requestAnimationFrame);
  if (isPaused) {
    root.querySelectorAll("[data-motion]").forEach((el) => { if (el.localName !== "motion-countdown") el.finish?.(); });
    runtime.pauseAll(root);
    customElementsInDemo().forEach((el) => el.finish());
  }
  notify("ready");
}

window.addEventListener("message", async (event) => {
  if (event.source !== parent || event.origin !== location.origin || event.data?.type !== "sipplay-web-command" || !runtime) return;
  const { command } = event.data;
  if (command === "configure") {
    values = normalizeValues(entry, event.data.values);
    await render();
  }
  if (command === "replay") { isPaused = false; await render(); }
  if (command === "pause") { isPaused = true; compactPointerPreview(false); runtime.pauseAll(root); customElementsInDemo().forEach((el) => el.pause()); }
  if (command === "play") {
    isPaused = false;
    runtime.resumeAll(root);
    customElementsInDemo().forEach((el) => el.play());
    root.querySelectorAll("[data-motion]").forEach((el) => { if (el.playState === "finished" || el.playState === "idle") el.play?.(); });
    compactPointerPreview(true);
  }
  if (command === "poster") {
    isPaused = true;
    compactPointerPreview(false);
    root.querySelectorAll("[data-motion]").forEach((el) => { if (el.localName !== "motion-countdown") el.finish?.(); });
    runtime.pauseAll(root);
    customElementsInDemo().forEach((el) => el.finish());
  }
  if (command === "background" && /^#[0-9a-f]{6}$/i.test(event.data.color)) {
    document.documentElement.style.setProperty("--demo-bg", event.data.color);
  }
});

document.addEventListener("visibilitychange", () => { if (document.hidden) { runtime?.pauseAll(root); customElementsInDemo().forEach((el) => el.pause()); } });

try {
  if (!entry) throw new Error("未找到此组件，请从动效库重新选择。");
  runtime = await import("./vendor/motion-components.js?v=20261019-profile-pop");
  defineSelectionToggle(runtime.animate);
  defineLayerStackToggle(runtime.animate);
  defineProfileRiseToggle(runtime.animate);
  await render();
} catch (error) {
  root.className = "demo-error";
  root.textContent = "组件加载失败，请刷新重试。";
  notify("error", error.message);
}
