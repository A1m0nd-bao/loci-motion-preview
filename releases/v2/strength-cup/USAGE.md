# 强度滑块液面联动 · Sipplay v2

用于四档强度设置。画布 343 × 294；Basic / Standard / Extended / Maximum 对应 level 0 / 1 / 2 / 3，冰块为 1 / 2 / 3 / 4。保留带冰块和柠檬的最新版本。

## 最快体验

打开 index.html。右侧滑块自由拖动，松手吸附到最近一档；点击整段英文或下方按钮选档。键盘方向键切档，Home / End 到首尾。下载 strength-cup.html 可独立运行，Motion、SVG、柠檬图片和物理模块均已内嵌。

## 接入研发页面

源码包保持 strength-cup 与 vendor 的相对目录，通过 HTTP 服务打开。保留 index.html 中 .stage、.level-tabs、output 结构和样式，在宿主页面引入 controller.js。当前控制器按一页一个强度面板组织；多实例时需将 document 查询改成各自根容器。

```js
const stage=document.querySelector('.stage');
// 在组件加载完成后设置业务已有值；instant 可用于首次初始化。
stage.dispatchEvent(new CustomEvent('strength-set', {
  detail:{level:2,instant:false}
}));
stage.addEventListener('strength-change', ({detail}) => {
  // detail: {level: 0…3, name: 'Basic'…'Maximum', value: 0…100}
  // 保存业务档位。拖动过程中不提交，松手吸附或点击选档时提交。
});
```

液面切档约 0.54 秒，拖动跟随约 0.22 秒；冰块错峰落入、轻碰回浮，收稳后柠檬从上方轻放，淡入 0.5 秒、淡出 0.18 秒。反向切换从当前状态继续。减少动态效果时直接显示最终状态。

ice-physics.js / lemon-motion.js 控制物理近似和柠檬时序；poses.json 是四档平衡位置；artwork.svg 含原图材质和无损柠檬图片。不要替换为另一套缓动或把自由拖动改为 step=1。业务使用 level 表示强度，不要把液位动画误作实时进度。此包为 Web 版本。
