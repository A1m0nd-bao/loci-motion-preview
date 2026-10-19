import { exampleMarkup, upstreamURL, upstreamVersion } from "./catalog.js";
import { demoCSS } from "./demo-styles.js";
import { bindDemoActions } from "./demo-actions.js";

export function exampleDocument(entry, values = {}) {
  const font = "https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.3.0/files/inter-latin-wght-normal.woff2";
  const styles = demoCSS.replace('./vendor/inter-latin-wght-normal.woff2', font);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${entry.name} · ${entry.id}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/motion-components@${upstreamVersion}/dist/preload.css">
  <!-- motion-components ${upstreamVersion} · MIT · ${upstreamURL} -->
  <style>${styles}</style>
  <script type="module" src="https://cdn.jsdelivr.net/npm/motion-components@${upstreamVersion}/+esm"></script>
</head>
<body${entry.category === "滚动动效" ? ' class="scroll-demo"' : ""}>
  <main id="demo">
    ${exampleMarkup(entry, values).replace(/ data-motion/g, "")}
  </main>
  <script type="module">
    await customElements.whenDefined('${entry.id}');
    (${bindDemoActions.toString()})(document.querySelector('#demo'));
  </script>
</body>
</html>`;
}
