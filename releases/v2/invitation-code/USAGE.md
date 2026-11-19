# 输入邀请码交互动效交付文档

## 1. 组件概述 (Overview)
- **组件 ID**: `sipplay-invitation-code`
- **组件名称**: 输入邀请码 - 邀请信函与蓝宝石雨奖励动效
- **基准视口**: `375 × 812` (标准移动端比例，SF Pro 字体排版)
- **动效特征**: 矢量信封折纸、火漆印章物理溶解、卡片滑出入场、Lottie 蓝宝石高脚杯粒子喷涌、状态机切换。

## 2. 状态机规范 (State Machine)

| 状态 | 表现形式 | 触发逻辑 |
| :--- | :--- | :--- |
| **Normal 初始状态** | 拟真信封外观、礼物盒插画、兑换码输入框、启用态按钮 | 页面初始化 / `switchToNormalState()` |
| **Error 错误状态** | 左右微震抖动反馈 (400ms)、错误提示文案、高亮红边与警示图标 | 校验失败 / `switchToErrorState()` |
| **Success 成功动效** | 5 阶段连贯舞台动效序列 (印章消解 → 信封展平 → 卡片抽出 → 徽章弹出 → 蓝宝石雨) | 校验成功 / `startAnimation()` |

### 成功态阶段分解 (Success State Sequence)
1. **火漆溶解 (Wax Seal Dissolve)**: 0.0s - 0.4s，印章渐隐并向内微缩。
2. **信封翻折展开 (Flap Unfolding)**: 0.2s - 0.7s，SVG 封口翻转透视矩阵拉平。
3. **卡片滑出入场 (Card Slide Up)**: 0.4s - 0.9s，信纸卡片顺应缓动曲线升入前景视口。
4. **奖励徽章弹出 (Badge Spring Pop)**: 0.7s - 1.1s，`+100` 宝石徽章伴随微弹入场。
5. **蓝宝石喷涌 (Sapphire Fall Lottie)**: 0.8s - 2.8s，高脚杯宝石雨粒子碰撞并平稳停留。

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
// 切换为正常输入态
switchToNormalState();

// 触发错误震颤反馈
switchToErrorState();

// 播放兑换成功连贯动效
startAnimation();
```
