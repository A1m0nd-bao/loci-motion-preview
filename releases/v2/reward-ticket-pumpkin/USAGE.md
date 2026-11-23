# 奖励票券 · 红金南瓜弹跳

独立条目 `sipplay-reward-ticket-pumpkin`。这不是 `sipplay-reward-ticket`（166×36 邀请奖励卡券），也不是 `sipplay-reward-ticket-harvest`（已上线的红金 Ease-Out 轻弹）。两条旧票券都不改。

打开 `reward-ticket-pumpkin.html` 即可离线播放。画面、南瓜弹簧、吊牌和飘带都在这一个文件里，没有外部脚本、图片或字体文件。自定义元素名是 `sipplay-reward-ticket`，`variant="harvest"`。它和另外两份票券运行时用了同一个元素名，所以要单独打开这个文件，不要和它们写进同一个页面。

可选 `?compact` 进入 260×220 目录缩略图。不加这个参数时，页面就是交付的红金票预览。

- **字节**: `72397`
- **SHA256**: `8f4c4feba78c34251d7c2e086598c5e1ca374e2da1bd03d46841244608327b39`

```html
<sipplay-reward-ticket
  id="harvest-ticket"
  variant="harvest"
  label="红金南瓜奖励票卡"
  ribbon-duration="1.36">
</sipplay-reward-ticket>
```

元素定义写在同一个 HTML 里。没有单独的外部脚本，也没有额外运行库。

## 尺寸

票面是 **167×36**。`:host([variant="harvest"])` 把宽度设成 167px，SVG 的 `viewBox` 也是 `0 0 167 36`。预览页默认把票放大 **2.15** 倍（视口窄于 520px 时是 **1.85** 倍）。目录缩略图用 **1.4** 倍，放在 260×220 里。

## 动效

- **常态**: 星点、金线微光，飘带上有一条循环流光。南瓜和吊牌静止。
- **南瓜弹跳**: 悬停、点击、Enter 或空格都会触发。默认跟随 `duration`，下限 800ms，未设置时是 **850ms**。先下压，再跳起、落地、小幅二跳。茎和叶留在 `.harvest-art` 里，没有拆件。
- **吊牌**: `.harvest-tag` 以顶部中心为轴跟随摆动，峰值大约 **11°**，再收回。
- **飘带**: `ribbon-duration` 默认 **1.36s**（限制 0.4–6）。可见段全程 `easeOutCubic`，长满后停住。
- **连点**: 飘带播放中再次触发只排队一轮，不叠多轮。南瓜弹跳每次触发都会从当前姿态接上。
- **慢速**: 页面上的「慢速查看路径」把 `duration` 设为 1.7、`ribbon-duration` 设为 2.4。姿态不变，只是变慢。
- **结束**: 飘带 `stroke-dashoffset` 回到 0，`playing` 去掉，抛出 `motion-finish`。页面状态从「飘带绕行中」回到「就绪」。
- **`prefers-reduced-motion: reduce`**: 不开始弹跳、吊牌、飘带生长和流光；星星的 CSS 动画也会停。已有的播放会被拆掉。

可调用 `play()`、`pause()`、`resume()`、`finish()`。开始与结束分别抛出 `motion-start`、`motion-finish`。

## 浏览器核对

在 Chrome 里量过，不是逐帧验收。

- 原生 **167×36**：SVG 边框就是 167×36。弹跳全程每 10ms 取样，茎尖（`#94532B`）离票面顶边最近 **1.62px**，出现在 340ms。同一帧更密的路径取样是 **1.615px**。旋转后的包围盒空角会靠近到 0.979px，那一角不是茎的笔画像素。吊牌四边最近 **2.99px**。茎和吊牌都没有被 167×36 裁切切掉。
- 放大后的本地间隙与 1× 相同。2.15× 的 SVG 是 359.05×77.4，1.85× 是 308.95×66.6，1.4× 是 233.8×50.4，三档都落在面板里面。
- 连点排成两轮，两轮都收到 `motion-finish`，结束时 `running` 为 false，虚线偏移为 `0px`。
- 慢速 2.4s 飘带同样收到 `motion-finish`，虚线偏移为 `0px`。
- 悬停和 Enter 会重新进入播放。
- `prefers-reduced-motion: reduce` 下，播放、悬停、Enter 都不启动；没有弹跳、没有飘带流光，星星动画名为 `none`，虚线偏移为 `0px`。
- 这份 HTML 没有再请求别的资源。

375px 宽的页面布局能放下 1.85× 的票。桌面 2.15× 也能放下。

## 文件

- `index.html`：站点预览。与下载文件字节相同，支持 `?compact`。
- `reward-ticket-pumpkin.html`：下载用的同一份 HTML。
- `USAGE.md`：本接入说明。
- `source.zip`：包含以上文件。
