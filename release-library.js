import {previewClock} from './release-runtime.js?v=unified-20261126';
import {icons} from './release-icons.js';

const htmlCache = new Map(), controllers = new Set();
let cardObserver, resizeObserver, detailController;
const settings = {speed:1, loop:true, background:'#0a0c10', hover:true};
const categories = {
  '基础控件':['plus-arrow-toggle','like-heart','strength-cup','mic-keyboard-toggle','pin-toggle-v2','image-arrow-toggle','billionaire-button-lite','ice-hockey-button-lite','lifecycle-item-counter'],
  '消息与输入':['voice-input-wave','paper-plane','invitation-code','invitation-code-autumn'],
  '角色与引导':['character-select','auto-photos'],
  '奖励与活动':['gift-pop','relic-journey','paid-reward','reward-ticket','chest-burst','confetti-fireworks','ticket-tear','reward-celebration','chest-two-state','maple-gift-pop','reward-ticket-pumpkin','autumn-transparent-leaves','ticket-tear-autumn','gems-pack-popup','welcome-gift-collect','battlepass-pack-textured','invite-ticket-v13','gem-bonus-composite','red-gold-chest-v3','cheers-popup'],
};
export const releaseCategory = item => item.category || Object.keys(categories).find(k => categories[k].includes(item.id.replace(/^sipplay-/,''))) || '其他';
function icon(name) {
  const make = ([tag, attrs, children=[]]) => { const node = document.createElementNS('http://www.w3.org/2000/svg', tag); for (const [k,v] of Object.entries(attrs)) node.setAttribute(k,v); children.forEach(c=>node.append(make(c))); return node; };
  const node = make(icons[name]); node.setAttribute('aria-hidden','true'); return node;
}
function command(name, label, fn) {
  const button = document.createElement('button'); button.type='button'; button.className='release-tool';button.title=label;button.setAttribute('aria-label',label);button.append(icon(name));button.addEventListener('click',fn);return button;
}
function eachFrame(frame, fn) {
  function visit(win) { try { if(win.__motionPreview) fn(win.__motionPreview); for(let i=0;i<win.frames.length;i++) visit(win.frames[i]); } catch {} }
  if(frame.contentWindow) visit(frame.contentWindow);
}
async function sourceHtml(url) {
  const key=new URL(url,document.baseURI).href;
  if(!htmlCache.has(key)) htmlCache.set(key,fetch(key).then(r=>{if(!r.ok)throw new Error('无法读取 HTML');return r.text();}).catch(e=>{htmlCache.delete(key);throw e;}));
  return htmlCache.get(key);
}
async function preparedHtml(url, config, depth=0) {
  const absolute=new URL(url,document.baseURI),doc=new DOMParser().parseFromString(await sourceHtml(absolute.href),'text/html');
  const base=doc.createElement('base');base.href=absolute.href;doc.head.prepend(base);
  const bridge=doc.createElement('script');bridge.textContent=`(${previewClock.toString()})(${JSON.stringify({...config,search:absolute.search})})`;base.after(bridge);
  if(depth<3) for(const child of doc.querySelectorAll('iframe[src]')) {
    const childUrl=new URL(child.getAttribute('src'),absolute);
    if(childUrl.origin!==location.origin)continue;
    child.removeAttribute('src');child.srcdoc=await preparedHtml(childUrl.href,config,depth+1);
  }
  return '<!doctype html>\n'+doc.documentElement.outerHTML;
}
function controller(frame, item, poster) {
  let epoch=0, loaded=false, disposed=false, desired=false, pinned=false, localSpeed, localLoop, localBackground;
  const c={frame,item,poster,onState:null,ready:null,
    async load() {
      if(loaded)return c.ready; const current=++epoch;loaded=true;disposed=false;
      c.ready=(async()=>{const url=new URL(item.file,document.baseURI);if(poster){url.searchParams.set(item.id==='sipplay-invitation-code-autumn'?'embed':'compact','1');url.searchParams.set('fit','contain');}
        const readyToken=item.id+':'+current;
        const html=await preparedHtml(url.href,{poster,readyToken,speed:localSpeed??settings.speed,background:localBackground??settings.background});if(disposed||epoch!==current)return;
        await new Promise(resolve=>{let finished=false;const finish=()=>{if(finished)return;finished=true;window.removeEventListener('message',c.message);if(disposed||epoch!==current)return resolve();eachFrame(frame,api=>{api.speed(localSpeed??settings.speed);api.background(localBackground??settings.background);api.loop(localLoop??settings.loop);if(!poster||desired)api.play();});frame.dispatchEvent(new Event('load'));c.onState?.();resolve();};c.message=e=>{if(e.source===frame.contentWindow&&e.data?.type==='sipplay-preview-ready'&&e.data.token===readyToken)finish();};window.addEventListener('message',c.message);frame.onload=finish;frame.srcdoc=html;});
      })().catch(e=>{loaded=false;frame.dispatchEvent(new CustomEvent('preview-error',{detail:e.message}));throw e;});return c.ready;
    },
    play(pin=false){if(pin)pinned=true;desired=true;c.load()?.then(()=>eachFrame(frame,api=>api.play())).catch(()=>{});c.onState?.();},
    pause(){pinned=false;desired=false;eachFrame(frame,api=>api.pause());c.onState?.();},
    hover(value){if(pinned)return;if(value&&settings.hover)c.play();else c.pause();},
    restart(){const play=!poster||desired; c.unload();disposed=false;desired=play;c.load()?.then(()=>{if(play)eachFrame(frame,api=>api.play());}).catch(()=>{});},
    settings(){eachFrame(frame,api=>{api.speed(settings.speed);api.background(settings.background);api.loop(settings.loop);});},
    loop(value){localLoop=value;let supported=false;eachFrame(frame,api=>{supported=api.loop(value)||supported;});return supported;},
    speed(value){localSpeed=Number(value);eachFrame(frame,api=>api.speed(localSpeed));},
    background(value){localBackground=value;eachFrame(frame,api=>api.background(value));},
    state(){let state={running:desired,loopSupported:false};eachFrame(frame,api=>{const s=api.state();state={...s,loopSupported:state.loopSupported||s.loopSupported};});return state;},
    unload(){epoch++;disposed=true;loaded=false;window.removeEventListener('message',c.message);frame.onload=null;eachFrame(frame,api=>api.pause());frame.removeAttribute('srcdoc');frame.removeAttribute('src');frame.src='about:blank';},
    destroy(){clearInterval(c.poll);c.unload();controllers.delete(c);},
  };controllers.add(c);return c;
}
export function syncReleaseSettings(next) {
  Object.assign(settings,next);for(const c of controllers){c.settings();if(!settings.hover&&c.poster)c.pause();}
}
export function setReleaseView(view) {document.querySelector('#v2Drafts')?.classList.toggle('list',view==='list');}
function sceneSize(item) {
  if(['sipplay-prop-spotlight','sipplay-relic-journey','sipplay-invitation-code','sipplay-invitation-code-autumn','sipplay-gems-pack-popup','sipplay-welcome-gift-collect'].includes(item.id))return[375,812];
  return ({'sipplay-billionaire-button-lite':[380,220],'sipplay-ice-hockey-button-lite':[380,220],'sipplay-lifecycle-item-counter':[1040,850],'sipplay-cheers-popup':[500,640],'sipplay-auto-photos':[600,760],'sipplay-voice-input-wave':[269,220],'sipplay-character-select':[750,504],'sipplay-reward-celebration':[644,644],'sipplay-invite-ticket-v13':[1000,480],'sipplay-gem-bonus-composite':[1040,660],'sipplay-red-gold-chest-v3':[420,510],'sipplay-battlepass-pack-textured':[560,558],'sipplay-chest-two-state':[760,685]})[item.id]||[260,220];
}
async function copyHtml(item,button) {
  const label=button.getAttribute('aria-label')||button.textContent;
  try{await navigator.clipboard.writeText(await sourceHtml(item.download||item.file));button.title='已复制 HTML';button.setAttribute('aria-label','已复制 HTML');}
  catch{button.title='复制失败，请下载 HTML';button.setAttribute('aria-label','复制失败，请下载 HTML');}
  setTimeout(()=>{button.title=label;button.setAttribute('aria-label',label);},1600);
}
export function renderReleaseCards(root, items, {version,onOpen,view}) {
  cardObserver?.disconnect();resizeObserver?.disconnect();for(const c of [...controllers])if(c.poster)c.destroy();root.replaceChildren();setReleaseView(view);
  if(!items.length){const p=document.createElement('p');p.className='release-placeholder';p.textContent=`没有匹配的 ${version} 动效。`;root.append(p);return;}
  resizeObserver=new ResizeObserver(entries=>{for(const {target,contentRect}of entries){const f=target.querySelector('iframe');const scale=Math.min((contentRect.width-16)/Number(f.width),(contentRect.height-16)/Number(f.height),1);f.style.transform=`translate(-50%, -50%) scale(${Math.max(.01,scale)})`;}});
  cardObserver=new IntersectionObserver(entries=>{for(const e of entries){const c=e.target.previewController;if(e.isIntersecting){c.load()?.catch(()=>{});}else c.unload();}},{rootMargin:'120px'});
  for(const item of items){
    const card=document.createElement('article');card.className='release-draft-card';card.dataset.id=item.id;
    const canvas=document.createElement('div');canvas.className='release-preview-canvas';const frame=document.createElement('iframe');frame.className='release-card-preview';frame.title=item.name+' · 静帧预览';frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');
    const [width,height]=sceneSize(item);frame.width=width;frame.height=height;frame.style.width=width+'px';frame.style.height=height+'px';
    const c=controller(frame,item,true);canvas.previewController=c;
    const opener=document.createElement('button');opener.type='button';opener.className='release-preview-open';opener.setAttribute('aria-label','查看'+item.name+'详情');opener.addEventListener('click',()=>onOpen(item,version));
    const loading=document.createElement('span');loading.className='release-preview-status';loading.textContent='载入预览…';canvas.append(frame,loading,opener);
    frame.addEventListener('load',()=>{if(frame.hasAttribute('srcdoc'))loading.hidden=true;});
    frame.addEventListener('preview-error',()=>{loading.hidden=false;loading.textContent='预览未载入，点击重试';opener.onclick=()=>c.restart();});
    canvas.addEventListener('pointerenter',()=>c.hover(true));canvas.addEventListener('pointerleave',()=>c.hover(false));opener.addEventListener('focus',()=>c.hover(true));opener.addEventListener('blur',()=>c.hover(false));
    const meta=document.createElement('div');meta.className='release-card-meta';const tag=document.createElement('span');tag.className='draft-status';tag.textContent=version+' · '+releaseCategory(item);meta.append(tag);
    const heading=document.createElement('h3'),title=document.createElement('button');title.type='button';title.className='release-title-button';title.textContent=item.name;title.addEventListener('click',()=>onOpen(item,version));heading.append(title);
    const note=document.createElement('p');note.className='release-card-note';note.textContent=item.note;
    const actions=document.createElement('div');actions.className='release-card-actions';
    actions.append(command('Play','播放',()=>c.play(true)),command('Pause','暂停',()=>c.pause()),command('RotateCcw','重播',()=>c.restart()),command('Copy','复制 HTML',e=>copyHtml(item,e.currentTarget)));
    const open=document.createElement('a');open.href=item.file;open.target='_blank';open.rel='noopener noreferrer';open.className='release-tool';open.title='独立预览';open.setAttribute('aria-label','独立预览');open.append(icon('ExternalLink'));
    const download=document.createElement('a');download.href=item.download||item.file;download.download=`Sipplay-${version}-${item.id}.html`;download.className='release-tool';download.title='下载 HTML';download.setAttribute('aria-label','下载 HTML');download.append(icon('Download'));actions.append(open,download);
    card.append(canvas,meta,heading,note,actions);root.append(card);resizeObserver.observe(canvas);cardObserver.observe(canvas);
  }
}
export function clearReleaseCards(){cardObserver?.disconnect();resizeObserver?.disconnect();for(const c of [...controllers])if(c.poster)c.destroy();}
export function mountReleaseDetail(frame,item) {
  destroyReleaseDetail();for(const c of controllers)if(c.poster)c.pause();
  const c=controller(frame,item,false);detailController=c;const stage=frame.parentElement;
  const toolbar=document.createElement('div');toolbar.className='release-playback';toolbar.setAttribute('aria-label','动效播放控制');toolbar.dataset.previewUi='true';
  toolbar.append(command('Play','播放',()=>c.play()),command('Pause','暂停',()=>c.pause()),command('RotateCcw','重播',()=>c.restart()),command('Copy','复制 HTML',e=>copyHtml(item,e.currentTarget)));
  const speed=document.createElement('select');speed.setAttribute('aria-label','详情播放速度');for(const n of [.25,.5,.75,1,1.5,2,3])speed.add(new Option(n+'×',n));speed.value=String(settings.speed);speed.addEventListener('change',()=>c.speed(speed.value));toolbar.append(speed);
  const label=document.createElement('label'),loop=document.createElement('input');loop.type='checkbox';loop.checked=settings.loop;loop.disabled=true;label.append(loop,' 循环');label.title='此动效若包含可控时间线循环，将在载入后启用';loop.addEventListener('change',()=>c.loop(loop.checked));toolbar.append(label);
  const bg=document.createElement('input');bg.type='color';bg.value=settings.background;bg.setAttribute('aria-label','详情预览背景');bg.title='预览背景';bg.addEventListener('input',()=>c.background(bg.value));toolbar.append(bg);
  const status=document.createElement('span');status.className='release-play-state';status.setAttribute('aria-live','polite');toolbar.append(status);stage.append(toolbar);
  c.onState=()=>{const s=c.state();status.textContent=s.running?'播放中':'已暂停';loop.disabled=!s.loopSupported;label.title=s.loopSupported?'控制时间线循环':'此组件由交互或代码驱动循环，不支持统一循环开关';};
  c.poll=setInterval(()=>c.onState?.(),500);
  c.load()?.catch(()=>{status.textContent='载入失败，可独立打开';});
}
export function destroyReleaseDetail(){if(detailController){detailController.destroy();detailController=null;}document.querySelector('.release-playback')?.remove();}
document.addEventListener('visibilitychange',()=>{if(document.hidden)for(const c of controllers)c.pause();});
