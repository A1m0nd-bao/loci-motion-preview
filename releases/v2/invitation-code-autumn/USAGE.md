# 输入邀请码 · 秋日邀请函 v5

## 1. 组件概述

- **组件 ID**: `sipplay-invitation-code-autumn`
- **与原件分开**: 原先的信封动效仍是 `sipplay-invitation-code`，路径 `releases/v2/invitation-code/`。这一条只放秋日 v5。
- **页面标题**: 邀请码 · 秋日邀请函
- **基准视口**: `375 × 812`
- **交付形态**: 最新 v5 离线自包含 HTML。直接打开，无 CDN、外链素材、iframe 或运行时网络请求。字体与 Lottie 播放器已内嵌。
- **预览与下载**: `index.html` 与 `invitation-code-motion.html` 是同一份文件。
- **字节**: `579588`
- **SHA256**: `be3943093a89ee012a450e4c10eb7a1ec1b2b4ceb3521b1856d9fda33751e68a`

先前已发布的 `invitation-code-motion.html` 为 **384809** 字节。v5 为 **579588** 字节，大约多出 194779 字节。体积目标未达到，不能把本版说成已经对齐 384809 字节。

画廊缩略图使用 `?embed=1`，隐藏演示控件，只留 375×812 舞台。详情页打开不带该参数的完整页面。

## 2. 状态

时间轴控件范围是 `0.00s–2.00s`（`max="2.0"`）。信封展开、弹卡与彩带落在这段时间里。成功态的蓝宝石落杯是单独的 Lottie 播放（102 帧 / 60fps），用成功态或重播触发，不把整段成功动画算进这 2.00 秒滑条。

| 状态 | 内容 | 入口 |
| :--- | :--- | :--- |
| **closed** | 闭合信封 / 蜡封 | `?state=closed` 或「未开启」 |
| **empty** | 展开、输入为空 | `?state=empty` 或「空白输入」 |
| **normal** | 展开、示例码 `ERKC6B8A` | 默认 / `?state=normal` |
| **success** | +200 与宝石落杯 | `?state=success` |
| **error** | 第五辅助态：错误文案与抖动 | `?state=error` |

其他查询：`?t=` 按秒取帧；`?state=success&still=1` 停在杯动画末帧；`?embed=1` 隐藏演示控件。

彩带沿用路径自身的 `opacity=".4"`，动画加在父组上，不改这条路径透明度。礼盒右叶约 1.42–1.86 秒，左叶约 1.55–1.99 秒，错峰运动。背景落叶独立于信封拖轴。

页面上可调用、且仍保留原名的入口包括 `switchToClosedState()`、`switchToEmptyState()`、`switchToNormalState()`、`switchToErrorState()`、`switchToSuccessState()`、`startAnimation()`、`handleRedeem()`、`scrubTimeline(value)`、`replayAnimation()`、`replayCupAnimation()`。

## 3. 输入

真实输入框是 `type="text"`，`maxlength="8"`，`pattern="[A-Za-z0-9]{0,8}"`，`inputmode="text"`。自动完成、拼写检查、自动纠错、自动大写均关闭。可以输入大小写字母和前导 0。提交比较仍沿用原有的大写规则。

输入时会去掉非 ASCII 字母数字并限制 8 位。粘贴和拖放先过滤整段混合文本，再按剩余位数截取，避免先被原生 maxlength 截掉后面的有效字符。少于 4 位，或内容为无效码，仍走原来的错误态。上限是 8 位，不要求必须写满 8 位。

## 4. 浏览器核对范围

v5 已在浏览器核对：

- 四个状态
- 彩带半透明
- 侧叶错峰
- 背景落叶
- 8 位 ASCII 字母数字输入
- 混合内容粘贴
- 视口尺寸

系统 IME 未测。`prefers-reduced-motion` 未测。这次核对不是穷尽验收，也不是逐帧验收。

## 5. 文件与源码包

- `index.html`：站点预览，内容与下载文件相同。
- `invitation-code-motion.html`：下载用的同一份 v5 HTML。
- `USAGE.md`：本说明。
- `README-状态映射与QA.md`、`资源大小与优化报告.md`：构建时的说明与体积报告。
- `build.py`：构建脚本。
- `SOURCE-NOTE.md`：源码包范围说明。
- `source.zip`：包含上面这些文件。

`README-状态映射与QA.md`、`资源大小与优化报告.md` 和 `build.py` 是文档与构建脚本材料，不是完整可重建源码包。包内没有 `node_modules`，也没有 `state-0.svg` 至 `state-3.svg` 这些大型状态源 SVG。还缺少 `original.html`、前袋缓存、字体、样式与落叶脚本等输入。依赖不齐时，`python3 build.py` 不能重建 HTML。已构建好的单文件本身可以离线打开。

目录中若仍保留较早的 `assets/`，那是先前外置素材。v5 单文件不引用它们。
