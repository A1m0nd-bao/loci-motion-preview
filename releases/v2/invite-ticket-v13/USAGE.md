# 活动页兑换码 · 自适应奖券（v15）

- 打开 `index.html` 预览；`invite-ticket-responsive-v15.html` 为原始单文件。
- 窗口宽度不超过 720 px 时使用手机布局，否则使用桌面布局。
- 切换“待兑换 / 已兑换 / 已过期”查看三种状态。
- 输入非空好友邀请码并点击奖励副券，或按 Enter，播放兑换撕券动效。
- 点击“重播动效”再次播放。

桌面票券基准为 852×220，手机为 356×120。撕券约 1.25 秒，手机另含主券居中动画。
HTML 内嵌 gzip 素材包，需支持 `DecompressionStream` 的浏览器。
原始单文件保持不变；旧预览和下载地址继续可用。

这是前端演示，不包含真实兑换码校验或奖励发放接口。

## 参数与接口

原始 HTML 地址支持 `?state=pending`、`?state=redeemed`、`?state=expired`、`?code=HELLO200`。

```js
window.inviteTicket.setState('pending');
window.inviteTicket.replay();
window.inviteTicket.getState();
window.inviteTicket.getLayout(); // desktop 或 mobile
```
