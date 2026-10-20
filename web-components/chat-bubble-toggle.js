// Self-contained so preview and downloadable HTML share one implementation.
export function defineChatBubbleToggle(animate) {
  const tag = "sipplay-chat-bubble-toggle";
  if (customElements.get(tag)) return;
  class ChatBubbleToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "bounce", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.state = "idle";
      this.epoch = 0;
      this.waveProgress = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
    }
    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() { return Math.min(1.6, Math.max(0.24, Number(this.getAttribute("duration")) || 0.64)); }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.22);
      return Number.isFinite(value) ? Math.min(0.45, Math.max(0, value)) : 0.22;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:10px;border:0;border-radius:10px;background:transparent;color:white;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid white;outline-offset:-3px}
            svg{display:block;width:24px;height:24px;overflow:visible;pointer-events:none}
            .bubble{transform-box:view-box!important;transform-origin:12px 12px!important}
            .body{opacity:0}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><mask id="wave-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style="mask-type:luminance">
                <rect width="24" height="24" fill="white"/>
                <path class="wave" d="M12.9111 12.0811C11.4494 9.45025 7.6313 9.55304 6.31348 12.2588L6.10059 12.6963C5.85915 13.1927 6.06612 13.7915 6.5625 14.0332C7.05895 14.2747 7.65768 14.0677 7.89941 13.5713L8.11133 13.1348C8.72075 11.8833 10.4871 11.836 11.1631 13.0527C12.6047 15.6473 16.3551 15.592 17.7197 12.9561L17.8877 12.6309C18.1416 12.1405 17.9503 11.5372 17.46 11.2832C16.9697 11.0294 16.3664 11.2208 16.1123 11.7109L15.9434 12.0371C15.312 13.2557 13.5777 13.2809 12.9111 12.0811Z" fill="black" opacity="0"/>
              </mask></defs>
              <g class="bubble">
                <path class="outline" d="M20.6913 15.8376C21.2101 14.664 21.4982 13.3657 21.4982 12C21.4982 6.75329 17.2453 2.5 11.9991 2.5C6.75289 2.5 2.5 6.75329 2.5 12C2.5 17.2467 6.75289 21.5 11.9991 21.5C13.6882 21.5 15.2743 21.0591 16.6486 20.2861L21.5 21.4991L20.6913 15.8376Z" stroke="white" stroke-opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path class="body" d="M11.999 1.5C17.7975 1.50001 22.498 6.20102 22.498 12C22.498 13.5093 22.1797 14.9442 21.6064 16.2412L22.3945 21.7627C22.4447 22.1142 22.1228 22.4045 21.7783 22.3184L17.1377 21.1582C15.6187 22.0125 13.8658 22.5 11.999 22.5C6.20058 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20058 1.5 11.999 1.5Z" fill="white" mask="url(#wave-cutout)"/>
              </g>
            </svg>
          </button>`;
        for (const name of ["button", "bubble", "outline", "body", "wave"]) this[name] = this.shadowRoot.querySelector(name === "button" ? name : `.${name}`);
        this.button.addEventListener("click", () => this.toggle());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      this.apply(true);
    }
    disconnectedCallback() { this.stop(); this.reducedMotion.removeEventListener("change", this.onReducedMotion); }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === "active") this.apply(this.reducedMotion.matches);
      else this.updateAccessibility();
    }
    updateAccessibility() {
      this.button.setAttribute("aria-pressed", String(this.active));
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换对话状态");
    }
    stop() { this.epoch++; this.controls.forEach(control => control.stop()); this.controls = []; }
    renderWave(value) {
      this.waveProgress = value;
      // Direct attributes repaint a single SVG mask reliably during the spring.
      this.wave.setAttribute("opacity", Math.min(1, Math.max(0, value)));
      this.wave.setAttribute("transform", value === 1 ? "" : `translate(12 12.4) translate(0 ${(1 - value) * 1.3}) scale(${0.88 + value * 0.12} ${0.3 + value * 0.7}) translate(-12 -12.4)`);
    }
    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const on = this.active;
      const duration = instant ? 0 : this.duration;
      const pose = instant ? { scaleX: 1, scaleY: 1, rotate: 0, y: 0 } : on ? {
        scaleX: [null, 1.05, 0.97, 1],
        scaleY: [null, 0.90, 1.06, 1],
        rotate: [null, -6, 3, 0],
        y: [null, 1, -0.6, 0],
      } : { scaleX: [null, 0.96, 1], scaleY: [null, 0.96, 1], rotate: [null, 0, 0], y: [null, 0, 0] };
      const poseTiming = instant ? { duration: 0 } : on ? {
        duration: duration * 0.82, times: [0, 0.18, 0.58, 1], ease: ["easeInOut", "easeOut", "easeInOut"],
      } : { duration: duration * 0.75, times: [0, 0.4, 1], ease: "easeInOut" };
      this.controls = [
        animate(this.bubble, pose, poseTiming),
        animate(this.body, { opacity: on ? 1 : 0 }, { duration: duration * (on ? 0.28 : 0.35), delay: duration * (on ? 0.12 : 0.14), ease: "easeInOut" }),
        animate(this.outline, { opacity: on ? 0 : 1 }, { duration: duration * (on ? 0.3 : 0.5), delay: on ? 0 : duration * 0.28, ease: "easeInOut" }),
        animate(this.waveProgress, on ? 1 : 0, {
          ...(on ? { type: "spring", bounce: instant ? 0 : this.bounce, duration: duration * 0.55, delay: duration * 0.42 } : { duration: duration * 0.26, ease: "easeIn" }),
          onUpdate: value => this.renderWave(value),
        }),
      ];
      const epoch = this.epoch;
      this.state = instant ? "finished" : "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => { if (epoch === this.epoch) this.state = "finished"; });
    }
    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    pause() { this.controls.forEach(control => control.pause()); this.state = "paused"; }
    play() { if (this.state !== "paused") return; this.controls.forEach(control => control.play()); this.state = "running"; }
    finish() { this.apply(true); }
    cancel() { this.active = false; this.apply(true); }
  }
  customElements.define(tag, ChatBubbleToggle);
}
export const chatBubbleDemoMarkup = `
  <div class="selection-demo chat-bubble-demo">
    <p class="selection-demo-hint">点击气泡，唤醒对话</p>
    <div class="selection-demo-zoom"><sipplay-chat-bubble-toggle data-motion duration="0.64" bounce="0.22" label="切换对话状态（放大预览）"></sipplay-chat-bubble-toggle></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-chat-bubble-toggle label="切换对话状态（原始尺寸）"></sipplay-chat-bubble-toggle><span>原始尺寸 · 24 × 24</span></div>
    <output class="selection-demo-state" data-selection-status data-active-text="对话已唤醒" data-inactive-text="未选中" aria-live="polite">未选中</output>
  </div>`;
export const chatBubbleDemoCSS = `
  .selection-demo-zoom sipplay-chat-bubble-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-chat-bubble-toggle{transform:scale(3)}
  .chat-bubble-demo .selection-demo-state{color:#fff}
`;
