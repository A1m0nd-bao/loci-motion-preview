# 礼盒轻弹 · Sipplay v2

原始图稿为 31 × 26，点击范围为 44 × 44。保留原稿配色、图形和两颗星光。单次 0.92 秒：蓄力、上弹、盒盖向右上方斜掀 14°、落回，星光以 1.8 秒和 2.35 秒的独立周期持续错落闪烁。

```html
<script type="module" src="./gift-pop.js"></script>
<sipplay-gift-pop label="查看礼物"></sipplay-gift-pop>
```

将 gift-pop.js 与 gift-art.js 放在同一目录。无第三方运行依赖。

常态只有星光持续闪烁。鼠标移入或点击礼盒时，斜开再落回一次；鼠标停留不会重复播放，移出后再次移入可重新触发。触屏通过点击触发，键盘通过按钮的 Enter / Space 触发。也可调用 play()。播放中再次触发会忽略，避免连续点击造成跳帧。业务导航仍由调用方处理。

duration 属性以秒调整单次时间，默认 0.92。pause()、resume() 控制暂停与继续；finish() 回到原稿静态状态。motion-start、motion-finish 事件报告播放状态。

试版与业务组件均不自动开盒；默认持续闪星，交互时才开盒。开启减少动态效果时保持原稿静态。

index.html 为在线预览；gift-pop.html 为可独立打开的完整 HTML；source.zip 包含预览、组件源码、原始 SVG 和此说明。
