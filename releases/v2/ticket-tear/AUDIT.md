# 票券撕副券文字烂点排查与修复（静态审计）

- 工作区：`/workspace/motion-text-repair-20261123/`
- 原附件只读副本：`original-readonly.html`（sha256 `bb40b744920218576f4b638ab01ecf13bbb3ee35cc8bcc77f6fd542fc99d9765`，369068 字节，未改）
- 修正候选：`ticket-tear-autumn-text-repair.html`（sha256 `dd56b534eb0d100e74be8008eb5d50c3cfb326ce5fc72314783eb15d5c900721`，445222 字节）
- 构建脚本：`build_text_repair.py`（从只读原件重生，可复现）
- 范围：仅此附件。未改邀请码项目、未改动效站、未发布。
- 本轮没有浏览器，未做视觉验收。静态渲染使用 Cairo/librsvg，不能等同浏览器。

## 1. 实现鉴别

附件是「票券撕副券 · 秋叶（v3 真透明半圆）」单文件离线 HTML。无 Lottie。文字实现分四类：

| 类型 | 位置 | 结论 |
|---|---|---|
| SVG `<path>` 转曲 | `.part.top` 内 15 条复合 path | **是矢量描边文字**，Figma 导出 id `9864_22242` |
| 已有普通 SVG `<text>` | 额度 `3 / 10`（`#quotaSvgText`）；激活态按钮 `Redeem` | 已是普通文字，不是转曲 |
| 普通 HTML 文字 | 标题/说明、激活码 `<input>` 及 placeholder、调试面板、状态句 | 本来就是 DOM 文字 |
| 位图文字 | `.stub img` 为整票 541×289 的 1× PNG；下半券可见文字来自这张图（CSS mask 裁到副券） | **不是 path，但是栅格字** |

装饰（枫叶、信息 i 标、复制图标、宝石图案、箭头、纸底渐变、输入槽/按钮底、彩带前景、半圆缺口 mask、名额槽）均不是文字，已保留。

无 `mask/filter` 直接作用在字形内部。Copy 按钮与宝石/箭头上的 `feGaussianBlur` 是投影。`shape-rendering="crispEdges"` 只在宝石 pattern 矩形上。主票有 CSS `-webkit-mask-image`（纸形），小字靠近圆角时 theoretically 可能有边缘锯齿，但烂点主体不在这里。

## 2. 原文清单（由 path 子路径几何 + 16× 静态渲染确认，未猜测）

上半票（在 `.part.top` 的 `clip0` 内，随主票 mask / hold 动画）：

1. `YOUR INVITE CODE` — path fill `#761F30`，bbox (30.76,23.23)–(151.09,30.63)，h=7.40，18 个子路径（含 O/D/R 内孔）
2. `320146` — `#601A2F`，(31.80,63.53)–(186.00,89.76)，h=26.23；JS 复制仍硬编码此码
3. `Invites used` — `#853821`，(31.31,116.91)–(86.00,124.40)
4. `Sapphires earned` — `#853821`，(358.00,116.91)–(439.28,126.07)，含 p 下降部
5. `600 / 2000` — `#87391F`，(453.04,116.97)–(504.32,126.08)
6. `Copy Code` — 白字，在 `#copyCodeBtn` 内，(418.21,71.96)–(491.89,84.95)；复制图标两段 stroke 保留
7. `+200`（上）— `#FFF5E8`，(443.14,22.59)–(473.88,31.41)
8. `+100`（上）— `#FFF5E8`，父组 opacity 0.6，另有一条删除线 path

下半票（`.part.top` 里也有转曲，但被上半 mask 裁掉；**静止态可见的是 stub PNG**）：

9. `Have a friend’s code?` — `#FFF1DF`，(29.80,183.06)–(196.19,195.52)，撇号为 typographic U+2019
10. `+200` / `+100`（下）及删除线 — 同色，+100 父组 opacity 0.5
11. `Enter a friend’s invite code` — `#B49398`，本就是输入框 placeholder，转曲是重复层
12. `Redeem`（未激活，opacity 0.6，`#FFF8E8`）— 激活态已有 SVG `<text>`

已有普通文字（未改文案，也未当转曲删）：

- 额度 `3 / 10`（动态，tspan `#quotaCurrentText`）
- 激活态 `Redeem`
- placeholder `Enter a friend’s invite code`（已是 U+2019）
- 页面 UI：票券撕副券、提示句、控制器、状态句等

未发现无法识别的文字块。

## 3. 烂点机制（不是「path 就一定糊」）

两套独立机制叠在一起：

1. **下半券 1× PNG 栅格字（主因，静止态可见）**  
   stub 只有 541×289。8× 最邻近放大后，`Have a friend’s code?`、placeholder、`Redeem` 呈明显像素块；撇号收成脏点。票宽响应式缩放或 retina 下会更明显。

