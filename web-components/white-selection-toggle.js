// Self-contained so the same implementation can be embedded in exported HTML.
export function defineWhiteSelectionToggle(animate) {
  const tag = "sipplay-white-selection-toggle";
  if (customElements.get(tag)) return;

  class WhiteSelectionToggle extends HTMLElement {
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
            button:focus-visible{outline:1px solid white;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:20px;height:20px;overflow:visible;pointer-events:none}
            .fill{transform-box:view-box!important;transform-origin:10px 10px!important;opacity:0;transform:scale(.4)}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle class="outline" cx="10" cy="10" r="9.5" stroke="white"/>
              <defs>
                <!-- Reveal the supplied cutout, keeping the check transparent on any background. -->
                <path class="check" visibility="hidden" stroke-dasharray="1 2" stroke-dashoffset="1.05" opacity="0" pathLength="1" d="M5.922 10.134L8.116 12.676Q8.745 13.405 9.374 12.676L13.922 7.408"/>
                <mask id="circle-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20" style="mask-type:luminance">
                  <rect width="20" height="20" fill="white"/>
                  <path d="M14.5273 6.70508C14.1402 6.37103 13.5547 6.41457 13.2207 6.80176L8.74512 11.9893L6.62305 9.52832C6.28902 9.14137 5.70451 9.09878 5.31738 9.43262C4.93024 9.76662 4.8868 10.3511 5.2207 10.7383L7.41309 13.2803C8.11475 14.0935 9.37532 14.0933 10.0771 13.2803L14.623 8.01074C14.9569 7.6236 14.9143 7.03911 14.5273 6.70508Z" class="cutout" fill="black" opacity="0"/>
                </mask>
              </defs>
              <g class="fill">
                <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0Z" fill="white" mask="url(#circle-cutout)"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.outline = this.shadowRoot.querySelector(".outline");
        this.fill = this.shadowRoot.querySelector(".fill");
        this.check = this.shadowRoot.querySelector(".check");
        this.cutout = this.shadowRoot.querySelector(".cutout");
        this.checkLength = this.check.getTotalLength();
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

    syncCutout() {
      const dash = Number(this.check.getAttribute("stroke-dashoffset"));
      this.cutout.setAttribute("opacity", this.check.getAttribute("opacity"));
      if (dash <= 0) { this.cutout.style.clipPath = "none"; return; }
      const distance = Math.max(0, 1 - dash) * this.checkLength;
      if (distance === 0) { this.cutout.style.clipPath = "polygon(0px 0px,0px 0px,0px 0px)"; return; }
      // A short rounded ribbon reveals the exact supplied cutout. Inline clipping
      // avoids stale rendering from a mask nested inside another SVG mask.
      const left = [], right = [], radius = 1.8;
      const steps = Math.max(2, Math.ceil(distance * 3));
      let angle = 0;
      for (let i = 0; i <= steps; i++) {
        const at = distance * i / steps;
        const p = this.check.getPointAtLength(at);
        const before = this.check.getPointAtLength(Math.max(0, at - 0.01));
        const after = this.check.getPointAtLength(Math.min(this.checkLength, at + 0.01));
        angle = Math.atan2(after.y - before.y, after.x - before.x);
        const dx = -Math.sin(angle) * radius, dy = Math.cos(angle) * radius;
        left.push(`${p.x + dx}px ${p.y + dy}px`);
        right.push(`${p.x - dx}px ${p.y - dy}px`);
      }
      const tip = this.check.getPointAtLength(distance);
      for (let i = 1; i < 12; i++) {
        const a = angle + Math.PI / 2 - Math.PI * i / 12;
        left.push(`${tip.x + Math.cos(a) * radius}px ${tip.y + Math.sin(a) * radius}px`);
      }
      left.push(...right.reverse());
      const start = this.check.getPointAtLength(0);
      const next = this.check.getPointAtLength(0.01);
      const firstAngle = Math.atan2(next.y - start.y, next.x - start.x);
      for (let i = 1; i < 12; i++) {
        const a = firstAngle - Math.PI / 2 - Math.PI * i / 12;
        left.push(`${start.x + Math.cos(a) * radius}px ${start.y + Math.sin(a) * radius}px`);
      }
      this.cutout.style.clipPath = `polygon(${left.join(",")})`;
    }

    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const on = this.active;
      const duration = instant ? 0 : this.duration;
      const spring = { type: "spring", duration, bounce: instant ? 0 : this.bounce };
      // Finish the white fill before revealing the check.
      const fillScale = on && !instant ? [null, 1 + this.bounce * 0.35, 1] : on ? 1 : 0.4;
      const fillTiming = instant ? { duration: 0 } : on
        ? {
            duration: duration * 0.6,
            scale: { times: [0, 0.65, 1], ease: ["easeOut", "easeInOut"] },
            opacity: { duration: duration * 0.28, ease: "easeOut" },
          }
        : { ...spring, delay: duration * 0.2 };
      // Pause briefly after the fill settles, then draw with a spring and no overshoot.
      const checkSpring = { type: "spring", bounce: 0, delay: instant ? 0 : duration * 0.85 };
      const checkTiming = on
        ? { ...checkSpring, duration: duration * 0.35 }
        : { duration: duration * 0.7, ease: "easeIn" };
      const strokeTiming = on
        ? { ...checkSpring, duration: duration * 0.55 }
        : checkTiming;
      // Update the SVG cutout directly so Chromium repaints the mask during playback.
      const dash = Number(this.check.getAttribute("stroke-dashoffset"));
      const opacity = Number(this.check.getAttribute("opacity"));
      this.controls = [
        animate(this.fill, { opacity: on ? 1 : 0, scale: fillScale }, fillTiming),
        animate(this.outline, { opacity: on ? 0 : 1 }, { duration: duration * 0.65, delay: !on && !instant ? duration * 0.18 : 0 }),
        animate(dash, on ? 0 : 1.05, { ...strokeTiming, onUpdate: value => { this.check.setAttribute("stroke-dashoffset", value); this.syncCutout(); } }),
        animate(opacity, on ? 1 : 0, { ...checkTiming, onUpdate: value => { this.check.setAttribute("opacity", value); this.syncCutout(); } }),
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
  customElements.define(tag, WhiteSelectionToggle);
}

export const whiteSelectionDemoMarkup = `
  <div class="selection-demo">
    <p class="selection-demo-hint">点击圆形，切换选中状态</p>
    <div class="selection-demo-zoom">
      <sipplay-white-selection-toggle data-motion duration="0.32" bounce="0.15" label="切换选中状态（放大预览）"></sipplay-white-selection-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-white-selection-toggle label="切换选中状态（原始尺寸）"></sipplay-white-selection-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const whiteSelectionDemoCSS = `
  .selection-demo-zoom sipplay-white-selection-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-white-selection-toggle{transform:scale(3)}
  .selection-demo:has(sipplay-white-selection-toggle) .selection-demo-state{color:#fff}
`;
