# Auto Photos · 主动收图引导

打开 `index.html` 预览；`auto-photos.html` 为独立单文件。

- 引导约 5.6 秒：文字上移 576 毫秒（缓动 cubic-bezier(.4, 0, .2, 1)），演示开关退场 384 毫秒，图片 160 毫秒淡入，聊天滚动 640 毫秒。
- 窗口打开后保持显示，演示播完停留；重播只更新内容。
- 底部流光（3.6 秒循环）与实际开关独立运行，互不影响引导。
- 支持暂停引导、重播引导、收起/展开引导，以及 0.5× / 1× / 1.5× 播放。
- 图形视窗为 313×240，整页预览最大显示宽度为 626 px。

将内嵌 PNG 转成质量 88 的 WebP，保留 1254×1254 分辨率。
HTML 从 2,241,573 字节减少为 193,306 字节；SVG 图形与交互脚本保持不变。
原始文件未覆盖；图片已内嵌，无外部依赖。

```js
window.preview.seek(1400); // 毫秒，暂停到指定帧
window.preview.reset(); // 等同重播引导
window.preview.setCollapsed(true); // true 收起，false 展开
window.preview.toggleActual(); // 切换底部实际开关
window.preview.flow.setEnabled(false); // 关闭流光
```

这是引导与开关的前端演示，真实收图能力和业务状态需由宿主接入。
未转换为 Lottie，未验收原生 App 播放器或真机 WebView。
