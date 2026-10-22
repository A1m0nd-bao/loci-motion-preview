import { readFile, writeFile } from 'node:fs/promises';
import { webMotions } from '../web-components/catalog.js';
import { getHandoff, handoffText } from '../web-components/handoff.js';

const root = new URL('../', import.meta.url);
const entries = webMotions.filter(e => e.custom);
const docs = entries.map(e => {
  const d = getHandoff(e);
  if (!d) throw new Error(`Missing handoff: ${e.id}`);
  return { e, d };
});
const groups = new Map();
for (const item of docs) {
  if (!groups.has(item.d.sourcePath)) groups.set(item.d.sourcePath, []);
  groups.get(item.d.sourcePath).push(item);
}
const manifest = { schemaVersion: '1.0.0', readme: 'web-components/USAGE.md', modules: [] };
const regImports = [], registrations = [];
const mapping = { fileKey: 'KZyY9qkYbf0yiwqcovRKy3', codeConnect: 'unavailable-plan', annotationBoard: { nodeId: '757:14437', url: 'https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=757-14437' }, note: '项目交付记录，不是 Code Connect 标准格式。仅映射核对过的节点；未匹配项不得按外观批量替换。', bindings: [] };

for (const [path, items] of groups) {
  let source = await readFile(new URL(path, root), 'utf8');
  const className = source.match(/class\s+(\w+)\s+extends\s+HTMLElement/)?.[1];
  if (!className) throw new Error(`No component class in ${path}`);
  const attrs = JSON.parse(source.match(/static observedAttributes = (\[[^\]]+\])/)[1]);
  const description = items.map(({ e, d }) => handoffText(e)).join('\n\n');
  const first = items[0].d;
  const events = [...new Map(items.flatMap(({ d }) => [
    { name: d.event, description: `detail: ${d.payload}。${d.integration}`, type: { text: 'CustomEvent' } },
    ...(d.extraEvents ?? []).map(event => ({ name: event.name, description: `detail: ${event.payload}。${event.description}`, type: { text: 'CustomEvent' } })),
  ]).map(e => [e.name, e])).values()];
  const attributes = attrs.map(name => {
    const c = items[0].e.controls.find(c => c.attribute === name);
    const type = c ? 'number' : ['active', 'expanded'].includes(name) ? 'boolean' : 'string';
    const description = c ? `${c.label}；范围 ${c.min}–${c.max}，步长 ${c.step}。` : name === first.state ? `${first.integration} 默认 ${first.initial}。` : name === 'label' ? (first.behavior === 'loading' ? '加载图形的可访问名称。' : '内部交互控件的可访问名称。') : name === 'icon' ? '基础工具图形；具体别名固定为 brackets 或 image。' : name;
    return { name, type: { text: type }, description, ...(c ? { default: String(c.value) } : name === first.state ? { default: first.initial } : {}) };
  });
  const jsdoc = ['  /**', '   * @summary ' + items.map(({ e }) => e.name).join(' / '),
    ...description.split('\n').map(line => line ? '   * ' + line : '   *'),
    ...(items.length === 1 ? [`   * @tag ${first.id}`] : []),
    ...attributes.map(a => `   * @attribute {${a.type.text}} ${a.name} - ${a.description}`),
    ...events.map(e => `   * @fires {CustomEvent} ${e.name} - ${e.description}`),
    ...(first.slots ?? []).map(name => `   * @slot ${name} - ${name} 步骤的业务内容。`),
    '   */'].join('\n');
  source = source.replace(/  \/\*\*\n   \* @summary(?:(?!\*\/)[\s\S])*?\n   \*\/\n/g, '');
  source = source.replace(`  class ${className} extends HTMLElement`, `${jsdoc}\n  class ${className} extends HTMLElement`);
  await writeFile(new URL(path, root), source);
  const members = [];
  // Property names are read from real getter/setter declarations, rather than
  // invented by converting attribute names (e.g. value can be read-only).
  for (const match of source.matchAll(/^    get (\w+)\(\)/gm)) {
    const name = match[1];
    if (!['active','expanded','value','selected','duration','bounce','strength','speed','flowDuration','clickDuration','playState'].includes(name)) continue;
    members.push({ kind: 'field', name, readonly: !source.includes(`set ${name}(`), type: { text: ['active','expanded'].includes(name) ? 'boolean' : ['value','playState'].includes(name) ? 'string' : 'number' } });
  }
  for (const name of ['pause','play','finish','cancel','toggle','select','replay','trigger']) {
    const match = source.match(new RegExp(`^    ${name}\\(([^)]*)\\)`, 'm'));
    if (match) members.push({ kind: 'method', name, description: name === 'play' ? '恢复暂停的动画；单次反馈组件的重播请按组件说明调用 replay/trigger。' : name === 'finish' ? '直接落在当前状态或静止终态。' : `${name}(${match[1]})；语义见组件交付说明。` });
  }
  manifest.modules.push({ kind: 'javascript-module', path,
    declarations: [{ kind: 'function', name: first.initializer, description: '在浏览器中注册组件；animate 由调用方从 motion 导入。组合组件依赖可通过 registerMotion 初始化。', parameters: [{ name: 'animate', type: { text: 'Function' } }] },
      { kind: 'class', name: className, customElement: true, ...(items.length === 1 ? { tagName: first.id } : {}), description, superclass: { name: 'HTMLElement' }, attributes, members, events,
      slots: (first.slots ?? []).map(name => ({ name, description: `${name} 步骤业务内容` })) }],
    exports: [
      { kind: 'js', name: first.initializer, declaration: { name: first.initializer, module: path } },
      ...items.map(({ d }) => ({ kind: 'custom-element-definition', name: d.id, declaration: { name: className, module: path } })),
    ],
  });
  regImports.push(`import { ${first.initializer} } from './${first.source}';`);
  for (const { d } of items) {
    registrations.push(`  '${d.id}': { define: ${d.initializer}, dependencies: ${JSON.stringify(d.dependencies)} }`);
    for (const f of d.figma) mapping.bindings.push({ nodeId: f.nodeId, tagName: d.id, source: d.sourcePath, placement: f.placement, url: f.url, annotationStatus: f.annotationStatus, ...(f.selectionMode ? { selectionMode: f.selectionMode } : {}), ...(f.integrationMode ? { integrationMode: f.integrationMode } : {}), ...(f.verification ? { verification: f.verification } : {}), ...(f.contextStatus ? { contextStatus: f.contextStatus } : {}), ...(f.triggerStatus ? { triggerStatus: f.triggerStatus } : {}), ...(f.adaptation ? { adaptation: f.adaptation } : {}) });
  }
}
const registry = `${regImports.join('\n')}\n\nconst definitions = {\n${registrations.join(',\n')}\n};\n\n/** Register one audited component and its nested icon dependencies.\n * Browser-only: call after importing Motion, before mounting the element.\n * This is initialization glue; animation behavior remains in the source files.\n */\nexport function registerMotion(tagName, animate) {\n  const entry = definitions[tagName];\n  if (!entry) throw new Error('Unknown SipPlay component: ' + tagName);\n  if (typeof animate !== 'function') throw new TypeError('Pass animate imported from motion');\n  for (const dependency of entry.dependencies) registerMotion(dependency, animate);\n  entry.define(animate);\n  return customElements.get(tagName);\n}\n`;
await writeFile(new URL('web-components/register.js', root), registry);
await writeFile(new URL('custom-elements.json', root), JSON.stringify(manifest, null, 2) + '\n');
await writeFile(new URL('web-components/figma-bindings.json', root), JSON.stringify(mapping, null, 2) + '\n');
const readme = `# 自定义动效接入说明\n\n本文件和 custom-elements.json 来自已核对的组件源码与 handoff.js；运行 npm run docs:components 更新。\n\n## 当前交付范围\n\n共 ${entries.length} 个自定义动效，${mapping.bindings.length} 个 Figma 位置参考。位置说明保存在网站与源码，Figma 画布注释尚未全部同步。selectionMode=single 时由父级唯一选择值驱动，重复点击当前项不取消；selectionMode=multiple 时每项独立增删选中集合，不影响其他项。contextStatus=needs-confirmation 的暂停自动业务绑定。读取每条 annotationStatus，website-only 不代表已写回画布；有 adaptation 的必须按说明适配；triggerStatus=needs-confirmation 的不能自行绑定播放触发。正式 Code Connect 因当前账号套餐限制未启用。figma-bindings.json 是本项目的节点对照记录，不是 Code Connect 格式。没有绑定的动效仅提供建议用途，不应按图形相似自动替换整页。\n\n## 研发 / AI 三步使用\n\n1. 从 Figma 图层名中的动效 ID 和画布交付注释，核对精确节点。三项创作 Tab 优先复用 sipplay-tap-tab；其子图标不要重复绑定。\n2. 阅读对应组件的属性、事件和交互范围。将 web-components 源码目录复制到项目，npm install motion@13.5.1，通过 registerMotion(tagName, animate) 初始化。此目录不是已经发布的 npm 包，不要安装虚构的 sipplay 包。\n3. 以业务状态初始化并调用 finish()；之后通过 property 更新状态、监听公开事件连接业务。保留原设计尺寸与已有业务功能。先验证一处，再批量复用。\n\n## 项目集成\n\n- register.js 是浏览器初始化入口；在 SSR 项目客户端生命周期中调用。使用项目已有的 Motion 依赖，不要重复插入 CDN。\n- 单独下载的 HTML 联网可运行，包含预览样式；业务项目只取必要组件、初始化和参数，不复制放大预览布局。\n- 所有自定义控件都含内部按钮。不能直接放到另一个 button 内；接入已有按钮时应适配图标视图，保持单一点击与焦点入口。多数独立图标点击区是 44×44，与 SVG 原始图形尺寸不同。\n- active/expanded 是布尔属性，active=\"false\" 仍会选中；取消用 el.active=false 或 removeAttribute。先注册，再设置 property。\n- 外部写入 active/selected/value 不发出用户事件；请求失败与回滚、路由、音频和弹窗由业务层控制。\n- React/Vue/SSR 要按项目配置识别自定义元素，事件用 DOM addEventListener 连接最明确；不要假定这是已经封装好的 React/Vue 组件。\n- 保留键盘、减少动态效果和卸载清理；不要让多个引擎同时写同一 SVG 属性。\n\n## 设计节点记录与核对状态\n\n${mapping.bindings.map(b => `- [${b.nodeId}](${b.url}) → ${b.tagName}：${b.placement}`).join('\n')}\n\n## 批量接入给 AI 的指令\n\n读取本文件、custom-elements.json 与 figma-bindings.json；精确匹配 Figma fileKey + nodeId 或已标注动效 ID。优先复用组合组件，保留设计稿尺寸，绑定真实业务状态和公开事件。没有确认位置的列为待绑定，不猜路由与接口、不批量替换相似图标。输出每个修改的设计节点、动效 ID、代码位置、状态字段和验证结果。\n\n## 各组件交付注释\n\n${docs.map(({ e }) => `### ${e.name}\n\n\`\`\`text\n${handoffText(e)}\n\`\`\``).join('\n\n')}\n\n## 使用的既有流程\n\n- [Figma Code Connect](https://developers.figma.com/docs/code-connect/)：正式映射路径，当前未启用。\n- [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)：公开 API 的标准清单格式。本项目从源码声明和经核对的交付信息生成，非已接入 Storybook 的声明。\n- [JSDoc 注释约定](https://custom-elements-manifest.open-wc.org/analyzer/getting-started/)：源码使用 @attribute / @fires / @slot 描述接口。\n`;
await writeFile(new URL('web-components/USAGE.md', root), readme);
console.log(`Documented ${entries.length} custom elements, ${groups.size} modules and ${mapping.bindings.length} Figma bindings.`);
