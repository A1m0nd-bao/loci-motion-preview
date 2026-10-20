export function defineHomeSettleToggle(animate) {
  const tag = "sipplay-home-settle-toggle";
  if (customElements.get(tag)) return;
  const emptyOutline = "M4.06689 9.07961V20.0529C4.06689 21.025 4.85487 21.8129 5.82689 21.8129H7.3069C8.27892 21.8129 9.06689 21.025 9.06689 20.0529V16.6396C9.06689 15.6676 9.85487 14.8796 10.8269 14.8796H13.1736C14.1456 14.8796 14.9336 15.6676 14.9336 16.6396V20.0529C14.9336 21.025 15.7215 21.8129 16.6936 21.8129H18.1736C19.1456 21.8129 19.9336 21.025 19.9336 20.0529V9.07961M1 11.6786L10.795 2.47723C11.4723 1.84092 12.5277 1.84092 13.205 2.47723L23 11.6786";
  const selectedOutline = "M4.06689 8.79754V20.0529C4.06689 21.025 4.85487 21.8129 5.82689 21.8129H7.3069C8.27892 21.8129 9.06689 21.025 9.06689 20.0529V16.6396C9.06689 15.6676 9.85487 14.8796 10.8269 14.8796H13.1736C14.1456 14.8796 14.9336 15.6676 14.9336 16.6396V20.0529C14.9336 21.025 15.7215 21.8129 16.6936 21.8129H18.1736C19.1456 21.8129 19.9336 21.025 19.9336 20.0529V8.79797M1 11.6786L10.795 2.47723C11.4723 1.84092 12.5277 1.84092 13.205 2.47723L23 11.6786";
  /**
   * @summary 首页填白落定
   * 动效：首页填白落定 / sipplay-home-settle-toggle
   * 位置：移动 Web Feed 页底部四项导航的第一项：首页图标，24×24。
   * Figma：移动 Web 底栏 / 首页 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82194
   * 核对依据：已核对图形和页面上下文
   * 适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：选中时轻提、填白并落定；取消时恢复线框。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：在底栏中由父级导航驱动；独立使用时 active 绑定当前路由。
   * 参数：duration=0.56（切换时长（秒））；strength=1（回弹幅度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/home-settle-toggle.js；初始化 defineHomeSettleToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-home-settle-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-home-settle-toggle
   * @attribute {boolean} active - 在底栏中由父级导航驱动；独立使用时 active 绑定当前路由。 默认 false。
   * @attribute {number} duration - 切换时长（秒）；范围 0.24–1.2，步长 0.02。
   * @attribute {number} strength - 回弹幅度；范围 0.4–1.4，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。在底栏中由父级导航驱动；独立使用时 active 绑定当前路由。
   */
  class HomeSettleToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "strength", "label"];
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
      const value = Number(this.getAttribute("duration") ?? 0.56);
      return Number.isFinite(value) ? Math.min(1.2, Math.max(0.24, value)) : 0.56;
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
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:10px;border:0;border-radius:10px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:1px}
            svg{display:block;width:24px;height:24px;overflow:hidden;pointer-events:none}
            .house{transform-box:view-box!important;transform-origin:12px 22.5629px!important}
            .reveal{transform:scaleY(0);transform-box:view-box!important;transform-origin:0px 24px!important}
            .outline{opacity:0.4}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs><clipPath id="home-fill"><rect class="reveal" width="24" height="24"/></clipPath></defs>
              <g class="house">
                <path class="fill" clip-path="url(#home-fill)" d="M4.06689 20.0529V8.79754L10.795 2.47723C11.4723 1.84092 12.5277 1.84092 13.205 2.47723L19.9336 8.79797V20.0529C19.9336 21.025 19.1456 21.8129 18.1736 21.8129H16.6936C15.7215 21.8129 14.9336 21.025 14.9336 20.0529V16.6396C14.9336 15.6676 14.1456 14.8796 13.1736 14.8796H10.8269C9.85487 14.8796 9.06689 15.6676 9.06689 16.6396V20.0529C9.06689 21.025 8.27892 21.8129 7.3069 21.8129H5.82689C4.85487 21.8129 4.06689 21.025 4.06689 20.0529Z" fill="white"/>
                <path class="outline" d="${emptyOutline}" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        for (const name of ["house", "reveal", "outline"]) this[name] = this.shadowRoot.querySelector(`.${name}`);
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换首页选中状态");
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
      const on = this.active, s = this.strength, d = this.duration;
      this.outline.setAttribute("d", on ? selectedOutline : emptyOutline);
      const timing = instant ? { duration: 0 } : { duration: on ? d : d * 0.6, ease: [0.22, 1, 0.36, 1] };
      this.controls = [
        animate(this.house, { y: instant ? 0 : on ? [null, 0.18 * s, -0.72 * s, 0.12 * s, 0] : [null, 0.22 * s, 0], scale: instant ? 1 : on ? [null, 0.98, 1, 1, 1] : 1 }, instant ? timing : on ? { duration: d, times: [0, 0.13, 0.43, 0.77, 1], ease: ["easeOut", [0.2, 0.8, 0.25, 1], "easeInOut", "easeOut"] } : { duration: d * 0.6, y: { times: [0, 0.4, 1], ease: "easeInOut" }, scale: { ease: "easeOut" } }),
        animate(this.reveal, { scaleY: on ? 1 : 0 }, instant ? timing : { duration: on ? d * 0.65 : d * 0.48, delay: on ? d * 0.08 : 0, ease: on ? [0.22, 0.75, 0.25, 1] : [0.4, 0, 0.7, 1] }),
        animate(this.outline, { opacity: on ? 1 : 0.4 }, { duration: instant ? 0 : d * 0.4, ease: "easeOut" }),
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
  customElements.define(tag, HomeSettleToggle);
}

export const homeSettleDemoMarkup = `
  <div class="selection-demo home-settle-demo">
    <p class="selection-demo-hint">点击回家 · 轻提填白，落定收稳</p>
    <div class="selection-demo-zoom"><sipplay-home-settle-toggle data-motion duration="0.56" strength="1" label="切换首页选中状态（放大预览）"></sipplay-home-settle-toggle></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-home-settle-toggle label="切换首页选中状态（原始尺寸）"></sipplay-home-settle-toggle><span>原始尺寸 · 24 × 24</span></div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;
export const homeSettleDemoCSS = `
  .selection-demo-zoom sipplay-home-settle-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-home-settle-toggle{transform:scale(3)}
  .home-settle-demo .selection-demo-state{color:#fff}
`;
