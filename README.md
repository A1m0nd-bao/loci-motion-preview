# Lottie 动效预览库

## Web 动效组件库

网站的「Web 组件」分支收录 motion-components 1.3.0 的 49 个现行组件，支持中文搜索、分类、交互预览、数值参数调节、复制完整 HTML 和下载独立示例。可通过 `/#web` 直接进入。

另收录自定义「粉色勾选切换」：依据提供的两份 20×20 SVG 制作，可点击、键盘切换与快速反向操作，支持减少动态效果设置。实现位于 `web-components/selection-toggle.js`；详情页与导出的 HTML 使用同一实现，保留原图形和 `#ED78F4` 填充色。

自定义「图层落下叠加」保留提供的 20×20 图层 SVG：选中时方片依次从上方落下叠加，取消选中时恢复灰色图标。可调整时长和回弹；预览及导出的 HTML 共用 `web-components/layer-stack-toggle.js`，支持键盘、减少动态效果和中途取消。

自定义「人物探出回弹」保留提供的人物 SVG：选中动画开头头和身体完全藏于底部，再快速探出，拉伸、压缩后错位回弹，取消选中时置灰。预览及独立 HTML 共用 `web-components/profile-rise-toggle.js`，可调整时长与回弹。

自定义「扳手拧动回弹」以原始 SVG 扳口为支点，先小幅蓄力，再连续拧动两下并回弹收稳；取消选中时置灰。预览及独立 HTML 共用 `web-components/wrench-turn-toggle.js`，可调整时长与回弹。

自定义「历史时钟描绘旋转」保留原始 20×20 SVG 路径与 1.5px 白色描边，外圈、箭头和指针先收起再错峰绘出。外圈用负 dash offset 从路径末端逆时针绘制，同时图形以圆环真实圆心 (8.75194, 10) 为轴逆时针转一圈并轻微回弹，避免箭头改变包围盒而偏移轴心。SVG 允许旋转中的箭头越出画布而不裁切，按钮仍为 44×44。悬停或点击播放一次，可调总时长与回弹。预览和导出共用 `web-components/history-clock.js`。

自定义「图钉选中切换」按提供的两份 18×18 SVG 在实心选中态和带斜杠的取消态之间切换，保留原始路径及 60% / 40% 透明度；斜杠收放与图钉落位分段进行。另提供「实心图钉出现」：独立的下落、摆正和轻微回弹入场，可重播或隐藏。实现分别位于 `web-components/pin-toggle.js` 与 `web-components/pin-reveal.js`，支持键盘、快速切换、减少动态效果及独立 HTML 导出。

自定义「灵动语音条」保留 58×28 气泡与五根 2px 圆头声纹，按错开的音节、重音和换气节奏循环。动态更新端点以保持圆头及线宽，默认静止，选中后开始跳动，取消选中后平滑收稳，支持节奏周期与幅度调整、减少动态效果及独立 HTML 导出。实现位于 `web-components/voice-wave.js`，示例不包含音频。

自定义「铃铛通知反馈」保留提供的 36×36 底座和路径：鼠标移入轻摇一次，停留不循环；点击以 0.64 秒轻微下沉并柔和回位，始终保持原有比例和描边。点击时即时发出 `notification-request` 事件，由使用方连接既有通知弹窗；组件和示例不包含弹窗。支持独立调整悬停与点击时长、幅度、键盘、触屏、减少动态效果及 HTML 导出；预览和独立 HTML 共用 `web-components/bell-ring-toggle.js`。

