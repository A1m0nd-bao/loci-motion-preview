export function definePlusSelectionToggle(animate) {
  const tag = "sipplay-plus-selection-toggle";
  if (customElements.get(tag)) return;
  /**
   * @summary 加号选中填白
   * 动效：加号选中填白 / sipplay-plus-selection-toggle
   * 位置：移动 Web Feed 页底部四项导航的第三项：圆形加号，24×24。
   * Figma：移动 Web 底栏 / 添加 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82199
   * 核对依据：已核对图形和页面上下文
   * 适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：选中时圆形填白，加号保持透明镂空；取消时恢复灰态。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：在底栏中由父级导航驱动；这是可保持选中的导航状态，不等同于一次性添加操作。
   * 参数：duration=0.46（切换时长（秒））；bounce=0.18（填白回弹）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/plus-selection-toggle.js；初始化 definePlusSelectionToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-plus-selection-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-plus-selection-toggle
   * @attribute {boolean} active - 在底栏中由父级导航驱动；这是可保持选中的导航状态，不等同于一次性添加操作。 默认 false。
   * @attribute {number} duration - 切换时长（秒）；范围 0.24–1.2，步长 0.02。
   * @attribute {number} bounce - 填白回弹；范围 0–0.35，步长 0.01。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。在底栏中由父级导航驱动；这是可保持选中的导航状态，不等同于一次性添加操作。
   */
  class PlusSelectionToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "bounce", "label"];
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
      const value = Number(this.getAttribute("duration") ?? 0.46);
      return Number.isFinite(value) ? Math.min(1.2, Math.max(0.24, value)) : 0.46;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.18);
      return Number.isFinite(value) ? Math.min(0.35, Math.max(0, value)) : 0.18;
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
            .press{transform-box:view-box!important;transform-origin:12px 12px!important}
            .fill{transform:scale(0);opacity:0;transform-box:view-box!important;transform-origin:12px 12px!important}
            .symbol,.ring{stroke-opacity:0.4}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><mask id="plus-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style="mask-type:luminance"><rect width="24" height="24" fill="white"/><path d="M15.75 11.9994H12M12 11.9994H8.25M12 11.9994V15.7494M12 11.9994L12 8.24939" stroke="black" stroke-width="1.5" stroke-linecap="round"/></mask></defs>
              <g class="press" opacity="0.9">
                <g mask="url(#plus-cutout)"><path class="fill" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="white"/></g>
                <path class="ring" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <path class="symbol" d="M15.75 11.9994H12M12 11.9994H8.25M12 11.9994V15.7494M12 11.9994L12 8.24939" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        for (const name of ["press", "symbol", "ring", "fill"]) this[name] = this.shadowRoot.querySelector(`.${name}`);
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.active ? "取消选中" : "选中加号"));
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
      const d = this.duration;
      this.controls = [
        animate(this.fill, { scale: this.active ? 1 : 0 }, instant ? { duration: 0 } : { type: "spring", duration: this.active ? d : d * 0.75, bounce: this.active ? this.bounce : 0 }),
        animate(this.fill, { opacity: this.active ? 1 : 0 }, { duration: instant ? 0 : d * 0.45, ease: "easeOut" }),
        animate(this.press, { scale: instant ? 1 : [null, 0.965, 1] }, instant ? { duration: 0 } : { duration: d, times: [0, 0.18, 1], ease: ["easeOut", [0.2, 0.85, 0.25, 1]] }),
        animate(this.ring, { strokeOpacity: this.active ? 1 : 0.4 }, { duration: instant ? 0 : d * 0.48, ease: "easeOut" }),
        animate(this.symbol, { strokeOpacity: this.active ? 0 : 0.4 }, { duration: instant ? 0 : d * 0.38, delay: instant || this.active ? 0 : d * 0.1, ease: "easeOut" }),
      ];
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
      this.pausedControls = this.controls.filter(control => control.duration > 0 && control.state !== "finished");
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
  customElements.define(tag, PlusSelectionToggle);
}


export const plusSelectionDemoMarkup = `
  <div class="selection-demo plus-selection-demo">
    <p class="selection-demo-hint">点击选中 · 圆形填白，加号镂空</p>
    <div class="selection-demo-zoom"><sipplay-plus-selection-toggle data-motion duration="0.46" bounce="0.18" label="切换加号选中状态（放大预览）"></sipplay-plus-selection-toggle></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-plus-selection-toggle label="切换加号选中状态（原始尺寸）"></sipplay-plus-selection-toggle><span>原始尺寸 · 24 × 24</span></div>
    <output class="selection-demo-state" data-selection-status data-active-text="已选中" data-inactive-text="未选中" aria-live="polite">未选中</output>
  </div>`;
export const plusSelectionDemoCSS = `
  .selection-demo-zoom sipplay-plus-selection-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-plus-selection-toggle{transform:scale(3)}
  .plus-selection-demo .selection-demo-state{color:#fff}
`;
