# Auto Photos · 主动收图引导

打开 `index.html` 预览；`auto-photos.html` 为独立单文件。

- 3.6 秒循环展示聊天中收到照片；底部开关可独立切换。
- 点击说明区域展开引导，关闭按钮或“收起引导”可隐藏引导。
- 支持暂停、重播及 0.5× / 1× / 1.5× 播放。
- 图形基准为 226×213，整页预览最大显示宽度为 452 px。

将内嵌 PNG 转成质量 88 的 WebP，保留 1254×1254 分辨率。
HTML 从 2,212,807 字节减少为 164,540 字节；SVG 图形与交互脚本保持不变。
原始文件未覆盖；图片已内嵌，无外部依赖。

```js
window.preview.seek(1400); // 毫秒，暂停到指定帧
window.preview.reset();
window.preview.toggle(); // 切换开关
window.preview.setGuide(true); // true 收起，false 展开
```

这是引导与开关的前端演示，真实收图能力和业务状态需由宿主接入。
未转换为 Lottie，未验收原生 App 播放器或真机 WebView。
