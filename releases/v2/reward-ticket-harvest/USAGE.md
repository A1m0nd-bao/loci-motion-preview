# 奖励票券 · 红金南瓜 Ease-Out 交付文档

## 1. 组件概述 (Overview)
- **组件 ID**: `sipplay-reward-ticket-harvest`
- **组件名称**: 奖励票券 · 红金南瓜 Ease-Out (Harvest Reward Ticket)
- **基准尺寸**: `167 × 36` (可任意缩放，全景预览区以 2.15× 放大呈现)
- **设计特征**:
  - 橙色红金南瓜秋收款主题色彩。
  - **全程可见生长减速 (Ease-Out)**: 弧长追踪可见路径，末段 15%~25% 平滑缓冲停止；长满即结束，无卡外无效空等。
  - **轻弹防连点物理反馈**: 连续点击微震弹起，飘带动效最多排队一轮，避免多重动画错乱。
  - **纯矢量自包含渲染**: Shadow DOM 封装，单层飘带统一流光，无外部图片依赖。

## 2. 交互状态 (States)

| 状态 | 表现形式 | 触发逻辑 |
| :--- | :--- | :--- |
| **Idle 常态** | 红金渐变质感底卡、南瓜图标徽记与金币点缀 | 初始静止状态 |
| **Hover 悬停态** | 礼盒微动掀盖，金币微摆浮动 | 鼠标移入组件 / 键盘聚焦 |
| **Click 激活态** | 礼盒轻弹跳起，橙金飘带顺沿弧线先快后慢飞驰环绕展开 | 点击卡券 / 键盘 Enter / 空格 |
| **Finish 完成态** | 飘带绕行到达终点并闭合，恢复就绪态 | 绕行完成 (默认 1.36s) |

## 3. 文件清单与交付物 (Deliverables)
- `index.html`: 线上自适应交互预览，包含卡片网格 compact 模式及全局下载导航。
- `reward-ticket-orange-easeout.html`: 单文件完整离线交付版。
- `USAGE.md`: 本交付接入文档。
- `source.zip`: 完整工程打包。

## 4. 接入与调用方式 (Integration)

```html
<!-- 引入组件 HTML -->
<sipplay-reward-ticket
  id="harvest-ticket"
  variant="harvest"
  label="红金南瓜奖励票卡"
  ribbon-duration="1.36">
</sipplay-reward-ticket>

<script>
  const ticket = document.getElementById('harvest-ticket');

  // 手动触发播放
  ticket.play();

  // 监听动效生命周期
  ticket.addEventListener('motion-start', () => console.log('飘带绕行开始'));
  ticket.addEventListener('motion-finish', () => console.log('飘带绕行结束'));
</script>
```
