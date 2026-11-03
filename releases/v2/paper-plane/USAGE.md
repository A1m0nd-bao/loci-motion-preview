# 纸飞机起飞 · Sipplay v2

图形 24 × 24，交互范围 44 × 44，保留原始 SVG 路径。常态静止；仅点击时轻轻蓄力、向右上飞出，再从左下回到原位。一次约 0.76 秒，播放期间再次触发会忽略，悬停不触发，也不自动循环。

```html
<script type="module" src="./paper-plane.js"></script>
<sipplay-paper-plane label="发送"></sipplay-paper-plane>
```

组件只提供视觉反馈。实际发送消息由业务点击事件处理，motion-start 只代表动画开始，不代表消息发送成功。业务发送成功后也可通过元素的 play() 方法触发。

支持 duration（秒，默认 0.76）、label，以及 play()、pause()、resume()、finish() 方法。motion-start 和 motion-finish 为视觉播放事件。Enter / Space 可触发；系统减少动态效果时保持原始静态图标。无第三方运行依赖。
