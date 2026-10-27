# 自定义动效接入说明

本文件和 custom-elements.json 来自已核对的组件源码与 handoff.js；运行 npm run docs:components 更新。

## 当前交付范围

共 23 个自定义动效，21 个 Figma 位置参考。位置说明保存在网站与源码，Figma 画布注释尚未全部同步。selectionMode=single 时由父级唯一选择值驱动，重复点击当前项不取消；selectionMode=multiple 时每项独立增删选中集合，不影响其他项。contextStatus=needs-confirmation 的暂停自动业务绑定。读取每条 annotationStatus，website-only 不代表已写回画布；有 adaptation 的必须按说明适配；triggerStatus=needs-confirmation 的不能自行绑定播放触发。正式 Code Connect 因当前账号套餐限制未启用。figma-bindings.json 是本项目的节点对照记录，不是 Code Connect 格式。没有绑定的动效仅提供建议用途，不应按图形相似自动替换整页。

## 研发 / AI 三步使用

1. 从 Figma 图层名中的动效 ID 和画布交付注释，核对精确节点。三项创作 Tab 优先复用 sipplay-tap-tab；其子图标不要重复绑定。
2. 阅读对应组件的属性、事件和交互范围。将 web-components 源码目录复制到项目，npm install motion@13.5.1，通过 registerMotion(tagName, animate) 初始化。此目录不是已经发布的 npm 包，不要安装虚构的 sipplay 包。
3. 交互组件以业务状态初始化并调用 finish()；之后通过 property 更新状态、监听公开事件连接业务。生图加载组件随请求设置 active=true，开始后不调用 finish()。保留原设计尺寸与已有业务功能。先验证一处，再批量复用。

## 项目集成

- register.js 是浏览器初始化入口；在 SSR 项目客户端生命周期中调用。使用项目已有的 Motion 依赖，不要重复插入 CDN。
- 单独下载的 HTML 联网可运行，包含预览样式；业务项目只取必要组件、初始化和参数，不复制放大预览布局。
- 交互组件通常含内部按钮，不能直接放到另一个 button 内；生图加载组件为无按钮的展示组件。接入已有按钮时应适配图标视图，保持单一点击与焦点入口。多数独立图标点击区是 44×44，与 SVG 原始图形尺寸不同。
- active/expanded 是布尔属性，active="false" 仍为 true；关闭用 el.active=false 或 removeAttribute。先注册，再设置 property。
- 外部写入 active/selected/value 不发出用户事件；请求失败与回滚、路由、音频和弹窗由业务层控制。
- React/Vue/SSR 要按项目配置识别自定义元素，事件用 DOM addEventListener 连接最明确；不要假定这是已经封装好的 React/Vue 组件。
- 保留键盘、减少动态效果和卸载清理；不要让多个引擎同时写同一 SVG 属性。

## 设计节点记录与核对状态

