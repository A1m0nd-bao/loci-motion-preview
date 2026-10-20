// Self-contained notification trigger shared by preview and downloaded HTML.
export function defineBellRingToggle(animate) {
  const tag = "sipplay-bell-ring-toggle";
  if (customElements.get(tag)) return;
  class BellNotification extends HTMLElement {
    static observedAttributes = ["expanded", "duration", "strength", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.state = "idle";
      this.epoch = 0;
      this.lastAction = null;
      this.hovered = false;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) this.finish(); };
    }
    get expanded() { return this.hasAttribute("expanded"); }
    set expanded(value) { this.toggleAttribute("expanded", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.7);
      return Number.isFinite(value) ? Math.min(1.4, Math.max(0.4, value)) : 0.7;
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
            .glyph{transform-box:view-box!important;transform-origin:18px 18px!important}
            .bell{transform-box:view-box!important;transform-origin:17.9948px 10.5px!important}
            .clapper{transform-box:view-box!important;transform-origin:17.9948px 22.3182px!important}
          </style>
          <button type="button" aria-haspopup="dialog" aria-expanded="false">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <mask id="bell-edge" fill="white"><path d="M0 18C0 8.05887 8.05887 0 18 0V0C27.9411 0 36 8.05887 36 18V18C36 27.9411 27.9411 36 18 36V36C8.05887 36 0 27.9411 0 18V18Z"/></mask>
              <path d="M0 18C0 8.05887 8.05887 0 18 0V0C27.9411 0 36 8.05887 36 18V18C36 27.9411 27.9411 36 18 36V36C8.05887 36 0 27.9411 0 18V18Z" fill="white" fill-opacity="0.1"/>
              <path d="M0 18M36 18M36 18M0 18M18 0M36 18M18 36M0 18M18 36V35C8.61116 35 1 27.3888 1 18H0H-1C-1 28.4934 7.50659 37 18 37V36ZM36 18H35C35 27.3888 27.3888 35 18 35V36V37C28.4934 37 37 28.4934 37 18H36ZM18 0V1C27.3888 1 35 8.61116 35 18H36H37C37 7.50659 28.4934 -1 18 -1V0ZM18 0V-1C7.50659 -1 -1 7.50659 -1 18H0H1C1 8.61116 8.61116 1 18 1V0Z" fill="white" fill-opacity="0.4" mask="url(#bell-edge)"/>
              <g class="glyph"><g class="bell" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                <path class="clapper" d="M15.7726 24.7424C16.3623 25.2135 17.1411 25.5 17.9948 25.5C18.8485 25.5 19.6273 25.2135 20.217 24.7424"/>
                <path d="M11.7512 22.3182C11.3998 22.3182 11.2036 21.7662 11.4161 21.4595C11.9093 20.7479 12.3853 19.7043 12.3853 18.4475L12.4056 16.6264C12.4056 13.2429 14.908 10.5 17.9948 10.5C21.1271 10.5 23.6663 13.2833 23.6663 16.7166L23.646 18.4475C23.646 19.7129 24.1056 20.7623 24.5787 21.4742C24.783 21.7816 24.5862 22.3182 24.2392 22.3182H11.7512Z"/>
              </g></g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.glyph = this.shadowRoot.querySelector(".glyph");
        this.bell = this.shadowRoot.querySelector(".bell");
        this.clapper = this.shadowRoot.querySelector(".clapper");
        this.solid = this.bell.querySelector("path:not(.clapper)").cloneNode(true);
        this.solid.setAttribute("fill", "white");
        this.solid.setAttribute("stroke", "none");
        this.solid.classList.add("solid");
        this.solid.style.opacity = "0";
        this.bell.insertBefore(this.solid, this.bell.firstChild);
        this.button.addEventListener("pointerenter", event => {
          if (event.pointerType === "mouse" || event.pointerType === "pen") this.hoverIn();
        });
        this.button.addEventListener("pointerleave", () => this.hoverOut());
        this.button.addEventListener("pointercancel", () => this.hoverOut());
        this.button.addEventListener("click", () => {
          this.perform("activate");
          this.dispatchEvent(new CustomEvent("notification-request", { bubbles: true, composed: true }));
        });
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.updateAccessibility();
      this.finish();
    }
    disconnectedCallback() {
      this.stop();
      this.hovered = false;
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback() { if (this.button) this.updateAccessibility(); }
    updateAccessibility() {
      this.button.setAttribute("aria-expanded", String(this.expanded));
      this.button.setAttribute("aria-label", this.getAttribute("label") || "打开通知");
    }
    stop() {
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    rest() {
      this.controls = [
        animate(this.bell, { rotate: 0 }, { duration: 0 }),
        animate(this.clapper, { rotate: 0 }, { duration: 0 }),
        animate(this.glyph, { scale: 1, y: 0 }, { duration: 0 }),
        animate(this.solid, { opacity: 0 }, { duration: 0 }),
      ];
    }
    hoverIn() {
      if (this.hovered) return;
      this.hovered = true;
      if (!this.expanded && !(this.lastAction === "activate" && this.state === "running")) this.perform("hover");
    }
    hoverOut() { this.hovered = false; }
    perform(action, emit = true) {
      if (!["hover", "activate"].includes(action)) return;
      this.stop();
      this.lastAction = action;
      const d = this.duration;
      const strength = this.strength;
      if (this.reducedMotion.matches) this.rest();
      else if (action === "hover") {
        this.controls = [
          animate(this.bell, { rotate: [null, -3 * strength, 12 * strength, -9 * strength, 4 * strength, -1.5 * strength, 0] }, {
            duration: d, times: [0, 0.1, 0.28, 0.5, 0.7, 0.86, 1], ease: "easeInOut",
          }),
          animate(this.clapper, { rotate: [null, -7 * strength, 8 * strength, -4 * strength, 1.5 * strength, 0] }, {
            duration: d, times: [0, 0.32, 0.55, 0.75, 0.9, 1], ease: "easeInOut",
          }),
          animate(this.solid, { opacity: 0 }, { duration: d * 0.15 }),
          animate(this.glyph, { scale: 1, y: 0 }, { duration: d * 0.2, ease: "easeOut" }),
        ];
      } else {
        // One short confirmation: compress, flash filled, then return to the outline.
        this.controls = [
          animate(this.bell, { rotate: 0 }, { duration: d * 0.2, ease: "easeOut" }),
          animate(this.clapper, { rotate: 0 }, { duration: d * 0.2, ease: "easeOut" }),
          animate(this.glyph, { scale: [null, 1 - 0.13 * strength, 1 + 0.045 * strength, 1], y: [null, 0.7, -0.6, 0] }, {
            duration: d * 0.6, times: [0, 0.24, 0.67, 1], ease: ["easeOut", [0.16, 1, 0.3, 1], "easeInOut"],
          }),
          animate(this.solid, { opacity: [null, 0.92, 0.92, 0] }, {
            duration: d * 0.6, times: [0, 0.22, 0.45, 1], ease: "easeInOut",
          }),
        ];
      }
      const epoch = this.epoch;
      this.state = this.reducedMotion.matches ? "finished" : "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
        if (this.epoch === epoch) this.state = "finished";
      });
      if (emit) this.dispatchEvent(new CustomEvent("motion-action", { detail: { action }, bubbles: true, composed: true }));
    }
    pause() { this.controls.forEach(control => control.pause()); this.state = "paused"; }
    play() {
      if (this.state !== "paused") return;
      this.controls.forEach(control => control.play());
      this.state = "running";
    }
    finish() { this.stop(); this.rest(); this.state = "finished"; }
    cancel() { this.finish(); }
  }
  customElements.define(tag, BellNotification);
}

