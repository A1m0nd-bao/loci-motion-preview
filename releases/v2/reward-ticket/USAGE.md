# 邀请奖励卡券 · Sipplay v2

原始设计稿尺寸为 166 × 36，卡券外轮廓硬性定型保持不变形。组件包含礼盒轻弹掀盖、挂牌微摆、三节彩带右向舒展延伸、白色横向流光（严格卡券四角切角内裁）以及常态月光银丝微芒。

```html
<script type="module" src="./reward-ticket.js"></script>
<sipplay-reward-ticket label="查看奖励卡券"></sipplay-reward-ticket>
```

将 `reward-ticket.js` 引入即可直接使用 `<sipplay-reward-ticket>` 自定义元素，无任何外部库依赖。

### 动效表现与交互机制
- **常态（Idle）**：底色保持纯净低饱和黑曜梅紫，彩带表面伴有柔和的月光银丝流光持续呼吸闪烁。
- **悬停 / 点击触发（Trigger）**：
  1. 礼盒整体轻弹上跃（0.85s 物理曲线）。
  2. 礼盒盖向右上方斜掀后柔和回落。
  3. 挂牌带轻微惯性摆动。
  4. 底部三节彩带同步向右舒展延伸生长。
  5. 白色高光斜束快速横穿卡券（双重外轮廓裁切，四角凹陷折角 100% 零溢出）。
- **防抖与连击处理**：内部已做触发状态锁与连击平滑重置，快速重复悬停或点击不会产生跳帧。
- **减少动态效果**：开启系统 `prefers-reduced-motion` 时自动保持原稿静态。

### 属性与 API
- `duration`：单次动画时长（秒），默认 `0.85`。
- `label`：用于无障碍访问的 `aria-label` 描述，默认为 `邀请奖励卡券`。
- `play()`：手动触发一次卡券开启与流光动效。
- `pause()`：暂停所有播放与常态循环。
- `resume()`：恢复动画播放。
- `finish()`：立即重置回常态。
- 事件监听：触发与结束时分别抛出 `motion-start` 和 `motion-finish` 自定义事件。

### 文件说明
- `index.html`：在线交互预览与 2.2× 细节比对。
- `reward-ticket.html`：零依赖纯净独立 HTML 组件，可单文件离线直接运行。
- `reward-ticket.js`：符合 Web Components 标准的独立 ES 模块。
- `reference.svg`：Figma 原始矢量设计稿对照。
- `source.zip`：包含完整源码、组件、原稿与说明文档的打包文件。
