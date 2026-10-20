// Self-contained so the library preview and exported HTML share one definition.
export function defineWrenchTurnToggle(animate) {
  const tag = "sipplay-wrench-turn-toggle";
  if (customElements.get(tag)) return;

  /**
   * @summary 扳手拧动回弹
   * 动效：扳手拧动回弹 / sipplay-wrench-turn-toggle
   * 位置：Advanced Settings 左侧扳手图标。
   * Figma：Advanced Settings / 扳手图标 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-95327
   * 适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
   * 注释同步：Figma 画布与网站已同步
   * 触发：对应 Tab 选中时，以扳口为轴连续拧动两次、回弹收稳；取消选中置灰。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 advanced。
   * 参数：duration=0.84（时长（秒））；bounce=0.28（回弹程度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/wrench-turn-toggle.js；初始化 defineWrenchTurnToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-wrench-turn-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-wrench-turn-toggle
   * @attribute {boolean} active - 在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 advanced。 默认 false。
   * @attribute {number} duration - 时长（秒）；范围 0.28–1.8，步长 0.04。
   * @attribute {number} bounce - 回弹程度；范围 0–0.5，步长 0.02。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。在 Tap Tab 中由父组件驱动 active。独立使用时，active 绑定当前步骤是否为 advanced。
   */
  class WrenchTurnToggle extends HTMLElement {
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
      const value = Number(this.getAttribute("duration") ?? 0.84);
      return Number.isFinite(value) ? Math.min(1.8, Math.max(0.28, value)) : 0.84;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.28);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0, value)) : 0.28;
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
            /* Keep the jaw fixed when Motion normalizes SVG transform styles. */
            .wrench{transform-box:view-box!important;transform-origin:14px 5.7px!important}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g class="wrench">
                <path d="M17.485 6.14586C17.4735 6.01233 17.1755 5.7559 17.0493 5.71016C16.9229 5.66414 16.7814 5.69547 16.6862 5.79007L14.7782 7.69807L12.2999 5.21978L14.2461 3.28093C14.3414 3.18614 14.3724 3.04511 14.3266 2.91937C14.2802 2.79338 13.9746 2.52646 13.8403 2.51489C12.6584 2.41344 11.5003 2.83384 10.663 3.66812C9.51626 4.81065 9.21257 6.47907 9.75033 7.90119C9.69156 7.95052 9.63356 8.0028 9.57635 8.05916L3.08002 14.1661C3.07773 14.1683 3.07547 14.1707 3.07299 14.1729C2.309 14.9341 2.309 16.1725 3.07299 16.9338C3.83711 17.6949 5.07114 17.6856 5.83501 16.9245C5.8383 16.9214 5.84131 16.9184 5.84433 16.9149L11.9209 10.3927C11.9763 10.3373 12.0277 10.2793 12.0762 10.2197C13.504 10.7564 15.1798 10.4546 16.3276 9.31134C17.1647 8.477 17.587 7.32319 17.485 6.14586Z" fill="currentColor" stroke="currentColor" stroke-linejoin="round"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.wrench = this.shadowRoot.querySelector(".wrench");
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换工具选中状态");
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
      const turning = on && !instant;
      const duration = this.duration;
      this.controls = [
        animate(this.svg, { color: on ? "#ffffff" : "#71717a" }, { duration: instant ? 0 : duration * 0.18 }),
        // Grip at the jaw: wind up, turn twice, then release the small recoil.
        animate(this.wrench, { rotate: turning ? [0, -14, 36, 3, 26, -16 * this.bounce, 0] : 0 }, turning
          ? {
              duration,
              times: [0, 0.12, 0.36, 0.55, 0.73, 0.88, 1],
              ease: ["easeOut", [0.2, 0.75, 0.25, 1], "easeInOut", [0.2, 0.75, 0.25, 1], "easeInOut", "easeOut"],
            }
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
  customElements.define(tag, WrenchTurnToggle);
}

export const wrenchTurnDemoMarkup = `
  <div class="selection-demo wrench-turn-demo">
    <p class="selection-demo-hint">点击扳手，查看拧动与回弹</p>
    <div class="selection-demo-zoom">
      <sipplay-wrench-turn-toggle data-motion duration="0.84" bounce="0.28" label="切换工具选中状态（放大预览）"></sipplay-wrench-turn-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-wrench-turn-toggle label="切换工具选中状态（原始尺寸）"></sipplay-wrench-turn-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const wrenchTurnDemoCSS = `
  .selection-demo-zoom sipplay-wrench-turn-toggle{transform:scale(4)}
  .wrench-turn-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-wrench-turn-toggle{transform:scale(3)}
`;
