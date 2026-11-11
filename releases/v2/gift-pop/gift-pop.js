import {giftArt} from './gift-art.js';

const styles = `
:host{display:inline-block;width:44px;height:44px;vertical-align:middle}
button{display:grid;place-items:center;width:100%;height:100%;padding:0;border:0;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent}
button:focus-visible{outline:1px solid #dbc48a;outline-offset:3px}
svg{display:block;overflow:visible;pointer-events:none}
.gift{transform-origin:20px 25.74px}
.lid{transform-origin:9.6px 15.2px}
.star-0{transform-origin:6.4px 5.1px;animation:star-anim-0 1.8s -.4s infinite}
.star-1{transform-origin:2.75px 9.6px;animation:star-anim-1 2.35s -1.15s infinite}
.star-2{transform-origin:29.8px 5.25px;animation:star-anim-2 2.1s -.7s infinite}

@keyframes star-anim-0{
  0%,100%{transform:scale(.85);opacity:.6;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  50%{transform:scale(1.18);opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
}
@keyframes star-anim-1{
  0%,100%{transform:scale(.7);opacity:.5;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  50%{transform:scale(1.22);opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
}
@keyframes star-anim-2{
  0%,100%{transform:scale(.75);opacity:.5;animation-timing-function:cubic-bezier(.4,0,.2,1)}
  50%{transform:scale(1.2);opacity:1;animation-timing-function:cubic-bezier(.4,0,.2,1)}
}

.burst-items{pointer-events:none}
.b-item{
  opacity:0;
  transform-box:fill-box;
  transform-origin:center;
  filter:drop-shadow(0 0 1.2px rgba(255,240,100,.95)) drop-shadow(0 0 2.8px rgba(255,80,150,.75));
}
.motion-paused .gift,.motion-paused .lid,.motion-paused .star,.motion-paused .b-item{animation-play-state:paused!important}
@media(prefers-reduced-motion:reduce){.playing .gift,.playing .lid,.star,.b-item{animation:none!important}}

.playing .gift{animation:gift-pop var(--duration) both}
.playing .lid{animation:lid-pop var(--duration) both}

@keyframes gift-pop{
  0%{transform:translateY(0) scale(1,1);animation-timing-function:cubic-bezier(.4,0,.6,1)}
  9%{transform:translateY(.35px) scale(1.06,.92);animation-timing-function:cubic-bezier(.1,.9,.2,1)}
  32%{transform:translateY(-2.2px) scale(.95,1.05);animation-timing-function:cubic-bezier(.35,0,.55,1)}
  60%{transform:translateY(.18px) scale(1.025,.975);animation-timing-function:cubic-bezier(.2,.8,.3,1)}
  78%{transform:translateY(-.15px) scale(.995,1.005);animation-timing-function:ease-out}
  100%{transform:translateY(0) scale(1,1)}
}
@keyframes lid-pop{
  0%,9%{transform:translate(0,0) rotate(0deg);animation-timing-function:cubic-bezier(.1,.9,.2,1)}
  34%{transform:translate(.45px,-1.3px) rotate(-21deg);animation-timing-function:cubic-bezier(.4,0,.6,1)}
  44%{transform:translate(.45px,-1.3px) rotate(-21deg);animation-timing-function:cubic-bezier(.45,0,.7,.5)}
  68%{transform:translate(0,0) rotate(0deg);animation-timing-function:cubic-bezier(.2,.8,.3,1)}
  80%{transform:translate(.03px,-.1px) rotate(-1.5deg);animation-timing-function:ease-out}
  100%{transform:translate(0,0) rotate(0deg)}
}

.playing .b-star-1{animation:b-star-1 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-star-2{animation:b-star-2 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-star-3{animation:b-star-3 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-star-4{animation:b-star-4 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-1{animation:b-dot-1 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-2{animation:b-dot-2 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-3{animation:b-dot-3 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-4{animation:b-dot-4 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-5{animation:b-dot-5 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-6{animation:b-dot-6 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-7{animation:b-dot-7 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-8{animation:b-dot-8 var(--duration) cubic-bezier(.08,.9,.2,1) both}
.playing .b-dot-9{animation:b-dot-9 var(--duration) cubic-bezier(.08,.9,.2,1) both}

@keyframes b-star-1{
  0%,10%{opacity:0;transform:translate(0,0) rotate(0deg) scale(.2)}
  24%{opacity:1;transform:translate(0,-6.5px) rotate(35deg) scale(1.25)}
  42%{opacity:1;transform:translate(.1px,-9.8px) rotate(65deg) scale(1.15)}
  60%{opacity:.7;transform:translate(.2px,-11.2px) rotate(85deg) scale(.8)}
  74%,100%{opacity:0;transform:translate(.3px,-12px) rotate(95deg) scale(.2)}
}
@keyframes b-star-2{
  0%,11%{opacity:0;transform:translate(0,0) rotate(0deg) scale(.2)}
  25%{opacity:1;transform:translate(2.8px,-5.6px) rotate(-35deg) scale(1.2)}
  43%{opacity:1;transform:translate(4.2px,-8.4px) rotate(-65deg) scale(1.1)}
  61%{opacity:.7;transform:translate(5px,-9.6px) rotate(-85deg) scale(.75)}
  75%,100%{opacity:0;transform:translate(5.5px,-10.4px) rotate(-95deg) scale(.2)}
}
@keyframes b-star-3{
  0%,11%{opacity:0;transform:translate(0,0) rotate(0deg) scale(.2)}
  25%{opacity:1;transform:translate(-2.6px,-5.2px) rotate(35deg) scale(1.15)}
  43%{opacity:1;transform:translate(-3.8px,-7.8px) rotate(60deg) scale(1.05)}
  61%{opacity:.65;transform:translate(-4.6px,-9px) rotate(80deg) scale(.7)}
  75%,100%{opacity:0;transform:translate(-5px,-9.8px) rotate(90deg) scale(.2)}
}
@keyframes b-star-4{
  0%,12%{opacity:0;transform:translate(0,0) rotate(0deg) scale(.2)}
  26%{opacity:1;transform:translate(1.5px,-6.2px) rotate(-25deg) scale(1.2)}
  44%{opacity:1;transform:translate(2.2px,-9.2px) rotate(-50deg) scale(1.1)}
  62%{opacity:.7;transform:translate(2.7px,-10.6px) rotate(-70deg) scale(.75)}
  76%,100%{opacity:0;transform:translate(3px,-11.4px) rotate(-80deg) scale(.2)}
}
@keyframes b-dot-1{
  0%,10%{opacity:0;transform:translate(0,0) scale(.2)}
  24%{opacity:1;transform:translate(.6px,-6.5px) scale(1.25)}
  42%{opacity:1;transform:translate(1px,-9.5px) scale(1.2)}
  60%{opacity:.7;transform:translate(1.3px,-11px) scale(.85)}
  74%,100%{opacity:0;transform:translate(1.5px,-12px) scale(.2)}
}
@keyframes b-dot-2{
  0%,11%{opacity:0;transform:translate(0,0) scale(.2)}
  25%{opacity:1;transform:translate(-1.4px,-5.8px) scale(1.2)}
  43%{opacity:1;transform:translate(-2.2px,-8.6px) scale(1.15)}
  61%{opacity:.65;transform:translate(-2.8px,-10px) scale(.8)}
  75%,100%{opacity:0;transform:translate(-3.2px,-10.8px) scale(.2)}
}
@keyframes b-dot-3{
  0%,11%{opacity:0;transform:translate(0,0) scale(.2)}
  25%{opacity:1;transform:translate(2.2px,-5px) scale(1.15)}
  43%{opacity:1;transform:translate(3.4px,-7.4px) scale(1.1)}
  61%{opacity:.65;transform:translate(4.2px,-8.6px) scale(.75)}
  75%,100%{opacity:0;transform:translate(4.7px,-9.2px) scale(.2)}
}
@keyframes b-dot-4{
  0%,12%{opacity:0;transform:translate(0,0) scale(.2)}
  26%{opacity:1;transform:translate(3px,-4.2px) scale(1.15)}
  44%{opacity:1;transform:translate(4.5px,-6.2px) scale(1.1)}
  62%{opacity:.6;transform:translate(5.4px,-7.2px) scale(.75)}
  76%,100%{opacity:0;transform:translate(6px,-7.8px) scale(.2)}
}
@keyframes b-dot-5{
  0%,12%{opacity:0;transform:translate(0,0) scale(.2)}
  26%{opacity:1;transform:translate(-2.6px,-4.4px) scale(1.1)}
  44%{opacity:1;transform:translate(-3.9px,-6.5px) scale(1.05)}
  62%{opacity:.55;transform:translate(-4.7px,-7.5px) scale(.7)}
  76%,100%{opacity:0;transform:translate(-5.3px,-8px) scale(.2)}
}
@keyframes b-dot-6{
  0%,12%{opacity:0;transform:translate(0,0) scale(.2)}
  26%{opacity:1;transform:translate(1.2px,-5px) scale(1.15)}
  44%{opacity:1;transform:translate(1.9px,-7.2px) scale(1.1)}
  62%{opacity:.6;transform:translate(2.4px,-8.4px) scale(.75)}
  76%,100%{opacity:0;transform:translate(2.8px,-9px) scale(.2)}
}
@keyframes b-dot-7{
  0%,13%{opacity:0;transform:translate(0,0) scale(.2)}
  27%{opacity:1;transform:translate(2.8px,-3.2px) scale(1.05)}
  45%{opacity:1;transform:translate(4.2px,-4.6px) scale(1)}
  63%{opacity:.5;transform:translate(5px,-5.4px) scale(.7)}
  77%,100%{opacity:0;transform:translate(5.6px,-5.8px) scale(.2)}
}
@keyframes b-dot-8{
  0%,13%{opacity:0;transform:translate(0,0) scale(.2)}
  27%{opacity:1;transform:translate(-1px,-4px) scale(1.05)}
  45%{opacity:1;transform:translate(-1.5px,-5.8px) scale(1)}
  63%{opacity:.5;transform:translate(-1.8px,-6.8px) scale(.7)}
  77%,100%{opacity:0;transform:translate(-2.1px,-7.4px) scale(.2)}
}
@keyframes b-dot-9{
  0%,13%{opacity:0;transform:translate(0,0) scale(.2)}
  27%{opacity:1;transform:translate(1.8px,-3.6px) scale(1.05)}
  45%{opacity:1;transform:translate(2.8px,-5.2px) scale(1)}
  63%{opacity:.5;transform:translate(3.4px,-6px) scale(.7)}
  77%,100%{opacity:0;transform:translate(3.8px,-6.6px) scale(.2)}
}
`;

