import { defineBillingTabs, billingTabsDemoCSS } from "./billing-tabs.js?v=20261027-user-fill3";
import { defineImageSipLoading, imageSipLoadingDemoCSS } from "./image-sip-loading.js?v=20261027-user-fill3";
import { defineToolHighlight, toolHighlightDemoCSS } from "./tool-highlight.js?v=20261027-user-fill3";
import { defineBottomBar, bottomBarDemoCSS } from "./bottom-bar.js?v=20261027-user-fill3";
import { defineUserPageToggle, userPageDemoCSS } from "./user-page-toggle.js?v=20261027-user-fill3";
import { definePlusSelectionToggle, plusSelectionDemoCSS } from "./plus-selection-toggle.js?v=20261027-user-fill3";
import { defineHomeSettleToggle, homeSettleDemoCSS } from "./home-settle-toggle.js?v=20261027-user-fill3";
import { defineWarningNudge, warningNudgeDemoCSS } from "./warning-nudge.js?v=20261027-user-fill3";
import { defineLiquidRiseToggle, liquidRiseDemoCSS } from "./liquid-rise-toggle.js?v=20261027-user-fill3";
import { defineChatBubbleToggle, chatBubbleDemoCSS } from "./chat-bubble-toggle.js?v=20261027-user-fill3";
import { defineTapTab, tapTabDemoCSS } from "./tap-tab.js?v=20261027-user-fill3";
import { definePreviewTabs, previewTabsDemoCSS } from "./preview-tabs.js?v=20261027-user-fill3";
import { defineWhiteSelectionToggle, whiteSelectionDemoCSS } from "./white-selection-toggle.js?v=20261027-user-fill3";
import { defineHistoryClock, historyClockDemoCSS } from "./history-clock.js?v=20261027-user-fill3";
import { defineBellRingToggle, bellRingDemoCSS } from "./bell-ring-toggle.js?v=20261027-user-fill3";
import { defineVoiceWave, voiceWaveDemoCSS } from "./voice-wave.js?v=20261027-user-fill3";
import { definePinToggle, pinToggleDemoCSS } from "./pin-toggle.js?v=20261027-user-fill3";
import { definePinReveal, pinRevealDemoCSS } from "./pin-reveal.js?v=20261027-user-fill3";
import { webMotions, exampleMarkup, normalizeValues } from "./catalog.js?v=20261027-user-fill3";
import { demoCSS } from "./demo-styles.js?v=20261027-user-fill3";
import { bindDemoActions } from "./demo-actions.js?v=20261027-user-fill3";
import { defineSelectionToggle, selectionDemoCSS } from "./selection-toggle.js?v=20261027-user-fill3";
import { defineLayerStackToggle, layerStackDemoCSS } from "./layer-stack-toggle.js?v=20261027-user-fill3";
import { defineProfileRiseToggle, profileRiseDemoCSS } from "./profile-rise-toggle.js?v=20261027-user-fill3";
import { defineWrenchTurnToggle, wrenchTurnDemoCSS } from "./wrench-turn-toggle.js?v=20261027-user-fill3";

