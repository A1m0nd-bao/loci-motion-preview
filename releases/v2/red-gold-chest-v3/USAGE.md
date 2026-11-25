# 红金宝箱 · 跃起开箱（v10）

打开 `index.html` 预览，或直接打开 `red-gold-chest-v10.html`。
初始闭箱，点击画布或“打开宝箱”播放；结束后点击“重新打开”重播。
画布获得焦点后，Enter 或空格也可播放。播放中不重复触发。

本版画布基准为 1340×1410，演示最大宽度 420 px，动画约 1.4 秒。
包含固定铰链开盖、厚度箱体及宝石效果。图片和脚本内嵌，原文件未改动。
支持减少动态效果；页面隐藏时结束播放并停止动画循环。

```js
await window.chest.ready;
window.chest.play();
window.chest.reset();
window.chest.seek(700); // 毫秒
window.chest.state();
```

原始 HTML 加 `?qa=1` 可显示进度滑块；`?qa=1&pose=700` 检查指定时间点。
旧预览和单文件地址继续可用；已交付 v2 ZIP 保持原冻结快照，本次未重打包。
