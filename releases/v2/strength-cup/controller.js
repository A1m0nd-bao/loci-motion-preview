import {animate} from '../vendor/motion-components.js';
import {IcePhysics} from './ice-physics.js';
import {LemonMotion} from './lemon-motion.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),levels=[185.09,136.09,87.09,38.0044],names=['Basic','Standard','Extended','Maximum'];
try {
const [markup,poses]=await Promise.all([fetch('./artwork.svg').then(r=>{if(!r.ok)throw Error('SVG 未加载');return r.text();}),fetch('./poses.json').then(r=>r.json())]);
document.querySelector('#art').innerHTML=markup;
const svg=document.querySelector('.artwork'),surface=svg.querySelector('#surface'),gradient=svg.querySelector('[data-liquid-gradient]'),indicator=svg.querySelector('#indicator'),lemon=svg.querySelector('#lemon'),glass=svg.querySelector('#glass'),input=document.querySelector('input'),output=document.querySelector('output'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const lemonPoses=svg.querySelectorAll('[data-lemon-pose]'),thumbSamples=svg.querySelectorAll('[data-thumb-cutout],[data-thumb-sample]'),lemonMotion=new LemonMotion();
const cubes=[...svg.querySelectorAll('[data-ice]')];let value=0,water=levels[0],fluidWave=0,splash=0,committed=0,dragging=false,raf=0,last=0,awakeUntil=0,liquidControl,knobControl,waveControl,paused=false;
const ice=new IcePhysics(poses,bodies=>{
 for(let i=0;i<4;i++){const b=bodies[i],node=cubes[i];node.setAttribute('transform',`translate(${b.x} ${b.y}) rotate(${b.angle}) scale(${b.size/24})`);node.setAttribute('opacity',b.visible);node.querySelector('rect').setAttribute('fill-opacity',b.alpha);}
},impact=>{splash=Math.min(1.5,splash+impact);wake();});
function positionFromWater(){return clamp((levels[0]-water)/(levels[0]-levels[3])*3,0,3);}
function heightFor(p){const i=Math.min(2,Math.floor(p));return levels[i]+(levels[i+1]-levels[i])*(p-i);}
function drawWater(){
 const wave=fluidWave+splash;
 surface.setAttribute('d',`M48 ${water}C65 ${water-wave} 92 ${water+wave} 113 ${water}V280H48Z`);
 gradient.setAttribute('y1',water);gradient.setAttribute('y2',246.48);
 gradient.firstElementChild.setAttribute('stop-opacity',.15-.1*clamp((positionFromWater()-2),0,1));
 glass.setAttribute('opacity',clamp((water-levels[3])/22,0,1));

}
function drawLemon(){
 const p=clamp(lemonMotion.amount,0,1);
 const y=-10*(1-p),angle=2*(1-p);
 for(const pose of lemonPoses){pose.setAttribute('transform',`translate(0 ${y}) translate(94 45) rotate(${angle}) translate(-94 -45)`);pose.setAttribute('opacity',lemonMotion.opacity);}
}
function wake(){awakeUntil=performance.now()+3200;if(!raf&&!paused&&!document.hidden){last=performance.now();raf=requestAnimationFrame(frame);}}
function frame(now){
 raf=0;if(paused||document.hidden)return;const dt=Math.min((now-last)/1000,1/30);last=now;
 // Small steps keep collisions stable on low frame rates and when a tab resumes.
 ice.advance(dt,positionFromWater(),water);lemonMotion.advance(dt,water,ice.garnishReady);drawLemon();
 splash*=Math.exp(-dt*9);drawWater();
 if(now<awakeUntil)raf=requestAnimationFrame(frame);
}
function drawKnob(next){
 value=clamp(next,0,100);input.value=value;indicator.setAttribute('transform',`translate(0 ${-147*value/100})`);
 for(const sample of thumbSamples)sample.setAttribute('y',171.09-147*value/100);
 const p=value*.03;
 for(const group of svg.querySelectorAll('[data-label]')){
  const weight=Math.max(0,1-Math.abs(p-Number(group.dataset.label)));
  for(const e of group.querySelectorAll('[data-active]'))e.setAttribute('opacity',weight);
  group.querySelector('[data-inactive]').setAttribute('opacity',.4*(1-weight));
 }
 input.setAttribute('aria-valuetext',`${names[Math.round(p)]}，${Math.round(value)}%`);
}
function moveWater(target,instant=false){
 liquidControl?.stop();waveControl?.stop();
 if(instant||reduced.matches){water=target;fluidWave=splash=0;ice.setTarget(positionFromWater(),water,true);lemonMotion.settle(water);drawWater();drawLemon();return;}
 const delta=target-water;
 liquidControl=animate(water,target,{duration:dragging?.22:.54,ease:dragging?[.22,1,.36,1]:[.4,0,.2,1],onUpdate:y=>{water=y;drawWater();}});
 const initial=fluidWave;
 waveControl=animate(0,1,{duration:.82,ease:'linear',onUpdate:t=>{fluidWave=initial*(1-t)**2+Math.sin(t*Math.PI)*Math.sin(t*Math.PI*3)*Math.min(1.7,Math.abs(delta)*.025)*(delta<0?1:-1);}});
 wake();
}
function snap(level,instant=false){
 committed=clamp(Math.round(level),0,3);dragging=false;knobControl?.stop();
 for(const button of document.querySelectorAll('.level-tabs button'))button.setAttribute('aria-pressed',String(Number(button.dataset.level)===committed));
 output.textContent=`${names[committed]} · ${committed+1} 块冰`;
 document.querySelector('.stage').dispatchEvent(new CustomEvent('strength-change',{detail:{level:committed,name:names[committed],value:committed/3*100},bubbles:true}));
 moveWater(levels[committed],instant);
 if(instant||reduced.matches)drawKnob(committed/3*100);
 else knobControl=animate(value,committed/3*100,{duration:.28,ease:[.22,1,.36,1],onUpdate:drawKnob});
}
for(const b of document.querySelectorAll('[data-level]'))b.addEventListener('click',()=>snap(Number(b.dataset.level)));
function dragTo(clientY){
 const box=document.querySelector('.stage').getBoundingClientRect();
 const svgY=(clientY-box.top)/box.height*294;
 drawKnob(clamp((185.09-svgY)/147*100,0,100));
 moveWater(heightFor(value*.03));output.textContent=`${names[Math.round(value*.03)]} · 拖动中`;
}
input.addEventListener('pointerdown',e=>{e.preventDefault();input.focus();dragging=true;knobControl?.stop();input.setPointerCapture(e.pointerId);dragTo(e.clientY);});
input.addEventListener('pointermove',e=>{if(dragging){e.preventDefault();dragTo(e.clientY);}});
input.addEventListener('pointerup',e=>{if(dragging){dragging=false;input.releasePointerCapture(e.pointerId);snap(value*.03);}});
input.addEventListener('input',()=>{knobControl?.stop();drawKnob(Number(input.value));moveWater(heightFor(value*.03));output.textContent=`${names[Math.round(value*.03)]} · 拖动中`;});
input.addEventListener('change',()=>snap(value*.03));input.addEventListener('pointercancel',()=>snap(value*.03));
input.addEventListener('keydown',e=>{
 let next;if(['ArrowUp','ArrowRight','PageUp'].includes(e.key))next=Math.floor(value*.03+.0001)+1;
 if(['ArrowDown','ArrowLeft','PageDown'].includes(e.key))next=Math.ceil(value*.03-.0001)-1;
 if(e.key==='Home')next=0;if(e.key==='End')next=3;if(next!==undefined){e.preventDefault();snap(next);}
});
reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(raf);raf=0;snap(committed,true);}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;liquidControl?.pause();knobControl?.pause();waveControl?.pause();}else{liquidControl?.play();knobControl?.play();waveControl?.play();wake();}});
window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);for(const c of [liquidControl,knobControl,waveControl ])c?.stop();});
// Business API: levels 0–3; preserve the current transition when retargeting.
document.querySelector('.stage').addEventListener('strength-set',event=>{const level=event.detail?.level;if(Number.isFinite(level))snap(level,Boolean(event.detail?.instant));});
snap(0,true);
} catch(error){const p=document.createElement('p');p.className='error';p.textContent='预览加载失败：'+error.message;document.querySelector('#art').replaceChildren(p);console.error(error);}
