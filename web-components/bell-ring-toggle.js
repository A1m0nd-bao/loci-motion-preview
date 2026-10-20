// Self-contained so the preview and exported HTML share the same ringing rhythm.
export function defineBellRingToggle(animate) {
  const tag = "sipplay-bell-ring-toggle";
  if (customElements.get(tag)) return;
  class BellRingToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "strength", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => this.apply(this.reducedMotion.matches || !this.active);
      this.onVisibility = () => {
        if (document.hidden) {
          const running = this.active && this.state === "running";
          this.pause();
          this.resumeAfterVisibility = running;
        } else if (this.resumeAfterVisibility) {
          this.resumeAfterVisibility = false;
          if (this.active) this.play();
        }
      };
    }
    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 2.2);
      return Number.isFinite(value) ? Math.min(4, Math.max(1.4, value)) : 2.2;
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
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:4px;border:0;border-radius:50%;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:1px}
            svg{display:block;width:36px;height:36px;pointer-events:none;overflow:hidden}
            .bell{transform-box:view-box!important;transform-origin:17.9948px 10.5px!important}
            .clapper{transform-box:view-box!important;transform-origin:17.9948px 22.3182px!important}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <mask id="bell-edge" fill="white"><path d="M0 18C0 8.05887 8.05887 0 18 0V0C27.9411 0 36 8.05887 36 18V18C36 27.9411 27.9411 36 18 36V36C8.05887 36 0 27.9411 0 18V18Z"/></mask>
              <path d="M0 18C0 8.05887 8.05887 0 18 0V0C27.9411 0 36 8.05887 36 18V18C36 27.9411 27.9411 36 18 36V36C8.05887 36 0 27.9411 0 18V18Z" fill="white" fill-opacity="0.1"/>
              <path d="M0 18M36 18M36 18M0 18M18 0M36 18M18 36M0 18M18 36V35C8.61116 35 1 27.3888 1 18H0H-1C-1 28.4934 7.50659 37 18 37V36ZM36 18H35C35 27.3888 27.3888 35 18 35V36V37C28.4934 37 37 28.4934 37 18H36ZM18 0V1C27.3888 1 35 8.61116 35 18H36H37C37 7.50659 28.4934 -1 18 -1V0ZM18 0V-1C7.50659 -1 -1 7.50659 -1 18H0H1C1 8.61116 8.61116 1 18 1V0Z" fill="white" fill-opacity="0.4" mask="url(#bell-edge)"/>
              <g class="bell" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                <path class="clapper" d="M15.7726 24.7424C16.3623 25.2135 17.1411 25.5 17.9948 25.5C18.8485 25.5 19.6273 25.2135 20.217 24.7424"/>
                <path d="M11.7512 22.3182C11.3998 22.3182 11.2036 21.7662 11.4161 21.4595C11.9093 20.7479 12.3853 19.7043 12.3853 18.4475L12.4056 16.6264C12.4056 13.2429 14.908 10.5 17.9948 10.5C21.1271 10.5 23.6663 13.2833 23.6663 16.7166L23.646 18.4475C23.646 19.7129 24.1056 20.7623 24.5787 21.4742C24.783 21.7816 24.5862 22.3182 24.2392 22.3182H11.7512Z"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.bell = this.shadowRoot.querySelector(".bell");
        this.clapper = this.shadowRoot.querySelector(".clapper");
        this.button.addEventListener("click", () => this.toggle());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.apply(this.reducedMotion.matches || !this.active);
    }
    disconnectedCallback() {
      this.stop();
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === "label") this.updateAccessibility();
      else this.apply(this.reducedMotion.matches || (name !== "active" && !this.active));
    }
    updateAccessibility() {
      this.button.setAttribute("aria-pressed", String(this.active));
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.active ? "停止铃铛晃动" : "开始铃铛晃动"));
    }
    stop() {
      this.resumeAfterVisibility = false;
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      if (instant || !this.active) {
        this.controls = [this.bell, this.clapper].map(part => animate(part, { rotate: 0 }, {
          duration: instant ? 0 : 0.36, type: "spring", bounce: 0.12,
        }));
        const epoch = this.epoch;
        this.state = instant ? "finished" : "running";
        Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
          if (epoch === this.epoch) this.state = "finished";
        });
        return;
      }
      const strength = this.strength;
      const duration = this.duration;
      const angles = [0, -5, 18, -16, 10, -5, 0, 14, -12, 7, -3, 0, 0];
      const lag = [0, 0, -12, 14, -9, 5, 0, -10, 11, -6, 3, 0, 0];
      const times = [0, 0.045, 0.11, 0.19, 0.27, 0.34, 0.4, 0.47, 0.55, 0.62, 0.68, 0.74, 1];
      this.controls = [
        animate(this.bell, { rotate: angles.map(angle => angle === null ? null : angle * strength) }, {
          duration, times, repeat: Infinity, ease: "easeInOut",
        }),
        animate(this.clapper, { rotate: lag.map(angle => angle === null ? null : angle * strength) }, {
          duration, times: times.map((time, index) => index === 0 || index === times.length - 1 ? time : time + 0.018),
          repeat: Infinity, ease: "easeInOut",
        }),
      ];
      this.state = "running";
      if (document.hidden) this.onVisibility();
    }
    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    pause() {
      this.resumeAfterVisibility = false;
      this.controls.forEach(control => control.pause());
      this.state = "paused";
    }
    play() {
      this.resumeAfterVisibility = false;
      if (this.state === "paused" && this.controls.length) {
        this.controls.forEach(control => control.play());
        this.state = "running";
      } else if (this.active && this.state !== "running") this.apply(this.reducedMotion.matches);
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, BellRingToggle);
}

export const bellRingDemoMarkup = `
  <div class="selection-demo bell-ring-demo">
    <p class="selection-demo-hint">点击铃铛，两下轻摇、停一拍</p>
    <div class="selection-demo-zoom">
      <sipplay-bell-ring-toggle data-motion duration="2.2" strength="1" label="切换铃铛晃动（放大预览）"></sipplay-bell-ring-toggle>
    </div>
    <p class="selection-demo-caption">3× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-bell-ring-toggle label="切换铃铛晃动（原始尺寸）"></sipplay-bell-ring-toggle>
      <span>原始尺寸 · 36 × 36</span>
    </div>
    <output class="selection-demo-state" data-selection-status data-active-text="晃动中" data-inactive-text="已静止" aria-live="polite">已静止</output>
  </div>`;
export const bellRingDemoCSS = `
  .selection-demo-zoom sipplay-bell-ring-toggle{transform:scale(3)}
  .bell-ring-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-bell-ring-toggle{transform:scale(2.3)}
`;
