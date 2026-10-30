export function defineMicKeyboardToggle(animate) {
  const tag = 'sipplay-mic-keyboard-toggle';
  if (customElements.get(tag)) return;
  const clamp = v => Math.max(0, Math.min(1, v));
  const mix = (a, b, p) => a + (b - a) * p;
  const phase = (p, start, end) => {
    const t = clamp((p - start) / (end - start));
    return t * t * (3 - 2 * t);
  };
  const cradlePath = 'M19.3486 16.8027C19.5181 16.4865 19.9122 16.3669 20.2285 16.5361C20.5446 16.7056 20.6642 17.0997 20.4951 17.416C19.3632 19.529 17.3713 20.6811 15.2988 20.8809V22.3828C15.2988 22.7417 15.0073 23.0331 14.6484 23.0332C14.2895 23.0332 13.998 22.7418 13.998 22.3828V20.8809C11.9254 20.6812 9.93382 19.5291 8.80176 17.416C8.63251 17.0996 8.75204 16.7056 9.06836 16.5361C9.3847 16.3671 9.77882 16.4865 9.94824 16.8027C11.9586 20.5546 17.3383 20.5547 19.3486 16.8027Z';
  const capsulePath = 'M14.6484 7.26562C16.7841 7.26577 18.5156 8.99712 18.5156 11.1328V14.6484C18.5156 16.7841 16.7841 18.5155 14.6484 18.5156C12.5126 18.5156 10.7812 16.7842 10.7812 14.6484V11.1328C10.7812 8.99702 12.5126 7.26562 14.6484 7.26562ZM14.6484 8.56543C13.2306 8.56543 12.0811 9.71499 12.0811 11.1328V14.6484C12.0811 16.0663 13.2306 17.2158 14.6484 17.2158C16.0661 17.2157 17.2158 16.0662 17.2158 14.6484V11.1328C17.2158 9.71509 16.0661 8.56558 14.6484 8.56543Z';
  function roundedRect(cx, cy, w, h) {
    if (w < .0001 || h < .0001) return '';
    const r = Math.min(w, h) / 2, x = cx - w / 2, y = cy - h / 2;
    const k = .5522847498, a = r * (1 - k);
    return `M${x+r} ${y}H${x+w-r}C${x+w-a} ${y} ${x+w} ${y+a} ${x+w} ${y+r}V${y+h-r}C${x+w} ${y+h-a} ${x+w-a} ${y+h} ${x+w-r} ${y+h}H${x+r}C${x+a} ${y+h} ${x} ${y+h-a} ${x} ${y+h-r}V${y+r}C${x} ${y+a} ${x+a} ${y} ${x+r} ${y}Z`;
  }
  class MicKeyboardToggle extends HTMLElement {
    static observedAttributes = ['value', 'duration', 'label', 'disabled'];
    constructor() {
      super(); this.attachShadow({mode: 'open'}); this.progress = 0;
      this.control = null; this.epoch = 0; this.state = 'finished';
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
      this.onReduced = () => { if (this.reduced.matches) this.finish(); };
    }
    get value() { return this.getAttribute('value') === 'keyboard' ? 'keyboard' : 'mic'; }
    set value(value) { this.setAttribute('value', value === 'keyboard' ? 'keyboard' : 'mic'); }
    get duration() { return Math.max(.2, Math.min(1, Number(this.getAttribute('duration')) || .42)); }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `<style>
          :host{display:inline-block;width:44px;height:44px;vertical-align:middle;color:#fff}
          button{display:grid;place-items:center;width:44px;height:44px;padding:7px;border:0;border-radius:50%;background:none;color:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
          button:focus-visible{outline:1px solid #d2d0d0;outline-offset:2px}button:disabled{cursor:default;opacity:.4}
          .art{position:relative;display:block;width:30px;height:30px;pointer-events:none}
          .glass{position:absolute;inset:0;border-radius:50%;backdrop-filter:blur(10.71px);-webkit-backdrop-filter:blur(10.71px)}
          svg{position:relative;width:30px;height:30px;display:block;overflow:hidden;border-radius:50%}
        </style><button type="button"><span class="art"><span class="glass"></span><svg viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <rect class="background" width="30" height="30" rx="15" fill="white" fill-opacity=".15"/>
          <g fill="currentColor"><path class="capsule" d="${capsulePath}"/>
          <path class="cradle" d="${cradlePath}"/>
          <circle class="key" r="0"/><circle class="key" r="0"/><circle class="key" r="0"/><circle class="key" r="0"/><circle class="key" r="0"/>
          <rect class="space" x="10.625" y="21.25" width="8.75" height="1.60714" rx=".803571" opacity="0"/></g>
        </svg></span></button>`;
        this.button = this.shadowRoot.querySelector('button');
        this.capsule = this.shadowRoot.querySelector('.capsule');
        this.cradle = this.shadowRoot.querySelector('.cradle');
        this.keys = this.shadowRoot.querySelectorAll('.key');
        this.space = this.shadowRoot.querySelector('.space');
        this.background = this.shadowRoot.querySelector('.background');
        this.glass = this.shadowRoot.querySelector('.glass');
        this.button.addEventListener('click', () => this.toggle());
      }
      this.reduced.addEventListener('change', this.onReduced); this.apply(true);
    }
    disconnectedCallback() { this.stop(); this.reduced.removeEventListener('change', this.onReduced); }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === 'value') this.apply(this.reduced.matches); else this.accessibility();
    }
    accessibility() {
      const keyboard = this.value === 'keyboard';
      this.button.setAttribute('aria-label', this.getAttribute('label') || (keyboard ? '键盘图标，切换为麦克风' : '麦克风图标，切换为键盘'));
      this.button.setAttribute('aria-pressed', String(keyboard));
      this.button.disabled = this.hasAttribute('disabled');
    }
    render() {
      const p = clamp(this.progress), body = phase(p, 0, .74), hole = 1 - phase(p, .05, .56);
      const cx = mix(14.6484, 15, body), cy = mix(12.89061, 11.25, body);
      if (p === 0) this.capsule.setAttribute('d', capsulePath);
      else this.capsule.setAttribute('d', roundedRect(cx, cy, mix(7.7344, 2.5, body), mix(11.24998, 2.5, body)) + roundedRect(cx, cy, 5.1347 * hole, 8.65037 * hole));
      this.capsule.setAttribute('fill-rule', 'evenodd');
      const fold = phase(p, .03, .58), vanish = 1 - phase(p, .2, .58);
      this.cradle.setAttribute('transform', `translate(${mix(14.6484,15,fold)} ${mix(20.8,22.05357,fold)}) scale(${mix(1,.73,fold)} ${mix(1,.06,fold)}) translate(-14.6484 -20.8)`);
      this.cradle.setAttribute('opacity', vanish);
      const bar = phase(p, .27, .82);
      this.space.setAttribute('x', mix(14.35, 10.625, bar));
      this.space.setAttribute('y', mix(21.25, 21.25, bar));
      this.space.setAttribute('width', mix(1.3, 8.75, bar));
      this.space.setAttribute('opacity', phase(p, .27, .55));
      for (let i = 0; i < 5; i++) {
        const center = i === 0, top = i === 1 || i === 2;
        const start = center ? .17 : top ? .22 : .32;
        const spread = phase(p, start, center ? .8 : top ? .9 : 1);
        const x = center ? 15 : i % 2 === 1 ? 8.75 : 21.25;
        const y = top ? 11.25 : 16.25, node = this.keys[i];
        node.setAttribute('cx', mix(14.6484, x, spread));
        node.setAttribute('cy', mix(top ? 11.6 : 15.3, y, spread));
        node.setAttribute('r', 1.25 * phase(p, start, start + .39));
        node.setAttribute('opacity', phase(p, start, start + .28));
      }
      this.background.setAttribute('fill-opacity', mix(.15, .1, phase(p, 0, 1)));
      this.glass.style.opacity = 1 - phase(p, 0, 1);
    }
    stop() { this.epoch++; this.control?.stop(); this.control = null; }
    apply(instant = false) {
      this.stop(); this.accessibility();
      const target = this.value === 'keyboard' ? 1 : 0, distance = Math.abs(this.progress - target);
      if (instant || distance < .00001) { this.progress = target; this.render(); this.state = 'finished'; return; }
      const epoch = this.epoch; this.state = 'running';
      this.control = animate(this.progress, target, {duration:this.duration * Math.max(.45, distance), ease:[.4,0,.2,1], onUpdate:p => {
        if (epoch === this.epoch) { this.progress = p; this.render(); }
      }});
      Promise.resolve(this.control).then(() => {
        if (epoch !== this.epoch) return;
        this.progress = target; this.render(); this.state = 'finished';
      });
    }
    toggle() {
      if (this.hasAttribute('disabled')) return;
      const previous = this.value; this.value = previous === 'mic' ? 'keyboard' : 'mic';
      this.dispatchEvent(new CustomEvent('motion-change', {detail:{value:this.value,previous},bubbles:true,composed:true}));
    }
    pause() { if (this.state === 'running') { this.control?.pause(); this.state = 'paused'; } }
    play() { if (this.state === 'paused') { this.control?.play(); this.state = 'running'; } }
    finish() { this.apply(true); }
  }
  customElements.define(tag, MicKeyboardToggle);
}
