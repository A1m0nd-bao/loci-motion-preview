# 动效评论（Giscus）尚未接通

详情页预览下方的「修订备注」已经按动效的稳定编号预留。浏览和播放不需要登录。当前不能发表评论：这个仓库还没有开启 GitHub Discussions，因此没有讨论分类，也读不到 Giscus 的 category id。配置里故意留空，页面不会加载 `giscus.app` 脚本。

仓库：`A1m0nd-bao/loci-motion-preview`  
仓库 node id（已写入 `comments/giscus-config.js` 的 `repoId`）：`R_kgDOS8X1yg`

## 管理员还需要做的事

1. 在 GitHub 仓库 Settings → General → Features 里启用 Discussions。
2. 安装 [giscus GitHub App](https://github.com/apps/giscus)，并授权给这个仓库。只安装到本仓库即可。
3. 新建或选定一个讨论分类，建议用 Announcements（公告）类型，这样新讨论只能由维护者和 giscus 创建。分类名可以用「动效备注」。
4. 打开 [giscus.app](https://giscus.app/zh-CN)，选择本仓库和该分类，复制 **Discussion Category ID**（形如 `DIC_kwDO...`）。不要手写或猜测这个 id。
5. 把分类名和 category id 填进 `comments/giscus-config.js` 的 `category` 和 `categoryId`。`repo` 与 `repoId` 已经填好。保存后部署。
6. 打开任意动效详情，滚到预览下方。此时才会请求 Giscus。用 GitHub 登录只出现在发表或回复时。

填好之前，`isGiscusConfigured()` 会保持为 false，评论区只显示编号和未接通说明。

## 讨论如何对应到动效

- 有目录 id 的条目（Web 组件、Motion 示例、v2/v3 发布项）用该 id，例如 `sipplay-gift-pop`。标题或网址 hash 改变不会换讨论。
- 同一条动效的不同播放段如果被收成一组，共用这一组的 `sourceComponent`。
- 清单里没有 id 的文件用 `path:` 加仓库内相对路径，不含查询串。
- 拖入的临时文件没有稳定编号，不创建讨论。
- 映射是 Giscus 的 specific + strict，避免模糊搜索把相近标题串到别的动效上。

留言时写上看到的动效版本。处理完成后回复「已在 vX 处理」即可结束该条讨论。版本状态标签可以以后再加，不阻塞这次接入。
