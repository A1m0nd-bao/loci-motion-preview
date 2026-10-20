import { commonNotes, getHandoff, handoffText, integrationSnippet, siteURL } from './handoff.js?v=20261020-liquid2';

export const batchPrompt = `请按 Figma 与现有动效组件完成页面接入：
1. 先读取 ${siteURL}web-components/USAGE.md、${siteURL}custom-elements.json 和 ${siteURL}web-components/figma-bindings.json。
2. 先检查 figma-bindings.json 每条记录的 adaptation 和 annotationStatus。website-only 表示位置已核对但尚未写回 Figma 画布；有 adaptation 的必须按说明适配，不能原样整块替换；triggerStatus=needs-confirmation 的仅定位，不得自行绑定触发事件。然后精确匹配 Figma fileKey + nodeId 或图层中的动效 ID；只对已核对的设计位置执行替换。未绑定项列清单，不凭外观猜测。
3. 优先复用整组导航组件。保留设计稿位置、尺寸、文案和原业务功能；示例放大样式不进入产品。
4. 使用现有 Motion 依赖与组件源码；注册元素后，以真实业务状态初始化并调用 finish()。用公开事件连接业务，外部属性写入不假定发出用户事件。
5. 避免嵌套 button、重复监听、同时驱动父子图标；保留键盘、减少动态效果及卸载清理。
6. 先验证一个组件，再批量处理；逐项报告设计节点、动效 ID、代码位置、状态字段和验证结果。
正式 Code Connect 当前因套餐权限未启用；figma-bindings.json 是项目交付对照记录。`;

export function copyButton(label, content) {
  const button = document.createElement('button');
  button.type = 'button'; button.textContent = label;
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(typeof content === 'function' ? content() : content); button.textContent = '已复制'; }
    catch { button.textContent = '复制失败，请手动选择文本'; }
    setTimeout(() => { if (button.isConnected) button.textContent = label; }, 1800);
  });
  return button;
}

function link(label, href) {
  const a = document.createElement('a'); a.textContent = label; a.href = href;
  a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
}

export function renderHandoff(host, entry, values = () => ({})) {
  host.replaceChildren();
  const d = getHandoff(entry); host.hidden = !d;
  if (!d) return;
  const heading = document.createElement('h3'); heading.textContent = '研发 / AI 接入';
  const badge = document.createElement('p'); badge.className = 'handoff-status';
  badge.textContent = d.figma.length ? `位置已核对${d.triggerStatus === 'needs-confirmation' ? ' · 触发待确认' : ''}${d.adaptation ? ' · 需视觉或交互适配' : ''} · Motion 13.5.1` : '设计位置待绑定 · Motion 13.5.1';
  const dl = document.createElement('dl');
  for (const [label, value] of [
    ['放在哪里', d.placement], ...(d.adaptation ? [['设计适配', d.adaptation]] : []), ['何时播放', d.trigger],
    ['状态与业务', d.integration], ['对外事件', `${d.event} → ${d.payload}`],
  ]) {
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value; dl.append(dt, dd);
  }
  const sync = document.createElement('p'); sync.className = 'handoff-footnote';
  sync.textContent = !d.figma.length ? '尚无已核对的设计节点。' : d.figma.every(n => n.annotationStatus === 'canvas-and-website') ? 'Figma 画布与网站注释已同步。' : '节点位置已核对；本次 Figma 工具调用额度用尽，新增注释目前保存在网站、源码和节点对照文件，尚未写回画布。';
  const actions = document.createElement('div'); actions.className = 'handoff-actions';
  actions.append(copyButton('复制接入注释', () => handoffText(entry, values())), link('查看源码 ↗', d.sourceURL));
  for (const f of d.figma) actions.append(link('对应 Figma ↗', f.url));
  const example = document.createElement('details');
  const summary = document.createElement('summary'); summary.textContent = '最小接入代码';
  const pre = document.createElement('pre'); pre.tabIndex = 0;
  const code = document.createElement('code'); code.textContent = integrationSnippet(entry); pre.append(code);
  example.append(summary, pre, copyButton('复制接入代码', integrationSnippet(entry)));
  const note = document.createElement('p'); note.className = 'handoff-footnote';
  note.textContent = '组件内已有按钮；接入现有按钮时需适配，避免嵌套。初始状态读取业务数据；图形尺寸与点击区分开处理。完整 HTML 用于独立体验，接入代码用于项目集成。';
  host.append(heading, badge, dl, sync, actions, example, note);
}

export function renderCommonNotes(host) {
  for (const text of commonNotes) { const li = document.createElement('li'); li.textContent = text; host.append(li); }
}
