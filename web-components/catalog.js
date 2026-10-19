import { selectionDemoMarkup } from "./selection-toggle.js?v=20261019-selection-fill";

export const upstreamVersion = "1.3.0";
export const upstreamURL = "https://github.com/tgomilar/motion-components";

const number = (attribute, label, value, min, max, step = 0.1) => ({ attribute, label, value, min, max, step });
const duration = (value = 0.6) => number("duration", "时长（秒）", value, 0.1, 3);
const bounce = (value = 0.3) => number("bounce", "回弹程度", value, 0, 0.8, 0.05);
const text = (tag, attributes = "", content = "Make it move.") => `<${tag} data-motion ${attributes}>${content}</${tag}>`;
const button = '<button class="demo-button" type="button">Try me</button>';
const tile = '<div class="demo-tile"><span class="demo-symbol">✦</span><strong>Small move.<br>Big feeling.</strong></div>';

// Self-contained SVG fixtures keep the examples usable without image hosts.
export function artwork(color = "#c8b7fe", label = "MOTION") {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440"><rect width="640" height="440" fill="#161922"/><circle cx="320" cy="200" r="132" fill="${color}"/><circle cx="370" cy="158" r="108" fill="#161922"/><text x="40" y="397" font-family="sans-serif" font-size="28" fill="${color}" letter-spacing="7">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const entries = [
  ["motion-hover", "悬停回弹", "鼠标交互", "悬停在按钮上，感受放大和上浮。", text("motion-hover", 'scale="1.08" y="-6"', button), [number("scale", "放大比例", 1.08, 1, 1.4, 0.01), number("y", "垂直位移", -6, -30, 0, 1), bounce()]],
  ["motion-press", "按压反馈", "鼠标交互", "按住按钮，松开后弹回。", text("motion-press", 'scale="0.9"', button), [number("scale", "按压比例", 0.9, 0.6, 1, 0.01), bounce(0.4)]],
  ["motion-magnetic", "磁吸按钮", "鼠标交互", "在按钮附近移动指针，让按钮跟随你。", text("motion-magnetic", 'strength="0.4"', button), [number("strength", "吸引强度", 0.4, 0.1, 1), duration(0.5)]],
  ["motion-tilt", "3D 倾斜", "鼠标交互", "在卡片上移动指针，体验视角和高光变化。", text("motion-tilt", 'max="15" gloss', tile), [number("max", "最大角度", 15, 2, 35, 1), bounce(0.2)]],
  ["motion-reveal", "滚动渐入", "入场动画", "点击重播，查看淡入和上移。", text("motion-reveal", 'duration="0.6" y="24"', tile), [duration(), number("y", "入场距离", 24, 0, 100, 1)]],
  ["motion-stagger", "依次入场", "入场动画", "多个元素按顺序进入画面。", text("motion-stagger", 'interval="0.12"', '<div class="demo-chip">Design</div><div class="demo-chip">Build</div><div class="demo-chip">Delight</div>'), [number("interval", "间隔（秒）", 0.12, 0.02, 0.5, 0.02), duration(0.5)]],
  ["motion-blur", "模糊过渡", "入场动画", "内容从模糊逐渐变清晰。", text("motion-blur", 'intensity="16"', tile), [number("intensity", "模糊强度", 16, 0, 30, 1)]],
  ["motion-blur-in", "模糊渐入", "入场动画", "柔和的模糊、淡入和位移组合。", text("motion-blur-in", 'duration="0.7" intensity="12"', tile), [duration(0.7), number("intensity", "模糊强度", 12, 0, 30, 1)]],
  ["motion-split", "逐字入场", "文字动效", "文字拆成单字，依次弹入。", text("motion-split", 'by="chars" interval="0.06"'), [number("interval", "字符间隔", 0.06, 0.01, 0.2, 0.01), duration()]],
  ["motion-typewriter", "打字机", "文字动效", "像打字一样逐字显示，支持光标。", text("motion-typewriter", 'interval="0.07"', "Hello, SipPlay."), [number("interval", "字符间隔", 0.07, 0.02, 0.3, 0.01)]],
  ["motion-counter", "数字递增", "文字动效", "从起始值平滑计数到目标值。", text("motion-counter", 'from="0" to="1280" duration="1.5"', ""), [number("to", "目标数字", 1280, 10, 10000, 10), duration(1.5)]],
  ["motion-scramble", "乱码解码", "文字动效", "随机字符逐步解码为目标文字。", text("motion-scramble", 'interval="0.04"', "IDEAS IN MOTION"), [number("interval", "字符间隔", 0.04, 0.01, 0.15, 0.01)]],
  ["motion-ticker", "循环跑马灯", "文字动效", "水平连续滚动；悬停可暂停。", text("motion-ticker", 'speed="60" gap="32"', '<span>DESIGN</span><span>✦</span><span>MOTION</span><span>✦</span>'), [number("speed", "速度（px/s）", 60, 10, 180, 5)]],
  ["motion-words", "词语轮换", "文字动效", "多个词语轮流出现，可分别设置颜色。", text("motion-words", 'words="Design,Build,Delight" colors="#fcd1c5,#c8b7fe,#9be6d4" interval="2"', ""), [number("interval", "轮换间隔", 2, 0.5, 5, 0.5)]],
  ["motion-curve", "波浪文字", "文字动效", "文字沿着波浪起伏运动。", text("motion-curve", 'amplitude="20" wave-duration="2.5"', "GO WITH THE FLOW"), [number("amplitude", "波浪高度", 20, 0, 40, 1)]],
  ["motion-circle", "环形文字", "文字动效", "文字围成圆环，持续旋转。", text("motion-circle", 'radius="70" duration="8" text="SIPPLAY · MAKE IT MOVE · "', ""), [number("duration", "一圈时长（秒）", 8, 2, 20, 1)]],
  ["motion-arc", "弧形文字", "文字动效", "沿圆弧排列文字，可调整弧度。", text("motion-arc", 'radius="90" arc="150" text="A LITTLE MORE MOTION"', ""), [number("arc", "弧度（度）", 150, 60, 260, 5)]],
  ["motion-headline", "标题揭幕", "文字动效", "标题按词分段，依次滑入。", text("motion-headline", 'variant="slide" duration="1"', "Ideas become motion."), [duration(1)]],
  ["motion-glitch", "故障文字", "文字动效", "悬停触发短暂的错位和故障效果。", text("motion-glitch", 'trigger="hover" intensity="5"', "SIGNAL FOUND"), [number("intensity", "故障强度", 5, 1, 15, 1)]],
  ["motion-gravity", "重力落字", "文字动效", "字符从上方落下并回弹。", text("motion-gravity", 'height="60" bounce="0.45"', "DROP AN IDEA"), [number("height", "下落高度", 60, 10, 120, 5), bounce(0.45)]],
  ["motion-liquid", "液态文字", "文字动效", "文字随时间连续流动和扭曲。", text("motion-liquid", 'intensity="10"', "Stay fluid."), [number("intensity", "流动强度", 10, 1, 25, 1)]],
  ["motion-perspective", "透视文字", "文字动效", "带有纵深感的文字运动。", text("motion-perspective", 'depth="0.65" loop duration="3"', "A NEW PERSPECTIVE"), [number("depth", "透视深度", 0.65, 0.1, 1, 0.05)]],
  ["motion-stretch", "弹性拉伸", "文字动效", "移动指针，让字符产生弹性位移。", text("motion-stretch", 'spread="12"', "STRETCH"), [number("spread", "展开距离", 12, 2, 30, 1)]],
  ["motion-swap", "文字翻换", "文字动效", "悬停时字符向上翻换。", text("motion-swap", 'trigger="hover" duration="0.7"', "HOVER TO SWAP"), [duration(0.7), bounce()]],
  ["motion-text-mask", "遮罩揭字", "文字动效", "文字从遮罩下方滑入。", text("motion-text-mask", 'duration="0.9"', "Beyond the frame."), [duration(0.9)]],
  ["motion-font", "字重变化", "文字动效", "使用 Inter 可变字体，悬停改变字重。", text("motion-font", 'trigger="hover" from="300" to="900"', "VARIABLE"), [number("to", "目标字重", 900, 100, 900, 100), duration()]],
  ["motion-marker", "荧光标记", "文字动效", "像荧光笔一样绘制文字背景。", text("motion-marker", 'duration="0.8"', "Worth a highlight."), [duration(0.8)]],
  ["motion-underline", "绘制下划线", "文字动效", "从左到右绘制一条下划线。", text("motion-underline", 'duration="0.8"', "Make a point."), [duration(0.8)]],
  ["motion-strike", "动态删除线", "文字动效", "一笔划过文字，表达替换或完成。", text("motion-strike", 'duration="0.8"', "Overthinking."), [duration(0.8)]],
  ["motion-ring", "手绘圈注", "文字动效", "用椭圆圈突出一段文字。", text("motion-ring", 'duration="0.8"', "This one."), [duration(0.8)]],
  ["motion-icon", "图标描边", "动态图标", "悬停在星形图标上，重新绘制路径。", text("motion-icon", 'animation="draw" trigger="hover" label="星形"', '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/></svg>'), []],
  ["motion-icon-state", "图标状态切换", "动态图标", "点击图标，在菜单和关闭状态之间变形。", text("motion-icon-state", 'name="menu" toggle label="切换菜单"', ""), [duration(0.45), bounce()]],
  ["motion-parallax", "滚动视差", "滚动动效", "在预览区域内滚动，观察卡片的相对位移。", '<div class="scroll-intro">向下滚动，感受空间层次</div>' + text("motion-parallax", 'depth="0.4"', tile) + '<div class="scroll-outro">Keep exploring.</div>', [number("depth", "视差深度", 0.4, 0.1, 1)]],
  ["motion-scene", "滚动场景", "滚动动效", "在预览区域内滚动，推动卡片的缩放与旋转。", text("motion-scene", 'height="180vh"', '<div class="scene-item" data-from=\'{"scale":0.6,"rotate":-15,"opacity":0.3}\' data-to=\'{"scale":1,"rotate":15,"opacity":1}\'>SCROLL<br>TO MOVE</div>'), []],
  ["motion-slider", "弹簧轮播", "交互组件", "拖动卡片，或使用左右箭头切换。", text("motion-slider", 'gap="16"', '<div class="slide slide-a">01<br>Design</div><div class="slide slide-b">02<br>Build</div><div class="slide slide-c">03<br>Delight</div>'), [number("gap", "卡片间距", 16, 0, 40, 1)]],
  ["motion-gallery", "图片画廊", "交互组件", "点击图片，打开带动画的灯箱。", text("motion-gallery", 'columns="3" gap="10"', ["ORBIT", "FORM", "FLOW"].map((label, i) => `<img src="${artwork(["#c8b7fe", "#fcd1c5", "#9be6d4"][i], label)}" alt="${label} 抽象图形" data-caption="${label}" />`).join("")), [number("columns", "列数", 3, 1, 3, 1)]],
  ["motion-dialog", "弹簧弹窗", "交互组件", "点击按钮打开弹窗；按 Esc 或点击遮罩关闭。", '<button class="demo-button" type="button" data-demo-action="open-dialog">打开弹窗</button>' + text("motion-dialog", 'light-dismiss duration="0.5"', '<h2>A small hello.</h2><p>每一次交互，都值得被认真设计。</p><button class="demo-button" type="button" data-demo-action="close-dialog">收到了</button>'), [duration(0.5), bounce(0.25)]],
  ["motion-countdown", "翻动倒计时", "交互组件", "实时倒计时，数字以滚动方式切换。", text("motion-countdown", 'format="minutes seconds" roll', ""), []],
  ["motion-spotlight", "聚光高亮", "交互组件", "在卡片上移动指针，观察柔和的追踪光斑。", text("motion-spotlight", 'size="240"', '<button class="demo-tile spotlight-tile" type="button"><span class="demo-symbol">✦</span><strong>Follow the light.</strong></button>'), [number("size", "光斑大小", 240, 80, 500, 10)]],
  ["motion-progress", "滚动进度条", "滚动动效", "在预览区域内滚动，顶部进度条会跟随变化。", text("motion-progress", 'thickness="6"', "") + '<div class="scroll-intro">阅读进度<br>向下滚动</div><div class="scroll-chapter">One more idea.</div><div class="scroll-outro">You made it.</div>', [number("thickness", "线条粗细", 6, 2, 16, 1)]],
  ["motion-image-compare", "图片前后对比", "交互组件", "拖动分割线，或聚焦后使用方向键调整。", text("motion-image-compare", 'start="50"', `<img slot="before" src="${artwork("#8b93a5", "BEFORE")}" alt="处理前的灰色图形" /><img slot="after" src="${artwork("#c8b7fe", "AFTER")}" alt="处理后的紫色图形" />`), [number("start", "分割位置（%）", 50, 0, 100, 1)]],
  ["motion-flip-card", "3D 翻转卡片", "交互组件", "点击卡片，查看正面和背面。", text("motion-flip-card", 'trigger="click" duration="0.7"', '<div slot="front" class="flip-face">Tap to<br>discover.</div><div slot="back" class="flip-face back-face">Hello,<br>other side.</div>'), [duration(0.7), bounce(0.2)]],
  ["motion-theme-toggle", "主题切换", "交互组件", "点击控件切换预览主题；只影响当前示例。", text("motion-theme-toggle", '', ""), []],
  ["motion-theme-icon", "日月图标变形", "动态图标", "点击按钮，在太阳和月亮之间切换。", '<button class="theme-demo-button" type="button" data-demo-action="theme-icon" aria-label="切换日月图标">' + text("motion-theme-icon", 'mode="light"', "") + '</button>', [duration(0.45)]],
  ["motion-chart", "动态柱状图", "动态图表", "点击更新数据，观察柱形高度的弹簧过渡。", text("motion-chart", 'values="32,58,44,86,65" labels="Mon,Tue,Wed,Thu,Fri" label="每周数据"', "") + '<button class="demo-button secondary" type="button" data-demo-action="chart">更新数据</button>', [duration(0.8), bounce(0.25)]],
  ["motion-pie", "动态环形图", "动态图表", "点击更新数据，查看占比变化。", text("motion-pie", 'values="45,30,25" labels="Design,Build,Other" donut label="工作分配"', "") + '<button class="demo-button secondary" type="button" data-demo-action="pie">更新数据</button>', [duration(0.8), bounce(0.25)]],
  ["motion-sparkline", "迷你趋势图", "动态图表", "点击更新数据，观察趋势线过渡。", text("motion-sparkline", 'values="12,28,18,42,35,65,52,88" label="增长趋势"', "") + '<button class="demo-button secondary" type="button" data-demo-action="sparkline">更新数据</button>', []],
  ["motion-code", "代码打字效果", "代码展示", "带语法高亮、复制按钮和逐字输入。", text("motion-code", 'filename="hello.js" code-lang="js" typing typing-loop="false" typing-speed="40" copy', '<pre>const idea = "Make it move.";\nconsole.log(idea);</pre>'), [number("typing-speed", "输入速度（字符/秒）", 40, 5, 100, 5)]],
  ["motion-code-inline", "行内代码", "代码展示", "悬停或聚焦可复制代码。", text("motion-code-inline", 'code-lang="js" copy', 'npm install motion-components@1.3.0'), []],
];

