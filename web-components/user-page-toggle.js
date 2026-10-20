export function defineUserPageToggle(animate) {
  const tag = "sipplay-user-page-toggle";
  if (customElements.get(tag)) return;
  class UserPageToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "strength", "label"];
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
      const value = Number(this.getAttribute("duration") ?? 0.64);
      return Number.isFinite(value) ? Math.min(1.2, Math.max(0.24, value)) : 0.64;
    }
    get strength() {
      const value = Number(this.getAttribute("strength") ?? 1);
      return Number.isFinite(value) ? Math.min(1.4, Math.max(0.4, value)) : 1;
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
            .ink{opacity:0.4}
            .body,.head{fill-opacity:0;transform-box:view-box!important}
            .body{transform-origin:12px 22.0018px!important}
            .head{transform-origin:11.999px 7.79004px!important}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><clipPath id="user-window"><rect width="24" height="24"/></clipPath></defs>
              <g clip-path="url(#user-window)"><g class="ink" stroke="white" stroke-width="1.5" fill="white">
                <g class="head"><path d="M11.999 2.75C14.8052 2.75 17.0732 5.01068 17.0732 7.79004C17.0732 10.5693 14.8051 12.8301 11.999 12.8301C9.19307 12.8299 6.92587 10.5692 6.92578 7.79004C6.92578 5.01078 9.19302 2.75015 11.999 2.75Z"/></g>
                <g class="body"><path d="M19.6573 22.0018H4.34272C3.6655 22.0018 3.17279 21.3591 3.34861 20.7051L3.61077 19.73C4.57784 16.1329 7.8389 13.6328 11.5637 13.6328H12.4363C16.1611 13.6328 19.4222 16.1329 20.3892 19.73L20.6514 20.7051C20.8272 21.3591 20.3345 22.0018 19.6573 22.0018Z" stroke-linecap="round"/></g>
              </g></g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        for (const name of ["ink", "body", "head"]) this[name] = this.shadowRoot.querySelector(`.${name}`);
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.active ? "取消选中用户页" : "选中用户页"));
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
      const on = this.active, d = this.duration, bounce = 0.3 * this.strength;
      const rising = on && !instant;
      const times = [0, 0.56, 0.8, 1];
      const ease = [[0.16, 1, 0.3, 1], "easeInOut", "easeOut"];
      if (rising) this.head.style.opacity = this.body.style.opacity = "0";
      this.body.style.fillOpacity = this.head.style.fillOpacity = on ? "1" : "0";
      const resting = { y: 0, scaleX: 1, scaleY: 1, opacity: 1 };
      this.controls = [
        animate(this.ink, { opacity: on ? 1 : 0.4 }, { duration: instant ? 0 : d * 0.18 }),
        animate(this.body, rising ? {
          y: [24, -2.2 * bounce * 1.2, 0.8 * bounce * 1.2, 0],
          scaleY: [0.74, 1 + 0.4 * bounce, 1 - 0.2 * bounce, 1],
          scaleX: [1.1, 1 - 0.12 * bounce, 1 + 0.1 * bounce, 1],
          opacity: [0, 1],
        } : resting, rising ? {
          duration: d * 0.82, delay: d * 0.06, times, ease,
          opacity: { duration: d * 0.055, delay: d * 0.06, times: [0, 1], ease: "linear" },
        } : { duration: 0 }),
        animate(this.head, rising ? {
          y: [31.2, -Math.min(1.65, 4.8 * bounce * 1.2), 1.6 * bounce * 1.2, 0],
          scaleY: [0.86, 1 + 0.1 * bounce, 1 - 0.06 * bounce, 1],
          scaleX: [1.04, 1 - 0.06 * bounce, 1 + 0.03 * bounce, 1],
          opacity: [0, 1],
        } : resting, rising ? {
          duration: d * 0.96, delay: d * 0.11, times, ease,
          opacity: { duration: d * 0.055, delay: d * 0.11, times: [0, 1], ease: "linear" },
        } : { duration: 0 }),
      ];
      if (!rising) this.controls = this.controls.slice(0, 1);
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
  customElements.define(tag, UserPageToggle);
}



export const userPageDemoMarkup = `
  <div class="selection-demo user-page-demo">
    <p class="selection-demo-hint">点击选中 · 底部探出，头部跟随回弹</p>
    <div class="selection-demo-zoom"><sipplay-user-page-toggle data-motion duration="0.64" strength="1" label="切换用户页选中状态（放大预览）"></sipplay-user-page-toggle></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-user-page-toggle label="切换用户页选中状态（原始尺寸）"></sipplay-user-page-toggle><span>原始尺寸 · 24 × 24</span></div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;
export const userPageDemoCSS = `
  .selection-demo-zoom sipplay-user-page-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-user-page-toggle{transform:scale(3)}
  .user-page-demo .selection-demo-state{color:#fff}
`;