const params = new URLSearchParams(location.search);
const requestedId = params.get("id") === "sipplay-tool-highlight" ? "sipplay-brackets-tool" : params.get("id");
const entry = webMotions.find((item) => item.id === requestedId);
const root = document.querySelector("#demo");
const style = document.createElement("style");
style.textContent = demoCSS + billingTabsDemoCSS + imageSipLoadingDemoCSS + toolHighlightDemoCSS + bottomBarDemoCSS + userPageDemoCSS + plusSelectionDemoCSS + homeSettleDemoCSS + liquidRiseDemoCSS + warningNudgeDemoCSS + chatBubbleDemoCSS + previewTabsDemoCSS + selectionDemoCSS + whiteSelectionDemoCSS + layerStackDemoCSS + profileRiseDemoCSS + wrenchTurnDemoCSS + pinToggleDemoCSS + pinRevealDemoCSS + voiceWaveDemoCSS + bellRingDemoCSS + historyClockDemoCSS + tapTabDemoCSS;
document.head.append(style);
let runtime;
let values = {};
let isPaused = false;
let cleanupDemo;
const customElementsInDemo = () => [...root.querySelectorAll("sipplay-billing-tabs,sipplay-image-sip-loading,sipplay-brackets-tool,sipplay-image-tool,sipplay-bottom-bar,sipplay-user-page-toggle,sipplay-plus-selection-toggle,sipplay-home-settle-toggle,sipplay-liquid-rise-toggle,sipplay-chat-bubble-toggle,sipplay-preview-tabs,sipplay-white-selection-toggle,sipplay-selection-toggle,sipplay-layer-stack-toggle,sipplay-profile-rise-toggle,sipplay-wrench-turn-toggle,sipplay-pin-toggle,sipplay-pin-reveal,sipplay-voice-wave,sipplay-bell-ring-toggle,sipplay-history-clock,sipplay-tap-tab,sipplay-warning-nudge")];

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
  if (["sipplay-brackets-tool", "sipplay-image-tool"].includes(entry.id)) {
    root.querySelectorAll("sipplay-brackets-tool,sipplay-image-tool").forEach(icon => icon.preview(active));
  } else if (entry.id === "sipplay-warning-nudge") {
    element.preview(active);
  } else if (["sipplay-tap-tab", "sipplay-bottom-bar"].includes(entry.id)) {
    element.preview(active);
  } else if (entry.id === "sipplay-history-clock") {
    if (active) element.hoverIn();
    else element.hoverOut();
  } else if (entry.id === "sipplay-bell-ring-toggle") {
    if (active) element.hoverIn();
    else element.hoverOut();
  } else if (entry.id === "sipplay-pin-reveal") {
    if (active) element.apply(element.reducedMotion.matches);
  } else if (entry.id === "sipplay-billing-tabs") {
    element.select(active ? 0 : 1);
  } else if (entry.id === "sipplay-image-sip-loading") {
    if (active) element.play(); else element.pause();
  } else if (entry.custom && element.active !== active) element.toggle();
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

// Voice loops and notification feedback manage their own visibility behavior.
document.addEventListener("visibilitychange", () => { if (document.hidden) { runtime?.pauseAll(root); customElementsInDemo().filter(el => !["sipplay-image-sip-loading", "sipplay-voice-wave", "sipplay-bell-ring-toggle", "sipplay-liquid-rise-toggle", "sipplay-home-settle-toggle", "sipplay-plus-selection-toggle", "sipplay-user-page-toggle", "sipplay-bottom-bar", "sipplay-brackets-tool", "sipplay-image-tool"].includes(el.localName)).forEach(el => el.pause()); } });

try {
  if (!entry) throw new Error("未找到此组件，请从动效库重新选择。");
  runtime = await import("./vendor/motion-components.js?v=20261027-user-fill3");
  defineBillingTabs(runtime.animate);
  defineImageSipLoading(runtime.animate);
  defineHistoryClock(runtime.animate);
  defineWarningNudge(runtime.animate);
  defineBellRingToggle(runtime.animate);
  defineVoiceWave(runtime.animate);
  definePinToggle(runtime.animate);
  definePinReveal(runtime.animate);
  defineSelectionToggle(runtime.animate);
  defineWhiteSelectionToggle(runtime.animate);
  definePreviewTabs(runtime.animate);
  defineChatBubbleToggle(runtime.animate);
  defineLiquidRiseToggle(runtime.animate);
  defineHomeSettleToggle(runtime.animate);
  definePlusSelectionToggle(runtime.animate);
  defineUserPageToggle(runtime.animate);
  defineBottomBar(runtime.animate);
  defineToolHighlight(runtime.animate);
  defineLayerStackToggle(runtime.animate);
  defineProfileRiseToggle(runtime.animate);
  defineWrenchTurnToggle(runtime.animate);
  defineTapTab(runtime.animate);
  await render();
} catch (error) {
  root.className = "demo-error";
  root.textContent = "组件加载失败，请刷新重试。";
  notify("error", error.message);
}
