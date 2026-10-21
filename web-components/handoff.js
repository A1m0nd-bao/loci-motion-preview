// Placement notes are project documentation. Public element APIs are also
// published in the standard Custom Elements Manifest at /custom-elements.json.
export const siteURL = "https://a1m0nd-bao.github.io/loci-motion-preview/";
export const figmaFile = "KZyY9qkYbf0yiwqcovRKy3";
export const figmaURL = id => `https://www.figma.com/design/${figmaFile}/Untitled?node-id=${id.replace(":", "-")}`;
export const definitions = {
  "sipplay-tap-tab": {
    "source": "tap-tab.js",
    "initializer": "defineTapTab",
    "state": "value",
    "initial": "character",
    "values": [
      "character",
      "intro",
      "advanced"
    ],
    "placement": "创建页 Character Setup / Intro / Advanced Settings 整组导航；保留 Figma 的 912×37 布局、文字与间距，复用组件交互与动画。示例的 44px 点击区和自适应布局需要按项目适配。",
    "trigger": "切换到新 Tab 时播放对应图标并移动下划线；再次点击当前项只重播图标。初次挂载直接显示当前业务状态。",
    "event": "tab-change",
    "payload": "{ value, previous, index }",
    "integration": "value 绑定当前创作步骤；监听 tab-change 更新步骤或路由。使用 character / intro / advanced 命名 slot 放面板，或由业务层切换外部面板。外部设置 value 不发出 tab-change。",
    "dependencies": [
      "sipplay-profile-rise-toggle",
      "sipplay-layer-stack-toggle",
      "sipplay-wrench-turn-toggle"
    ],
    "slots": [
      "character",
      "intro",
      "advanced"
    ],
    "figma": [
      {
        "nodeId": "730:95317",
        "name": "创建页三项 Tab",
        "placement": "整组导航；优先复用组合组件，三个图标由父级统一驱动",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95317",
        "annotationStatus": "canvas-and-website"
      }
    ]
  },
  "sipplay-profile-rise-toggle": {
    "source": "profile-rise-toggle.js",
    "initializer": "defineProfileRiseToggle",
    "size": "20×20",
    "state": "active",
    "placement": "Character Setup 左侧人物图标。",
    "trigger": "对应 Tab 从未选中变为选中时，人物从底部探出并回弹；取消选中置灰。",
    "integration": "在 Tap Tab 中由父组件驱动 active，不再单独绑定业务点击。独立使用时，active 绑定当前项是否选中。",
    "figma": [
      {
        "nodeId": "730:95319",
        "name": "Character Setup / 人物图标",
        "placement": "仅图标；active = 当前步骤为 character",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95319",
        "annotationStatus": "canvas-and-website"
      }
    ]
  },
  "sipplay-layer-stack-toggle": {
    "source": "layer-stack-toggle.js",
    "initializer": "defineLayerStackToggle",
    "size": "20×20",
    "state": "active",
    "placement": "Intro 左侧图层图标。",
    "trigger": "对应 Tab 从未选中变为选中时，方片依次落下叠合；取消选中置灰。",
    "integration": "在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 intro。",
    "figma": [
      {
        "nodeId": "730:95323",
        "name": "Intro / 图层图标",
        "placement": "仅图标；active = 当前步骤为 intro",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95323",
        "annotationStatus": "canvas-and-website"
      }
    ]
  },
  "sipplay-wrench-turn-toggle": {
    "source": "wrench-turn-toggle.js",
    "initializer": "defineWrenchTurnToggle",
    "size": "20×20",
    "state": "active",
    "placement": "Advanced Settings 左侧扳手图标。",
    "trigger": "对应 Tab 选中时，以扳口为轴连续拧动两次、回弹收稳；取消选中置灰。",
    "integration": "在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 advanced。",
    "figma": [
      {
        "nodeId": "730:95327",
        "name": "Advanced Settings / 扳手图标",
        "placement": "仅图标；active = 当前步骤为 advanced",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95327",
        "annotationStatus": "canvas-and-website"
      }
    ]
  },
  "sipplay-preview-tabs": {
    "source": "preview-tabs.js",
    "initializer": "definePreviewTabs",
    "size": "312×37",
    "state": "selected",
    "initial": "0",
    "values": [
      "0",
      "1"
    ],
    "placement": "创建页右侧 Chat Preview / Feed Preview 分段切换整组控件。",
    "trigger": "切换选项时，底片滑动、轻微拉伸回弹，文字亮度同步变化；重复点击当前项不重播。",
    "event": "motion-change",
    "payload": "{ active, selected, value }",
    "integration": "selected=0 对应 chat；selected=1 对应 feed。监听 motion-change，用 detail.value 切换业务预览；外部更新使用 selected 属性或 property，value 是只读派生值。组件不含预览页面。",
    "figma": [
      {
        "nodeId": "730:95330",
        "name": "创建页预览切换",
        "placement": "整组分段控件；selected = 0（Chat）或 1（Feed）",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95330",
        "annotationStatus": "canvas-and-website"
      }
    ]
  },
  "sipplay-pin-toggle": {
    "source": "pin-toggle.js",
    "initializer": "definePinToggle",
    "size": "18×18",
    "state": "active",
    "placement": "Web 聊天页 Frame 4675：取消置顶状态的斜杠图钉，18×18；与同屏消息角落的实心图钉区分。",
    "trigger": "选中时收起斜杠、实心图钉落下回弹；取消时恢复未置顶图形。",
    "integration": "active 绑定是否已置顶；监听 motion-change 连接业务。请求时机与失败回滚由业务层决定。",
    "figma": [
      {
        "nodeId": "730:67903",
        "name": "Web 聊天 / 图钉状态按钮",
        "placement": "斜杠图钉的双态交互位置；active 绑定真实置顶状态",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67903",
        "annotationStatus": "website-only",
        "adaptation": "原稿图钉含旋转和布尔裁切，保留该位置的尺寸及原有点击区。页面未说明接口时，不自行添加请求。"
      }
    ],
    "adaptation": "原稿图钉含旋转和布尔裁切，保留该位置的尺寸及原有点击区。页面未说明接口时，不自行添加请求。"
  },
  "sipplay-pin-reveal": {
    "source": "pin-reveal.js",
    "initializer": "definePinReveal",
    "size": "18×18",
    "state": "active",
    "placement": "Web 聊天页 Frame 4675：消息气泡右下角的实心图钉标记，18×18。它标识消息已置顶。",
    "trigger": "active=true 时出现；带 active 挂载也会播放出现动画。",
    "integration": "active 绑定这条消息是否已置顶，仅在标记出现时播放。作为纯状态标记使用时应提取被动图标视图，不新增按钮、点击切换或 Tab 焦点；不能与置顶操作按钮重复执行业务。初始静态显示时调用 finish()。",
    "figma": [
      {
        "nodeId": "730:67915",
        "name": "Web 聊天 / 已置顶消息标记",
        "placement": "消息气泡右下角的实心图钉；作为状态标记，不新增点击入口",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67915",
        "annotationStatus": "website-only",
        "adaptation": "组件示例含内部按钮；这里的设计是消息状态标记，接入时改为被动图标，并保留原稿背景与透明度。"
      }
    ],
    "adaptation": "组件示例含内部按钮；这里的设计是消息状态标记，接入时改为被动图标，并保留原稿背景与透明度。"
  },
  "sipplay-selection-toggle": {
    "source": "selection-toggle.js",
    "initializer": "defineSelectionToggle",
    "size": "20×20",
    "state": "active",
    "placement": "粉色圆形勾选用于单选，对应 Figma 节点 730:102857。接入现有单选组，沿用项目已有的业务字段。",
    "trigger": "单选组切换到新选项时，新项弹出粉色圆底并画勾，旧项恢复空心圆。再次点击当前项保持选中，不反向取消；初次挂载直接显示当前选项。",
    "integration": "由单选组唯一的 selectedId / value（名称沿用项目）统一驱动：active = 当前组值等于本项 ID。点击只请求选择本项；当前项不能被再次点击取消。不要让每枚组件独立 toggle()，不要新增多选数组。复用动效视图，并保留现有 radio / radiogroup 语义、方向键与焦点管理；选中不代表提交成功。",
    "adaptation": "组件 SVG 为 20×20、粉色 #ED78F4；节点实际尺寸与颜色尚未复核，按原稿核对。现成组件内部是独立 toggle 按钮，不能原样当作 radio 使用；应提取动效视图接入原有单选控件，避免按钮嵌套或新增焦点入口。",
    "verification": "user-specified",
    "figma": [
      {
        "nodeId": "730:102857",
        "name": "粉色勾选 / 单选",
        "placement": "粉色单选勾选；由父级唯一选择值统一驱动，重复点击当前项不取消",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-102857",
        "annotationStatus": "website-only",
        "verification": "user-specified",
        "selectionMode": "single",
        "integrationMode": "adapt-view"
      }
    ],
    "selectionMode": "single",
    "integrationMode": "adapt-view"
  },
  "sipplay-white-selection-toggle": {
    "source": "white-selection-toggle.js",
    "initializer": "defineWhiteSelectionToggle",
    "size": "20×20",
    "state": "active",
    "placement": "Web 设置 → Help & Feedback → Submit Feedback：反馈类型列表每行右侧的圆形勾选。节点 730:82029 是 Suggestion 行的已选状态，用于多选。",
    "trigger": "每个选项独立切换：选中时白色圆底弹出并画出镂空勾，取消时反向恢复。再次点击已选项可以取消；不改变其他项。初次挂载直接显示已有选中集合。",
    "integration": "沿用项目现有的反馈类型多选数组或集合；active = 已选集合是否包含本项 ID。选中只添加本项，取消只移除本项，不清空其他项、不使用单一 selectedId，也不根据选中动画自动提交反馈。保留原有 checkbox 语义、Space 键操作与焦点管理。提交时读取真实集合；数量限制、必选规则等沿用既有业务，不额外猜测。",
    "adaptation": "原稿选区为 20×20，白色圆底与镂空勾；保持原稿尺寸及列表间距。复用勾选动效视图接入现有 checkbox，避免把示例 44px 内部按钮嵌入已有控件或新增焦点入口。",
    "selectionMode": "multiple",
    "integrationMode": "adapt-view",
    "verification": "visual-and-user-confirmed",
    "figma": [
      {
        "nodeId": "730:82029",
        "name": "Submit Feedback / Suggestion 多选勾选",
        "placement": "反馈类型列表右侧的白色勾选；每项独立增删选中集合，不取消其他项",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82029",
        "annotationStatus": "website-only",
        "verification": "visual-and-user-confirmed",
        "selectionMode": "multiple",
        "integrationMode": "adapt-view"
      }
    ]
  },
  "sipplay-voice-wave": {
    "source": "voice-wave.js",
    "initializer": "defineVoiceWave",
    "size": "58×28",
    "state": "active",
    "placement": "Web 聊天页：角色消息气泡左上方的五条声纹播放入口，可见于 Frame 3549；与消息气泡连接。",
    "trigger": "active=true 循环声纹；false 时平滑收稳。",
    "integration": "只提供视觉，不含音频播放器。以真实音频 playing / pause / ended / error 事件驱动 active；点击事件应交给业务音频控制，不以动画启动作为播放成功。",
    "figma": [
      {
        "nodeId": "730:67162",
        "name": "角色聊天消息 / 语音入口",
        "placement": "角色消息左上声纹按钮；active 由这条消息的真实音频播放状态驱动",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67162",
        "annotationStatus": "website-only",
        "adaptation": "此稿外框约 59×33，底色随消息主题；示例固定 58×28、深色。保留原稿位置、形状、底色和五条声纹节奏，不能整块覆盖为示例黑底。"
      }
    ],
    "adaptation": "此稿外框约 59×33，底色随消息主题；示例固定 58×28、深色。保留原稿位置、形状、底色和五条声纹节奏，不能整块覆盖为示例黑底。"
  },
  "sipplay-liquid-rise-toggle": {
    "source": "liquid-rise-toggle.js",
    "initializer": "defineLiquidRiseToggle",
    "size": "41×40",
    "state": "active",
    "placement": "创建页 Character Setup → Appearance：尚未设置角色图片时，Upload / Generate 两个入口上方的加号、杯子与渐变液面图标。位于“创建生成图片链路更新”的首次图片设置页面。",
    "trigger": "位置与图形已确认；何时开始注入、何时回落尚待设计确认。确认前保持设计稿静态外观，不因进入页面、悬停、点击 Upload / Generate 或请求进行中而自动播放。",
    "integration": "此处是图片设置区域的引导图形，不是已确认的开关或进度指示器。组件 active 仅控制液面升起/回落；不能绑定生成百分比。保留原有 Upload / Generate 业务按钮，图形使用被动视图，不新增点击切换、按钮或 Tab 焦点。触发策略确认后再绑定对应业务事件。",
    "adaptation": "Figma 选区为 40.04×40，整体透明度 80%；组件 SVG 为 41×40。保留原稿位置、尺寸、透明度及杯子/加号/渐变；不得把示例 44px 内部按钮直接替换进去。",
    "triggerStatus": "needs-confirmation",
    "figma": [
      {
        "nodeId": "730:98165",
        "name": "创建页 Appearance / 图片设置引导图形",
        "placement": "Upload / Generate 上方的液面图形；位置已确认，触发待确认；按被动图形接入",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-98165",
        "annotationStatus": "website-only",
        "triggerStatus": "needs-confirmation",
        "adaptation": "40.04×40、整体透明度80%；保留原稿外观；从带按钮的示例提取被动图形，不直接新增交互。"
      }
    ]
  },
  "sipplay-chat-bubble-toggle": {
    "source": "chat-bubble-toggle.js",
    "initializer": "defineChatBubbleToggle",
    "size": "24×24",
    "state": "active",
    "placement": "移动 Web Feed 页底部四项导航的第二项：聊天气泡，24×24。",
    "trigger": "选中时气泡填充并绘出波形，取消时反向收笔。",
    "integration": "在底栏中由父级导航驱动；独立使用时 active 绑定当前路由是否为聊天页，不表示语音播放。",
    "figma": [
      {
        "nodeId": "730:82196",
        "name": "移动 Web 底栏 / 聊天",
        "placement": "仅图标；active = 当前路由为聊天，由整组导航统一驱动",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82196",
        "annotationStatus": "website-only",
        "adaptation": "原稿气泡内为三个点；动效组件选中态是波形。位置已确认，接入时保留原稿内符号或明确采用动效选中态，不能声称逐像素一致。"
      }
    ],
    "adaptation": "原稿气泡内为三个点；动效组件选中态是波形。位置已确认，接入时保留原稿内符号或明确采用动效选中态，不能声称逐像素一致。"
  },
  "sipplay-home-settle-toggle": {
    "source": "home-settle-toggle.js",
    "initializer": "defineHomeSettleToggle",
    "size": "24×24",
    "state": "active",
    "placement": "移动 Web Feed 页底部四项导航的第一项：首页图标，24×24。",
    "trigger": "选中时轻提、填白并落定；取消时恢复线框。",
    "integration": "在底栏中由父级导航驱动；独立使用时 active 绑定当前路由。",
    "figma": [
      {
        "nodeId": "730:82194",
        "name": "移动 Web 底栏 / 首页",
        "placement": "仅图标；active = 当前路由为首页，由整组导航统一驱动",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82194",
        "annotationStatus": "website-only"
      }
    ]
  },
  "sipplay-plus-selection-toggle": {
    "source": "plus-selection-toggle.js",
    "initializer": "definePlusSelectionToggle",
    "size": "24×24",
    "state": "active",
    "placement": "移动 Web Feed 页底部四项导航的第三项：圆形加号，24×24。",
    "trigger": "选中时圆形填白，加号保持透明镂空；取消时恢复灰态。",
    "integration": "在底栏中由父级导航驱动；这是可保持选中的导航状态，不等同于一次性添加操作。",
    "figma": [
      {
        "nodeId": "730:82199",
        "name": "移动 Web 底栏 / 添加",
        "placement": "仅图标；active = 当前路由为添加，由整组导航统一驱动",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82199",
        "annotationStatus": "website-only"
      }
    ]
  },
  "sipplay-user-page-toggle": {
    "source": "user-page-toggle.js",
    "initializer": "defineUserPageToggle",
    "size": "24×24",
    "state": "active",
    "placement": "移动 Web Feed 页底部四项导航的第四项：用户头像轮廓，24×24。原图层名是 plus.circle 3，实际画的是人物。",
    "trigger": "选中时头部、身体从底部先后探出；取消时恢复线框。",
    "integration": "在底栏中由父级导航驱动；与创建页 20px 的人物图标分别使用。",
    "figma": [
      {
        "nodeId": "730:82201",
        "name": "移动 Web 底栏 / 用户",
        "placement": "仅图标；active = 当前路由为用户页，由整组导航统一驱动",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82201",
        "annotationStatus": "website-only"
      }
    ]
  },
  "sipplay-bottom-bar": {
    "source": "bottom-bar.js",
    "initializer": "defineBottomBar",
    "size": "375×48",
    "state": "value",
    "initial": "home",
    "values": [
      "home",
      "chat",
      "add",
      "user"
    ],
    "placement": "移动 Web Feed 页底部 Frame 3507 整组导航，375×48；四项依次为首页、聊天、添加、用户。不要替换旁边 Safari 的 Nav bar 或 Home Indicator。",
    "trigger": "互斥切换时播放相应图标；重复点击当前项只重播图标。",
    "event": "nav-change",
    "payload": "{ value, previous, index, label }",
    "integration": "value 绑定当前路由，监听 nav-change 执行业务导航；组件不包含页面和路由器。外部设置 value 不发出 nav-change。",
    "dependencies": [
      "sipplay-home-settle-toggle",
      "sipplay-chat-bubble-toggle",
      "sipplay-plus-selection-toggle",
      "sipplay-user-page-toggle"
    ],
    "figma": [
      {
        "nodeId": "730:82191",
        "name": "移动 Web / 四项底部导航",
        "placement": "整组 375×48 导航；优先父级绑定，四枚子图标不另接业务点击",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82191",
        "annotationStatus": "website-only",
        "adaptation": "保持原稿四项图标间距、底栏背景和安全区；聊天图标原稿是三点，组件选中态为波形，按页面视觉要求适配。"
      }
    ],
    "adaptation": "保持原稿四项图标间距、底栏背景和安全区；聊天图标原稿是三点，组件选中态为波形，按页面视觉要求适配。"
  },
  "sipplay-bell-ring-toggle": {
    "source": "bell-ring-toggle.js",
    "initializer": "defineBellRingToggle",
    "size": "36×36",
    "state": "expanded",
    "placement": "Web 首页顶栏 RecoilRoot 中的 36×36 通知铃铛，带独立未读提示层。已核对 bell SVG；创建页同名 Notification 图层是皇冠，不适用。",
    "trigger": "鼠标移入轻摇一次，点击轻沉回位并立即发出通知请求。",
    "event": "notification-request",
    "payload": "无 detail",
    "extraEvents": [
      {
        "name": "motion-action",
        "payload": "{ action }",
        "description": "动画动作通知；不是打开弹窗的业务请求。"
      }
    ],
    "integration": "监听 notification-request 打开既有通知弹窗；expanded 同步真实弹窗开关，仅用于可访问状态。不要等待动画结束才打开弹窗。",
    "figma": [
      {
        "nodeId": "730:68771",
        "name": "Web 首页顶栏 / 通知铃铛",
        "placement": "36×36 通知入口；未读角标由业务外层保留",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-68771",
        "annotationStatus": "website-only"
      }
    ]
  },
  "sipplay-history-clock": {
    "source": "history-clock.js",
    "initializer": "defineHistoryClock",
    "size": "20×20",
    "placement": "Web 聊天页：消息操作浮层中的 Backtrack（回溯）入口，20×20。不是通用历史记录列表入口。",
    "trigger": "悬停或点击重播一次；外部可 replay()。",
    "event": "motion-replay",
    "payload": "无 detail",
    "extraEvents": [
      {
        "name": "motion-finish",
        "payload": "无 detail",
        "description": "本次动画自然播放完成时发出；finish() 不发出。"
      }
    ],
    "integration": "没有 active 状态。保留既有 Backtrack 点击与回溯流程；hover/click 播放动画，motion-replay 仅表示动画开始，不触发或确认回溯。",
    "figma": [
      {
        "nodeId": "730:67269",
        "name": "聊天消息 / Backtrack",
        "placement": "消息操作浮层的时钟图标；保留 Backtrack 文案与原业务点击",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67269",
        "annotationStatus": "website-only"
      }
    ]
  },
  "sipplay-warning-nudge": {
    "source": "warning-nudge.js",
    "initializer": "defineWarningNudge",
    "size": "20×20",
    "placement": "Web 聊天页：消息操作浮层中的 Report（举报）入口，20×20 三角图标。",
    "trigger": "举报入口点击时单次提醒；不循环。不要因页面渲染、消息到达或鼠标经过就自动报警。",
    "event": "motion-replay",
    "payload": "无 detail",
    "extraEvents": [
      {
        "name": "motion-finish",
        "payload": "无 detail",
        "description": "动画完成或 finish() 提前结束时发出。"
      }
    ],
    "integration": "此处为 Report 操作，不是字段校验错误。保留既有举报面板与业务点击；只给图标加单次反馈，不等待动画完成才打开举报流程。",
    "figma": [
      {
        "nodeId": "730:67273",
        "name": "聊天消息 / Report",
        "placement": "消息操作浮层的举报图标；不得改成自动错误提示",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67273",
        "annotationStatus": "website-only"
      }
    ]
  },
  "sipplay-brackets-tool": {
    "source": "tool-highlight.js",
    "initializer": "defineToolHighlight",
    "size": "26×26",
    "placement": "Web 聊天页：底部 Your message 输入框右侧，与图片工具并排的 26×26 圆形 ( ) 按钮。",
    "trigger": "悬停提亮、点击短亮后自动恢复；不保留选中。",
    "event": "tool-activate",
    "payload": "{ icon: 'brackets' }",
    "integration": "监听 tool-activate 执行项目原有括号工具操作；设计稿未说明具体编辑语义，不把它猜成代码编辑器或新路由。没有 active 状态。",
    "figma": [
      {
        "nodeId": "730:67212",
        "name": "聊天输入框 / ( ) 工具",
        "placement": "26×26 圆形按钮；复用图标反馈，保留原工具业务",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67212",
        "annotationStatus": "website-only",
        "adaptation": "原稿括号是 SF Pro 文本，组件为 SVG 字形；保持原稿视觉与字号，不要求逐路径一致。"
      }
    ],
    "adaptation": "原稿括号是 SF Pro 文本，组件为 SVG 字形；保持原稿视觉与字号，不要求逐路径一致。"
  },
  "sipplay-image-tool": {
    "source": "tool-highlight.js",
    "initializer": "defineToolHighlight",
    "size": "26×26",
    "placement": "Web 聊天页：底部 Your message 输入框右侧，26×26 圆形添加图片工具。内图形与源码路径一致。",
    "trigger": "悬停提亮、点击短亮后自动恢复；不保留选中。",
    "event": "tool-activate",
    "payload": "{ icon: 'image' }",
    "integration": "监听 tool-activate 打开现有图片选择器；组件不上传文件，没有 active 状态。",
    "figma": [
      {
        "nodeId": "730:67209",
        "name": "聊天输入框 / 添加图片",
        "placement": "整枚 26×26 工具按钮；保留原图片选择、校验及上传流程",
        "url": "https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67209",
        "annotationStatus": "website-only"
      }
    ]
  }
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
    ...(d.selectionMode ? [`选择规则：${d.selectionMode === "single" ? "单选；父级唯一值驱动，重复点击当前项不取消" : "多选；每项独立切换，重复点击可取消，不影响其他项"}`] : []),
    `适配：${d.adaptation ?? "保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套"}`,
    `注释同步：${d.figma.length ? (d.figma.every(n => n.annotationStatus === "canvas-and-website") ? "Figma 画布与网站已同步" : "此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布") : "位置待核对"}`,
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
  if (d.selectionMode === "multiple") return `<!-- ${d.id}：多选。
Figma：${d.figma[0].url}
复用现有 checkbox，只替换勾选动效视图，不新增交互按钮。
图标状态：active = 已选集合是否包含本项 ID；初次挂载后 finish()。
勾选：只向集合添加本项；取消：只移除本项；不影响其他项。
保留原有 Space 键、焦点、校验与提交逻辑；选中动画不触发提交。 -->`;
  if (d.selectionMode === "single") return `<!-- ${d.id}：单选。
Figma：${d.figma[0].url}
复用原有 radio / radiogroup；不要直接挂载示例的独立 toggle 按钮。
图标状态：active = (单选组当前值 === 本项 ID)，初次挂载后 finish()。
点击：只请求父级选择本项，重复点击当前项不取消；旧项由父级设为 false。
沿用现有字段、键盘与焦点逻辑；仅将勾选视图替换为这里的动效。 -->`;
  if (d.contextStatus === "needs-confirmation") return `<!-- ${d.id}：页面用途与选择规则待核对。
Figma：${d.figma[0].url}
当前保留原稿和既有业务，不新增点击、单选/多选或提交逻辑。
核对业务语义后再设置 active 并连接 motion-change；此处暂不提供自动接入代码。 -->`;
  if (d.triggerStatus === "needs-confirmation") return `<!-- ${d.id}：位置已确认，播放触发待确认。
当前保留此节点的原稿静态 SVG：${d.figma[0].url}
${d.adaptation}
不要直接挂载示例的交互按钮，也不要将 active 绑定生成进度。
触发策略确认后再接入动画；当前不提供自动播放代码。 -->`;
  const state = !d.state ? "// 无持久状态；按业务事件调用，不要每次渲染都重播。" : d.state === "value" ? `el.value = '${d.initial}'; // 替换为实际业务状态` : d.state === "selected" ? "el.selected = 0; // 0=chat，1=feed；用实际预览模式覆盖" : `el.${d.state} = false; // 用实际业务状态覆盖；不要写 active=\"false\"`;
  const slotMarkup = d.slots.map(s => `\n  <div slot="${s}"><!-- ${s} 实际面板内容 --></div>`).join("");
  return `<!-- 将 web-components 源码目录放入项目；复用现有 Motion 依赖。 -->\n<${d.id} id="motion-control" label="${d.name}">${slotMarkup}</${d.id}>\n\n<script type="module">\n  import { animate } from 'motion';\n  import { registerMotion } from './web-components/register.js';\n  registerMotion('${d.id}', animate);\n  const el = document.querySelector('#motion-control');\n  ${state}\n  el.finish(); // 初始化落在当前状态；后续状态变化保留动画\n  el.addEventListener('${d.event}', (event) => {\n    // ${d.payload}\n    // ${d.integration}\n  });\n</script>`;
}
