import { webMotions } from './catalog.js?v=20261020-check-path';
import { getHandoff } from './handoff.js?v=20261020-liquid2';
import { batchPrompt, copyButton, renderHandoff, renderCommonNotes } from './handoff-ui.js?v=20261020-liquid2';

const entries = webMotions.filter(e => e.custom).sort((a,b) => getHandoff(b).figma.length - getHandoff(a).figma.length);
const mapped = entries.filter(e => getHandoff(e).figma.length);
const nodeCount = new Set(mapped.flatMap(e => getHandoff(e).figma.map(f => f.nodeId))).size;
document.querySelector('#componentCount').textContent = `${entries.length} 个自定义动效 · ${mapped.length} 个已定位 · ${nodeCount} 个已核对节点 · ${entries.length - mapped.length} 个待核对。展开查看适配要求。`;
document.querySelector('#batchCopy').append(copyButton('复制 AI 接入指令', batchPrompt));
document.querySelector('#batchText').textContent = batchPrompt;
renderCommonNotes(document.querySelector('#commonNotes'));
for (const entry of entries) {
  const row = document.createElement('details'); row.id = entry.id; row.className = 'component-doc';
  const summary = document.createElement('summary');
  const title = document.createElement('span'); title.textContent = `${entry.name} · ${getHandoff(entry).figma.length ? '已核对位置' : '待绑定位置'}`;
  const tag = document.createElement('code'); tag.textContent = entry.id; summary.append(title,tag);
  const body = document.createElement('section'); body.className = 'handoff-panel';
  renderHandoff(body, entry); row.append(summary,body); document.querySelector('#componentDocs').append(row);
}
function revealHash() {
  const target = document.getElementById(location.hash.slice(1));
  if (target?.classList.contains('component-doc')) { target.open = true; target.scrollIntoView(); }
}
window.addEventListener('hashchange', revealHash); revealHash();
