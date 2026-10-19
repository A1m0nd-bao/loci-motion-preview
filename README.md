# Lottie 动效预览库

## Web 动效组件库

网站的「Web 组件」分支收录 motion-components 1.3.0 的 49 个现行组件，支持中文搜索、分类、交互预览、数值参数调节、复制完整 HTML 和下载独立示例。可通过 `/#web` 直接进入。

另收录自定义「粉色勾选切换」：依据提供的两份 20×20 SVG 制作，可点击、键盘切换与快速反向操作，支持减少动态效果设置。实现位于 `web-components/selection-toggle.js`；详情页与导出的 HTML 使用同一实现，保留原图形和 `#ED78F4` 填充色。

自定义「图层落下叠加」保留提供的 20×20 图层 SVG：选中时方片依次从上方落下叠加，取消选中时恢复灰色图标。可调整时长和回弹；预览及导出的 HTML 共用 `web-components/layer-stack-toggle.js`，支持键盘、减少动态效果和中途取消。

自定义「人物探出回弹」保留提供的人物 SVG：选中动画开头头和身体完全藏于底部，再快速探出，拉伸、压缩后错位回弹，取消选中时置灰。预览及独立 HTML 共用 `web-components/profile-rise-toggle.js`，可调整时长与回弹。

自定义「扳手旋转回弹」围绕图标中心逆时针转一整圈，末尾轻微越过终点并回弹收稳。旋转前微缩至 96.5%，保持到回弹结束后恢复原尺寸，使路径与描边全程位于 20×20 内；取消选中时置灰。预览及独立 HTML 共用 `web-components/wrench-turn-toggle.js`，可调整时长与回弹。

- 目录与示例：`web-components/catalog.js`。组件数据独立于自动生成的 `manifest.json`，飞书同步不会覆盖它们。
- 预览运行在独立 iframe 中；离开可视区域或切换筛选时会清理实例。缩略预览默认静止，悬停时播放。
- 主站使用已提交的本地运行文件与可变字体，GitHub Pages 无需额外构建。下载的独立 HTML 通过固定版本的 jsDelivr CDN 加载依赖，需要联网。
- 修改依赖后，运行 `pnpm install --frozen-lockfile` 和 `pnpm build:web-components`，再提交 `web-components/vendor/` 中的构建产物。
- 原项目：[tgomilar/motion-components](https://github.com/tgomilar/motion-components)，作者 Tanja Gomilar。MIT 及依赖许可完整保存在 `web-components/vendor/THIRD-PARTY-NOTICES.txt`；Inter 字体使用 SIL OFL。

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