function docsSection(id) {
  if (["motion-hover", "motion-press", "motion-magnetic", "motion-tilt"].includes(id)) return "respond";
  if (["motion-reveal", "motion-stagger", "motion-blur", "motion-blur-in"].includes(id)) return "reveal";
  if (["motion-parallax", "motion-scene"].includes(id)) return "scroll";
  if (["motion-icon", "motion-icon-state"].includes(id)) return "icons";
  if (["motion-chart", "motion-pie", "motion-sparkline"].includes(id)) return "charts";
  if (id.startsWith("motion-code")) return "code";
  if (["motion-slider", "motion-gallery", "motion-dialog", "motion-countdown", "motion-spotlight", "motion-progress", "motion-image-compare", "motion-flip-card", "motion-theme-toggle", "motion-theme-icon"].includes(id)) return "components";
  return "text";
}

const upstreamMotions = entries.map(([id, name, category, description, markup, controls]) => ({
  id, name, category, description, markup, controls,
  kind: "web", kindLabel: "Web 组件", fileName: id,
  file: `./web-components/preview.html?id=${id}`,
  docs: `https://www.motion-components.dev/docs/${docsSection(id)}/${id}/`,
  tags: [id, "Motion", "Web Components"],
  interactionType: category === "鼠标交互" ? "指针交互" : category === "滚动动效" ? "滚动体验" : "可交互预览",
}));

