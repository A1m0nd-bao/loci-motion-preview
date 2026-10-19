// Keep the definition self-contained for the library and standalone HTML export.
export function defineProfileRiseToggle(animate) {
  const tag = "sipplay-profile-rise-toggle";
  if (customElements.get(tag)) return;

  class ProfileRiseToggle extends HTMLElement {
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
      const value = Number(this.getAttribute("duration") ?? 0.8);
      return Number.isFinite(value) ? Math.min(1.8, Math.max(0.24, value)) : 0.8;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.3);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0, value)) : 0.3;
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
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><clipPath id="profile-window"><rect x="-1" y="-2" width="22" height="21.3"/></clipPath></defs>
              <g clip-path="url(#profile-window)" fill="currentColor" stroke="currentColor">
                <g class="head">
                  <path d="M13.7116 6.15736C13.7116 8.17727 12.0742 9.81473 10.0543 9.81473C8.03435 9.81473 6.39689 8.17727 6.39689 6.15736C6.39689 4.13746 8.03435 2.5 10.0543 2.5C12.0742 2.5 13.7116 4.13746 13.7116 6.15736Z"/>
                </g>
                <g class="body">
                  <path d="M3.33203 17.0169C3.33203 13.5597 6.22037 11.7913 10.0543 11.7913C13.8881 11.7913 16.7765 13.5597 16.7765 17.0169C16.7765 17.5669 16.3752 18.0128 15.8802 18.0128H4.22833C3.73332 18.0128 3.33203 17.5669 3.33203 17.0169Z"/>
                </g>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.head = this.shadowRoot.querySelector(".head");
        this.body = this.shadowRoot.querySelector(".body");
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换人物选中状态");
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
      const rising = on && !instant;
      this.controls = [
        animate(this.svg, { color: on ? "#ffffff" : "#71717a" }, { duration: instant ? 0 : duration * 0.18 }),
        // The body finds its seat first; the head follows with a softer spring.
        // Their relative vertical motion gives the neck a small stretch and settle.
        animate(this.body, { y: rising ? [11, 0] : 0 }, rising
          ? { type: "spring", duration: duration * 0.64, bounce: this.bounce * 0.35 }
          : { duration: 0 }),
        animate(this.head, { y: rising ? [18, 0] : 0 }, rising
          ? { type: "spring", duration: duration * 0.88, bounce: this.bounce, delay: duration * 0.12 }
          : { duration: 0 }),
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
  customElements.define(tag, ProfileRiseToggle);
}

export const profileRiseDemoMarkup = `
  <div class="selection-demo profile-rise-demo">
    <p class="selection-demo-hint">点击人物，查看底部探出与回弹</p>
    <div class="selection-demo-zoom">
      <sipplay-profile-rise-toggle data-motion duration="0.8" bounce="0.3" label="切换人物选中状态（放大预览）"></sipplay-profile-rise-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-profile-rise-toggle label="切换人物选中状态（原始尺寸）"></sipplay-profile-rise-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const profileRiseDemoCSS = `
  .selection-demo-zoom sipplay-profile-rise-toggle{transform:scale(4)}
  .profile-rise-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-profile-rise-toggle{transform:scale(3)}
`;
