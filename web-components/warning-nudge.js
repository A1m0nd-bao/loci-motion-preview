// Self-contained so preview and portable HTML share the same animation.
export function defineWarningNudge(animate) {
  const tag = "sipplay-warning-nudge";
  if (customElements.get(tag)) return;
  class WarningNudge extends HTMLElement {
    static observedAttributes = ["duration", "strength", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.epoch = 0;
      this.state = "idle";
      this.previewing = false;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) this.finish(); };
    }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.82);
      return Number.isFinite(value) ? Math.min(1.6, Math.max(0.32, value)) : 0.82;
    }
    get strength() {
      const value = Number(this.getAttribute("strength") ?? 1);
      return Number.isFinite(value) ? Math.min(1.6, Math.max(0.4, value)) : 1;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:12px;border:0;border-radius:10px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:-5px}
            svg{display:block;width:20px;height:20px;overflow:visible;pointer-events:none}
            .rock,.frame{transform-box:view-box!important;transform-origin:10px 16.6693px!important}
            .stem{transform-box:view-box!important;transform-origin:10px 10.7526px!important}
            .dot{transform-box:view-box!important;transform-origin:10px 13.53965px!important}
          </style>
          <button type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g class="rock" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <g class="frame"><path d="M14.7249 16.6693H5.27506C3.98425 16.6693 2.89494 15.8162 2.55221 14.649C2.40591 14.1508 2.58567 13.6319 2.86063 13.19L7.58557 4.67012C8.69258 2.89121 11.3074 2.89121 12.4144 4.67013L17.1394 13.19C17.4143 13.6319 17.5941 14.1508 17.4478 14.649C17.1051 15.8162 16.0157 16.6693 14.7249 16.6693Z"/></g>
                <g class="stem"><path d="M10 10.7526V7.01466"/></g>
                <g class="dot"><path d="M10 13.5232V13.5561"/></g>
              </g>
            </svg>
          </button>`;
        for (const name of ["button", "rock", "frame", "stem", "dot"]) this[name] = this.shadowRoot.querySelector(name === "button" ? name : `.${name}`);
        this.button.addEventListener("click", () => this.replay());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.updateAccessibility();
      this.finish();
    }
    disconnectedCallback() {
      this.stop();
      this.previewing = false;
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback() { if (this.button) this.updateAccessibility(); }
    updateAccessibility() { this.button.setAttribute("aria-label", this.getAttribute("label") || "播放警示提醒动效"); }
    stop() { this.epoch++; this.controls.forEach(control => control.stop()); this.controls = []; }
    rest() {
      this.controls = [
        animate(this.rock, { rotate: 0 }, { duration: 0 }),
        animate(this.frame, { scaleX: 1, scaleY: 1, y: 0 }, { duration: 0 }),
        animate(this.stem, { scaleY: 1, y: 0 }, { duration: 0 }),
        animate(this.dot, { scale: 1, y: 0 }, { duration: 0 }),
      ];
    }
    preview(active) {
      if (active && !this.previewing) {
        this.previewing = true;
        if (this.state !== "running") this.replay();
      } else if (!active) this.previewing = false;
    }
    replay(emit = true) {
      this.stop();
      if (this.reducedMotion.matches) {
        this.rest();
        this.state = "finished";
      } else {
        const d = this.duration, s = this.strength;
        this.controls = [
          animate(this.rock, { rotate: [null, -8 * s, 6 * s, -3 * s, 1 * s, 0] }, {
            duration: d, times: [0, 0.2, 0.4, 0.6, 0.79, 1],
            ease: ["easeInOut", "easeInOut", "easeInOut", "easeInOut", "easeOut"],
          }),
          animate(this.frame, {
            scaleX: [null, 1 + 0.035 * s, 1 - 0.02 * s, 1 + 0.012 * s, 1],
            scaleY: [null, 1 - 0.07 * s, 1 + 0.04 * s, 1 - 0.01 * s, 1],
            y: [null, 0.6 * s, -0.6 * s, 0.15 * s, 0],
          }, { duration: d * 0.82, times: [0, 0.15, 0.4, 0.65, 1], ease: ["easeInOut", "easeOut", "easeInOut", "easeOut"] }),
          animate(this.stem, {
            y: [null, -0.9 * s, 0.55 * s, -0.2 * s, 0],
            scaleY: [null, 1 - 0.05 * s, 1 + 0.08 * s, 1 - 0.02 * s, 1],
          }, { duration: d * 0.68, delay: d * 0.08, times: [0, 0.22, 0.57, 0.8, 1], ease: ["easeInOut", "easeInOut", "easeInOut", "easeOut"] }),
          animate(this.dot, {
            y: [null, -0.9 * s, 0.45 * s, -0.15 * s, 0],
            scale: [null, 1 - 0.2 * s, 1 + 0.2 * s, 1 - 0.03 * s, 1],
          }, { duration: d * 0.68, delay: d * 0.2, times: [0, 0.22, 0.55, 0.78, 1], ease: ["easeInOut", "easeInOut", "easeInOut", "easeOut"] }),
        ];
        this.state = "running";
        const epoch = this.epoch;
        Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
          if (this.epoch !== epoch) return;
          this.state = "finished";
          this.dispatchEvent(new CustomEvent("motion-finish", { bubbles: true, composed: true }));
        });
      }
      if (emit) this.dispatchEvent(new CustomEvent("motion-replay", { bubbles: true, composed: true }));
    }
    pause() { this.controls.forEach(control => control.pause()); this.state = "paused"; }
    play() {
      if (this.state === "paused") { this.controls.forEach(control => control.play()); this.state = "running"; }
      else if (this.state !== "running") this.replay();
    }
    finish() {
      const wasPlaying = this.state === "running" || this.state === "paused";
      this.stop(); this.rest(); this.state = "finished";
      if (wasPlaying) this.dispatchEvent(new CustomEvent("motion-finish", { bubbles: true, composed: true }));
    }
    cancel() { this.finish(); }
  }
  customElements.define(tag, WarningNudge);
}
export const warningNudgeDemoMarkup = `
  <div class="selection-demo warning-nudge-demo">
    <p class="selection-demo-hint">点击播放 · 轻晃提醒，感叹号错拍落定</p>
    <div class="selection-demo-zoom"><sipplay-warning-nudge data-motion duration="0.82" strength="1" label="播放警示提醒动效（放大预览）"></sipplay-warning-nudge></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-warning-nudge label="播放警示提醒动效（原始尺寸）"></sipplay-warning-nudge><span>原始尺寸 · 20 × 20</span></div>
    <output class="selection-demo-state" data-warning-status aria-live="polite">点击播放提醒</output>
  </div>`;
export const warningNudgeDemoCSS = `
  .selection-demo-zoom sipplay-warning-nudge{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-warning-nudge{transform:scale(3)}
  .warning-nudge-demo .selection-demo-state{color:#fff}
`;
