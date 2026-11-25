# 豪华奖励迸发 · 收取（压缩更新版）

打开 `index.html` 预览，或直接打开 `welcome-gift-collect.html`。
单文件内嵌图片与动画，无需联网；本轮替换为用户提供的 686,544 字节版本。

- 开箱后点击领取，奖励收缩并沿轨迹飞入目标。
- 左下控制可设置目标选择器、终点坐标、边距及收取速度。
- 通过重播恢复初始状态。

```js
window.GiftCollect.config;
window.GiftCollect.start();
window.GiftCollect.reset();
window.GiftCollect.phase;
```

目标选择器需对应宿主页面中的真实元素；实际发奖与账户余额由业务系统处理。
此演示不是 iOS 原生实现，仍需在目标 App WebView 中验收。
