// Self-contained so the exported HTML uses the same animation as the library.
export function defineLayerStackToggle(animate) {
  const tag = "sipplay-layer-stack-toggle";
  if (customElements.get(tag)) return;

  class LayerStackToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "bounce", "label"];

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
    }

    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.72);
      return Number.isFinite(value) ? Math.min(1.8, Math.max(0.24, value)) : 0.72;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.24);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0, value)) : 0.24;
    }
    get playState() { return this.state; }

    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:12px;border:0;border-radius:10px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:20px;height:20px;overflow:visible;pointer-events:none;color:#71717a}
            .back,.face{opacity:0}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><clipPath id="stack-window"><rect x="-2" y="-8" width="24" height="30"/></clipPath></defs>
              <g clip-path="url(#stack-window)" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <g class="sheet bottom">
                  <path class="face" d="M10 9.7988L18 13.8994L10 18L2 13.8994Z" fill="currentColor" stroke="none"/>
                  <path class="back" d="M2 13.8994L10 9.7988L18 13.8994"/>
                  <path d="M18 13.8994L10 18L2 13.8994"/>
                </g>
                <g class="sheet middle">
                  <path class="face" d="M10 5.87865L18 9.97927L10 14.0799L2 9.97927Z" fill="currentColor" stroke="none"/>
                  <path class="back" d="M2 9.97927L10 5.87865L18 9.97927"/>
                  <path d="M18 9.97927L10 14.0799L2 9.97927"/>
                </g>
                <g class="sheet top">
                  <path d="M10 2L18 6.10062L10 10.2012L2 6.10062L10 2Z" fill="currentColor"/>
                </g>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.sheets = [...this.shadowRoot.querySelectorAll(".sheet")];
        this.backs = [...this.shadowRoot.querySelectorAll(".back,.face")];
        this.button.addEventListener("click", () => this.toggle());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      this.apply(true);
    }

    disconnectedCallback() {
      this.stop();
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
    }

    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === "active") this.apply(this.reducedMotion.matches);
      else this.updateAccessibility();
    }

    updateAccessibility() {
      this.button.setAttribute("aria-pressed", String(this.active));
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换图层选中状态");
    }

    stop() {
      this.epoch++;
      this.controls.forEach((control) => control.stop());
      this.controls = [];
    }

    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const on = this.active;
      const duration = this.duration;
      this.controls.push(animate(this.svg, { color: on ? "#ffffff" : "#71717a" }, { duration: instant ? 0 : duration * 0.18 }));
      this.sheets.forEach((sheet, index) => {
        const delay = index * duration * 0.16;
        this.controls.push(animate(sheet,
          on && !instant ? { y: [-12, 0], opacity: [0, 1] } : { y: 0, opacity: 1 },
          on && !instant ? {
            y: { type: "spring", duration: duration * 0.68, bounce: this.bounce, delay },
            opacity: { duration: duration * 0.12, ease: "easeOut", delay },
          } : { duration: 0 },
        ));
        // During the fall each sheet has a back edge and face. Hide those at
        // landing so the assembled silhouette exactly matches the source SVG.
        for (const part of sheet.querySelectorAll(".back,.face")) {
          const opacity = part.classList.contains("face") ? 0.16 : 1;
          this.controls.push(animate(part,
            { opacity: on && !instant ? [opacity, 0] : 0 },
            { duration: on && !instant ? duration * 0.18 : 0, delay: on && !instant ? delay + duration * 0.45 : 0, ease: "easeOut" },
          ));
        }
      });
      const epoch = this.epoch;
      this.state = instant ? "finished" : "running";
      Promise.all(this.controls.map((control) => Promise.resolve(control))).then(() => {
        if (this.epoch === epoch) this.state = "finished";
      });
    }

    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }

    pause() { this.controls.forEach((control) => control.pause()); this.state = "paused"; }
    play() {
      if (this.state !== "paused") return;
      this.controls.forEach((control) => control.play());
      this.state = "running";
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, LayerStackToggle);
}

export const layerStackDemoMarkup = `
  <div class="selection-demo layer-stack-demo">
    <p class="selection-demo-hint">点击图层，查看方片落下叠加</p>
    <div class="selection-demo-zoom">
      <sipplay-layer-stack-toggle data-motion duration="0.72" bounce="0.24" label="切换图层选中状态（放大预览）"></sipplay-layer-stack-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-layer-stack-toggle label="切换图层选中状态（原始尺寸）"></sipplay-layer-stack-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const layerStackDemoCSS = `
  .selection-demo-zoom sipplay-layer-stack-toggle{transform:scale(4)}
  .layer-stack-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-layer-stack-toggle{transform:scale(3)}
`;
