import {giftArt} from './gift-art.js';

const styles = `
:host{display:inline-block;width:44px;height:44px;vertical-align:middle}
button{display:grid;place-items:center;width:100%;height:100%;padding:0;border:0;background:none;cursor:pointer;border-radius:10px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
button:focus-visible{outline:1px solid #dbc48a;outline-offset:3px}
svg{display:block;overflow:visible;pointer-events:none}
.gift{transform-origin:19px 23.5px}.lid{transform-origin:9.8px 13.3281px}
.star-0{transform-origin:5.5px 3.5px;animation:star-large 1.8s -.4s infinite}
.star-1{transform-origin:2px 8px;animation:star-small 2.35s -1.15s infinite}
.motion-paused .gift,.motion-paused .lid,.motion-paused .star{animation-play-state:paused!important}
.playing .gift{animation:gift-pop var(--duration) both}
.playing .lid{animation:lid-pop var(--duration) both}
@keyframes gift-pop{
  0%{transform:translateY(0) scale(1,1);animation-timing-function:cubic-bezier(.4,0,.65,1)}
  13%{transform:translateY(.2px) scale(1.035,.94);animation-timing-function:cubic-bezier(.16,1,.3,1)}
  39%{transform:translateY(-1.35px) scale(.985,1.025);animation-timing-function:cubic-bezier(.4,0,.55,1)}
  65%{transform:translateY(.12px) scale(1.015,.985);animation-timing-function:cubic-bezier(.2,.7,.3,1)}
  83%{transform:translateY(-.16px) scale(.997,1.004);animation-timing-function:ease-out}
  100%{transform:translateY(0) scale(1,1)}
}
@keyframes lid-pop{
  0%,13%{transform:translate(0,0) rotate(0deg);animation-timing-function:cubic-bezier(.16,1,.3,1)}
  42%{transform:translate(.35px,-.85px) rotate(-14deg);animation-timing-function:ease-in-out}
  49%{transform:translate(.35px,-.85px) rotate(-14deg);animation-timing-function:cubic-bezier(.45,0,.7,.5)}
  73%{transform:translate(0,0) rotate(0deg);animation-timing-function:cubic-bezier(.2,.7,.3,1)}
  85%{transform:translate(.02px,-.08px) rotate(-1.4deg);animation-timing-function:ease-out}
  100%{transform:translate(0,0) rotate(0deg)}
}
@keyframes star-large{
  0%,100%{transform:scale(.82);opacity:.4;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  46%{transform:scale(1.17);opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
}
@keyframes star-small{
  0%,100%{transform:scale(.68);opacity:.25;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  54%{transform:scale(1.2);opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
}
@media(prefers-reduced-motion:reduce){.playing .gift,.playing .lid,.star{animation:none}}

`;

export class SipplayGiftPop extends HTMLElement {
  static observedAttributes = ['label', 'duration'];
  constructor() {
    super();
    this.attachShadow({mode:'open'}).innerHTML = `<style>${styles}</style><button type="button">${giftArt}</button>`;
    this.button = this.shadowRoot.querySelector('button');
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') this.play();
    });
    this.button.addEventListener('click', () => this.play());
    this.button.addEventListener('animationend', event => {
      if (event.animationName === 'gift-pop') this.finish();
    });
    this.onReduced = () => { if (this.reduced.matches) this.finish(); };
    this.running = false;
  }
  connectedCallback() { this.sync(); this.reduced.addEventListener('change',this.onReduced); }
  disconnectedCallback() { this.finish(); this.reduced.removeEventListener('change',this.onReduced); }
  attributeChangedCallback() { this.sync(); }
  sync() {
    if (!this.button) return;
    this.button.setAttribute('aria-label',this.getAttribute('label') || '播放礼盒动效');
    const duration = Math.max(.4,Math.min(2,Number(this.getAttribute('duration')) || .92));
    this.style.setProperty('--duration',`${duration}s`);
  }
  play() {
    if (this.running || this.reduced.matches) return;
    this.running = true;
    this.button.classList.add('playing');
    this.dispatchEvent(new CustomEvent('motion-start',{bubbles:true,composed:true}));
  }
  pause() { this.button.classList.add('motion-paused'); }
  resume() { this.button.classList.remove('motion-paused'); }
  finish() {
    const wasRunning = this.running;
    this.running = false;
    this.button.classList.remove('playing');
    if (wasRunning) this.dispatchEvent(new CustomEvent('motion-finish',{bubbles:true,composed:true}));
  }
}

if (!customElements.get('sipplay-gift-pop')) customElements.define('sipplay-gift-pop',SipplayGiftPop);