export const bellRingDemoMarkup = `
  <div class="selection-demo bell-ring-demo">
    <p class="selection-demo-hint">移入轻摇一次 · 点击确认并打开通知弹窗</p>
    <div class="selection-demo-zoom">
      <sipplay-bell-ring-toggle data-motion duration="0.7" strength="1" label="打开通知（放大预览）"></sipplay-bell-ring-toggle>
    </div>
    <p class="selection-demo-caption">3× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-bell-ring-toggle label="打开通知（原始尺寸）"></sipplay-bell-ring-toggle>
      <span>原始尺寸 · 36 × 36</span>
    </div>
    <output class="selection-demo-state" data-bell-status aria-live="polite">移入试试</output>
    <dialog class="bell-notification-dialog" aria-labelledby="bell-notification-title">
      <div class="bell-dialog-header"><h2 id="bell-notification-title">通知</h2><button type="button" data-demo-action="close-notifications" aria-label="关闭通知">×</button></div>
      <p>暂无新通知</p>
    </dialog>
  </div>`;
export const bellRingDemoCSS = `
  .selection-demo-zoom sipplay-bell-ring-toggle{transform:scale(3)}
  .bell-ring-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-bell-ring-toggle{transform:scale(2.3)}
  .bell-notification-dialog{position:fixed;left:50%;top:calc(50% + 20px);margin:0;transform:translateX(-50%);max-height:calc(50vh - 36px);overflow:auto;width:min(280px,calc(100vw - 32px));padding:20px;border:1px solid #3e3947;border-radius:16px;background:#19171f;color:#f5f2fa;box-shadow:0 24px 70px #0006;text-align:left}
  .bell-notification-dialog::backdrop{background:#0006}
  .bell-dialog-header{display:flex;align-items:center;justify-content:space-between;gap:20px}
  .bell-dialog-header h2{margin:0;font-size:17px}
  .bell-dialog-header button{display:grid;place-items:center;width:32px;height:32px;border:0;border-radius:8px;background:#ffffff0a;color:#ddd6e7;font:20px/1 system-ui;cursor:pointer}
  .bell-notification-dialog p{padding:32px 0 18px;margin:0;text-align:center;color:#a9a5b6;font-size:13px}
`;