- 目录与示例：`web-components/catalog.js`。组件数据独立于自动生成的 `manifest.json`，飞书同步不会覆盖它们。
- 预览运行在独立 iframe 中；离开可视区域或切换筛选时会清理实例。缩略预览默认静止，悬停时播放。
- 主站使用已提交的本地运行文件与可变字体，GitHub Pages 无需额外构建。下载的独立 HTML 通过固定版本的 jsDelivr CDN 加载依赖，需要联网。
- 修改依赖后，运行 `pnpm install --frozen-lockfile` 和 `pnpm build:web-components`，再提交 `web-components/vendor/` 中的构建产物。
- 原项目：[tgomilar/motion-components](https://github.com/tgomilar/motion-components)，作者 Tanja Gomilar。MIT 及依赖许可完整保存在 `web-components/vendor/THIRD-PARTY-NOTICES.txt`；Inter 字体使用 SIL OFL。

## Motion 原生示例与 Studio

主站新增独立的 `/#motion` 分支，收录 6 个基于免费 Motion API 制作的原生 JavaScript 示例：弹簧切换、错峰入场、悬停按压、时间线编排、SVG 路径绘制、滚动关联进度。支持交互、参数调整、复制完整 HTML 与下载；原有 `/#web` 的 58 个组件保持独立。

Motion 固定为 13.5.1，与已有自定义图标使用的版本一致。修改 `motion/demos.js` 后运行 `pnpm build:motion`：生成公开站使用的本地运行文件与独立导出源码，避免开发期 Studio 插桩进入下载的 HTML。开源许可见 `web-components/vendor/THIRD-PARTY-NOTICES.txt`。

本地 Studio（Node.js 22.13+）：

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev:studio
```

打开 `http://127.0.0.1:4180/motion/studio.html`，可直接在时间线上预览、移动关键帧和调整曲线。按 Alt+T 开关编辑器。`MOTION_STUDIO_AGENT_PROVIDER=codex` 已配置于本机 `.env.local`；Codex SDK 使用现有 `codex login` 登录，不需要把凭据写入项目。`.env.local` 不提交。

Studio 仅运行在 Vite 本地开发环境；线上 GitHub Pages 继续使用静态文件，保留 Python 静态预览方式。免费模式可检查、编辑并预览；Studio 的自动写回和 AI 编辑属于另行订阅的功能，本次未启用。

本机 Codex 已安装 Motion 官方技能，并接入免费文档 MCP：`https://mcp.motion.dev`。新会话可使用该技能查询文档、编写和调整 Motion 动效。此配置独立于平台源码，Motion+ 服务未启用。

官方说明：[AI Kit 安装](https://motion.dev/docs/ai-kit-install) · [Studio 配置](https://motion.dev/docs/studio)。

## 使用方式

1. 把 Lottie JSON 放进 `lotties/`，可以按目录分组，例如 `lotties/Login/success.json`。
2. 在当前目录运行 `npm run manifest`，它会自动生成 `manifest.json`。
3. 运行 `npm run start`，打开 `http://localhost:4173`。

页面支持搜索、分类筛选、网格/列表切换、播放暂停、变速、循环开关、复制 JSON 路径，也可以拖入本地 JSON 做临时预览。

## 飞书表格自动同步

1. 复制配置模板：

```bash
cp lark-sync.config.example.json lark-sync.config.json
```

2. 在 `lark-sync.config.json` 里填入飞书表格 URL、工作表 ID、读取范围和列名。
   `rowStart` / `rowEnd` 可以限制实际处理的数据行，行号按飞书表格左侧真实行号计算；读取范围仍建议包含表头行。
   `pruneMissing` 为 `true` 时，表格范围内已删除或替换掉的附件会从网站下架。

推荐表头：

| 名称 | 分类 | 标签 | JSON文件 |
| --- | --- | --- | --- |
| login success | Login | success loop | 上传或粘贴 JSON 文件链接 |

3. 登录飞书授权后启动同步：

```bash
lark-cli auth login --domain sheets
lark-cli auth login --scope "drive:file:download"
npm run sync:watch
```

同步器会轮询表格，发现 `JSON文件` 列出现新的飞书文件链接或 file token 后，自动下载到 `lotties/`，并重新生成 `manifest.json`。

如果当前目录已连接 GitHub Pages 仓库，可以使用：

```bash
npm run sync:watch:publish
```

它会在发现新 JSON 后自动提交并推送 `lotties/` 和 `manifest.json`，GitHub Pages 随后发布更新。

## 团队协作建议

- 每个动效一个稳定文件名，例如 `login-success.json`。
- 用文件夹作为分类，例如 `Loading`、`Login`、`Checkout`。
- 在评审或交付前运行一次 `npm run manifest`，把更新后的 `manifest.json` 一起提交。
