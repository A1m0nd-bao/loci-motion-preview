// Sipplay v2: add / disabled / ready. Business code drives value; preview clicks cycle states.
export function definePlusArrowToggle(animate) {
  const tag = 'sipplay-plus-arrow-toggle';
  if (customElements.get(tag)) return;
  const mix = (a, b, p) => a + (b - a) * p;
  const clamp = p => Math.max(0, Math.min(1, p));
  const smooth = p => { p = clamp(p); return p * p * (3 - 2 * p); };
  const labels = { add: '加号', disabled: '不可发送', ready: '可发送' };
  class PlusArrowToggle extends HTMLElement {
    static observedAttributes = ['value', 'duration', 'label'];
    constructor() {
      super(); this.attachShadow({ mode: 'open' });
      this.shape = 0; this.inkOpacity = 1; this.readyAmount = 0;
      this.controls = []; this.epoch = 0; this.state = 'finished';
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
      this.onReduced = () => { if (this.reduced.matches) this.finish(); };
    }
    get value() { const value = this.getAttribute('value'); return Object.hasOwn(labels, value) ? value : 'add'; }
    set value(next) { this.setAttribute('value', Object.hasOwn(labels, next) ? next : 'add'); }
    get duration() { return Math.min(1.2, Math.max(.2, Number(this.getAttribute('duration')) || .36)); }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `<style>
          :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
          button{display:grid;place-items:center;width:44px;height:44px;padding:7px;border:0;border-radius:50%;background:transparent;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
          button:focus-visible{outline:1px solid #d2d0d0;outline-offset:1px}
          .art{position:relative;display:block;width:30px;height:30px;pointer-events:none}
          .glass{position:absolute;inset:0;border-radius:50%;backdrop-filter:blur(10.71px);-webkit-backdrop-filter:blur(10.71px)}
          svg{position:relative;display:block;width:30px;height:30px;overflow:visible}
        </style><button type="button"><span class="art"><span class="glass"></span>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="send-gradient" x1="-8.95998" y1="-5.33866" x2="2.76873" y2="45.8263" gradientUnits="userSpaceOnUse"><stop stop-color="#CF78F4"/><stop offset="1" stop-color="#EC5844"/></linearGradient>
              <mask id="glyph-silhouette" x="0" y="0" width="30" height="30" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style="mask-type:alpha">
                <g class="stencil" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none">
                  <path class="shaft" d="M15 9.375L15 20.625"/>
                  <path class="arms" d="M9.375 15L15 15L20.625 15"/>
                </g>
              </mask>
            </defs>
            <rect class="neutral" width="30" height="30" rx="15" fill="white" fill-opacity=".15"/>
            <rect class="ready" width="30" height="30" rx="15" fill="url(#send-gradient)" opacity="0"/>
            <rect class="glyph" width="30" height="30" fill="white" mask="url(#glyph-silhouette)"/>
          </svg>
        </span></button>`;
        this.button = this.shadowRoot.querySelector('button');
        this.stencil = this.shadowRoot.querySelector('.stencil');
        this.glyph = this.shadowRoot.querySelector('.glyph');
        this.shaft = this.shadowRoot.querySelector('.shaft');
        this.arms = this.shadowRoot.querySelector('.arms');
        this.neutral = this.shadowRoot.querySelector('.neutral');
        this.ready = this.shadowRoot.querySelector('.ready');
        this.button.addEventListener('click', () => this.toggle());
      }
      this.reduced.addEventListener('change', this.onReduced); this.apply(true);
    }
    disconnectedCallback() { this.stop(); this.reduced.removeEventListener('change', this.onReduced); }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === 'value') this.apply(this.reduced.matches);
      else this.accessibility();
    }
    accessibility() {
      this.button.setAttribute('aria-label', `${this.getAttribute('label') || '图标状态'}：${labels[this.value]}。点击切换下一状态`);
    }
    render() {
      const p = clamp(this.shape);
      const fold = smooth((p - .1) / .9);
      const x = mix(15, 14.999, fold), junction = mix(15, 9.02832, fold);
      const width = mix(1.3, 1.5, fold);
      // Retract the upper arm before folding, so no vertical prong crosses the apex.
      const upper = 5.625 * (1 - smooth(p / .3));
      const start = junction - upper + width * .45 * fold;
      this.shaft.setAttribute('d', `M${x} ${start}L${x} ${mix(20.625, 21.0283, fold)}`);
      this.arms.setAttribute('d', `M${mix(9.375, 8.99902, fold)} ${mix(15, 14.0283, fold)}L${x} ${junction}L${mix(20.625, 20.999, fold)} ${mix(15, 14.0283, fold)}`);
      this.stencil.setAttribute('stroke-width', width);
      // Paint the merged silhouette once; overlapping stencil lines cannot double the opacity.
      this.glyph.setAttribute('opacity', clamp(this.inkOpacity));
      const ready = clamp(this.readyAmount);
      this.ready.setAttribute('opacity', ready);
      this.neutral.setAttribute('fill-opacity', .15 * (1 - ready));
    }

    stop() { this.epoch++; for (const control of this.controls) control.stop(); this.controls = []; }
    apply(instant = false) {
      this.stop(); this.accessibility();
      const target = { shape: this.value === 'add' ? 0 : 1, inkOpacity: this.value === 'disabled' ? .2 : 1, readyAmount: this.value === 'ready' ? 1 : 0 };
      if (instant) { Object.assign(this, target); this.render(); this.state = 'finished'; return; }
      const run = this.epoch, d = this.duration; this.state = 'running';
      for (const key of ['shape', 'inkOpacity', 'readyAmount']) {
        if (Math.abs(this[key] - target[key]) < .00001) continue;
        this.controls.push(animate(this[key], target[key], {
          duration: key === 'shape' ? d : d * .7,
          delay: key === 'inkOpacity' && this.value === 'disabled' ? d * .15 : 0,
          ease: key === 'shape' ? [.22, 1, .36, 1] : [.4, 0, .2, 1],
          onUpdate: value => { if (run === this.epoch) { this[key] = value; this.render(); } },
        }));
      }
      Promise.all(this.controls.map(c => Promise.resolve(c))).then(() => {
        if (run !== this.epoch) return;
        Object.assign(this, target); this.render(); this.state = 'finished';
      });
    }
    toggle() {
      const values = ['add', 'disabled', 'ready'], previous = this.value;
      this.value = values[(values.indexOf(previous) + 1) % values.length];
      this.dispatchEvent(new CustomEvent('motion-change', { detail: { value: this.value, previous }, bubbles: true, composed: true }));
    }
    pause() { if (this.state === 'running') { this.controls.forEach(c => c.pause()); this.state = 'paused'; } }
    play() { if (this.state === 'paused') { this.controls.forEach(c => c.play()); this.state = 'running'; } }
    finish() { this.apply(true); }
    cancel() { this.value = 'add'; this.apply(true); }
  }
  customElements.define(tag, PlusArrowToggle);
}
