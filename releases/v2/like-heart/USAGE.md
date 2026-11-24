# 心动点赞 · 红色版

图标支持 16 / 18 / 20 px，默认 18 px，点击区域为 44×44 px。
点赞后填充红色 `#EB5A4E`；未点赞为白色描边。

## 预览

`like-heart.html` 是已内嵌运行时的单文件，可直接打开。
源码包解压后，通过 HTTP 服务打开 `like-heart/index.html`，保留相邻 `vendor` 目录。

## 接入

```html
<sipplay-like-heart size="18" label="点赞"></sipplay-like-heart>
<script type="module">
import {animate} from '../vendor/motion-components.js';
import {defineLikeHeart} from './like-heart.js';
defineLikeHeart(animate);
const heart = document.querySelector('sipplay-like-heart');
heart.active = false;
heart.addEventListener('motion-change', ({detail}) => {
  // 将 detail.active 写入业务点赞状态。
});
</script>
```

- `active`：布尔属性，存在表示已点赞；移除表示取消点赞。
- `size`：16、18、20；`label`：可访问名称；`disabled`：禁止点击。
- `--heart-color`：未点赞描边颜色，默认白色；已点赞固定为红色。
- 方法：`replay()`、`pause()`、`play()`、`finish()`。

点赞约 0.56 秒，包含轻收、小跳、轻摆、自下而上填充和红色火花。
再次点击取消点赞。支持快速反复切换与系统“减少动态效果”。
