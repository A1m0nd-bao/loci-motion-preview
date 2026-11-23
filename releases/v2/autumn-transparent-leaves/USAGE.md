# 秋日落叶 · 透明图层

独立条目 `sipplay-autumn-transparent-leaves`。这是一层透明落叶，不是 `sipplay-invitation-code` 里的背景落叶，不是 `sipplay-maple-gift-pop`，也不是 `sipplay-ticket-tear`。

正式文件是 `autumn-motion-transparent.html`。页面和动效层都是透明的，不画宿主背景，也不用全屏固定定位。把它放进已经有宽高的容器或 iframe，图层会铺满这个容器。叶片是 `pointer-events: none`，不挡住点击和滚动。九张叶片图都嵌在文件里，没有外部地址。

`autumn-motion-black-preview.html` 与 `index.html` 字节相同。只有 `html` / `body` 用 CSS 黑色背景，方便单独查看。黑色不属于动效层。目录卡片和详情预览打开的是这份黑色预览。下载链接指向透明文件。

## 适配

动效层铺满容器，不再按 1440×900 画布等比缩小后留边。叶片沿右上到左下运动，斜率 0.645，在容器外生成，从左侧或底部外离场。叶片大小按面积比缩放，限制在 0.52–1.35 倍（相对原来的 1440×900）。数量随面积和叶片大小调整，限制在 12–48。窗口缩放或横竖屏切换时按新尺寸重算路径。

深色叶片在浅青底或很小的容器里会显得淡，这是原图，不改颜色。

隐藏页面时暂停。系统开启 `prefers-reduced-motion: reduce` 时暂停。保留 `build`、`fit`、`sync`、`paused`、`rate` 和空格键暂停。

## 浏览器核对

在 Chrome 里核对过，不是逐帧验收。深色叶片本身偏淡，小容器里更淡，没有改色。

- 黑色预览在 320×568、375×812、768×1024、1440×900、1920×1080、844×390 里，视口宽高与窗口一致，没有留边。390×844 换成 844×390 再换回 390×844，图层跟着容器变，叶片数量会重算。
- 目录卡片 iframe 是 260×220，背景 `rgb(0, 0, 0)`，铺满这一格。
- 透明文件的 `html` / `body` 背景是 `rgba(0, 0, 0, 0)`。放在棋盘格页面里能看见格子。`elementFromPoint` 命中 `BODY`，叶片不接点击。
- 九张图都是内嵌 `data:image/png`，没有 http 地址。
- `prefers-reduced-motion: reduce` 下抽到的叶片动画是 `paused`。
- 把 `document.hidden` 设为 true 并派发 `visibilitychange` 后，叶片动画暂停；恢复后又继续。这是在页面里改这个状态测的，不是真的切到别的标签页。

## 文件

- `index.html`：站点预览，与黑色预览字节相同。
- `autumn-motion-black-preview.html`：黑色预览。
- `autumn-motion-transparent.html`：透明嵌入版，下载用这一份。
- `README.txt`：交付说明原文。
- `USAGE.md`：本接入说明。
- `source.zip`：包含以上文件。
