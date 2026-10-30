import {groupLottieFamilies,segmentLabel} from './lottie-families.js?v=20261030-isolated';
let built=false,openFamily;
export function setupConvertedWindow(items,onOpen){
  openFamily=onOpen;
  if(!built){
    built=true;
    const entry=document.createElement('section');entry.id='convertedLottieEntry';entry.className='converted-entry';entry.hidden=true;
    entry.innerHTML='<div><strong>Motion 转 Lottie · 动效 v1</strong><p id="convertedLottieCount"></p></div><button type="button" id="openConvertedLottie">打开独立预览窗 ↗</button>';
    document.querySelector('#libraryView').before(entry);
    const dialog=document.createElement('dialog');dialog.id='convertedLottieDialog';dialog.className='converted-dialog';dialog.setAttribute('aria-labelledby','convertedLottieTitle');
    dialog.innerHTML='<header><div><p>Motion → Lottie / 动效 v1</p><h2 id="convertedLottieTitle">转换动效独立预览</h2><p>按功能合并入口；选中、取消、出现、隐藏等动作在同一窗口切换。</p></div><button type="button" id="closeConvertedLottie" aria-label="关闭转换动效窗口">×</button></header><div class="converted-grid" id="convertedLottieGrid"></div>';
    document.body.append(dialog);
    document.querySelector('#openConvertedLottie').onclick=()=>dialog.showModal();
    document.querySelector('#closeConvertedLottie').onclick=()=>dialog.close();
    document.querySelector('#detailDialog').addEventListener('close',()=>{
      if(document.querySelector('#detailDialog').dataset.fromConverted==='true'){
        delete document.querySelector('#detailDialog').dataset.fromConverted;
        if(!dialog.open)dialog.showModal();
      }
    });
  }
  const families=groupLottieFamilies(items),grid=document.querySelector('#convertedLottieGrid');grid.replaceChildren();
  document.querySelector('#convertedLottieCount').textContent=`${families.length} 个功能 · ${items.length} 个播放段 · 每项附用法和下载`;
  for(const family of families){
    const b=document.createElement('button');b.type='button';b.className='converted-family';
    const title=document.createElement('strong');title.textContent=family.name;
    const sub=document.createElement('span');sub.textContent=family.variants.map(segmentLabel).join(' / ');
    b.append(title,sub);b.onclick=()=>{
      document.querySelector('#convertedLottieDialog').close();
      document.querySelector('#detailDialog').dataset.fromConverted='true';
      openFamily(family);
    };grid.append(b);
  }
}
export function showConvertedEntry(visible){const entry=document.querySelector('#convertedLottieEntry');if(entry)entry.hidden=!visible;}
