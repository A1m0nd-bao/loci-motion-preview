const number = (attribute, label, value, min, max, step = 0.05) => ({ attribute, label, value, min, max, step });
const duration = (value = 0.6) => number("duration", "时长（秒）", value, 0.2, 2, 0.05);
const bounce = () => number("bounce", "回弹程度", 0.3, 0, 0.6, 0.05);
const examples = [
  ["motion-js-spring", "弹簧切换", "弹簧物理", "点击切换位置，感受弹簧的过冲与收稳。可在运动中反向。", [duration(0.65), bounce()], "spring"],
  ["motion-js-stagger", "错峰入场", "编排与入场", "三个元素错峰抬起，透明度和位置共同过渡。", [duration(0.55), number("interval", "入场间隔（秒）", 0.1, 0.02, 0.3, 0.02)], "stagger"],
  ["motion-js-gesture", "悬停与按压", "手势反馈", "悬停轻轻放大，按下压缩，松开回弹。支持键盘与触屏。", [duration(0.3), bounce()], "hover"],
  ["motion-js-sequence", "时间线编排", "编排与入场", "标题、正文、标签按相对时间依次出现。点击重播查看整体节奏。", [duration(0.6), number("interval", "错峰间隔（秒）", 0.12, 0.04, 0.3, 0.02)], "animate"],
  ["motion-js-path", "SVG 路径绘制", "SVG 路径", "沿曲线绘制笔触，保持圆头与线宽，点击可重播。", [duration(0.9)], "svg"],
  ["motion-js-scroll", "滚动关联进度", "滚动关联", "在示例内滚动，进度条直接跟随滚动位置；支持键盘滚动。", [], "scroll"],
];
export const motionMotions = examples.map(([id, name, category, description, controls, docs]) => ({
  id, name, category, description, controls,
  kind: "motion", kindLabel: "Motion", fileName: id,
  file: `./motion/preview.html?id=${id}`,
  docs: `https://motion.dev/docs/${docs === "svg" ? "svg-animation" : docs}`,
  tags: ["Motion", "JavaScript", "原生示例", category],
  interactionType: id === "motion-js-scroll" ? "滚动体验" : "可交互预览",
}));
export function normalizeMotionValues(entry, values = {}) {
  return Object.fromEntries(entry.controls.map(control => {
    const candidate = Number(values[control.attribute] ?? control.value);
    return [control.attribute, Number.isFinite(candidate) ? Math.max(control.min, Math.min(control.max, candidate)) : control.value];
  }));
}
