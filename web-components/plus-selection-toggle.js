export function definePlusSelectionToggle(animate) {
  const tag = "sipplay-plus-selection-toggle";
  if (customElements.get(tag)) return;
  class PlusSelectionToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "bounce", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.pausedControls = [];
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => {
        if (document.hidden) {
          const running = this.state === "running";
          this.pause();
          this.resumeAfterVisibility = running;
        } else if (this.resumeAfterVisibility) {
          this.resumeAfterVisibility = false;
          this.play();
        }
      };
    }
    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.46);
      return Number.isFinite(value) ? Math.min(1.2, Math.max(0.24, value)) : 0.46;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.18);
      return Number.isFinite(value) ? Math.min(0.35, Math.max(0, value)) : 0.18;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:10px;border:0;border-radius:10px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:1px}
            svg{display:block;width:24px;height:24px;overflow:hidden;pointer-events:none}
            .press{transform-box:view-box!important;transform-origin:12px 12px!important}
            .fill{transform:scale(0);opacity:0;transform-box:view-box!important;transform-origin:12px 12px!important}
            .symbol,.ring{stroke-opacity:0.4}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><mask id="plus-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style="mask-type:luminance"><rect width="24" height="24" fill="white"/><path d="M15.75 11.9994H12M12 11.9994H8.25M12 11.9994V15.7494M12 11.9994L12 8.24939" stroke="black" stroke-width="1.5" stroke-linecap="round"/></mask></defs>
              <g class="press" opacity="0.9">
                <g mask="url(#plus-cutout)"><path class="fill" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="white"/></g>
                <path class="ring" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <path class="symbol" d="M15.75 11.9994H12M12 11.9994H8.25M12 11.9994V15.7494M12 11.9994L12 8.24939" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        for (const name of ["press", "symbol", "ring", "fill"]) this[name] = this.shadowRoot.querySelector(`.${name}`);
        this.button.addEventListener("click", () => this.toggle());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.apply(true);
    }
    disconnectedCallback() {
      this.stop();
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === "label") this.updateAccessibility();
      else this.apply(name !== "active" || this.reducedMotion.matches);
    }
    updateAccessibility() {
      this.button.setAttribute("aria-pressed", String(this.active));
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.active ? "取消选中" : "选中加号"));
    }
    stop() {
      this.resumeAfterVisibility = false;
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
      this.pausedControls = [];
    }
    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const d = this.duration;
      this.controls = [
        animate(this.fill, { scale: this.active ? 1 : 0 }, instant ? { duration: 0 } : { type: "spring", duration: this.active ? d : d * 0.75, bounce: this.active ? this.bounce : 0 }),
        animate(this.fill, { opacity: this.active ? 1 : 0 }, { duration: instant ? 0 : d * 0.45, ease: "easeOut" }),
        animate(this.press, { scale: instant ? 1 : [null, 0.965, 1] }, instant ? { duration: 0 } : { duration: d, times: [0, 0.18, 1], ease: ["easeOut", [0.2, 0.85, 0.25, 1]] }),
        animate(this.ring, { strokeOpacity: this.active ? 1 : 0.4 }, { duration: instant ? 0 : d * 0.48, ease: "easeOut" }),
        animate(this.symbol, { strokeOpacity: this.active ? 0 : 0.4 }, { duration: instant ? 0 : d * 0.38, delay: instant || this.active ? 0 : d * 0.1, ease: "easeOut" }),
      ];
      const epoch = this.epoch;
      this.state = instant ? "finished" : "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
        if (epoch === this.epoch) this.state = "finished";
      });
      if (!instant && document.hidden) this.onVisibility();
    }
    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    pause() {
      this.resumeAfterVisibility = false;
      if (this.state !== "running") return;
      this.pausedControls = this.controls.filter(control => control.state !== "finished");
      this.pausedControls.forEach(control => control.pause());
      this.state = "paused";
    }
    play() {
      this.resumeAfterVisibility = false;
      if (this.state !== "paused") return;
      this.pausedControls.forEach(control => control.play());
      this.state = "running";
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, PlusSelectionToggle);
}


export const plusSelectionDemoMarkup = `
  <div class="selection-demo plus-selection-demo">
    <p class="selection-demo-hint">点击选中 · 圆形填白，加号镂空</p>
    <div class="selection-demo-zoom"><sipplay-plus-selection-toggle data-motion duration="0.46" bounce="0.18" label="切换加号选中状态（放大预览）"></sipplay-plus-selection-toggle></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-plus-selection-toggle label="切换加号选中状态（原始尺寸）"></sipplay-plus-selection-toggle><span>原始尺寸 · 24 × 24</span></div>
    <output class="selection-demo-state" data-selection-status data-active-text="已选中" data-inactive-text="未选中" aria-live="polite">未选中</output>
  </div>`;
export const plusSelectionDemoCSS = `
  .selection-demo-zoom sipplay-plus-selection-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-plus-selection-toggle{transform:scale(3)}
  .plus-selection-demo .selection-demo-state{color:#fff}
`;
