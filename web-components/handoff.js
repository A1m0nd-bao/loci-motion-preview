// Placement notes are project documentation. Public element APIs are also
// published in the standard Custom Elements Manifest at /custom-elements.json.
export const siteURL = "https://a1m0nd-bao.github.io/loci-motion-preview/";
export const figmaFile = "KZyY9qkYbf0yiwqcovRKy3";
export const figmaURL = id => `https://www.figma.com/design/${figmaFile}/Untitled?node-id=${id.replace(":", "-")}`;
const binding = (nodeId, name, placement) => ({ nodeId, name, placement, url: figmaURL(nodeId) });
export const definitions = {
  "sipplay-tap-tab": {
    source: "tap-tab.js", initializer: "defineTapTab", state: "value", initial: "character", values: ["character", "intro", "advanced"],
    placement: "创建页 Character Setup / Intro / Advanced Settings 整组导航；保留 Figma 的 912×37 布局、文字与间距，复用组件交互与动画。示例的 44px 点击区和自适应布局需要按项目适配。",
    trigger: "切换到新 Tab 时播放对应图标并移动下划线；再次点击当前项只重播图标。初次挂载直接显示当前业务状态。",
    event: "tab-change", payload: "{ value, previous, index }",
    integration: "value 绑定当前创作步骤；监听 tab-change 更新步骤或路由。使用 character / intro / advanced 命名 slot 放面板，或由业务层切换外部面板。外部设置 value 不发出 tab-change。",
    dependencies: ["sipplay-profile-rise-toggle", "sipplay-layer-stack-toggle", "sipplay-wrench-turn-toggle"],
    slots: ["character", "intro", "advanced"],
    figma: [binding("730:95317", "创建页三项 Tab", "整组导航；优先复用组合组件，三个图标由父级统一驱动")],
  },
  "sipplay-profile-rise-toggle": {
    source: "profile-rise-toggle.js", initializer: "defineProfileRiseToggle", size: "20×20", state: "active",
    placement: "Character Setup 左侧人物图标。", trigger: "对应 Tab 从未选中变为选中时，人物从底部探出并回弹；取消选中置灰。",
    integration: "在 Tap Tab 中由父组件驱动 active，不再单独绑定业务点击。独立使用时，active 绑定当前项是否选中。",
    figma: [binding("730:95319", "Character Setup / 人物图标", "仅图标；active = 当前步骤为 character")],
  },
  "sipplay-layer-stack-toggle": {
    source: "layer-stack-toggle.js", initializer: "defineLayerStackToggle", size: "20×20", state: "active",
    placement: "Intro 左侧图层图标。", trigger: "对应 Tab 从未选中变为选中时，方片依次落下叠合；取消选中置灰。",
    integration: "在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 intro。",
    figma: [binding("730:95323", "Intro / 图层图标", "仅图标；active = 当前步骤为 intro")],
  },
  "sipplay-wrench-turn-toggle": {
    source: "wrench-turn-toggle.js", initializer: "defineWrenchTurnToggle", size: "20×20", state: "active",
    placement: "Advanced Settings 左侧扳手图标。", trigger: "对应 Tab 选中时，以扳口为轴连续拧动两次、回弹收稳；取消选中置灰。",
    integration: "在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 advanced。",
    figma: [binding("730:95327", "Advanced Settings / 扳手图标", "仅图标；active = 当前步骤为 advanced")],
  },
  "sipplay-preview-tabs": {
    source: "preview-tabs.js", initializer: "definePreviewTabs", size: "312×37", state: "selected", initial: "0", values: ["0", "1"],
    placement: "创建页右侧 Chat Preview / Feed Preview 分段切换整组控件。",
    trigger: "切换选项时，底片滑动、轻微拉伸回弹，文字亮度同步变化；重复点击当前项不重播。",
    event: "motion-change", payload: "{ active, selected, value }",
    integration: "selected=0 对应 chat；selected=1 对应 feed。监听 motion-change，用 detail.value 切换业务预览；外部更新使用 selected 属性或 property，value 是只读派生值。组件不含预览页面。",
    figma: [binding("730:95330", "创建页预览切换", "整组分段控件；selected = 0（Chat）或 1（Feed）")],
  },
  "sipplay-pin-toggle": { source: "pin-toggle.js", initializer: "definePinToggle", size: "18×18", state: "active", placement: "建议用于置顶按钮的图钉区域；本次设计选区未确认位置。", trigger: "选中时收起斜杠、实心图钉落下回弹；取消时恢复未置顶图形。", integration: "active 绑定是否已置顶；监听 motion-change 连接业务。请求时机与失败回滚由业务层决定。" },
  "sipplay-pin-reveal": { source: "pin-reveal.js", initializer: "definePinReveal", size: "18×18", state: "active", placement: "建议用于已置顶标记的出现；本次设计选区未确认位置。", trigger: "active=true 时出现；带 active 挂载也会播放出现动画。", integration: "这是出现/隐藏效果，与图钉双态切换不同。初始需要静态显示时挂载后调用 finish()；业务状态仍由外部控制。" },
  "sipplay-selection-toggle": { source: "selection-toggle.js", initializer: "defineSelectionToggle", size: "20×20", state: "active", placement: "建议用于粉色圆形勾选控件；本次设计选区未确认位置，不能匹配到方形协议勾选框。", trigger: "选中时圆底弹出并画勾；取消时恢复空心圆。", integration: "active 绑定勾选数据；监听 motion-change 同步表单。图形不代表业务提交成功。" },
  "sipplay-white-selection-toggle": { source: "white-selection-toggle.js", initializer: "defineWhiteSelectionToggle", size: "20×20", state: "active", placement: "建议用于白色圆形勾选控件；本次设计选区未确认位置。", trigger: "白色圆底弹出后，镂空勾沿路径绘出；取消时反向恢复。", integration: "active 绑定勾选数据；不要仅因同为勾选就替换其他形状或颜色的控件。" },
  "sipplay-voice-wave": { source: "voice-wave.js", initializer: "defineVoiceWave", size: "58×28", state: "active", placement: "建议用于语音消息播放状态；本次设计选区未确认位置。", trigger: "active=true 循环声纹；false 时平滑收稳。", integration: "只提供视觉，不含音频播放器。以真实音频 playing / pause / ended / error 事件驱动 active；点击事件应交给业务音频控制，不以动画启动作为播放成功。" },
  "sipplay-liquid-rise-toggle": { source: "liquid-rise-toggle.js", initializer: "defineLiquidRiseToggle", size: "41×40", state: "active", placement: "建议用于同形液面注入图标；本次设计选区未确认位置。", trigger: "选中时液面升起后持续流动，取消时回落。", integration: "active 绑定产品定义的激活状态；不是下载进度条，没有 progress 接口。" },
  "sipplay-chat-bubble-toggle": { source: "chat-bubble-toggle.js", initializer: "defineChatBubbleToggle", size: "24×24", state: "active", placement: "建议用于聊天导航图标；本次设计选区未确认位置。", trigger: "选中时气泡填充并绘出波形，取消时反向收笔。", integration: "在底栏中由父级导航驱动；独立使用时 active 绑定当前路由是否为聊天页，不表示语音播放。" },
  "sipplay-home-settle-toggle": { source: "home-settle-toggle.js", initializer: "defineHomeSettleToggle", size: "24×24", state: "active", placement: "建议用于首页导航图标；本次设计选区未确认位置。", trigger: "选中时轻提、填白并落定；取消时恢复线框。", integration: "在底栏中由父级导航驱动；独立使用时 active 绑定当前路由。" },
  "sipplay-plus-selection-toggle": { source: "plus-selection-toggle.js", initializer: "definePlusSelectionToggle", size: "24×24", state: "active", placement: "建议用于添加页导航图标；本次设计选区未确认位置。", trigger: "选中时圆形填白，加号保持透明镂空；取消时恢复灰态。", integration: "在底栏中由父级导航驱动；这是可保持选中的导航状态，不等同于一次性添加操作。" },
  "sipplay-user-page-toggle": { source: "user-page-toggle.js", initializer: "defineUserPageToggle", size: "24×24", state: "active", placement: "建议用于用户页导航图标；本次设计选区未确认位置。", trigger: "选中时头部、身体从底部先后探出；取消时恢复线框。", integration: "在底栏中由父级导航驱动；与创建页 20px 的人物图标分别使用。" },
  "sipplay-bottom-bar": {
    source: "bottom-bar.js", initializer: "defineBottomBar", size: "375×48", state: "value", initial: "home", values: ["home", "chat", "add", "user"],
    placement: "建议用于首页/聊天/添加/用户四页底部导航整组；本次设计选区未确认位置。", trigger: "互斥切换时播放相应图标；重复点击当前项只重播图标。",
    event: "nav-change", payload: "{ value, previous, index, label }",
    integration: "value 绑定当前路由，监听 nav-change 执行业务导航；组件不包含页面和路由器。外部设置 value 不发出 nav-change。",
    dependencies: ["sipplay-home-settle-toggle", "sipplay-chat-bubble-toggle", "sipplay-plus-selection-toggle", "sipplay-user-page-toggle"],
  },
  "sipplay-bell-ring-toggle": {
    source: "bell-ring-toggle.js", initializer: "defineBellRingToggle", size: "36×36", state: "expanded",
    placement: "建议用于同形铃铛通知入口；本次设计选区的同名按钮未确认是此图形。", trigger: "鼠标移入轻摇一次，点击轻沉回位并立即发出通知请求。",
    event: "notification-request", payload: "无 detail",
    extraEvents: [{ name: "motion-action", payload: "{ action }", description: "动画动作通知；不是打开弹窗的业务请求。" }],
    integration: "监听 notification-request 打开既有通知弹窗；expanded 同步真实弹窗开关，仅用于可访问状态。不要等待动画结束才打开弹窗。",
  },
  "sipplay-history-clock": {
    source: "history-clock.js", initializer: "defineHistoryClock", size: "20×20", placement: "建议用于历史记录入口；本次设计选区未确认位置。", trigger: "悬停或点击重播一次；外部可 replay()。",
    event: "motion-replay", payload: "无 detail", extraEvents: [{ name: "motion-finish", payload: "无 detail", description: "本次动画自然播放完成时发出；finish() 不发出。" }],
    integration: "没有 active 状态；历史记录面板由业务层响应点击打开，motion-replay 仅表示动画开始。",
  },
  "sipplay-warning-nudge": {
    source: "warning-nudge.js", initializer: "defineWarningNudge", size: "20×20", placement: "建议用于同形三角警示图标；本次设计选区未确认位置。", trigger: "点击或外部 replay() 单次提醒；不循环。",
    event: "motion-replay", payload: "无 detail", extraEvents: [{ name: "motion-finish", payload: "无 detail", description: "动画完成或 finish() 提前结束时发出。" }],
    integration: "由校验提示出现或严重程度变化等业务事件触发 replay()，不要在每次页面渲染时重播；具体错误字段由页面层提供。",
  },
  "sipplay-brackets-tool": { source: "tool-highlight.js", initializer: "defineToolHighlight", size: "26×26", placement: "建议用于同形括号工具按钮；本次设计选区未确认位置。", trigger: "悬停提亮、点击短亮后自动恢复；不保留选中。", event: "tool-activate", payload: "{ icon: 'brackets' }", integration: "监听 tool-activate 执行现有编辑器操作；没有 active 状态。" },
  "sipplay-image-tool": { source: "tool-highlight.js", initializer: "defineToolHighlight", size: "26×26", placement: "建议用于同形添加图片工具按钮；本次设计选区未确认位置。", trigger: "悬停提亮、点击短亮后自动恢复；不保留选中。", event: "tool-activate", payload: "{ icon: 'image' }", integration: "监听 tool-activate 打开现有图片选择器；组件不上传文件，没有 active 状态。" },
};