export class SipplayGiftPop extends HTMLElement {
  static observedAttributes = ['label', 'duration', 'interval'];
  constructor() {
    super();
    this.attachShadow({mode:'open'}).innerHTML = `<style>${styles}</style><button type="button">${giftArt}</button>`;
    this.button = this.shadowRoot.querySelector('button');
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.timer = null;
    this.fallbackTimer = null;
    this.running = false;
    this.isPaused = false;
    this.button.addEventListener('click', () => {
      if (!this.running) this.play();
    });
    this.button.addEventListener('animationend', event => {
      if (event.animationName === 'gift-pop') this.finish();
    });
    this.onReduced = () => {
      if (this.reduced.matches) {
        this.clearTimer();
        this.finish();
      } else {
        this.scheduleNext(300);
      }
    };
  }
  connectedCallback() {
    this.sync();
    this.reduced.addEventListener('change', this.onReduced);
    if (!this.reduced.matches) {
      this.scheduleNext(300);
    }
  }
  disconnectedCallback() {
    this.clearTimer();
    this.finish();
    this.reduced.removeEventListener('change', this.onReduced);
  }
  attributeChangedCallback() {
    this.sync();
  }
  sync() {
    if (!this.button) return;
    this.button.setAttribute('aria-label', this.getAttribute('label') || '播放礼盒动效');
    const duration = Math.max(.3, Math.min(2, Number(this.getAttribute('duration')) || .48));
    this.style.setProperty('--duration', `${duration}s`);
    this.durationSec = duration;
    const interval = Math.max(.8, Math.min(10, Number(this.getAttribute('interval')) || 1.4));
    this.intervalMs = interval * 1000;
  }
  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }
  scheduleNext(delay) {
    this.clearTimer();
    if (this.reduced.matches || this.isPaused) return;
    this.timer = setTimeout(() => {
      this.timer = null;
      this.play();
    }, delay ?? this.intervalMs ?? 1800);
  }
  play() {
    if (this.running || this.reduced.matches) return;
    this.clearTimer();
    this.running = true;
    this.button.classList.remove('playing');
    void this.button.offsetWidth;
    this.button.classList.add('playing');
    this.dispatchEvent(new CustomEvent('motion-start', {bubbles: true, composed: true}));
    this.fallbackTimer = setTimeout(() => {
      if (this.running) this.finish();
    }, (this.durationSec + 0.08) * 1000);
  }
  pause() {
    this.isPaused = true;
    this.clearTimer();
    this.button.classList.add('motion-paused');
  }
  resume() {
    this.isPaused = false;
    this.button.classList.remove('motion-paused');
    if (!this.running && !this.reduced.matches) {
      this.scheduleNext(800);
    }
  }
  finish() {
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    const wasRunning = this.running;
    this.running = false;
    this.button.classList.remove('playing');
    if (wasRunning) {
      this.dispatchEvent(new CustomEvent('motion-finish', {bubbles: true, composed: true}));
    }
    if (!this.isPaused && !this.reduced.matches) {
      this.scheduleNext(this.intervalMs);
    }
  }
}


if (!customElements.get('sipplay-gift-pop')) customElements.define('sipplay-gift-pop', SipplayGiftPop);
