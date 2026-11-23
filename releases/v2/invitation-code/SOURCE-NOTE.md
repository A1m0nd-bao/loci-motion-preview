# 源码包范围

`source.zip` 里的 `README-状态映射与QA.md`、`资源大小与优化报告.md` 和 `build.py` 是文档与构建脚本材料，不是可以独立重建的完整源码包。

`index.html` 与 `invitation-code-motion.html` 是同一份已构建好的 v5 离线单文件，浏览器直接打开即可，不依赖本压缩包里的脚本。

`build.py` 在依赖缺失时不能重建该 HTML。压缩包故意不包含：

- `state-0.svg`、`state-1.svg`、`state-2.svg`、`state-3.svg`（大型状态源 SVG）
- `original.html`
- `front-pocket-cache-2x.png`
- `invite-latin.woff`、`Inter-OFL.txt`、`restyle.css`
- `input-constraints.js`、`autumn-leaves.js`、`autumn-leaf-assets.json`
- `pack-decoder-entry.js`、`lottie-light-5.12.2.min.js`
- `Lottie-LICENSE.md`、`Fflate-LICENSE.txt`（许可正文已随单文件 HTML 内嵌）
- `node_modules`（terser、esbuild 等）

Python 侧还需要 Pillow、fonttools，以及 fonttools 写出 WOFF2 时所需的 brotli。这些依赖都不在本包内。

站点目录里若仍有较早一版的 `assets/`（WebP 与 `sapphire_fall.json`），那是先前外置素材，v5 单文件不加载它们，也不是本构建脚本的输入。
