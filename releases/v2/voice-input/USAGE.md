# 语音正在输入 · Sipplay v2

基于 217 × 25 SVG：44 根白色圆头竖线，宽 1.5、间距 5；44 根线固定在原位，随当前音量围绕中线起伏；各根线使用不同的起落速度与短时延迟，局部峰谷持续变化；说话快速响应，停顿柔和收低。默认 demo 模式模拟原稿节奏，不会申请麦克风权限。

```js
import {defineVoiceInputWave} from './voice-input-wave.js';
defineVoiceInputWave();
const wave=document.querySelector('sipplay-voice-input-wave');
wave.mode='live';
// 在业务自己的音频分析循环中赋值：0 为安静，1 为最大输入。
wave.level=normalizedRms;
```

HTML: <sipplay-voice-input-wave></sipplay-voice-input-wave>。
mode: demo / live；level: 0…1；speed: 0.4…2（默认 1）；paused 布尔属性冻结预览；quiet 布尔属性模拟静音收低；label 可访问名称。方法 pause() / play() / restart()。以 --voice-wave-width 设置展示宽度，颜色使用 color，默认白色。真实录音、音量归一化、授权和录音状态由宿主业务管理。

可独立运行的交付为 voice-input.html，内部包含代码和静态原稿。浏览器后台、组件离屏、暂停或系统开启减少动态效果时停止动画。
