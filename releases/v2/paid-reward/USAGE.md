# 付费权益奖励（多款宝石与状态联动）· Sipplay v2

统一付费权益与签到奖励组件，支持 6 款高清宝石切图、红粉/蓝双色系、会员状态联动、资格红点与横向高光、金额动态配置与已领取置灰。

## 🌟 核心特性与优化

1. **体积深度轻量化（减少 88%）**：
   - 将原稿重型素材重采样为 260px 视网膜高清资源，切图包体从 900KB 缩减至 56KB，单个交付文件从 1.3MB 降至 ~155KB。
   - 彻底解决动效作为组件交付时包体过大的痛点。
2. **视觉尺寸调优与多档缩放**：
   - 默认展示缩放由过大的 1.6× 调优为精致克制的 **1.2×**（80×84），光晕与星芒呼吸自然收敛。
   - 审查配置栏内置 **1.0×（67×70 原生尺寸）**、**1.2×（适中）**、**1.4×（放大）**、**1.6×（特大）** 实时无级切换。
3. **6 款宝石切图与色系支持**：
   - `pink_cluster`（粉色 · 簇）
   - `pink_pile`（粉色 · 堆）
   - `pink_bag`（粉色 · 袋）
   - `blue_sparse`（蓝色 · 稀疏）
   - `blue_cluster`（蓝色 · 簇）
   - `blue_pile`（蓝色 · 堆）
4. **完整状态机与控制器 API**：
   - `window.gemReward.update(patch)`：动态配置 `artKey`、`membership`、`locked`、`eligible`、`claimed`、`amount`、`strings`。
   - `window.gemReward.claim()`：领取交互与回弹反馈。
   - `window.gemReward.reset()`：重置预览。
   - `window.gemReward.getSnapshot()`：获取当前状态快照。

## 📁 交付目录结构

- `index.html`：完整在线展示与画廊预览（支持 ?compact=1 缩放）
- `paid-reward.html`：独立可运行组件 HTML
- `assets/`：高清轻量 WebP 宝石素材目录（6 款素材总计仅 56KB）
- `source.zip`：包含 HTML、素材与接入文档的完整交付压缩包
- `USAGE.md`：接入说明文档
