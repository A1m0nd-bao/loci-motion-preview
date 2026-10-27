import { billingTabsDemoMarkup } from "./billing-tabs.js?v=20261027-user-fill";
import { imageSipLoadingDemoMarkup } from "./image-sip-loading.js?v=20261027-user-fill";
import { bracketsToolDemoMarkup, imageToolDemoMarkup } from "./tool-highlight.js?v=20261027-user-fill";
import { bottomBarDemoMarkup } from "./bottom-bar.js?v=20261027-user-fill";
import { userPageDemoMarkup } from "./user-page-toggle.js?v=20261027-user-fill";
import { plusSelectionDemoMarkup } from "./plus-selection-toggle.js?v=20261027-user-fill";
import { homeSettleDemoMarkup } from "./home-settle-toggle.js?v=20261027-user-fill";
import { warningNudgeDemoMarkup } from "./warning-nudge.js?v=20261027-user-fill";
import { liquidRiseDemoMarkup } from "./liquid-rise-toggle.js?v=20261027-user-fill";
import { chatBubbleDemoMarkup } from "./chat-bubble-toggle.js?v=20261027-user-fill";
import { tapTabDemoMarkup } from "./tap-tab.js?v=20261027-user-fill";
import { previewTabsDemoMarkup } from "./preview-tabs.js?v=20261027-user-fill";
import { whiteSelectionDemoMarkup } from "./white-selection-toggle.js?v=20261027-user-fill";
import { historyClockDemoMarkup } from "./history-clock.js?v=20261027-user-fill";
import { bellRingDemoMarkup } from "./bell-ring-toggle.js?v=20261027-user-fill";
import { voiceWaveDemoMarkup } from "./voice-wave.js?v=20261027-user-fill";
import { pinToggleDemoMarkup } from "./pin-toggle.js?v=20261027-user-fill";
import { pinRevealDemoMarkup } from "./pin-reveal.js?v=20261027-user-fill";
import { selectionDemoMarkup } from "./selection-toggle.js?v=20261027-user-fill";
import { layerStackDemoMarkup } from "./layer-stack-toggle.js?v=20261027-user-fill";
import { profileRiseDemoMarkup } from "./profile-rise-toggle.js?v=20261027-user-fill";
import { wrenchTurnDemoMarkup } from "./wrench-turn-toggle.js?v=20261027-user-fill";

export const upstreamVersion = "1.3.0";
export const upstreamURL = "https://github.com/tgomilar/motion-components";

