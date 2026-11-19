# 输入邀请码交互动效交付文档

## 1. 组件概述 (Overview)
- **组件 ID**: `sipplay-invitation-code`
- **组件名称**: 输入邀请码 - 邀请信函与蓝宝石雨奖励动效
- **基准视口**: `375 × 812` (标准移动端比例，SF Pro 字体排版)
- **动效特征**: 矢量信封折纸、火漆印章物理溶解、卡片滑出入场、Lottie 蓝宝石高脚杯粒子喷涌、真实输入交互与状态机切换。

## 2. 状态机规范 (State Machine)

| 状态 | 表现形式 | 触发逻辑 |
| :--- | :--- | :--- |
| **Normal 初始/输入态** | 完整展示信封卡片、礼物盒插画、兑换码输入框、启用态按钮 | 默认初始化 / `switchToNormalState()` |
| **Error 错误状态** | 左右微震抖动反馈 (400ms)、错误提示文案、高亮红边与警示图标 | 校验失败 (无效/空码) / `switchToErrorState()` |
| **Success 成功态动效** | 按钮按压缩放反馈 → 信纸淡出 → +100 蓝宝石徽章弹出 → 蓝宝石喷涌落杯 (Lottie) | 用户手动点击「立即兑换」按钮 / `switchToSuccessState()` |
| **Intro 进场动效 (0-2s)** | 火漆溶解 (0-0.5s) → 信封翻折展平 (0.42-0.88s) → 卡片抽出入场 (0.85-1.9s) → 丝带飘入并停留在 Normal 态 | `startAnimation()` |

> [!IMPORTANT]
> 动效绝不自动模拟点击兑换。入场动效到达 2.0s 后自动平稳停留在 Normal 输入态，等待真实用户在输入框键入并主动点击「立即兑换」按钮。

## 3. 文件清单与交付物 (Deliverables)
- `index.html`: 线上自适应交互预览，包含卡片网格 compact 模式及全局下载导航。
- `invitation-code-motion.html`: 单文件离线交付版本（所有素材与 Lottie 关键帧自内联）。
- `assets/`:
  - `sapphire_fall.json`: 蓝宝石掉落与高脚杯碰撞独立 Lottie 关键帧动画。
  - `image_0.webp` ~ `image_11.webp`: Lottie 动画关联切图资产。
  - `gift-box.webp`: 初始态礼物盒插画。
  - `wax-seal.webp`: 信封火漆印章切图。
- `source.zip`: 完整工程打包。

## 4. 接入与调用方式 (Integration)

```javascript
// 切换为正常输入态 (停止播放，停留在 2.0s 静态可交互状态)
switchToNormalState();

// 触发错误震颤反馈
switchToErrorState();

// 手动点击兑换按钮触发成功态动效
switchToSuccessState();

// 重播信封打开与卡片抽出进场动效 (0.0s -> 2.0s 自动停留)
startAnimation();
```