export const commonNotes = [
  "原生 Web Components + SVG；Motion 13.5.1。公开 API 见 custom-elements.json；设计位置见本页节点链接。",
  "组件已含交互按钮；不要嵌套在另一个 button 内。组合导航中的子图标由父级 inert 容器接管交互。独立复用到现有按钮时，需要提取图标视图并保留单一点击与焦点入口。",
  "图形尺寸与点击区分别处理：多数独立图标的宿主/按钮为 44×44；仅修改 host 的 width 不会同步缩小内部按钮。不要把示例放大样式带到产品。",
  "active / expanded 是布尔属性：存在即 true，active=\"false\" 仍为 true。通过 el.active=false 或移除属性取消。先注册元素，再写 property；初始属性建议在挂载前设置。",
  "业务数据是状态来源；外部写入 active / selected / value 不会自动发出用户事件。请求失败时由业务层回滚；不要猜测接口或路由名。",
  "同一 SVG 属性只交给一个动画引擎控制。保留组件的减少动态效果、键盘操作、暂停及卸载清理逻辑。",
];

export function getHandoff(entry) {
  const d = definitions[entry.id];
  if (!entry.custom || !d) return null;
  return { ...d, id: entry.id, name: entry.name, controls: entry.controls,
    initial: d.initial ?? (d.state ? "false" : "静止"),
    event: d.event ?? "motion-change", payload: d.payload ?? "{ active: boolean }",
    figma: d.figma ?? [], dependencies: d.dependencies ?? [], slots: d.slots ?? [],
    sourcePath: `web-components/${d.source}`,
    sourceURL: `https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/${d.source}`,
    previewURL: `${siteURL}web-components/preview.html?id=${entry.id}`,
  };
}

