import { motionDemoMarkup, motionDemoCSS } from "./demos.js?v=20261019-motion";
import { normalizeMotionValues } from "./catalog.js?v=20261019-motion";
import { motionDemoSource } from "./export-source.js?v=20261019-motion";
export function motionExampleDocument(entry, values = {}) {
  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${entry.name} · Motion</title><style>${motionDemoCSS}</style></head>
<body><main id="demo">${motionDemoMarkup[entry.id]}</main>
<script type="module">
import { animate, hover, press, stagger, scroll } from "https://cdn.jsdelivr.net/npm/motion@13.5.1/+esm";
const controller = (${motionDemoSource})(document.querySelector("#demo"), ${JSON.stringify(entry.id)}, ${JSON.stringify(normalizeMotionValues(entry, values))});
window.addEventListener("pagehide", () => controller.destroy());
</script></body></html>`;
}
