# v3 说明（字重范围收回 + 下半白边）

候选：`ticket-tear-autumn-text-repair-v3.html`
sha256 `ee8f0a8a71ca2f5430919100214e6f76668e609ce3a9d01848949b872cee333c`（242752 字节）
由 v1 另存修改；v1 / v2 / 原件均未改。未发布。无浏览器验收。

## 字体
仅 `Have a friend’s code?`（`#labelHaveFriendsCode`）及对应撕票 canvas `famTitle`：
`"SF Pro Text","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif`，`font-weight:600`。
依赖 Apple 系统字体，未下载/内嵌。+200/+100、Redeem、输入/placeholder 及它们的 canvas 烘焙已回到 v1。上半未改。

## 白边机制（静态像素证据）
1. 原稿 stub 透明像素 RGB 中位是白 (255,255,255)，alpha=0。下半轮廓最后一行不透明像素已是浅色垫色（底边约 199,169,174，左边约 172,131,139）。这是导出白底垫色，不是半透明 AA（原稿 partial alpha 仅 96px，且集中在 y=151–172 缺口附近）。
2. v1/v2 把整图 LANCZOS 放大到 2×（1082×578）。过滤器把「白色透明 RGB」混进边缘，partial alpha 从 96 增到约 1.6 万，底边可见亮度约 212，形成更宽更浅的白晕。这是交付后白边加重的主因。
3. CSS mask 路径底在 y=284.32，与这圈浅边重合；放大后的晕圈落在 mask 内侧，会被看见。未用 overflow 裁切作为修复。

## 修正
- stub 回到 541×289，alpha 与原稿逐像素相同（形状、缺口、撕裂边未改）。
- 仅在内部去字框用去文字 path 的票面纸底填补。
- 下半 y≥175 的外轮廓浅色垫色（比内侧纸底亮 ≥40 且 lum≥120）改成内侧纸色，不改 alpha。721px。缺口/上半未动。
- 静态对比：底边可见 lum 原稿 176.9 → v1-2x 212.4 → v3 57.9（回到纸色）。左侧轮廓不再有 lum>120 的浅列。

## 未测
浏览器里 CSS mask + 1× stub 的最终合成、375/`?compact` 缩放、撕票过程边缘、以及底边 1px 略深的纸色线是否可接受。不能宣称视觉已验收。