export function handoffText(entry, values = {}) {
  const d = getHandoff(entry);
  if (!d) return "";
  return [
    `动效：${d.name} / ${d.id}`, `位置：${d.placement}`,
    `Figma：${d.figma.length ? d.figma.map(n => `${n.name} ${n.url}`).join("；") : "待绑定；仅凭图标相似不得批量替换"}`,
    `触发：${d.trigger}`, `状态：${d.state ?? "无持久状态"}；默认 ${d.initial}，接入时以业务状态覆盖`,
    `事件：${d.event} → ${d.payload}`, `业务接入：${d.integration}`,
    `参数：${d.controls.map(c => `${c.attribute}=${values[c.attribute] ?? c.value}（${c.label}）`).join("；")}`,
    `源码：${d.sourceURL}；初始化 ${d.initializer}(animate)`,
    `依赖：${d.dependencies.length ? d.dependencies.join(", ") + "（先注册）" : "Motion animate"}`,
    `API 清单：${siteURL}custom-elements.json`, `预览：${d.previewURL}`,
    "注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。",
    "映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。",
  ].join("\n");
}

export function integrationSnippet(entry) {
  const d = getHandoff(entry);
  if (!d) return "";
  const state = !d.state ? "// 无持久状态；按业务事件调用，不要每次渲染都重播。" : d.state === "value" ? `el.value = '${d.initial}'; // 替换为实际业务状态` : d.state === "selected" ? "el.selected = 0; // 0=chat，1=feed；用实际预览模式覆盖" : `el.${d.state} = false; // 用实际业务状态覆盖；不要写 active=\"false\"`;
  const slotMarkup = d.slots.map(s => `\n  <div slot="${s}"><!-- ${s} 实际面板内容 --></div>`).join("");
  return `<!-- 将 web-components 源码目录放入项目；复用现有 Motion 依赖。 -->\n<${d.id} id="motion-control" label="${d.name}">${slotMarkup}</${d.id}>\n\n<script type="module">\n  import { animate } from 'motion';\n  import { registerMotion } from './web-components/register.js';\n  registerMotion('${d.id}', animate);\n  const el = document.querySelector('#motion-control');\n  ${state}\n  el.finish(); // 初始化落在当前状态；后续状态变化保留动画\n  el.addEventListener('${d.event}', (event) => {\n    // ${d.payload}\n    // ${d.integration}\n  });\n</script>`;
}
