# 豪华奖励迸发 · 收取

独立条目 `sipplay-welcome-gift-collect`。这不是 `sipplay-chest-two-state` 的两态开箱，也不是 32×26 礼盒、枫叶礼盒或优惠券弹窗。

`index.html` 与 `welcome-gift-collect.html` 是同一份离线 HTML。

- **字节**: `2303392`
- **SHA256**: `35bd2982f2c30a88381233d850790e6846af5e22aeb16f2f27a0bda29a338df7`
- 约 7.39MB 压到约 2.30MB，包含图片分辨率取舍，不是像素无损。
- 开箱时间轴仍是 `2.60` 秒。页面铺满视口，SVG `viewBox` 为 `340 75 760 685`。
- 目录卡片按已核对的 `375×812` 预览。文件里的 compact 样式不会因 `?compact=1` 自动打开。

## 收取

点击 Claim（`#claimHit`）或调用 `GiftCollect.start()`。未就绪、进行中、已收取时会忽略。重播或 `GiftCollect.reset()` 复位。不发起业务请求。

正式 1× 时间：收缩 `280ms`，飞行 `840ms`，头到达后独立追尾 `360ms`（`COAST_MS`），然后清空。光点按盒子比例缩放。尾迹是连续的平滑曲边。Claim 之后盒子缩成光点，沿贝塞尔飞向终点。开盒遮挡已在这版修正。重播已修复。

终点优先级：`endSelector`（元素中心）> `endX` / `endY`（布局视口客户坐标）> 视口右上角减去 `marginRight` / `marginTop`（默认 36）。起点、终点、曲线都用视口客户坐标，`resize` 时重算。可在加载前设置 `window.GiftCollectConfig`。

`prefers-reduced-motion: reduce` 时礼盒收起，光点直接出现在终点，没有飞行拖尾。

事件挂在 `document` 上：`welcome-gift:collect-start`、`welcome-gift:collect-complete`、`welcome-gift:collect-reset`。

## 浏览器核对范围

`375×812` 上实际完成两次收取，中间有一次重播。终态没有残留。

慢放副本的实帧里，长轨迹没有看到明显台阶或尖刺。

没有捕捉到完整的 `360ms` 追尾过程，不能写成这段实播已经完全通过。

## 文件

- `index.html`：站点预览。
- `welcome-gift-collect.html`：下载用的同一份文件。
- `USAGE.md`：本说明。
- `source.zip`：上面这些文件。压缩包里没有慢放副本，也没有压缩前的原始图片工程。
