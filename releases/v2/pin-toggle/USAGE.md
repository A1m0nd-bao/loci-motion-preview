# 图钉选中切换 · Sipplay v2

图钉为 18 × 18，交互区域为 44 × 44。点击在未固定（斜杠图钉）与已固定（空心图钉，白色 40% 透明度）间切换。斜杠收起，图钉落下并柔和回弹。

```html
<sipplay-pin-toggle label="切换图钉状态"></sipplay-pin-toggle>
<script type="module">
import { animate } from './motion-components.js';
import { definePinToggle } from './pin-toggle.js';
definePinToggle(animate);
const pin = document.querySelector('sipplay-pin-toggle');
pin.addEventListener('motion-change', e => {
  // e.detail.active 为 true 时表示已固定。
});
</script>
```

用 active 属性或同名 JS 属性与业务状态同步；duration（秒，默认 0.52）和 bounce（默认 0.28）可调。组件只负责状态与视觉反馈，接口调用及失败回滚由业务处理。支持连续切换和系统减少动态效果。

下载 HTML 是独立预览；源码包包含组件、Motion 运行时、原稿和第三方许可说明。