- [730:67212](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67212) → sipplay-brackets-tool：26×26 圆形按钮；复用图标反馈，保留原工具业务
- [730:67209](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67209) → sipplay-image-tool：整枚 26×26 工具按钮；保留原图片选择、校验及上传流程
- [730:82191](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82191) → sipplay-bottom-bar：整组 375×48 导航；优先父级绑定，四枚子图标不另接业务点击
- [730:82201](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82201) → sipplay-user-page-toggle：仅图标；active = 当前路由为用户页，由整组导航统一驱动
- [730:82199](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82199) → sipplay-plus-selection-toggle：仅图标；active = 当前路由为添加，由整组导航统一驱动
- [730:82194](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82194) → sipplay-home-settle-toggle：仅图标；active = 当前路由为首页，由整组导航统一驱动
- [730:67273](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67273) → sipplay-warning-nudge：消息操作浮层的举报图标；不得改成自动错误提示
- [730:98165](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-98165) → sipplay-liquid-rise-toggle：Upload / Generate 上方的液面图形；位置已确认，触发待确认；按被动图形接入
- [730:82196](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82196) → sipplay-chat-bubble-toggle：仅图标；active = 当前路由为聊天，由整组导航统一驱动
- [730:95317](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95317) → sipplay-tap-tab：整组导航；优先复用组合组件，三个图标由父级统一驱动
- [730:95330](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95330) → sipplay-preview-tabs：整组分段控件；selected = 0（Chat）或 1（Feed）
- [730:67269](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67269) → sipplay-history-clock：消息操作浮层的时钟图标；保留 Backtrack 文案与原业务点击
- [730:68771](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-68771) → sipplay-bell-ring-toggle：36×36 通知入口；未读角标由业务外层保留
- [730:67162](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67162) → sipplay-voice-wave：角色消息左上声纹按钮；active 由这条消息的真实音频播放状态驱动
- [730:67903](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67903) → sipplay-pin-toggle：斜杠图钉的双态交互位置；active 绑定真实置顶状态
- [730:67915](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67915) → sipplay-pin-reveal：消息气泡右下角的实心图钉；作为状态标记，不新增点击入口
- [730:95327](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95327) → sipplay-wrench-turn-toggle：仅图标；active = 当前步骤为 advanced
- [730:95319](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95319) → sipplay-profile-rise-toggle：仅图标；active = 当前步骤为 character
- [730:95323](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95323) → sipplay-layer-stack-toggle：仅图标；active = 当前步骤为 intro
- [730:82029](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82029) → sipplay-white-selection-toggle：反馈类型列表右侧的白色勾选；每项独立增删选中集合，不取消其他项
- [730:102857](https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-102857) → sipplay-selection-toggle：粉色单选勾选；由父级唯一选择值统一驱动，重复点击当前项不取消

## 批量接入给 AI 的指令

读取本文件、custom-elements.json 与 figma-bindings.json；精确匹配 Figma fileKey + nodeId 或已标注动效 ID。优先复用组合组件，保留设计稿尺寸，绑定真实业务状态和公开事件。没有确认位置的列为待绑定，不猜路由与接口、不批量替换相似图标。输出每个修改的设计节点、动效 ID、代码位置、状态字段和验证结果。

## 各组件交付注释

### 订阅积分滑动 Tab