const number = (attribute, label, value, min, max, step = 0.1) => ({ attribute, label, value, min, max, step });
export const webMotions = [{
  id: "sipplay-billing-tabs", name: "订阅积分滑动 Tab", category: "状态切换",
  description: "保留提供的 250 × 35 毛玻璃胶囊、原始 Subscription / Credits 字形与白色底片。沿用预览 Tab 的弹簧滑动、轻微拉伸回弹和文字亮度变化；重复点击当前项不重播，支持快速反向、键盘、减少动态效果与完整 HTML 下载。默认选中 Credits。",
  markup: billingTabsDemoMarkup, controls: [number("duration", "时长（秒）", 0.46, 0.18, 1.2, 0.02), number("bounce", "回弹程度", 0.14, 0, 0.35, 0.01)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-billing-tabs",
  file: "./web-components/preview.html?id=sipplay-billing-tabs", docs: null, custom: true,
  tags: ["自定义 SVG", "Tab", "订阅", "积分", "Subscription", "Credits", "滑动", "毛玻璃", "250px"], interactionType: "点击切换",
}, {
  id: "sipplay-image-sip-loading", name: "生图流光吸饮", category: "加载状态",
  description: "背景柔和流光，吸管带轻微回弹插入，白色圆点保持不动，液面沿用彩色液面参考的连续波纹与 3.2 秒向左平移节奏，同时按设计液位柔和降低，吸管自然弯曲并伸向杯底；吸空后两滴水沿吸管口向右飞出并自然下落，重新蓄满后继续循环。沿用提供的 125 × 125 SVG，支持暂停、参数调整、减少动态效果和完整 HTML 下载。",
  markup: imageSipLoadingDemoMarkup,
  controls: [number("duration", "吸饮周期（秒）", 5.8, 3.6, 10, 0.2), number("flow-duration", "流光周期（秒）", 8, 4, 16, 0.5)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-image-sip-loading",
  file: "./web-components/preview.html?id=sipplay-image-sip-loading", docs: null, custom: true,
  tags: ["加载", "生图", "流光", "图片", "吸管", "液体", "125px"], interactionType: "持续加载",
}, {
  id: "sipplay-brackets-tool", name: "括号工具单击高亮", category: "鼠标交互",
  description: "独立的 26 × 26 括号工具。悬停临时提亮；单击时短暂加强边缘和底色，随后自动恢复到当前悬停或默认状态，不保留选中。保留原始路径、尺寸与灰态透明度，支持键盘、触屏、减少动态效果与独立 HTML 导出。",
  markup: bracketsToolDemoMarkup, controls: [number("duration", "提亮时长（秒）", 0.18, 0.08, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-brackets-tool",
  file: "./web-components/preview.html?id=sipplay-brackets-tool", docs: null, custom: true,
  tags: ["悬停", "高亮", "括号", "单击", "工具按钮", "26px"], interactionType: "悬停／单击反馈",
}, {
  id: "sipplay-image-tool", name: "添加图片单击高亮", category: "鼠标交互",
  description: "独立的 26 × 26 添加图片工具。悬停临时提亮；单击时短暂加强边缘和底色，随后自动恢复到当前悬停或默认状态，不保留选中。保留原始路径、尺寸与灰态透明度，支持键盘、触屏、减少动态效果与独立 HTML 导出。",
  markup: imageToolDemoMarkup, controls: [number("duration", "提亮时长（秒）", 0.18, 0.08, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-image-tool",
  file: "./web-components/preview.html?id=sipplay-image-tool", docs: null, custom: true,
  tags: ["悬停", "高亮", "图片", "添加图片", "单击", "工具按钮", "26px"], interactionType: "悬停／单击反馈",
}, {
  id: "sipplay-bottom-bar", name: "四页动效底栏", category: "交互组件",
  description: "按提供的 375 × 48 底栏组合首页、聊天、添加、用户四个已确认动效。保留 24px 图标、原始横向位置、70% 深色底和下投影；默认选中首页，点击互斥切换，重复点击当前项只重播图标。首页填白落定、气泡绘波、加号填白镂空、用户从底部探出。通过 nav-change 事件连接页面，支持键盘、触屏、减少动态效果、响应宽度与完整 HTML 导出。",
  markup: bottomBarDemoMarkup, controls: [number("speed", "播放速度", 1, 0.6, 1.6, 0.1)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-bottom-bar",
  file: "./web-components/preview.html?id=sipplay-bottom-bar", docs: null, custom: true,
  tags: ["底栏", "底部导航", "Bottom Bar", "首页", "聊天", "添加", "用户", "375px"], interactionType: "底部导航切换",
}, {
  id: "sipplay-user-page-toggle", name: "用户页探出选中", category: "动态图标",
  description: "保留提供的 24 × 24 人像路径、1.5px 描边和 40% 灰态透明度。选中时头部和身体先完全藏到画布底部，再以参考人物组件的节奏先后探出；身体拉伸、压缩收稳，头部稍晚并带更大的回弹；弹出时白色从身体底部向上填满，再到头部。取消时恢复原始灰色线框。头部与身体各保留单一路径，描边始终清晰，填充单独向上展开。支持快速反向、键盘、触屏、减少动态效果、暂停恢复和独立 HTML 导出。",
  markup: userPageDemoMarkup, controls: [number("duration", "切换时长（秒）", 0.64, 0.24, 1.2, 0.02), number("strength", "回弹幅度", 1, 0.4, 1.4, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-user-page-toggle",
  file: "./web-components/preview.html?id=sipplay-user-page-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "用户页", "个人中心", "人像", "头像", "选中", "填白", "24px"], interactionType: "点击切换",
}, {
  id: "sipplay-plus-selection-toggle", name: "加号选中填白", category: "动态图标",
  description: "保留原始 24 × 24 圆环与加号路径、1.5px 圆头描边和 90% 整体透明度。选中时轻压反馈，圆形从中心填白并轻微回弹，加号保持正向并成为透明镂空；再次点击收回填充，恢复灰色加号与圆环。透明镂空适配任意背景，轮廓始终使用单套路径，支持快速反向、键盘、触屏、减少动态效果、暂停恢复和独立 HTML 导出。",
  markup: plusSelectionDemoMarkup, controls: [number("duration", "切换时长（秒）", 0.46, 0.24, 1.2, 0.02), number("bounce", "填白回弹", 0.18, 0, 0.35, 0.01)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-plus-selection-toggle",
  file: "./web-components/preview.html?id=sipplay-plus-selection-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "添加", "选中", "加号", "Plus", "实心", "镂空", "双形态", "24px"], interactionType: "点击切换",
}, {
  id: "sipplay-home-settle-toggle", name: "首页填白落定", category: "动态图标",
  description: "保留原始 24 × 24 双态 SVG。选中时房屋轻压后起跳，白色从底部展开，随后轻微回弹落定；轮廓使用原始单一路径直接提亮；取消时填白收回，恢复 40% 白色线框。门洞始终镂空，支持快速反向、键盘、触屏、减少动态效果、暂停恢复和独立 HTML 导出。",
  markup: homeSettleDemoMarkup, controls: [number("duration", "切换时长（秒）", 0.56, 0.24, 1.2, 0.02), number("strength", "回弹幅度", 1, 0.4, 1.4, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-home-settle-toggle",
  file: "./web-components/preview.html?id=sipplay-home-settle-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "首页", "房屋", "Home", "填白", "选中状态", "24px"], interactionType: "点击切换",
}, {
  id: "sipplay-warning-nudge", name: "警示牌弹性提醒", category: "动态图标",
  description: "点击后，三角框轻压弹起并左右轻晃，感叹号和圆点错开半拍跟上，最后回到原位。保留原始 20 × 20 SVG 与 1.5px 描边，单次播放，支持快速重播、键盘与减少动态效果。",
  markup: warningNudgeDemoMarkup, controls: [number("duration", "时长（秒）", 0.82, 0.32, 1.6, 0.04), number("strength", "提醒幅度", 1, 0.4, 1.6, 0.1)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-warning-nudge",
  file: "./web-components/preview.html?id=sipplay-warning-nudge", docs: null, custom: true,
  tags: ["自定义 SVG", "警告", "提醒", "感叹号", "三角形", "弹性", "20px"], interactionType: "点击重播",
}, {
  id: "sipplay-liquid-rise-toggle", name: "彩色液面升起流动", category: "动态图标",
  description: "以提供的 41 × 40 SVG 为统一画布。点击后粉紫到暖金的渐变液面从底部升起，轻微回荡后持续流动；空态吸管按原图落在杯底，注入时随液面浮起并轻摆，再次点击时吸管先落回杯底、液体继续回落。保留原始外框、斜线、圆点、加号与 80% 透明度，液体被限制在容器内部。支持快速反向、键盘、触屏、减少动态效果与独立 HTML 导出。",
  markup: liquidRiseDemoMarkup, controls: [number("duration", "升起时长（秒）", 0.78, 0.3, 1.6, 0.02), number("flow-duration", "流动周期（秒）", 3.2, 1.6, 6, 0.2), number("strength", "起伏幅度", 1, 0.4, 1.5, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-liquid-rise-toggle",
  file: "./web-components/preview.html?id=sipplay-liquid-rise-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "液体", "液面", "渐变", "流动", "注入", "升起", "吸管", "加号"], interactionType: "点击注入／回落",
}, {
  id: "sipplay-chat-bubble-toggle", name: "对话气泡唤醒", category: "动态图标",
  description: "选中时气泡轻压蓄力、鼓起并变为实心，内部镂空波形随后沿路径从左到右绘出；取消时波形反向收笔，再回到灰色线框。保留两份原始 24 × 24 SVG 造型，支持快速反向与键盘操作。",
  markup: chatBubbleDemoMarkup, controls: [number("duration", "时长（秒）", 0.64, 0.24, 1.6, 0.04), number("bounce", "绘制弹性", 0.22, 0, 0.45, 0.01)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-chat-bubble-toggle",
  file: "./web-components/preview.html?id=sipplay-chat-bubble-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "对话", "聊天", "气泡", "波形", "选中状态", "24px"], interactionType: "点击切换",
}, {
  id: "sipplay-tap-tab", name: "灵动 Tap Tab", category: "交互组件",
  description: "将人物、图层、扳手三个已有动效组成互斥选中的 Tab。切换时图标播放原有动作，文字同步提亮，下划线静止时等长，切换时快速起步，短暂拉伸后连续收拢，落位后保持统一长度；再次点击当前项仅重播图标。保留 Character Setup、Intro、Advanced Settings 文案与必填星号。支持键盘、触屏、减少动态效果与独立 HTML 导出，通过 tab-change 事件连接页面内容。",
  markup: tapTabDemoMarkup, controls: [number("duration", "切换时长（秒）", 0.3, 0.16, 1.2, 0.02), number("bounce", "速度伸缩", 0.18, 0, 0.4, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-tap-tab",
  file: "./web-components/preview.html?id=sipplay-tap-tab", docs: null, custom: true,
  tags: ["Tab", "tapTab", "标签页", "导航", "人物", "图层", "扳手", "下划线"], interactionType: "Tab 切换",
}, {
  id: "sipplay-preview-tabs", name: "预览 Tab 滑动切换", category: "状态切换",
  description: "点击切换 Chat Preview 与 Feed Preview，选中底片平滑滑动、轻微拉伸并回弹，文字亮度同步过渡。保留原始 312 × 37 SVG 比例与字形，支持键盘和快速反向操作。",
  markup: previewTabsDemoMarkup, controls: [number("duration", "时长（秒）", 0.46, 0.18, 1.2, 0.02), number("bounce", "回弹程度", 0.14, 0, 0.35, 0.01)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-preview-tabs",
  file: "./web-components/preview.html?id=sipplay-preview-tabs",
  docs: null, custom: true,
  tags: ["自定义 SVG", "Tab", "标签页", "分段控件", "预览切换", "滑动", "弹簧"], interactionType: "点击切换",
}, {
  id: "sipplay-history-clock", name: "历史时钟描绘旋转", category: "动态图标",
  description: "恢复外圈、箭头和指针的错峰路径绘制；以圆环真实圆心 (8.75194, 10) 为轴，沿箭头方向逆时针旋转一整圈并轻微回弹。外圈描边也逆时针绘出，保留原始路径、比例与描边。悬停或点击播放一次。",
  markup: historyClockDemoMarkup, controls: [number("duration", "总时长（秒）", 0.8, 0.3, 1.6, 0.05), number("bounce", "填白回弹", 0.4, 0, 0.5, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-history-clock",
  file: "./web-components/preview.html?id=sipplay-history-clock", docs: null, custom: true,
  tags: ["自定义 SVG", "历史", "时钟", "逆时针", "描边", "整圈旋转", "draw rotate", "20px"], interactionType: "悬停／点击重播",
}, {
  id: "sipplay-bell-ring-toggle", name: "铃铛通知反馈", category: "动态图标",
  description: "鼠标移入轻摇一次；点击时轻微下沉，再柔和回位，保持铃铛原有比例和描边。只发出通知触发事件，不包含弹窗。保留原始 36 × 36 底座和描边。",
  markup: bellRingDemoMarkup, controls: [number("duration", "轻摇时长（秒）", 0.7, 0.4, 1.4, 0.05), number("click-duration", "点击时长（秒）", 0.64, 0.55, 1.6, 0.05), number("strength", "动效幅度", 1, 0.4, 1.4, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-bell-ring-toggle",
  file: "./web-components/preview.html?id=sipplay-bell-ring-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "铃铛", "提醒", "通知", "轻摇", "弹窗", "36px"], interactionType: "悬停／点击",
}, {
  id: "sipplay-voice-wave", name: "灵动语音条", category: "动态图标",
  description: "保留原始 58 × 28 气泡和五根圆头声纹。默认静止；点击选中后，错落的音节、重音和换气组成循环节奏，取消选中后平滑收稳。此示例为声纹动效，不包含音频。",
  markup: voiceWaveDemoMarkup, controls: [number("duration", "节奏周期（秒）", 4.8, 2.4, 8, 0.2), number("strength", "声纹幅度", 1, 0.35, 1.4, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-voice-wave",
  file: "./web-components/preview.html?id=sipplay-voice-wave", docs: null, custom: true,
  tags: ["自定义 SVG", "语音", "声纹", "音频", "发声", "播放", "气泡"], interactionType: "选中发声",
}, {
  id: "sipplay-pin-toggle", name: "图钉选中切换", category: "动态图标",
  description: "原始 18 × 18 双态图钉：选中时斜杠收起、实心图钉轻落回弹；取消选中时空心图钉与斜杠依次出现。保留原始路径及 60% / 40% 透明度。",
  markup: pinToggleDemoMarkup, controls: [number("duration", "时长（秒）", 0.52, 0.24, 1.8, 0.04), number("bounce", "回弹程度", 0.28, 0, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-pin-toggle",
  file: "./web-components/preview.html?id=sipplay-pin-toggle", docs: null, custom: true,
  tags: ["自定义 SVG", "图钉", "置顶", "取消置顶", "选中状态", "18px"], interactionType: "点击切换",
}, {
  id: "sipplay-pin-reveal", name: "实心图钉出现", category: "动态图标",
  description: "实心图钉从上方落下，轻微摆正、回弹收稳。打开即播放，可单独重播出现过程；点击图钉可隐藏。保留原始 18 × 18 实心路径与 60% 透明度。",
  markup: pinRevealDemoMarkup, controls: [number("duration", "时长（秒）", 0.64, 0.24, 1.8, 0.04), number("bounce", "回弹程度", 0.28, 0, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-pin-reveal",
  file: "./web-components/preview.html?id=sipplay-pin-reveal", docs: null, custom: true,
  tags: ["自定义 SVG", "图钉", "置顶", "实心", "入场", "出现", "18px"], interactionType: "出现重播",
}, {
  id: "sipplay-wrench-turn-toggle", name: "扳手拧动回弹", category: "动态图标",
  description: "选中时以扳口为支点，小幅蓄力后连续拧动两下，轻微回弹收稳；取消选中时置灰。保留原始 20 × 20 SVG。",
  markup: wrenchTurnDemoMarkup, controls: [number("duration", "时长（秒）", 0.84, 0.28, 1.8, 0.04), number("bounce", "回弹程度", 0.28, 0, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-wrench-turn-toggle",
  file: "./web-components/preview.html?id=sipplay-wrench-turn-toggle",
  docs: null, custom: true,
  tags: ["自定义 SVG", "扳手", "工具", "维修", "设置", "拧动", "选中状态", "20px"], interactionType: "点击切换",
}, {
  id: "sipplay-profile-rise-toggle", name: "人物探出回弹", category: "动态图标",
  description: "选中动画开头，头和身体完全隐藏在底部，再快速探出并错位回弹；取消选中时置灰。保留原始 20 × 20 SVG。",
  markup: profileRiseDemoMarkup, controls: [number("duration", "时长（秒）", 0.64, 0.24, 1.8, 0.04), number("bounce", "回弹程度", 0.3, 0, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-profile-rise-toggle",
  file: "./web-components/preview.html?id=sipplay-profile-rise-toggle",
  docs: null, custom: true,
  tags: ["自定义 SVG", "人物", "个人", "用户", "底部探出", "选中状态", "20px"], interactionType: "点击切换",
}, {
  id: "sipplay-layer-stack-toggle", name: "图层落下叠加", category: "动态图标",
  description: "选中时，方片从上方依次落下并叠成图层；取消选中时置灰。保留原始 20 × 20 SVG，支持快速切换与键盘操作。",
  markup: layerStackDemoMarkup, controls: [number("duration", "时长（秒）", 0.72, 0.24, 1.8, 0.04), number("bounce", "回弹程度", 0.24, 0, 0.5, 0.02)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-layer-stack-toggle",
  file: "./web-components/preview.html?id=sipplay-layer-stack-toggle",
  docs: null, custom: true,
  tags: ["自定义 SVG", "图层", "叠片", "选中状态", "20px"], interactionType: "点击切换",
}, {
  id: "sipplay-white-selection-toggle", name: "白色勾选切换", category: "动态图标",
  description: "白色圆底先弹出，稍停后画出镂空勾。与粉色勾选保持相同的时间曲线，保留原始 20 × 20 SVG 造型，支持双向切换。",
  markup: whiteSelectionDemoMarkup, controls: [number("duration", "时长（秒）", 0.32, 0.12, 1.5, 0.02), number("bounce", "回弹程度", 0.15, 0, 0.5, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-white-selection-toggle",
  file: "./web-components/preview.html?id=sipplay-white-selection-toggle",
  docs: null, custom: true,
  tags: ["自定义 SVG", "勾选", "白色", "镂空", "选中状态", "20px"], interactionType: "点击切换",
}, {
  id: "sipplay-selection-toggle", name: "粉色勾选切换", category: "动态图标",
  description: "点击在白色空心圆与粉色勾选之间双向切换。保留原始 20 × 20 SVG，支持快速反复点击。",
  markup: selectionDemoMarkup, controls: [number("duration", "时长（秒）", 0.32, 0.12, 1.5, 0.02), number("bounce", "回弹程度", 0.15, 0, 0.5, 0.05)],
  kind: "web", kindLabel: "Web 组件", fileName: "sipplay-selection-toggle",
  file: "./web-components/preview.html?id=sipplay-selection-toggle",
  docs: null, custom: true,
  tags: ["自定义 SVG", "勾选", "选中状态", "20px"], interactionType: "点击切换",
}];

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
