# 麦克风与键盘切换 · Sipplay v2

用于聊天输入栏中语音 / 键盘入口的图标切换。图形 30 × 30，点击区域 44 × 44。默认约 0.42 秒；话筒收拢为按键，支架展为底部空格键，支持中途反向。

## 接入

```html
<sipplay-mic-keyboard-toggle value="mic"></sipplay-mic-keyboard-toggle>
<script type="module">
import {animate} from '../vendor/motion-components.js';
import {defineMicKeyboardToggle} from './mic-keyboard-toggle.js';
defineMicKeyboardToggle(animate);
const icon=document.querySelector('sipplay-mic-keyboard-toggle');
icon.value='keyboard'; // 显示键盘图标；'mic' 显示麦克风
icon.addEventListener('motion-change',({detail})=>{
  // detail={value,previous}；在这里对接业务的输入方式切换
});
</script>
```

value 表示正在显示的图标，业务需自行约定图标与输入模式的对应关系。组件只切换图形，不会开始录音或唤起键盘。label 可设置可访问名称，disabled 禁用点击，duration 控制时长（秒）。支持 toggle()、pause()、play()、finish()；系统减少动态效果时直接显示最终状态。外部修改 value 不派发 motion-change，用户点击会派发。

index.html 为在线预览；mic-keyboard.html 已内嵌运行时，可独立运行；源码包解压后保持 mic-keyboard / vendor 目录关系，以 HTTP 服务打开。框架中只在客户端注册一次，用 value 绑定状态。
