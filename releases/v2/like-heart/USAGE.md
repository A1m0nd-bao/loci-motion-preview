# 心动点赞 · Sipplay v2

用于内容卡片、角色或作品上的点赞按钮。16 / 20 px 使用同一轮廓，点击区域为 44 × 44 px。

## 最快体验

打开 index.html；下载 like-heart.html 可独立运行，运行时已内嵌。源码包解压后通过 HTTP 服务打开 index.html，保持 vendor 与 like-heart 的相对目录。

## 接入

```html
<sipplay-like-heart size="16" label="点赞"></sipplay-like-heart>
<script type="module">
import {animate} from '../vendor/motion-components.js';
import {defineLikeHeart} from './like-heart.js';
defineLikeHeart(animate);
const heart=document.querySelector('sipplay-like-heart');
heart.active=false; // 用业务的当前点赞状态初始化
heart.addEventListener('motion-change', ({detail}) => {
  // detail.active 是本次目标状态，在这里保存点赞结果
});
</script>
```

active 为布尔属性，存在即已点赞；取消时移除属性。disabled 禁止点击；size 支持 16 / 20；label 设置可访问名称。--heart-color 设置颜色，默认为白色。支持 replay()、pause()、play()、finish()。

点赞约 0.56 秒：轻收、小跳、轻摆并填充，取消时收回；快速切换会从当前填充进度继续。系统开启减少动态效果时直接显示最终状态。避免在组件外额外叠加缩放或旋转。框架中在客户端注册一次，通过 active 属性绑定业务数据。