```text
动效：订阅积分滑动 Tab / sipplay-billing-tabs
位置：Subscription / Credits 两项分段切换控件。对应本次提供的 SVG；尚未绑定具体 Figma 节点。
Figma：待绑定；仅凭图标相似不得批量替换
适配：保留 250×35、17.5 圆角、6px 背景模糊和原始字形。两项宽度分别为 130 / 120，底片随目标项宽度适配；默认按 SVG 选中 Credits。
注释同步：位置待核对
触发：沿用提供 HTML：切换时底片以 0.46 秒、bounce=0.14 的弹簧滑动，短暂 scaleX=1.055、scaleY=0.965 后复位；文字亮度 1 / 0.48 同步过渡。重复点击当前项不重播。
状态：selected；默认 1，接入时以业务状态覆盖
事件：motion-change → { active, selected, value }
业务接入：selected=0 / value=subscription；selected=1 / value=credits。value 是只读派生值；外部设置 selected 不发用户事件。监听 motion-change 切换业务内容，组件本身不发起支付或积分操作。保留左右方向键、Home / End、唯一 Tab 焦点与减少动态效果。
参数：duration=0.46（时长（秒））；bounce=0.14（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/billing-tabs.js；初始化 defineBillingTabs(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-billing-tabs
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 生图流光吸饮

```text
动效：生图流光吸饮 / sipplay-image-sip-loading
位置：正在生成图片的 125×125 占位图。使用本次提供的白底、圆角、粉橘渐变与杯形图片 SVG；替换生图中的占位内容，不覆盖 Upload / Generate 操作按钮。
Figma：待绑定；仅凭图标相似不得批量替换
适配：保留 125×125 画布与 rx=16 比例，图标中心和杯口、吸管的原始路径。预览中的 2× 放大仅便于观察，不进入产品布局。
注释同步：位置待核对
触发：生图请求开始时 active=true 循环：吸管柔和插入 → 沿用彩色液面参考的连续波纹与 3.2 秒向左流动节奏，同时按设计液位降低 → 吸空后两滴水沿吸管口向右飞出并下落 → 吸管收回 → 重新蓄满。成功、失败或取消时由业务移除加载态；减少动态效果时静态展示。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-cycle → { iteration: number }
业务接入：纯展示组件，无内部按钮或点击切换。active 绑定真实请求的 loading 状态；动画循环不是进度或成功信号，不显示虚构百分比。成功后替换为生成图片，失败显示原有重试界面。卸载与浏览器后台会停止或暂停动画。
参数：duration=5.8（吸饮周期（秒））；flow-duration=8（流光周期（秒））
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/image-sip-loading.js；初始化 defineImageSipLoading(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-image-sip-loading
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 括号工具单击高亮

```text
动效：括号工具单击高亮 / sipplay-brackets-tool
位置：Web 聊天页：底部 Your message 输入框右侧，与图片工具并排的 26×26 圆形 ( ) 按钮。
Figma：聊天输入框 / ( ) 工具 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67212
适配：原稿括号是 SF Pro 文本，组件为 SVG 字形；保持原稿视觉与字号，不要求逐路径一致。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：悬停提亮、点击短亮后自动恢复；不保留选中。
状态：无持久状态；默认 静止，接入时以业务状态覆盖
事件：tool-activate → { icon: 'brackets' }
业务接入：监听 tool-activate 执行项目原有括号工具操作；设计稿未说明具体编辑语义，不把它猜成代码编辑器或新路由。没有 active 状态。
参数：duration=0.18（提亮时长（秒））
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/tool-highlight.js；初始化 defineToolHighlight(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-brackets-tool
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 添加图片单击高亮

```text
动效：添加图片单击高亮 / sipplay-image-tool
位置：Web 聊天页：底部 Your message 输入框右侧，26×26 圆形添加图片工具。内图形与源码路径一致。
Figma：聊天输入框 / 添加图片 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67209
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：悬停提亮、点击短亮后自动恢复；不保留选中。
状态：无持久状态；默认 静止，接入时以业务状态覆盖
事件：tool-activate → { icon: 'image' }
业务接入：监听 tool-activate 打开现有图片选择器；组件不上传文件，没有 active 状态。
参数：duration=0.18（提亮时长（秒））
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/tool-highlight.js；初始化 defineToolHighlight(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-image-tool
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 四页动效底栏

```text
动效：四页动效底栏 / sipplay-bottom-bar
位置：移动 Web Feed 页底部 Frame 3507 整组导航，375×48；四项依次为首页、聊天、添加、用户。不要替换旁边 Safari 的 Nav bar 或 Home Indicator。
Figma：移动 Web / 四项底部导航 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82191
适配：保持原稿四项图标间距、底栏背景和安全区；聊天图标原稿是三点，组件选中态为波形，按页面视觉要求适配。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：互斥切换时播放相应图标；重复点击当前项只重播图标。
状态：value；默认 home，接入时以业务状态覆盖
事件：nav-change → { value, previous, index, label }
业务接入：value 绑定当前路由，监听 nav-change 执行业务导航；组件不包含页面和路由器。外部设置 value 不发出 nav-change。
参数：speed=1（播放速度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/bottom-bar.js；初始化 defineBottomBar(animate)
依赖：sipplay-home-settle-toggle, sipplay-chat-bubble-toggle, sipplay-plus-selection-toggle, sipplay-user-page-toggle（先注册）
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-bottom-bar
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 用户页探出选中

```text
动效：用户页探出选中 / sipplay-user-page-toggle
位置：移动 Web Feed 页底部四项导航的第四项：用户头像轮廓，24×24。原图层名是 plus.circle 3，实际画的是人物。
Figma：移动 Web 底栏 / 用户 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82201
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：选中时头部、身体从底部先后探出，白色伴随探出，以独立 S 型缓动 [0.6,0,0.4,1] 由身体底部向上填满，再到头部；取消时恢复线框。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在底栏中由父级导航驱动；与创建页 20px 的人物图标分别使用。
参数：duration=0.64（切换时长（秒））；strength=1（回弹幅度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/user-page-toggle.js；初始化 defineUserPageToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-user-page-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 加号选中填白

```text
动效：加号选中填白 / sipplay-plus-selection-toggle
位置：移动 Web Feed 页底部四项导航的第三项：圆形加号，24×24。
Figma：移动 Web 底栏 / 添加 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82199
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：选中时圆形填白，加号保持透明镂空；取消时恢复灰态。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在底栏中由父级导航驱动；这是可保持选中的导航状态，不等同于一次性添加操作。
参数：duration=0.46（切换时长（秒））；bounce=0.18（填白回弹）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/plus-selection-toggle.js；初始化 definePlusSelectionToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-plus-selection-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 首页填白落定

```text
动效：首页填白落定 / sipplay-home-settle-toggle
位置：移动 Web Feed 页底部四项导航的第一项：首页图标，24×24。
Figma：移动 Web 底栏 / 首页 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82194
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：选中时轻压起跳、填白并回弹落定；取消时恢复线框。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在底栏中由父级导航驱动；独立使用时 active 绑定当前路由。
参数：duration=0.56（切换时长（秒））；strength=1（回弹幅度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/home-settle-toggle.js；初始化 defineHomeSettleToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-home-settle-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 警示牌弹性提醒

```text
动效：警示牌弹性提醒 / sipplay-warning-nudge
位置：Web 聊天页：消息操作浮层中的 Report（举报）入口，20×20 三角图标。
Figma：聊天消息 / Report https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67273
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：举报入口点击时单次提醒；不循环。不要因页面渲染、消息到达或鼠标经过就自动报警。
状态：无持久状态；默认 静止，接入时以业务状态覆盖
事件：motion-replay → 无 detail
业务接入：此处为 Report 操作，不是字段校验错误。保留既有举报面板与业务点击；只给图标加单次反馈，不等待动画完成才打开举报流程。
参数：duration=0.82（时长（秒））；strength=1（提醒幅度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/warning-nudge.js；初始化 defineWarningNudge(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-warning-nudge
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 彩色液面升起流动

```text
动效：彩色液面升起流动 / sipplay-liquid-rise-toggle
位置：创建页 Character Setup → Appearance：尚未设置角色图片时，Upload / Generate 两个入口上方的加号、杯子与渐变液面图标。位于“创建生成图片链路更新”的首次图片设置页面。
Figma：创建页 Appearance / 图片设置引导图形 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-98165
适配：Figma 选区为 40.04×40，整体透明度 80%；组件 SVG 为 41×40。保留原稿位置、尺寸、透明度及杯子/加号/渐变；不得把示例 44px 内部按钮直接替换进去。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：位置与图形已确认；何时开始注入、何时回落尚待设计确认。确认前保持设计稿静态外观，不因进入页面、悬停、点击 Upload / Generate 或请求进行中而自动播放。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：此处是图片设置区域的引导图形，不是已确认的开关或进度指示器。组件 active 仅控制液面升起/回落；不能绑定生成百分比。保留原有 Upload / Generate 业务按钮，图形使用被动视图，不新增点击切换、按钮或 Tab 焦点。触发策略确认后再绑定对应业务事件。
参数：duration=0.78（升起时长（秒））；flow-duration=3.2（流动周期（秒））；strength=1（起伏幅度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/liquid-rise-toggle.js；初始化 defineLiquidRiseToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-liquid-rise-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 对话气泡唤醒

```text
动效：对话气泡唤醒 / sipplay-chat-bubble-toggle
位置：移动 Web Feed 页底部四项导航的第二项：聊天气泡，24×24。
Figma：移动 Web 底栏 / 聊天 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82196
适配：原稿气泡内为三个点；动效组件选中态是波形。位置已确认，接入时保留原稿内符号或明确采用动效选中态，不能声称逐像素一致。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：选中时气泡填充并绘出波形，取消时反向收笔。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在底栏中由父级导航驱动；独立使用时 active 绑定当前路由是否为聊天页，不表示语音播放。
参数：duration=0.64（时长（秒））；bounce=0.22（绘制弹性）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/chat-bubble-toggle.js；初始化 defineChatBubbleToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-chat-bubble-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 灵动 Tap Tab

```text
动效：灵动 Tap Tab / sipplay-tap-tab
位置：创建页 Character Setup / Intro / Advanced Settings 整组导航；保留 Figma 的 912×37 布局、文字与间距，复用组件交互与动画。示例的 44px 点击区和自适应布局需要按项目适配。
Figma：创建页三项 Tab https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95317
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：Figma 画布与网站已同步
触发：切换到新 Tab 时播放对应图标并移动下划线；再次点击当前项只重播图标。初次挂载直接显示当前业务状态。
状态：value；默认 character，接入时以业务状态覆盖
事件：tab-change → { value, previous, index }
业务接入：value 绑定当前创作步骤；监听 tab-change 更新步骤或路由。使用 character / intro / advanced 命名 slot 放面板，或由业务层切换外部面板。外部设置 value 不发出 tab-change。
参数：duration=0.3（切换时长（秒））；bounce=0.18（速度伸缩）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/tap-tab.js；初始化 defineTapTab(animate)
依赖：sipplay-profile-rise-toggle, sipplay-layer-stack-toggle, sipplay-wrench-turn-toggle（先注册）
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-tap-tab
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 预览 Tab 滑动切换

```text
动效：预览 Tab 滑动切换 / sipplay-preview-tabs
位置：创建页右侧 Chat Preview / Feed Preview 分段切换整组控件。
Figma：创建页预览切换 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95330
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：Figma 画布与网站已同步
触发：切换选项时，底片滑动、轻微拉伸回弹，文字亮度同步变化；重复点击当前项不重播。
状态：selected；默认 0，接入时以业务状态覆盖
事件：motion-change → { active, selected, value }
业务接入：selected=0 对应 chat；selected=1 对应 feed。监听 motion-change，用 detail.value 切换业务预览；外部更新使用 selected 属性或 property，value 是只读派生值。组件不含预览页面。
参数：duration=0.46（时长（秒））；bounce=0.14（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/preview-tabs.js；初始化 definePreviewTabs(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-preview-tabs
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 历史时钟描绘旋转

```text
动效：历史时钟描绘旋转 / sipplay-history-clock
位置：Web 聊天页：消息操作浮层中的 Backtrack（回溯）入口，20×20。不是通用历史记录列表入口。
Figma：聊天消息 / Backtrack https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67269
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：悬停或点击重播一次；外部可 replay()。
状态：无持久状态；默认 静止，接入时以业务状态覆盖
事件：motion-replay → 无 detail
业务接入：没有 active 状态。保留既有 Backtrack 点击与回溯流程；hover/click 播放动画，motion-replay 仅表示动画开始，不触发或确认回溯。
参数：duration=0.8（总时长（秒））；bounce=0.4（填白回弹）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/history-clock.js；初始化 defineHistoryClock(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-history-clock
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 铃铛通知反馈

```text
动效：铃铛通知反馈 / sipplay-bell-ring-toggle
位置：Web 首页顶栏 RecoilRoot 中的 36×36 通知铃铛，带独立未读提示层。已核对 bell SVG；创建页同名 Notification 图层是皇冠，不适用。
Figma：Web 首页顶栏 / 通知铃铛 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-68771
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：鼠标移入轻摇一次，点击轻沉回位并立即发出通知请求。
状态：expanded；默认 false，接入时以业务状态覆盖
事件：notification-request → 无 detail
业务接入：监听 notification-request 打开既有通知弹窗；expanded 同步真实弹窗开关，仅用于可访问状态。不要等待动画结束才打开弹窗。
参数：duration=0.7（轻摇时长（秒））；click-duration=0.64（点击时长（秒））；strength=1（动效幅度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/bell-ring-toggle.js；初始化 defineBellRingToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-bell-ring-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 灵动语音条

```text
动效：灵动语音条 / sipplay-voice-wave
位置：Web 聊天页：角色消息气泡左上方的五条声纹播放入口，可见于 Frame 3549；与消息气泡连接。
Figma：角色聊天消息 / 语音入口 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67162
适配：此稿外框约 59×33，底色随消息主题；示例固定 58×28、深色。保留原稿位置、形状、底色和五条声纹节奏，不能整块覆盖为示例黑底。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：active=true 循环声纹；false 时平滑收稳。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：只提供视觉，不含音频播放器。以真实音频 playing / pause / ended / error 事件驱动 active；点击事件应交给业务音频控制，不以动画启动作为播放成功。
参数：duration=4.8（节奏周期（秒））；strength=1（声纹幅度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/voice-wave.js；初始化 defineVoiceWave(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-voice-wave
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 图钉选中切换

```text
动效：图钉选中切换 / sipplay-pin-toggle
位置：Web 聊天页 Frame 4675：取消置顶状态的斜杠图钉，18×18；与同屏消息角落的实心图钉区分。
Figma：Web 聊天 / 图钉状态按钮 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67903
适配：原稿图钉含旋转和布尔裁切，保留该位置的尺寸及原有点击区。页面未说明接口时，不自行添加请求。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：选中时收起斜杠、实心图钉落下回弹；取消时恢复未置顶图形。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：active 绑定是否已置顶；监听 motion-change 连接业务。请求时机与失败回滚由业务层决定。
参数：duration=0.52（时长（秒））；bounce=0.28（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/pin-toggle.js；初始化 definePinToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-pin-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 实心图钉出现

```text
动效：实心图钉出现 / sipplay-pin-reveal
位置：Web 聊天页 Frame 4675：消息气泡右下角的实心图钉标记，18×18。它标识消息已置顶。
Figma：Web 聊天 / 已置顶消息标记 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67915
适配：组件示例含内部按钮；这里的设计是消息状态标记，接入时改为被动图标，并保留原稿背景与透明度。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：active=true 时出现；带 active 挂载也会播放出现动画。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：active 绑定这条消息是否已置顶，仅在标记出现时播放。作为纯状态标记使用时应提取被动图标视图，不新增按钮、点击切换或 Tab 焦点；不能与置顶操作按钮重复执行业务。初始静态显示时调用 finish()。
参数：duration=0.64（时长（秒））；bounce=0.28（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/pin-reveal.js；初始化 definePinReveal(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-pin-reveal
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 扳手拧动回弹

```text
动效：扳手拧动回弹 / sipplay-wrench-turn-toggle
位置：Advanced Settings 左侧扳手图标。
Figma：Advanced Settings / 扳手图标 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95327
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：Figma 画布与网站已同步
触发：对应 Tab 选中时，以扳口为轴连续拧动两次、回弹收稳；取消选中置灰。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 advanced。
参数：duration=0.84（时长（秒））；bounce=0.28（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/wrench-turn-toggle.js；初始化 defineWrenchTurnToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-wrench-turn-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 人物探出回弹

```text
动效：人物探出回弹 / sipplay-profile-rise-toggle
位置：Character Setup 左侧人物图标。
Figma：Character Setup / 人物图标 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95319
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：Figma 画布与网站已同步
触发：对应 Tab 从未选中变为选中时，人物从底部探出并回弹；取消选中置灰。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在 Tap Tab 中由父组件驱动 active，不再单独绑定业务点击。独立使用时，active 绑定当前项是否选中。
参数：duration=0.64（时长（秒））；bounce=0.3（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/profile-rise-toggle.js；初始化 defineProfileRiseToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-profile-rise-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 图层落下叠加

```text
动效：图层落下叠加 / sipplay-layer-stack-toggle
位置：Intro 左侧图层图标。
Figma：Intro / 图层图标 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95323
适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
注释同步：Figma 画布与网站已同步
触发：对应 Tab 从未选中变为选中时，方片依次落下叠合；取消选中置灰。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 intro。
参数：duration=0.72（时长（秒））；bounce=0.24（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/layer-stack-toggle.js；初始化 defineLayerStackToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-layer-stack-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 白色勾选切换

```text
动效：白色勾选切换 / sipplay-white-selection-toggle
位置：Web 设置 → Help & Feedback → Submit Feedback：反馈类型列表每行右侧的圆形勾选。节点 730:82029 是 Suggestion 行的已选状态，用于多选。
Figma：Submit Feedback / Suggestion 多选勾选 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82029
选择规则：多选；每项独立切换，重复点击可取消，不影响其他项
适配：原稿选区为 20×20，白色圆底与镂空勾；保持原稿尺寸及列表间距。复用勾选动效视图接入现有 checkbox，避免把示例 44px 内部按钮嵌入已有控件或新增焦点入口。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：每个选项独立切换：选中时白色圆底弹出，镂空勾从左侧短笔连续画到右上长笔，取消时沿原路径收回。再次点击已选项可以取消；不改变其他项。初次挂载直接显示已有选中集合。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：沿用项目现有的反馈类型多选数组或集合；active = 已选集合是否包含本项 ID。选中只添加本项，取消只移除本项，不清空其他项、不使用单一 selectedId，也不根据选中动画自动提交反馈。保留原有 checkbox 语义、Space 键操作与焦点管理。提交时读取真实集合；数量限制、必选规则等沿用既有业务，不额外猜测。
参数：duration=0.32（时长（秒））；bounce=0.15（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/white-selection-toggle.js；初始化 defineWhiteSelectionToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-white-selection-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

### 粉色勾选切换

```text
动效：粉色勾选切换 / sipplay-selection-toggle
位置：粉色圆形勾选用于单选，对应 Figma 节点 730:102857。接入现有单选组，沿用项目已有的业务字段。
Figma：粉色勾选 / 单选 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-102857
选择规则：单选；父级唯一值驱动，重复点击当前项不取消
适配：组件 SVG 为 20×20、粉色 #ED78F4；节点实际尺寸与颜色尚未复核，按原稿核对。现成组件内部是独立 toggle 按钮，不能原样当作 radio 使用；应提取动效视图接入原有单选控件，避免按钮嵌套或新增焦点入口。
注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
触发：单选组切换到新选项时，新项弹出粉色圆底并画勾，旧项恢复空心圆。再次点击当前项保持选中，不反向取消；初次挂载直接显示当前选项。
状态：active；默认 false，接入时以业务状态覆盖
事件：motion-change → { active: boolean }
业务接入：由单选组唯一的 selectedId / value（名称沿用项目）统一驱动：active = 当前组值等于本项 ID。点击只请求选择本项；当前项不能被再次点击取消。不要让每枚组件独立 toggle()，不要新增多选数组。复用动效视图，并保留现有 radio / radiogroup 语义、方向键与焦点管理；选中不代表提交成功。
参数：duration=0.32（时长（秒））；bounce=0.15（回弹程度）
源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/selection-toggle.js；初始化 defineSelectionToggle(animate)
依赖：Motion animate
API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-selection-toggle
注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
```

## 使用的既有流程

- [Figma Code Connect](https://developers.figma.com/docs/code-connect/)：正式映射路径，当前未启用。
- [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)：公开 API 的标准清单格式。本项目从源码声明和经核对的交付信息生成，非已接入 Storybook 的声明。
- [JSDoc 注释约定](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)：源码使用 @attribute / @fires / @slot 描述接口。