export const webMotions = [{
  id: "sipplay-selection-toggle", name: "粉色勾选切换", category: "动态图标",
  description: "点击在白色空心圆与粉色勾选之间双向切换。保留原始 20 × 20 SVG，支持快速反复点击。",
  markup: selectionDemoMarkup, controls: [number("duration", "时长（秒）", 0.32, 0.12, 1.5, 0.02), number("bounce", "回弹程度", 0.15, 0, 0.5, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-selection-toggle",
  file: "./web-components/preview.html?id=sipplay-selection-toggle",
  docs: null, custom: true,
  tags: ["自定义 SVG", "勾选", "选中状态", "20px"], interactionType: "点击切换",
}, ...upstreamMotions];

export function normalizeValues(entry, values = {}) {
  return Object.fromEntries(entry.controls.map((control) => {
    const candidate = Number(values[control.attribute] ?? control.value);
    const value = Number.isFinite(candidate) ? Math.max(control.min, Math.min(control.max, candidate)) : control.value;
    return [control.attribute, value];
  }));
}

export function exampleMarkup(entry, values = {}) {
  const config = normalizeValues(entry, values);
  const attributes = Object.entries(config).map(([key, value]) => `${key}="${value}"`).join(" ");
  // Only the curated root component can receive the declared numeric controls.
  const markup = entry.markup.replace(/<([\w-]+) data-motion([^>]*)>/, (_, tag, rest) => {
    for (const key of Object.keys(config)) rest = rest.replace(new RegExp(`\\s${key}="[^"]*"`, "g"), "");
    return `<${tag} data-motion${rest} ${attributes}>`;
  });
  return entry.id === "motion-countdown" ? markup.replace('data-motion', `data-motion to="${new Date(Date.now() + 185000).toISOString()}"`) : markup;
}
