# 邀请码页 v5：8位ASCII输入约束、展示尺寸核对、真实Lottie进一步瘦身

2026-11-23（Asia/Shanghai）。`invite-four-state.html` 为唯一运行时交付：直接离线打开，无CDN、外链素材、iframe或网络请求。v2/v3/v4均未改动。

## 两种“大小”均核对，不假称已全部对齐

### 展示几何

`geometry-audit.py` / `geometry-audit.json` 比对原 `original.html`、v4、v5 的CSS与运动公式：

- 默认模式下，`:root` 舞台变量、body、`.page-layout`、`.motion-stage` 及≥960px媒体规则的布局/宽高/间距/边距/响应式规则完全相同。375×812舞台、327×573卡片(x24,y151)、131×107礼盒、190×258杯体容器均未整体放大；没有额外fit/scale/zoom。320/375/430/960/1280视口使用相同规则。窄屏原本就不是自动缩至屏宽，本版没有任意加一个全页缩小系数。
- 原版与新稿的主要信封/弹卡/彩带运动公式与0–2秒时序相同。闭合盖原外层SVG391×180位于(-8,556.4)，新版是375×812舞台SVG包装；**实际盖面路径宽均375**，上/下边562.4/726.4→563/727（约0.6px平移，不是391→375的“缩放修复”）。后盖轴560→565.977跟随新稿信封几何。
- 确实存在**局部换肤差异**：源SVG蜡封包装96×88.0122 vs原版74×76（包装含新稿叶饰，不能据此外推S圆印本体同幅放大）；新稿标题24px vs原版20px，输入字20px vs17px；新礼盒源rect y246 vs原flex流计算约245。它们来自已经要求采用的源SVG构图/字号，v5保留，不通过擅改整页缩放来“掩盖”局部设计差异。不能宣称所有局部几何都与旧视觉一模一样。
- 初始viewport scale均为1；原版禁止用户缩放，v4/v5允许手动缩放，这不是初始展示倍率差异。`?embed=1` 是新版本专用嵌入模式（隐藏控件/去预览留白），原版没有；比较应default对default，不能把embed对default的留白不同当成动画放大。

以上是**静态CSS/时间轴数值审计，不是浏览器实测布局**；浏览器同视口截图仍待父代理核验。此次没有捏造一次全局尺寸修正。

### 文件字节

原版 **384,809**；v4 **1,032,616**；v5 **579,588 bytes**。

本轮减少 **453,028 bytes / 43.87%**，但仍超原版 **194,779 bytes**。**未达到≤384,809，不可向用户说文件大小已经完全对齐。**

- 用官方 lottie-web **5.12.2 SVG light**（168,236字节）替换305,543字节全量player。真实动画只有12个image层与1个null父层，无表达式、形状、文本、遮罩、特效；light包含所需功能。
- 官方light代码zlib无损封装，经5KB级fflate同步还原到内联classic script执行；还原字节与官方build完全一致，不是自制假player、不调用eval、不依赖DecompressionStream/CDN。
- 完整Lottie JSON也无损zlib封装，所有图层/父子关系、关键帧、原声明坐标、102帧/60fps、播放重播逻辑完全保留；只将12张WebP资源按实际显示约2x采样、quality95重新编码。文件不再为画布远超显示尺寸的图像买单。
- 源稿插画仍约2x采样quality92透明WebP；前袋仍原750×1624缓存且alpha逐像素相同；九张环境落叶PNG原字节保持。
- 内嵌字体保留实际使用的400–700权重和14–32 optical-size轴，改WOFF2；2880组字形/轴采样比较最大轮廓或字宽差1.421/2048字体单位（24px字号约0.017px），未换字体或改字号。
- 两份运行时MIT许可随单HTML内嵌。精确分项见 `资源大小与优化报告.md` / `resource-sizes.json`。原版依赖CDN且没有整套新视觉资源；本版不能再拿“305KB全库仍存在”解释差额——全库已从成品移除。

## 输入约束：text而不是number

真实input：`type="text" maxlength="8" pattern="[A-Za-z0-9]{0,8}" inputmode="text"`；autocomplete、spellcheck、autocorrect、autocapitalize均off。保留小写/大写输入及前导0（原显示CSS仍可呈现大写），提交继续沿用原业务uppercase比较。

`input-constraints.js` 由build内嵌：

