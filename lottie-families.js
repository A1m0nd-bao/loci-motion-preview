const special = {
  'sipplay-liquid-rise-toggle': {on:'液面注入',loop:'持续流动',off:'液面回落'},
  'sipplay-preview-tabs': {on:'切到 Feed',off:'切到 Chat'},
  'sipplay-bell-ring-toggle': {on:'悬停摇铃',activate:'点击轻压'},
  'sipplay-history-clock': {on:'描绘旋转'},
  'sipplay-warning-nudge': {on:'弹性提醒'},
  'sipplay-voice-wave': {on:'声纹循环'},
  'sipplay-pin-reveal': {on:'出现',off:'隐藏'},
  'sipplay-image-sip-loading': {loop:'生图加载循环'},
};
export const segmentLabel = motion => special[motion.sourceComponent]?.[motion.playbackSegment] || ({on:'选中',off:'取消',activate:'点击反馈',loop:'循环'}[motion.playbackSegment]) || '播放';
export function groupLottieFamilies(items) {
  const families=new Map(), result=[];
  for(const item of items){
    if(item.kind!=='lottie'||item.category!=='动效 v1'||!item.sourceComponent){result.push(item);continue;}
    const key=['sipplay-pin-toggle','sipplay-pin-reveal'].includes(item.sourceComponent)?'sipplay-pin':item.sourceComponent;
    if(!families.has(key)){const f={...item,sourceComponent:key,name:key==='sipplay-pin'?'图钉反馈':item.name.split(' · ')[0],variants:[],tags:['sipplay','Motion 转 Lottie'],interactionType:'同一功能的播放段与接入说明'};families.set(key,f);result.push(f);}
    const family=families.get(key);
    if(!family.variants.some(v=>v.file===item.file))family.variants.push(item);
  }
  for(const f of families.values()){
    const main=f.variants.find(v=>v.playbackSegment==='on')||f.variants[0];
    Object.assign(f,{file:main.file,fileName:main.fileName,width:main.width,height:main.height,frames:main.frames,duration:main.duration,playbackSegment:main.playbackSegment});
    f.interactionType=f.variants.map(segmentLabel).join(' / ')+' · 点击查看用法';
  }
  return result;
}
const node=(tag,text)=>{const n=document.createElement(tag);if(text)n.textContent=text;return n;};
export function renderFamilyPanel(family,current,onSelect){
  const panel=document.querySelector('#lottieFamilyPanel');panel.replaceChildren();panel.hidden=!family;if(!family)return;
  panel.append(node('h3',family.name+' · 使用方式'));
  const switches=node('div');switches.className='lottie-segments';switches.setAttribute('role','group');switches.setAttribute('aria-label','播放段');
  for(const v of family.variants){const b=node('button',segmentLabel(v));b.type='button';b.setAttribute('aria-pressed',String(current.file===v.file));b.onclick=()=>onSelect(v,family);switches.append(b);}panel.append(switches);
  const id=family.sourceComponent, hasOff=family.variants.some(v=>v.playbackSegment==='off');
  const rule=id==='sipplay-liquid-rise-toggle'?'激活时单次播放「液面注入」，结束后切到「持续流动」并开启循环；取消时停止循环，单次播放「液面回落」。'
    :id==='sipplay-preview-tabs'?'选中 Feed 时单次播放「切到 Feed」，选中 Chat 时单次播放「切到 Chat」。实际 Tab 面板和选中状态由页面切换。'
    :id==='sipplay-bell-ring-toggle'?'鼠标进入时单次播放「悬停摇铃」，停留不重复；点击时单次播放「点击轻压」，同时由业务打开通知。'
    :id==='sipplay-image-sip-loading'?'生图请求开始时循环播放。成功后替换为生成图片，失败或取消时移除加载态；动画不表示真实进度。'
    :id==='sipplay-voice-wave'?'播放或录音状态开始时循环播放，结束时停止；音频和真实音量数据由业务接入，本文件不含音频。'
    :id==='sipplay-history-clock'||id==='sipplay-warning-nudge'?'悬停或点击时单次播放，结束后停在末帧；需要再次反馈时从头重播。'
    :id==='sipplay-pin'?'显示图钉时单次播放「出现」，隐藏时播放「隐藏」；固定状态改变时分别播放「选中」或「取消」。四种动作在此窗口统一预览。'
    :id==='sipplay-pin-reveal'?'展示图钉时单次播放「出现」，隐藏时单次播放「隐藏」，由业务决定何时展示。'
    :hasOff?'状态从未选中变为选中时单次播放「选中」；取消时单次播放「取消」，结束后停在末帧。'
    :'需要反馈时从头单次播放，完成后停在末帧。';
  panel.append(node('p',rule));
  if(id==='sipplay-selection-toggle')panel.append(node('p','粉色勾选用于单选：同组只保留一个选中项，其他项由业务取消。'));
  if(id==='sipplay-white-selection-toggle')panel.append(node('p','白色勾选用于多选：每一项独立维护选中状态。'));
  panel.append(node('p','播放段按钮只预览当前动作；多文件切换和业务事件由宿主控制。普通 JSON 不自带交互状态机，中途反向切换需在产品播放器中接入和验收。'));
  const list=node('ul');
  for(const v of family.variants){const li=node('li');li.append(node('span',segmentLabel(v)+' · '+Number(v.duration).toFixed(2)+' 秒 '));const a=node('a','下载 JSON');a.href=v.file;a.download=v.fileName;li.append(a);list.append(li);}panel.append(list);
  panel.append(node('p','布局：按原图视觉尺寸接入。部分画布增加透明留白以容纳回弹，整体缩到原图尺寸会把图标缩小。'));
  panel.append(node('p','验证：已用原版对照和 Skottie 检查；生图加载另有 Web 播放检查。iOS / Android 接入仍需目标端验收。'));
}
