# 加号与发送箭头 · Sipplay v2

- 图形：30×30；演示按钮点击区：44×44。保留 15% 白色圆底、圆头描边与原稿紫红渐变。
- value：`add`（加号）、`disabled`（不可发送，箭头 20% 透明度）、`ready`（可发送，白色箭头和渐变圆底）。
- duration：0.36 秒；快速起步、柔和收尾。仅做原位路径变形、图标透明度与背景颜色过渡。
- 线条通过一个遮罩合并后只绘制一次，避免交叉处叠色和尖端凸起。

## 使用

`index.html` 为在线预览；`plus-arrow.html` 为独立 HTML，联网加载 Motion 13.5.1 后即可运行。

业务项目复制 `plus-arrow-toggle.js`，使用项目自身的 Motion 依赖：

```js
import { animate } from 'motion';
import { definePlusArrowToggle } from './plus-arrow-toggle.js';
definePlusArrowToggle(animate);
const icon = document.querySelector('sipplay-plus-arrow-toggle');
icon.value = 'add'; // 按页面已有状态初始化
icon.finish(); // 初始挂载直接显示正确状态
// 后续状态变化保留动效：
icon.value = 'disabled';
icon.value = 'ready';
```

```html
<sipplay-plus-arrow-toggle value="add" duration="0.36" label="发送图标"></sipplay-plus-arrow-toggle>
```

演示按钮的点击会循环三态；`motion-change` 的 detail 为 `{ value, previous }`，外部写入 value 不发出该事件。业务接入时由已有的添加入口、输入内容和可发送条件驱动 value，沿用真实的禁用与发送逻辑；不要把演示循环当成发送行为，也不要嵌套两个按钮。需要接入已有按钮时提取本组件的动效视图，保持一个点击与焦点入口。具体 Figma 节点尚未绑定，不按图形相似批量替换。

方法：`toggle()`、`pause()`、`play()`、`finish()`、`cancel()`。支持键盘、减少动态效果、快速反向与卸载清理。Web 组件在浏览器客户端初始化；此版本为 Web 动效，不包含 Lottie。
