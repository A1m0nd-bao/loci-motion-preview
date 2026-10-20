import { defineBellRingToggle, bellRingDemoCSS } from "./bell-ring-toggle.js?v=20261020-bell";
import { motionExampleDocument } from "../motion/examples.js?v=20261020-bell";
import { defineVoiceWave, voiceWaveDemoCSS } from "./voice-wave.js?v=20261020-bell";
import { definePinToggle, pinToggleDemoCSS } from "./pin-toggle.js?v=20261020-bell";
import { definePinReveal, pinRevealDemoCSS } from "./pin-reveal.js?v=20261020-bell";
import { exampleMarkup, upstreamURL, upstreamVersion } from "./catalog.js?v=20261020-bell";
import { demoCSS } from "./demo-styles.js?v=20261020-bell";
import { bindDemoActions } from "./demo-actions.js?v=20261020-bell";
import { defineSelectionToggle, selectionDemoCSS } from "./selection-toggle.js?v=20261020-bell";
import { defineLayerStackToggle, layerStackDemoCSS } from "./layer-stack-toggle.js?v=20261020-bell";
import { defineProfileRiseToggle, profileRiseDemoCSS } from "./profile-rise-toggle.js?v=20261020-bell";
import { defineWrenchTurnToggle, wrenchTurnDemoCSS } from "./wrench-turn-toggle.js?v=20261020-bell";

export function exampleDocument(entry, values = {}) {
  if (entry.kind === "motion") return motionExampleDocument(entry, values);
  const font = "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/files/inter-latin-wght-normal.woff2";
  const styles = (demoCSS + (entry.custom ? selectionDemoCSS + layerStackDemoCSS + profileRiseDemoCSS + wrenchTurnDemoCSS + pinToggleDemoCSS + pinRevealDemoCSS + voiceWaveDemoCSS + bellRingDemoCSS : "")).replace('./vendor/inter-latin-wght-normal.woff2', font);
  const defineCustom = {
    "sipplay-bell-ring-toggle": defineBellRingToggle,
    "sipplay-voice-wave": defineVoiceWave,
    "sipplay-pin-toggle": definePinToggle,
    "sipplay-pin-reveal": definePinReveal,
    "sipplay-selection-toggle": defineSelectionToggle,
    "sipplay-layer-stack-toggle": defineLayerStackToggle,
    "sipplay-profile-rise-toggle": defineProfileRiseToggle,
    "sipplay-wrench-turn-toggle": defineWrenchTurnToggle,
  }[entry.id];
  const initializer = entry.custom
    ? `import { animate } from 'https://cdn.jsdelivr.net/npm/motion@13.5.1/+esm';\n    (${defineCustom.toString()})(animate);`
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