1. `input`实时过滤非ASCII `[A-Za-z0-9]` 并限8位，非法字符删除时映射光标/选区，合法编辑不重写值。
2. `paste`和`drop`拦截默认插入，**先过滤完整混合文本，再按剩余容量截取**，避免原生maxlength先截非法前缀、丢掉后面有效字符；正确替换当前选区、保留后缀与插入后的光标。
3. `beforeinput`拒绝非法普通输入/第9位，覆盖替换输入；input回退负责其他来源。
4. IME composition中不粗暴改值；compositionend立即清洗；IME Enter/keyCode229不触发兑换；composition中点击/调用提交也不穿透。
5. `handleRedeem`提交前再清洗，防程序赋值绕过；纯中文/符号变空后进入原错误态。上限8，不强制恰好8，不新增最短长度。原有“少于4位或ERROR无效”规则不变。

## 四态与保留动效

| 源SVG | 实际内容 | 入口 |
|---|---|---|
| state-2.svg | 闭合信封/蜡封 | `?state=closed` |
| state-0.svg | 展开、空输入、顶部导航 | `?state=empty` |
| state-3.svg | 展开、ERKC6B8A | 默认 / `?state=normal` |
| state-1.svg | +200、真实宝石落杯、说明 | `?state=success` |

`?state=error`仍为第五辅助态；`?t=0.53`拖轴取帧；`?state=success&still=1`真实杯末帧；`?embed=1`隐藏演示控件。保留closed→empty、成功/错误互斥与真实输入，不新增网络兑换。

- 彩带原生路径opacity=.4仍保留；动画在父组做0→1，不覆盖路径alpha。原1.35–1.95秒旋转/缩放不变。
- 礼盒右叶源N[1][7]+[8]（叶脉.3），1.42–1.86秒；左叶N[1][9]，1.55–1.99秒。原轻微旋转/位移、终态位置/层级不变，原时间轴确定性驱动、可倒拖重播。
- 背景16片、九张PNG、seed21251、sizeScale=.5、斜率.645、透明后景与独立速率1保持；不随信封拖轴/倍速；reduced-motion冻结、标签页隐藏暂停保持。

## 重建

Python3：Pillow、fonttools、brotli；Node.js：`npm ci`（锁定terser/esbuild/fflate/lottie-web/jsdom）。

```
python3 build.py
node --check motion.js
node --check motion.min.js
node --check pack-decoder.min.js
node --check player-loader.js
python3 static_qa.py
node dom-checks.cjs
node input-checks.cjs
node ambient-checks.cjs
node lottie-offline-checks.cjs
python3 geometry-audit.py
python3 font-check.py
python3 resource_report.py
```

`motion.js`保留可审计的完整JSON；HTML实际使用`motion.min.js`，由`motion-runtime-source.js`、压缩JSON和同步播放器loader构建。不能把source目录中的旧full player（仅供对照测试）误认为也部署进了HTML。

## 已做离线检查（不是浏览器通过）

- 65个唯一DOM ID、33个可解析SVG引用；严格XML解析；无外链script/iframe；原示例落叶与旧pattern不存在，层级/透明背景结构保持；源码/实际压缩JS语法检查通过。
- 24项原状态/信封/透明彩带/错峰侧叶DOM回归通过。
- 25项输入检查通过：大小写数字/0、8/9位、中文/符号/emoji/空白/全角、混合长粘贴、选区与中间插入、拖放、光标、beforeinput、IME中不改/不提交与compositionend清洗、Enter、程序赋值兜底、原4位规则、closed空输入。
- 环境落叶参数/独立性/暂停策略检查通过（显式mock Image/WAAPI，非动画渲染验收）。
- **真实官方full/light播放器**均在jsdom执行，102个逐帧SVG DOM变换/透明度结果一致；图层关键帧与v4深比较完全一致。另执行完整HTML的实际解包bootstrap、真实player初始化、过滤后有效兑换、102帧杯和点击重播。该测试仅用合成image-load事件，不证明浏览器WebP解码/合成。
- Resvg离线渲染四态与真实player导出的0/30/50/75/101帧SVG，已目视对照 `compression-qa/states-before-after.jpg`、`lottie-before-after.jpg`，无明显纹理损伤、黑底或alpha边缘问题；指标见metrics.json。非浏览器截图。

## 父代理仍需浏览器核验

同视口default对default检查展示大小与上述源稿局部差异；真实输入/粘贴/拖放/选区/系统IME与移动键盘；纯中文不能提交、4–8位有效码正常兑换；压缩loader及WebP实际解码、Lottie完整落杯/末帧/重播；彩带半透明与侧叶无闪跳、拖轴重播；环境叶后景、无黑底及reduced-motion；控制台无错误。未通过真实浏览器前不要说“浏览器复测通过”，也不要说文件已降到原版大小。
