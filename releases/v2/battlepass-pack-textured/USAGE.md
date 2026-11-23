# 战令礼包 · 贴图均衡版

- 原始画布：560×558，按宽高比缩放。
- 文件约279 KB，贴图保留1.5倍像素，采用带透明通道的WebP编码。
- 入场约 1.35 秒，随后进入约 3.6 秒的待机循环。
- 宝箱先蓄力再开盖，红宝石错峰弹出，待机时轻浮动并伴随星光。
- 点击领取按钮仅播放按压反馈；实际发奖和业务请求由接入方实现。

## 使用

打开 battlepass-pack-motion-textured.html 即可预览。交付文件为用户确认的均衡压缩版；贴图已内嵌，无外部素材和网络依赖。

网页可直接通过 iframe 嵌入；App 可在 WebView 中加载此文件。该文件为 HTML 动效，不是 Lottie JSON。

```html
<iframe src="./battlepass-pack-motion-textured.html"
  title="战令礼包" style="width:560px;max-width:100%;height:558px;border:0"></iframe>
```

## 调试

提供 window.seekMotion(t) 定位到指定秒数，调用后暂停自动播放。重新加载页面可从入场开始播放。

系统开启减少动态效果时显示入场完成状态。源码包包含原始 HTML、预览入口和本说明。
