const planePath = 'M21.9904 2.39099L19.1337 19.5331C19.0966 19.7481 18.9755 19.9161 18.7762 20.0353C18.6726 20.092 18.5554 20.1252 18.4303 20.1252C18.3482 20.1252 18.2584 20.1056 18.1626 20.0685L13.5356 18.1771C13.2816 18.0735 12.9905 18.1478 12.8166 18.3588L10.4073 21.2976C10.2725 21.4695 10.0888 21.5535 9.86021 21.5535C9.76447 21.5535 9.6824 21.5379 9.61206 21.5086C9.47137 21.4558 9.35804 21.3718 9.27207 21.2468C9.18609 21.1237 9.14115 20.9888 9.14115 20.8384V17.3916C9.14115 17.1024 9.2408 16.8249 9.42252 16.6002L18.784 5.12458L6.99961 15.3243C6.90972 15.4005 6.78467 15.422 6.6772 15.377L2.44686 13.6439C2.17135 13.5403 2.0209 13.3371 2.00136 13.0284C1.98573 12.7314 2.10492 12.5106 2.35894 12.3679L20.9294 1.65434C21.0428 1.58595 21.16 1.55469 21.287 1.55469C21.4375 1.55469 21.5723 1.59767 21.6915 1.67974C21.9396 1.8556 22.0354 2.09594 21.9904 2.39099Z';

export class SipplayPaperPlane extends HTMLElement {
  static observedAttributes = ['label', 'duration'];
  constructor() {
    super();
    this.attachShadow({mode:'open'}).innerHTML = `<style>
      :host{display:inline-block;width:44px;height:44px;vertical-align:middle;color:#fff}
      button{display:grid;place-items:center;width:100%;height:100%;padding:0;border:0;border-radius:10px;background:none;color:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
      button:focus-visible{outline:1px solid currentColor;outline-offset:3px}
      svg{display:block;width:24px;height:24px;overflow:visible;pointer-events:none;transform-origin:12px 12px}
      .playing svg{animation:plane-flight var(--duration) both}
      .paused svg{animation-play-state:paused}
      @keyframes plane-flight{
        0%{transform:translate(0,0) scale(1);opacity:1;animation-timing-function:cubic-bezier(.4,0,.6,1)}
        15%{transform:translate(-1.1px,1.1px) scale(.94);opacity:1;animation-timing-function:cubic-bezier(.55,0,.85,.45)}
        30%{transform:translate(7.5px,-7.5px) scale(.98);opacity:1;animation-timing-function:cubic-bezier(.4,0,.8,.5)}
        40%{transform:translate(18px,-18px) scale(.86);opacity:0;animation-timing-function:linear}
        41%{transform:translate(-9px,9px) scale(.87);opacity:0;animation-timing-function:cubic-bezier(.16,1,.3,1)}
        88%{transform:translate(0,0) scale(1);opacity:1;animation-timing-function:ease-out}
        100%{transform:translate(0,0) scale(1);opacity:1}
      }
      @media(prefers-reduced-motion:reduce){.playing svg{animation:none}}
    </style><button type="button"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="${planePath}" fill="currentColor"/></svg></button>`;
    this.button = this.shadowRoot.querySelector('button');
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.running = false;
    this.button.addEventListener('click', () => this.play());
    this.button.addEventListener('animationend', event => { if (event.animationName === 'plane-flight') this.finish(); });
    this.onReduced = () => { if (this.reduced.matches) this.finish(); };
  }
  connectedCallback() { this.sync(); this.reduced.addEventListener('change',this.onReduced); }
  disconnectedCallback() { this.finish(); this.reduced.removeEventListener('change',this.onReduced); }
  attributeChangedCallback() { this.sync(); }
  sync() {
    if (!this.button) return;
    this.button.setAttribute('aria-label',this.getAttribute('label') || '播放纸飞机动效');
    this.style.setProperty('--duration',`${Math.max(.35,Math.min(2,Number(this.getAttribute('duration')) || .76))}s`);
  }
  play() {
    if (this.running || this.reduced.matches) return;
    this.running = true;
    this.button.classList.add('playing');
    this.dispatchEvent(new CustomEvent('motion-start',{bubbles:true,composed:true}));
  }
  pause() { this.button.classList.add('paused'); }
  resume() { this.button.classList.remove('paused'); }
  finish() {
    const wasRunning = this.running;
    this.running = false;
    this.button.classList.remove('playing');
    if (wasRunning) this.dispatchEvent(new CustomEvent('motion-finish',{bubbles:true,composed:true}));
  }
}
if (!customElements.get('sipplay-paper-plane')) customElements.define('sipplay-paper-plane',SipplayPaperPlane);