2. **上半券转曲小字**  
   标题大写 cap 高仅约 7.4px，`Invites used` 等约 7.5px。撇号、i 点是 1.6–2.3px 的独立子路径。非整数设备像素上，这些点阵容易变成脏点。16× 矢量渲染本身是干净的，问题出在最终栅格尺度，而不是路径里有游离垃圾点（未发现 area 异常的 stray subpath；问号点和撇号都是合法标点）。

额度 `3 / 10` 已经是 SVG text，不是这次转曲源。Cairo 合成里有时只看到 `/ 10`，是因为该类字号写在 HTML CSS 里，离线抽 SVG 渲染时样式不在，**不能当成浏览器缺陷**。

## 4. 改动（最小，转普通文字）

- 精确删除上述 15 条文字 path，以及 +100 的两条删除线 path；空组已清掉。未删叶子、i 标、复制图标、宝石、箭头、纸底、槽条、彩带、mask。
- 上半文字改为同一套 viewBox 里的 SVG `<text>`（含 `#copyCodeBtn` 内 `Copy Code`），随主票裁切与 hold 动画。
- 下半文字放在新的未 mask 层 `.ticket-type-lower`（同样 541×289 viewBox），撕票 / 已撕时 `visibility:hidden`，避免和 canvas 叠字。
- 未激活 `Redeem` 放进按钮内 `.redeem-idle-svg`（与激活态 SVG 同 viewBox，随按钮缩放）；输入有值时隐藏闲置字、显示原激活按钮。
- placeholder 转曲删除，沿用原 HTML input。
- stub：保留原图，把下半文字框从「去掉文字 path 后的票面 SVG」贴回干净纸底；宝石和箭头避开。输出 2× PNG，减少剩余纸面/图标的 1× 锯齿。
- `prepareTexture` 在副券纹理上用同样字号补画下半标签和闲置 Redeem，撕票飞出时仍有字；原有的输入值与激活 Redeem 烘焙逻辑保留。
- 单文件离线，无外链字体、无 `@font-face`。

字体说明（不能宣称与设计稿逐字形一致）：

- 原转曲字体未知（Figma 导出已无 live text）。
- 新文字使用与现有额度 / Redeem 相同的系统栈：`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`。Apple 上接近 SF Pro，其他系统是 Segoe/Roboto/系统无衬线，**不是逐像素还原**。
- 本地对比过 Inter / DM Sans 等 OFL 字体，句子类更接近 DM Sans，但若嵌入会和已有额度/Redeem 系统字不一致，故未内嵌。
- `YOUR INVITE CODE` 另加 `letter-spacing="1.8"`（原稿追踪较宽）。其余未锁 `textLength`，避免不同系统字体被硬压/拉变形。
- `YOUR INVITE CODE` 用了 `font-weight="650"`，不支持可变字重的环境可能落到 600 或 700。

## 5. 静态检查（已做）

- 15 条转曲 path 前缀在新文件中为零残留。
- 5 个 SVG 均可 XML 解析；`<text>` 14、`<tspan>` 2，开闭配对。
- 空 `<g>` 为 0。
- 关键 id 仍在：`copyCodeBtn`、`quotaSvgText`、`quotaCurrentText`、`quotaSlotsGroup`、`tear`、`reset`。
- 两段 JS 经 `node --check` 通过。
- 装饰 / 滤镜 / 叶子 / 图标 / 占位符文案均在。
- 无 `http(s)` 资源（仅 SVG 命名空间）、无版权字体下载或内嵌。
- 原附件哈希未变。
- Cairo 2× 合成（去掉 `text-rendering="geometricPrecision"` 后，因该属性会把本机 librsvg 切碎，已从成品去掉）：上半标签、邀请码、Copy Code、Have a friend’s code?、±分与删除线位置与原稿 path 票面对得上；下半 stub 文字残影已清除；输入框与闲置 Redeem 在合成里是空的（它们是 HTML/按钮层，Cairo 未画）。额度里的 `3` 在该离线 SVG 合成中同样可能缺失（CSS 不随抽出来的 SVG 走）。

## 6. 待浏览器对比验收（不要当成已通过）

1. 原文件 vs 修正文件：桌面 541、375 窄屏、`?compact`（scale 0.44）下所有标签是否清晰、有无残影或双重字。
2. 系统字体度量：字重、字距、基线、`Copy Code` 是否仍居中于按钮；`+200` 是否压到箭头；`YOUR INVITE CODE` 与 i 标间距。
3. 额度 `3 / 10` 动态、弹跳、滑杆/预设是否仍正常。
4. 复制邀请码、输入激活码、未激活/激活 Redeem 切换、Enter 兑换。
5. 撕票 1.25s：飞出的副券是否带有「Have a friend’s code?」、±分、输入值和 Redeem；结束后主票上半文字仍在、下半字已隐藏。
6. `prefers-reduced-motion` 跳过撕票。
7. 圆角 mask 处小字有无新的裁切发毛。
8. `text-decoration: line-through` 在目标浏览器上的 +100 删除线粗细/位置。

