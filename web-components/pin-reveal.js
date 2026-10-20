// Self-contained: preview and downloadable HTML use exactly the same component.
export function definePinReveal(animate) {
  const tag = "sipplay-pin-reveal";
  if (customElements.get(tag)) return;
  /**
   * @summary 实心图钉出现
   * 动效：实心图钉出现 / sipplay-pin-reveal
   * 位置：Web 聊天页 Frame 4675：消息气泡右下角的实心图钉标记，18×18。它标识消息已置顶。
   * Figma：Web 聊天 / 已置顶消息标记 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67915
   * 核对依据：已核对图形和页面上下文
   * 适配：组件示例含内部按钮；这里的设计是消息状态标记，接入时改为被动图标，并保留原稿背景与透明度。
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：active=true 时出现；带 active 挂载也会播放出现动画。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：active 绑定这条消息是否已置顶，仅在标记出现时播放。作为纯状态标记使用时应提取被动图标视图，不新增按钮、点击切换或 Tab 焦点；不能与置顶操作按钮重复执行业务。初始静态显示时调用 finish()。
   * 参数：duration=0.64（时长（秒））；bounce=0.28（回弹程度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/pin-reveal.js；初始化 definePinReveal(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-pin-reveal
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-pin-reveal
   * @attribute {boolean} active - active 绑定这条消息是否已置顶，仅在标记出现时播放。作为纯状态标记使用时应提取被动图标视图，不新增按钮、点击切换或 Tab 焦点；不能与置顶操作按钮重复执行业务。初始静态显示时调用 finish()。 默认 false。
   * @attribute {number} duration - 时长（秒）；范围 0.24–1.8，步长 0.04。
   * @attribute {number} bounce - 回弹程度；范围 0–0.5，步长 0.02。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。active 绑定这条消息是否已置顶，仅在标记出现时播放。作为纯状态标记使用时应提取被动图标视图，不新增按钮、点击切换或 Tab 焦点；不能与置顶操作按钮重复执行业务。初始静态显示时调用 finish()。
   */
  class PinMotion extends HTMLElement {
    static observedAttributes = ["active", "duration", "bounce", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.epoch = 0;
      this.state = "idle";
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
    }
    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.64);
      return Number.isFinite(value) ? Math.min(1.8, Math.max(0.24, value)) : 0.64;
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
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:13px;border:0;border-radius:10px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:18px;height:18px;overflow:hidden;pointer-events:none}
            .solid{transform-box:view-box!important;transform-origin:9px 9px!important}
            .slash{transform-box:view-box!important;transform-origin:0px .676937px!important}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <clipPath id="pin-bounds"><rect width="18" height="18"/></clipPath>
                <clipPath id="solid-clip"><rect width="18.5947" height="18.5947" transform="translate(-3.95312 8.64844) rotate(-45)"/></clipPath>
                <clipPath id="off-clip"><rect width="18.5947" height="18.5947" transform="translate(-3.95312 8.37891) rotate(-43.8309)"/></clipPath>
              </defs>
              <g clip-path="url(#pin-bounds)">

                <g class="solid" style="opacity:0"><g clip-path="url(#solid-clip)"><path d="M9.11603 1.30102C9.28274 1.31737 9.44485 1.3651 9.59382 1.4417L13.9717 3.69103C14.1635 3.7896 14.3284 3.93339 14.4521 4.10997C14.5759 4.28654 14.6548 4.4906 14.6821 4.7045C14.7093 4.9184 14.6841 5.13573 14.6085 5.33769C14.5329 5.53965 14.4094 5.72018 14.2484 5.86369L13.114 6.69503L11.6218 9.60705L12.3556 12.1532C12.4159 12.4005 12.4039 12.66 12.3209 12.9007C12.238 13.1414 12.0876 13.3531 11.8878 13.5108C11.6879 13.6685 11.4469 13.7654 11.1935 13.79C10.9401 13.8145 10.685 13.7658 10.4586 13.6495L7.6325 12.1976L6.31322 14.7908C6.14673 15.1181 5.74631 15.2481 5.4193 15.0812C5.09292 14.9146 4.96315 14.5151 5.12931 14.1885L6.45085 11.5908L3.52745 10.0893C3.30133 9.97311 3.1133 9.79449 2.98569 9.57462C2.85807 9.35476 2.79623 9.10289 2.80752 8.84893C2.8188 8.59496 2.90273 8.34957 3.04934 8.14189C3.19595 7.93421 3.39908 7.77296 3.63461 7.6773L6.19626 6.75463L7.66188 3.89442L7.66451 2.49357C7.68149 2.31995 7.73251 2.15137 7.81466 1.99747C7.8968 1.84357 8.00845 1.70736 8.14325 1.59662C8.27804 1.48588 8.43332 1.40278 8.60023 1.35206C8.76715 1.30134 8.94242 1.284 9.11603 1.30102Z" fill="white"/></g></g>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.solid = this.shadowRoot.querySelector(".solid");

        this.button.addEventListener("click", () => this.toggle());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      this.apply(this.reducedMotion.matches || !this.active);
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换图钉显示状态");
    }
    stop() {
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const on = this.active;
      const d = this.duration;
      const b = this.bounce;
      this.controls = [
        animate(this.solid, { opacity: on ? 0.6 : 0 }, { duration: instant ? 0 : d * (on ? 0.25 : 0.3), ease: "easeOut" }),
        animate(this.solid, {
          y: on && !instant ? [-8, 1.2 * b, -0.4 * b, 0] : on ? 0 : -2,
          rotate: on && !instant ? [-12, 5 * b, -2 * b, 0] : 0,
          scale: on && !instant ? [0.78, 1 + 0.12 * b, 1 - 0.05 * b, 1] : 1,
        }, on && !instant
          ? { duration: d, times: [0, 0.62, 0.82, 1], ease: [[0.22, 1, 0.36, 1], "easeInOut", "easeOut"] }
          : { duration: instant ? 0 : d * 0.3, ease: "easeOut" }),
      ];
      const epoch = this.epoch;
      this.state = instant ? "finished" : "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
        if (this.epoch === epoch) this.state = "finished";
      });
    }
    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    pause() { this.controls.forEach(control => control.pause()); this.state = "paused"; }
    play() {
      if (this.state !== "paused") return;
      this.controls.forEach(control => control.play());
      this.state = "running";
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, PinMotion);
}

export const pinRevealDemoMarkup = `
  <div class="selection-demo pin-reveal-demo">
    <p class="selection-demo-hint">实心图钉落下出现，点击重播</p>
    <div class="selection-demo-zoom">
      <sipplay-pin-reveal data-motion active duration="0.64" bounce="0.28" label="切换图钉显示状态（放大预览）"></sipplay-pin-reveal>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-pin-reveal active label="切换图钉显示状态（原始尺寸）"></sipplay-pin-reveal>
      <span>原始尺寸 · 18 × 18</span>
    </div>
    <output class="selection-demo-state" data-selection-status data-active-text="已出现" data-inactive-text="已隐藏" aria-live="polite">已出现</output>
    <button type="button" class="pin-replay" data-demo-action="pin-replay">重播出现</button>
  </div>`;
export const pinRevealDemoCSS = `
  .selection-demo-zoom sipplay-pin-reveal{transform:scale(4)}
  .pin-reveal-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-pin-reveal{transform:scale(3)}
  .pin-replay{margin-top:18px;padding:8px 18px;min-height:36px;border:1px solid #35313f;border-radius:8px;background:#161922;color:#d4d4d8;font-size:13px}
  .compact .pin-replay{display:none}
`;
