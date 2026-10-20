// Self-contained: preview and downloadable HTML use exactly the same component.
export function definePinToggle(animate) {
  const tag = "sipplay-pin-toggle";
  if (customElements.get(tag)) return;
  /**
   * @summary 图钉选中切换
   * 动效：图钉选中切换 / sipplay-pin-toggle
   * 位置：Web 聊天页 Frame 4675：取消置顶状态的斜杠图钉，18×18；与同屏消息角落的实心图钉区分。
   * Figma：Web 聊天 / 图钉状态按钮 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67903
   * 适配：原稿图钉含旋转和布尔裁切，保留该位置的尺寸及原有点击区。页面未说明接口时，不自行添加请求。
   * 注释同步：位置已核对；本次 Figma 调用额度用尽，新增注释目前仅在网站和源码
   * 触发：选中时收起斜杠、实心图钉落下回弹；取消时恢复未置顶图形。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：active 绑定是否已置顶；监听 motion-change 连接业务。请求时机与失败回滚由业务层决定。
   * 参数：duration=0.52（时长（秒））；bounce=0.28（回弹程度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/pin-toggle.js；初始化 definePinToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-pin-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-pin-toggle
   * @attribute {boolean} active - active 绑定是否已置顶；监听 motion-change 连接业务。请求时机与失败回滚由业务层决定。 默认 false。
   * @attribute {number} duration - 时长（秒）；范围 0.24–1.8，步长 0.04。
   * @attribute {number} bounce - 回弹程度；范围 0–0.5，步长 0.02。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。active 绑定是否已置顶；监听 motion-change 连接业务。请求时机与失败回滚由业务层决定。
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
      const value = Number(this.getAttribute("duration") ?? 0.52);
      return Number.isFinite(value) ? Math.min(1.8, Math.max(0.24, value)) : 0.52;
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
                <g class="off-body" style="opacity:.4"><path d="M6.02179 8.25835L4.3975 8.79632L7.25762 10.3825L8.56216 12.6248L7.78911 12.1959L6.06683 15.3288L4.9039 14.6865L6.62766 11.552L3.75359 9.95777C3.53131 9.83442 3.34918 9.64911 3.22867 9.42527C3.1082 9.20146 3.05422 8.94749 3.07362 8.69405C3.09311 8.44079 3.18483 8.19843 3.33788 7.9957C3.49106 7.79282 3.69957 7.63818 3.93805 7.55011L5.34388 7.09376L6.02179 8.25835ZM9.62027 1.35284C9.78637 1.37451 9.94721 1.42756 10.0936 1.50889L14.397 3.89695C14.5855 4.00157 14.7459 4.1502 14.864 4.33054C14.982 4.51095 15.054 4.71774 15.0744 4.93236C15.0948 5.147 15.0629 5.36346 14.981 5.56287C14.899 5.76231 14.7693 5.93921 14.6038 6.07748L13.4435 6.87143L11.8588 9.73397L12.5108 12.3033C12.5625 12.5496 12.5428 12.8053 12.4547 13.041L10.4933 9.67056L10.457 9.52405L12.4021 6.011L13.7525 5.0572L9.44879 2.67008L9.36875 4.32034L8.39912 6.07211L7.62076 4.73344L8.08381 3.89805L8.13183 2.49766C8.15439 2.32478 8.21098 2.15796 8.29796 2.00686C8.38491 1.85587 8.50031 1.72311 8.63838 1.61683C8.77665 1.51046 8.93521 1.4319 9.10366 1.38655C9.27193 1.3413 9.44749 1.33032 9.62027 1.35284Z" fill="white"/></g>
                <g clip-path="url(#off-clip)"><g transform="matrix(-0.493704 -0.86963 -0.86963 0.493704 13.125 16.3125)"><rect class="slash" style="opacity:.4" width="17.1074" height="1.35387" rx="0.676937" fill="white"/></g></g>
                <g class="solid" style="opacity:0"><g clip-path="url(#solid-clip)"><path d="M9.11603 1.30102C9.28274 1.31737 9.44485 1.3651 9.59382 1.4417L13.9717 3.69103C14.1635 3.7896 14.3284 3.93339 14.4521 4.10997C14.5759 4.28654 14.6548 4.4906 14.6821 4.7045C14.7093 4.9184 14.6841 5.13573 14.6085 5.33769C14.5329 5.53965 14.4094 5.72018 14.2484 5.86369L13.114 6.69503L11.6218 9.60705L12.3556 12.1532C12.4159 12.4005 12.4039 12.66 12.3209 12.9007C12.238 13.1414 12.0876 13.3531 11.8878 13.5108C11.6879 13.6685 11.4469 13.7654 11.1935 13.79C10.9401 13.8145 10.685 13.7658 10.4586 13.6495L7.6325 12.1976L6.31322 14.7908C6.14673 15.1181 5.74631 15.2481 5.4193 15.0812C5.09292 14.9146 4.96315 14.5151 5.12931 14.1885L6.45085 11.5908L3.52745 10.0893C3.30133 9.97311 3.1133 9.79449 2.98569 9.57462C2.85807 9.35476 2.79623 9.10289 2.80752 8.84893C2.8188 8.59496 2.90273 8.34957 3.04934 8.14189C3.19595 7.93421 3.39908 7.77296 3.63461 7.6773L6.19626 6.75463L7.66188 3.89442L7.66451 2.49357C7.68149 2.31995 7.73251 2.15137 7.81466 1.99747C7.8968 1.84357 8.00845 1.70736 8.14325 1.59662C8.27804 1.48588 8.43332 1.40278 8.60023 1.35206C8.76715 1.30134 8.94242 1.284 9.11603 1.30102Z" fill="white"/></g></g>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.solid = this.shadowRoot.querySelector(".solid");
        this.offBody = this.shadowRoot.querySelector(".off-body");
        this.slash = this.shadowRoot.querySelector(".slash");
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "切换图钉选中状态");
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
      const slashTransform = getComputedStyle(this.slash).transform;
      const slashScale = slashTransform === "none" ? 1 : new DOMMatrix(slashTransform).a;
      this.controls = [
        animate(this.offBody, { opacity: on ? 0 : 0.4 }, { duration: instant ? 0 : d * 0.3, delay: !instant && !on ? d * 0.1 : 0, ease: "easeOut" }),
        // Keep the line visible through its anticipation and elastic settling.
        animate(this.slash, { opacity: on ? 0 : 0.4 }, {
          duration: instant ? 0 : d * 0.14,
          delay: instant ? 0 : d * (on ? 0.16 : 0.18), ease: "easeOut",
        }),
        animate(this.slash, { scaleX: instant ? (on ? 0 : 1) : on
          ? [null, slashScale * (1 + 0.1 * b), 0]
          : [null, 1 + 0.24 * b, 1 - 0.08 * b, 1] }, instant ? { duration: 0 } : on
          ? { duration: d * 0.3, times: [0, 0.22, 1], ease: ["easeOut", [0.55, 0, 0.85, 0.25]] }
          : { duration: d * 0.8, delay: d * 0.18, times: [0, 0.64, 0.83, 1], ease: [[0.18, 0.9, 0.22, 1], "easeInOut", "easeOut"] }),
        animate(this.solid, { opacity: on ? 0.6 : 0 }, { duration: instant ? 0 : d * 0.34, delay: !instant && on ? d * 0.14 : 0, ease: "easeOut" }),
        animate(this.solid, { y: on && !instant ? [-1.8, 0.9 * b, 0] : 0, scale: on && !instant ? [0.9, 1 + 0.08 * b, 1] : 1 }, on && !instant
          ? { duration: d * 0.78, delay: d * 0.22, times: [0, 0.7, 1], ease: [[0.22, 1, 0.36, 1], "easeInOut"] }
          : { duration: instant ? 0 : d * 0.18, ease: "easeOut" }),
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

export const pinToggleDemoMarkup = `
  <div class="selection-demo pin-toggle-demo">
    <p class="selection-demo-hint">点击图钉，切换选中与取消选中</p>
    <div class="selection-demo-zoom">
      <sipplay-pin-toggle data-motion  duration="0.52" bounce="0.28" label="切换图钉选中状态（放大预览）"></sipplay-pin-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-pin-toggle  label="切换图钉选中状态（原始尺寸）"></sipplay-pin-toggle>
      <span>原始尺寸 · 18 × 18</span>
    </div>
    <output class="selection-demo-state" data-selection-status  aria-live="polite">未选中</output>

  </div>`;
export const pinToggleDemoCSS = `
  .selection-demo-zoom sipplay-pin-toggle{transform:scale(4)}
  .pin-toggle-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-pin-toggle{transform:scale(3)}
  .pin-replay{margin-top:18px;padding:8px 18px;min-height:36px;border:1px solid #35313f;border-radius:8px;background:#161922;color:#d4d4d8;font-size:13px}
  .compact .pin-replay{display:none}
`;
