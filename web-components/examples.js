import { defineBottomBar, bottomBarDemoCSS } from "./bottom-bar.js?v=20261020-bottom-bar";
import { defineUserPageToggle, userPageDemoCSS } from "./user-page-toggle.js?v=20261020-bottom-bar";
import { definePlusSelectionToggle, plusSelectionDemoCSS } from "./plus-selection-toggle.js?v=20261020-bottom-bar";
import { defineHomeSettleToggle, homeSettleDemoCSS } from "./home-settle-toggle.js?v=20261020-bottom-bar";
import { defineWarningNudge, warningNudgeDemoCSS } from "./warning-nudge.js?v=20261020-bottom-bar";
import { defineLiquidRiseToggle, liquidRiseDemoCSS } from "./liquid-rise-toggle.js?v=20261020-bottom-bar";
import { defineChatBubbleToggle, chatBubbleDemoCSS } from "./chat-bubble-toggle.js?v=20261020-bottom-bar";
import { defineTapTab, tapTabDemoCSS } from "./tap-tab.js?v=20261020-bottom-bar";
import { definePreviewTabs, previewTabsDemoCSS } from "./preview-tabs.js?v=20261020-bottom-bar";
import { defineWhiteSelectionToggle, whiteSelectionDemoCSS } from "./white-selection-toggle.js?v=20261020-bottom-bar";
import { defineHistoryClock, historyClockDemoCSS } from "./history-clock.js?v=20261020-bottom-bar";
import { defineBellRingToggle, bellRingDemoCSS } from "./bell-ring-toggle.js?v=20261020-bottom-bar";
import { motionExampleDocument } from "../motion/examples.js?v=20261020-bottom-bar";
import { defineVoiceWave, voiceWaveDemoCSS } from "./voice-wave.js?v=20261020-bottom-bar";
import { definePinToggle, pinToggleDemoCSS } from "./pin-toggle.js?v=20261020-bottom-bar";
import { definePinReveal, pinRevealDemoCSS } from "./pin-reveal.js?v=20261020-bottom-bar";
import { exampleMarkup, upstreamURL, upstreamVersion } from "./catalog.js?v=20261020-bottom-bar";
import { demoCSS } from "./demo-styles.js?v=20261020-bottom-bar";
import { bindDemoActions } from "./demo-actions.js?v=20261020-bottom-bar";
import { defineSelectionToggle, selectionDemoCSS } from "./selection-toggle.js?v=20261020-bottom-bar";
import { defineLayerStackToggle, layerStackDemoCSS } from "./layer-stack-toggle.js?v=20261020-bottom-bar";
import { defineProfileRiseToggle, profileRiseDemoCSS } from "./profile-rise-toggle.js?v=20261020-bottom-bar";
import { defineWrenchTurnToggle, wrenchTurnDemoCSS } from "./wrench-turn-toggle.js?v=20261020-bottom-bar";

export function exampleDocument(entry, values = {}) {
  if (entry.kind === "motion") return motionExampleDocument(entry, values);
  const font = "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/files/inter-latin-wght-normal.woff2";
  const styles = (demoCSS + (entry.custom ? bottomBarDemoCSS + userPageDemoCSS + plusSelectionDemoCSS + homeSettleDemoCSS + liquidRiseDemoCSS + warningNudgeDemoCSS + chatBubbleDemoCSS + previewTabsDemoCSS + selectionDemoCSS + whiteSelectionDemoCSS + layerStackDemoCSS + profileRiseDemoCSS + wrenchTurnDemoCSS + pinToggleDemoCSS + pinRevealDemoCSS + voiceWaveDemoCSS + bellRingDemoCSS + historyClockDemoCSS + tapTabDemoCSS : "")).replace('./vendor/inter-latin-wght-normal.woff2', font);
  const defineCustom = {
    "sipplay-warning-nudge": defineWarningNudge,
    "sipplay-bottom-bar": defineBottomBar,
    "sipplay-user-page-toggle": defineUserPageToggle,
    "sipplay-plus-selection-toggle": definePlusSelectionToggle,
    "sipplay-home-settle-toggle": defineHomeSettleToggle,
    "sipplay-liquid-rise-toggle": defineLiquidRiseToggle,
    "sipplay-chat-bubble-toggle": defineChatBubbleToggle,
    "sipplay-tap-tab": defineTapTab,
    "sipplay-history-clock": defineHistoryClock,
    "sipplay-bell-ring-toggle": defineBellRingToggle,
    "sipplay-voice-wave": defineVoiceWave,
    "sipplay-pin-toggle": definePinToggle,
    "sipplay-pin-reveal": definePinReveal,
    "sipplay-selection-toggle": defineSelectionToggle,
    "sipplay-white-selection-toggle": defineWhiteSelectionToggle,
    "sipplay-preview-tabs": definePreviewTabs,
    "sipplay-layer-stack-toggle": defineLayerStackToggle,
    "sipplay-profile-rise-toggle": defineProfileRiseToggle,
    "sipplay-wrench-turn-toggle": defineWrenchTurnToggle,
  }[entry.id];
  const dependencies = entry.id === "sipplay-tap-tab" ? [defineProfileRiseToggle, defineLayerStackToggle, defineWrenchTurnToggle] : entry.id === "sipplay-bottom-bar" ? [defineHomeSettleToggle, defineChatBubbleToggle, definePlusSelectionToggle, defineUserPageToggle] : [];
  const initializer = entry.custom
    ? `import { animate } from 'https://cdn.jsdelivr.net/npm/motion@13.5.1/+esm';\n    ${dependencies.map(define => `(${define.toString()})(animate);`).join('\n    ')}\n    (${defineCustom.toString()})(animate);`
    : `await customElements.whenDefined('${entry.id}');`;
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${entry.name} · ${entry.id}</title>
  ${entry.custom ? "<!-- Custom SVG state toggle · animated with Motion 13.5.1 -->" : `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/motion-components@${upstreamVersion}/dist/preload.css">\n  <!-- motion-components ${upstreamVersion} · MIT · ${upstreamURL} -->`}
  <style>${styles}</style>
  ${entry.custom ? "" : `<script type="module" src="https://cdn.jsdelivr.net/npm/motion-components@${upstreamVersion}/+esm"></script>`}
</head>
<body${entry.category === "滚动动效" ? ' class="scroll-demo"' : ""}>
  <main id="demo">
    ${exampleMarkup(entry, values).replace(/ data-motion/g, "")}
  </main>
  <script type="module">
    ${initializer}
    (${bindDemoActions.toString()})(document.querySelector('#demo'));
  </script>
</body>
</html>`;
}
