import { exampleMarkup, upstreamURL, upstreamVersion } from "./catalog.js?v=20261019-layer-stack";
import { demoCSS } from "./demo-styles.js?v=20261019-layer-stack";
import { bindDemoActions } from "./demo-actions.js?v=20261019-layer-stack";
import { defineSelectionToggle, selectionDemoCSS } from "./selection-toggle.js?v=20261019-layer-stack";
import { defineLayerStackToggle, layerStackDemoCSS } from "./layer-stack-toggle.js?v=20261019-layer-stack";

export function exampleDocument(entry, values = {}) {
  const font = "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/files/inter-latin-wght-normal.woff2";
  const styles = (demoCSS + (entry.custom ? selectionDemoCSS + layerStackDemoCSS : "")).replace('./vendor/inter-latin-wght-normal.woff2', font);
  const defineCustom = entry.id === "sipplay-layer-stack-toggle" ? defineLayerStackToggle : defineSelectionToggle;
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
