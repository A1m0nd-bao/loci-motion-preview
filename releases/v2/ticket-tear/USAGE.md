# 票券撕副券 · 秋叶文字修复 v3

同一条目 `sipplay-ticket-tear`。这不是邀请函信封 `sipplay-invitation-code`，也不是枫叶礼盒或 32×26 原礼盒，也不是红金南瓜票券。

预览 `index.html`、目录下载 `ticket-tear.html`、页面内下载 `ticket-tear-restyle.html` 是同一份离线 HTML。

- **字节**: `242752`
- **SHA256**: `ee8f0a8a71ca2f5430919100214e6f76668e609ce3a9d01848949b872cee333c`
- **票面**: `541 × 289`（`aspect-ratio: 541/289`）
- **撕开时长**: `1.25` 秒
- 直接打开即可。可选 `?compact` 进入 260×220 缩略图，票面缩放 `0.44`。

页面上可见的文案包括 `YOUR INVITE CODE`、`320146`、`Invites used`、`Sapphires earned`、上联与下联的 `+200` / `+100`，以及下联 `Have a friend’s code?`。副券可以撕下。名额、复制和兑换控件仍在这一份文件里。

## 这次文字与边缘

描边 SVG 字和低分辨率烤进图里的字，改成了字体文字。没有 `@font-face`，也没有内嵌字体文件。

只有 `Have a friend’s code?`（`#labelHaveFriendsCode` 和撕票 canvas 的 `famTitle`）把 `SF Pro Text` / `SF Pro Display` 放在字体栈前面，字重 600。其余文字回到原来的系统字体栈：`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`。

这只是字体名称的优先顺序。Linux 上会落到系统无衬线，不能把它说成已经嵌入 Apple SF Pro，也不能说成各系统字形一致。真正的 Apple SF Pro 没有在 Linux 上测过。

下联票面清掉了外轮廓的白色垫边。原来的 alpha 轮廓还在，形状和撕裂边没有改。

## 浏览器核对范围

已看过：

- 541 宽
- 375 宽
- `?compact`
- 撕票过程

这几项里没有看到明显的白边或双重文字。`?compact` 里的票很小，这个限制还在。

没有把这次核对说成逐帧验收，也没有把系统字体说成和设计稿逐字重合。

## 文件

- `index.html`：目录预览。
- `ticket-tear.html`：目录下载。
- `ticket-tear-restyle.html`：页面里「下载 HTML」指向的同一份文件。
- `USAGE.md`：本说明。
- `QA.md`：页面里「交互清单」指向的核对记录。
- `AUDIT.md`、`TEXT-V3.md`：审计与 v3 说明原文。
- `source.zip`：上述材料。页面里的 `ticket-page-restyle.zip` 与它相同。

`AUDIT.md` 和 `TEXT-V3.md` 是说明，不是完整重建工程。`TEXT-V3.md` 里的「无浏览器验收」已被上面列出的核对范围接上，范围就这些。
