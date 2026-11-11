# 礼盒轻弹 · Sipplay v2

原始图稿尺寸为 32 × 26，点击交互区域为 44 × 44。保留原设计稿配色、三颗常态错落呼吸闪烁的星辰，以及触发时盒盖向上轻弹（0.48 秒）、从盒口迸发出四射的星芒与高能光斑。默认支持 1.4 秒周期性自动轻弹展示，亦可通过鼠标悬停或点击立即唤醒播放。

```html
<script type="module" src="./gift-pop.js"></script>
<sipplay-gift-pop label="查看礼物"></sipplay-gift-pop>
```

将 `gift-pop.js` 与 `gift-art.js` 放在同一目录引入即可，无任何外部库依赖。

### 动效表现与交互机制
- **常态（Idle）**：左上、左下与右侧共 3 颗星辰，分别以 1.8s、2.35s 和 2.1s 独立周期异步呼吸闪烁。
- **轻弹与迸发（Burst）**：盒体轻微下压蓄力后弹起，盒盖向左上方斜掀 14°，盒口同步迸发 4 颗彩色星芒与 9 颗高光光斑。
- **周期与交互联动**：
  - 支持 `interval` 参数（秒，默认 1.4s）自动周期播放。
  - 鼠标移入（mouseenter）或点击（click）可立即触发播放。
  - 触屏通过点击触发，键盘通过按钮的 Enter / Space 触发。
- **接口与控制**：
  - `duration` 属性：调整轻弹单次时长（默认 0.48s）。
  - `interval` 属性：调整自动播放周期间隔（默认 1.4s）。
  - `play()`：手动立即触发一次开盒迸发动效。
  - `pause()`：暂停自动循环与动画。
  - `resume()`：恢复自动循环。
  - `finish()`：立即重置回常态。
  - 抛出 `motion-start` 与 `motion-finish` 事件。
- **系统适配**：开启 `prefers-reduced-motion: reduce` 时自动停用动画，保留原稿静态展示。
- **多端支持**：包含同等表现的 Lottie JSON 动效文件（`sipplay-v2-gift-pop.json`），可在 iOS、Android、Flutter 与 Web 端直接载入。
