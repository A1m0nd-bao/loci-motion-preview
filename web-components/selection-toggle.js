// Self-contained so the same implementation can be embedded in exported HTML.
export function defineSelectionToggle(animate) {
  const tag = "sipplay-selection-toggle";
  if (customElements.get(tag)) return;

  class SelectionToggle extends HTMLElement {
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
    get duration() { return Math.min(1.5, Math.max(0.12, Number(this.getAttribute("duration")) || 0.32)); }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.15);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0, value)) : 0.15;
    }
    get playState() { return this.state; }

    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:12px;border:0;border-radius:10px;background:transparent;color:white;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #ED78F4;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:20px;height:20px;overflow:visible;pointer-events:none}
            .fill{transform-origin:10px 10px;opacity:0;transform:scale(.4)}
            .check{stroke-dasharray:1 2;stroke-dashoffset:1.05;opacity:0}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle class="outline" cx="10" cy="10" r="9.5" stroke="white"/>
              <circle class="fill" cx="10" cy="10" r="10" fill="#ED78F4"/>
              <path class="check" pathLength="1" d="M6 10.0833L7.91074 11.9941C8.23618 12.3195 8.76382 12.3195 9.08926 11.9941L13.0833 8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.outline = this.shadowRoot.querySelector(".outline");
        this.fill = this.shadowRoot.querySelector(".fill");
        this.check = this.shadowRoot.querySelector(".check");
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "选择项目");
    }

    stop() {
      this.epoch++;
      // Motion.stop commits the current pose before a new direction starts.
      this.controls.forEach((control) => control.stop());
      this.controls = [];
    }

    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const on = this.active;
      const duration = instant ? 0 : this.duration;
      const spring = { type: "spring", duration, bounce: instant ? 0 : this.bounce };
      // Finish the purple fill before revealing the check; keep total duration unchanged.
      const fillTiming = on
        ? { duration: duration * 0.6, ease: [0.22, 1 + this.bounce * 1.5, 0.36, 1] }
        : { ...spring, delay: instant ? 0 : duration * 0.2 };
      // Apple's Core Animation easeInEaseOut: soft start and finish, faster middle.
      const checkEase = on ? [0.42, 0, 0.58, 1] : "easeIn";
      this.controls = [
        animate(this.fill, { opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }, fillTiming),
        animate(this.outline, { opacity: on ? 0 : 1 }, { duration: duration * 0.65, delay: !on && !instant ? duration * 0.18 : 0 }),
        animate(this.check, { strokeDashoffset: on ? 0 : 1.05, opacity: on ? 1 : 0 }, { duration: duration * (on ? 0.35 : 0.7), ease: checkEase, delay: on && !instant ? duration * 0.65 : 0 }),
      ];
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
  customElements.define(tag, SelectionToggle);
}

export const selectionDemoMarkup = `
  <div class="selection-demo">
    <p class="selection-demo-hint">点击圆形，切换选中状态</p>
    <div class="selection-demo-zoom">
      <sipplay-selection-toggle data-motion duration="0.32" bounce="0.15" label="切换选中状态（放大预览）"></sipplay-selection-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-selection-toggle label="切换选中状态（原始尺寸）"></sipplay-selection-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const selectionDemoCSS = `
  #demo:has(.selection-demo){padding:24px;gap:0}
  .selection-demo{display:flex;flex-direction:column;align-items:center;gap:0;width:100%;color:#fff}
  .selection-demo-hint{margin:0 0 18px;font-size:14px;color:#aaa5b5}
  .selection-demo-zoom{display:grid;place-items:center;width:176px;height:176px}
  .selection-demo-zoom sipplay-selection-toggle{transform:scale(4)}
  .selection-demo-caption{margin:10px 0 24px;font-size:12px;color:#aaa5b5}
  .selection-demo-original{display:flex;align-items:center;gap:12px;font-size:13px;color:#d5cfdf}
  .selection-demo-state{margin-top:16px;font-size:13px;color:#ed78f4}
  .compact .selection-demo-hint,.compact .selection-demo-caption,.compact .selection-demo-original,.compact .selection-demo-state{display:none}
  .compact .selection-demo-zoom{width:100px;height:120px}
  .compact .selection-demo-zoom sipplay-selection-toggle{transform:scale(3)}
`;
