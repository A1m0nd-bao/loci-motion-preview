// Self-contained notification trigger shared by preview and downloaded HTML.
export function defineBellRingToggle(animate) {
  const tag = "sipplay-bell-ring-toggle";
  if (customElements.get(tag)) return;
  /**
   * @summary 铃铛通知反馈
   * 动效：铃铛通知反馈 / sipplay-bell-ring-toggle
   * 位置：Web 首页顶栏 RecoilRoot 中的 36×36 通知铃铛，带独立未读提示层。已核对 bell SVG；创建页同名 Notification 图层是皇冠，不适用。
   * Figma：Web 首页顶栏 / 通知铃铛 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-68771
   * 适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
   * 注释同步：位置已核对；本次 Figma 调用额度用尽，新增注释目前仅在网站和源码
   * 触发：鼠标移入轻摇一次，点击轻沉回位并立即发出通知请求。
   * 状态：expanded；默认 false，接入时以业务状态覆盖
   * 事件：notification-request → 无 detail
   * 业务接入：监听 notification-request 打开既有通知弹窗；expanded 同步真实弹窗开关，仅用于可访问状态。不要等待动画结束才打开弹窗。
   * 参数：duration=0.7（轻摇时长（秒））；click-duration=0.64（点击时长（秒））；strength=1（动效幅度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/bell-ring-toggle.js；初始化 defineBellRingToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-bell-ring-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-bell-ring-toggle
   * @attribute {boolean} expanded - 监听 notification-request 打开既有通知弹窗；expanded 同步真实弹窗开关，仅用于可访问状态。不要等待动画结束才打开弹窗。 默认 false。
   * @attribute {number} duration - 轻摇时长（秒）；范围 0.4–1.4，步长 0.05。
   * @attribute {number} click-duration - 点击时长（秒）；范围 0.55–1.6，步长 0.05。
   * @attribute {number} strength - 动效幅度；范围 0.4–1.4，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} notification-request - detail: 无 detail。监听 notification-request 打开既有通知弹窗；expanded 同步真实弹窗开关，仅用于可访问状态。不要等待动画结束才打开弹窗。
   * @fires {CustomEvent} motion-action - detail: { action }。动画动作通知；不是打开弹窗的业务请求。
   */
  class BellNotification extends HTMLElement {
    static observedAttributes = ["expanded", "duration", "click-duration", "strength", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.state = "idle";
      this.epoch = 0;
      this.lastAction = null;
      this.hovered = false;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) this.finish(); };
    }
    get expanded() { return this.hasAttribute("expanded"); }
    set expanded(value) { this.toggleAttribute("expanded", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.7);
      return Number.isFinite(value) ? Math.min(1.4, Math.max(0.4, value)) : 0.7;
    }
    get clickDuration() {
      const value = Number(this.getAttribute("click-duration") ?? 0.64);
      return Number.isFinite(value) ? Math.min(1.6, Math.max(0.55, value)) : 0.64;
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
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:4px;border:0;border-radius:50%;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:1px}
            svg{display:block;width:36px;height:36px;pointer-events:none;overflow:hidden}
            .glyph{transform-box:view-box!important;transform-origin:18px 18px!important}
            .bell{transform-box:view-box!important;transform-origin:17.9948px 10.5px!important}
            .clapper{transform-box:view-box!important;transform-origin:17.9948px 22.3182px!important}
          </style>
          <button type="button" aria-haspopup="dialog" aria-expanded="false">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <mask id="bell-edge" fill="white"><path d="M0 18C0 8.05887 8.05887 0 18 0V0C27.9411 0 36 8.05887 36 18V18C36 27.9411 27.9411 36 18 36V36C8.05887 36 0 27.9411 0 18V18Z"/></mask>
              <path d="M0 18C0 8.05887 8.05887 0 18 0V0C27.9411 0 36 8.05887 36 18V18C36 27.9411 27.9411 36 18 36V36C8.05887 36 0 27.9411 0 18V18Z" fill="white" fill-opacity="0.1"/>
              <path d="M0 18M36 18M36 18M0 18M18 0M36 18M18 36M0 18M18 36V35C8.61116 35 1 27.3888 1 18H0H-1C-1 28.4934 7.50659 37 18 37V36ZM36 18H35C35 27.3888 27.3888 35 18 35V36V37C28.4934 37 37 28.4934 37 18H36ZM18 0V1C27.3888 1 35 8.61116 35 18H36H37C37 7.50659 28.4934 -1 18 -1V0ZM18 0V-1C7.50659 -1 -1 7.50659 -1 18H0H1C1 8.61116 8.61116 1 18 1V0Z" fill="white" fill-opacity="0.4" mask="url(#bell-edge)"/>
              <g class="glyph"><g class="bell" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
                <path class="clapper" d="M15.7726 24.7424C16.3623 25.2135 17.1411 25.5 17.9948 25.5C18.8485 25.5 19.6273 25.2135 20.217 24.7424"/>
                <path d="M11.7512 22.3182C11.3998 22.3182 11.2036 21.7662 11.4161 21.4595C11.9093 20.7479 12.3853 19.7043 12.3853 18.4475L12.4056 16.6264C12.4056 13.2429 14.908 10.5 17.9948 10.5C21.1271 10.5 23.6663 13.2833 23.6663 16.7166L23.646 18.4475C23.646 19.7129 24.1056 20.7623 24.5787 21.4742C24.783 21.7816 24.5862 22.3182 24.2392 22.3182H11.7512Z"/>
              </g></g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.glyph = this.shadowRoot.querySelector(".glyph");
        this.bell = this.shadowRoot.querySelector(".bell");
        this.clapper = this.shadowRoot.querySelector(".clapper");
        this.button.addEventListener("pointerenter", event => {
          if (event.pointerType === "mouse" || event.pointerType === "pen") this.hoverIn();
        });
        this.button.addEventListener("pointerleave", () => this.hoverOut());
        this.button.addEventListener("pointercancel", () => this.hoverOut());
        this.button.addEventListener("click", () => {
          this.perform("activate");
          this.dispatchEvent(new CustomEvent("notification-request", { bubbles: true, composed: true }));
        });
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.updateAccessibility();
      this.finish();
    }
    disconnectedCallback() {
      this.stop();
      this.hovered = false;
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback() { if (this.button) this.updateAccessibility(); }
    updateAccessibility() {
      this.button.setAttribute("aria-expanded", String(this.expanded));
      this.button.setAttribute("aria-label", this.getAttribute("label") || "打开通知");
    }
    stop() {
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    rest() {
      this.controls = [
        animate(this.bell, { rotate: 0 }, { duration: 0 }),
        animate(this.clapper, { rotate: 0 }, { duration: 0 }),
        animate(this.glyph, { scale: 1, scaleX: 1, scaleY: 1, y: 0 }, { duration: 0 }),
      ];
    }
    hoverIn() {
      if (this.hovered) return;
      this.hovered = true;
      if (!this.expanded && !(this.lastAction === "activate" && this.state === "running")) this.perform("hover");
    }
    hoverOut() { this.hovered = false; }
    perform(action, emit = true) {
      if (!["hover", "activate"].includes(action)) return;
      this.stop();
      this.lastAction = action;
      const d = this.duration;
      const strength = this.strength;
      if (this.reducedMotion.matches) this.rest();
      else if (action === "hover") {
        this.controls = [
          animate(this.bell, { rotate: [null, -3 * strength, 12 * strength, -9 * strength, 4 * strength, -1.5 * strength, 0] }, {
            duration: d, times: [0, 0.1, 0.28, 0.5, 0.7, 0.86, 1], ease: "easeInOut",
          }),
          animate(this.clapper, { rotate: [null, -7 * strength, 8 * strength, -4 * strength, 1.5 * strength, 0] }, {
            duration: d, times: [0, 0.32, 0.55, 0.75, 0.9, 1], ease: "easeInOut",
          }),
          animate(this.glyph, { scale: 1, scaleX: 1, scaleY: 1, y: 0 }, { duration: d * 0.2, ease: "easeOut" }),
        ];
      } else {
        // A small press and a soft return keep the original outline intact.
        const clickDuration = this.clickDuration;
        this.controls = [
          animate(this.bell, { rotate: 0 }, { duration: 0.18, ease: "easeOut" }),
          animate(this.clapper, { rotate: 0 }, { duration: 0.22, ease: "easeOut" }),
          animate(this.glyph, {
            scale: 1, scaleX: 1, scaleY: 1,
            y: [null, 1 * strength, -0.12 * strength, 0],
          }, {
            duration: clickDuration, times: [0, 0.25, 0.72, 1],
            ease: [[0.3, 0, 0.6, 1], [0.2, 0.75, 0.25, 1], "easeInOut"],
          }),
        ];
      }
      const epoch = this.epoch;
      this.state = this.reducedMotion.matches ? "finished" : "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
        if (this.epoch === epoch) this.state = "finished";
      });
      if (emit) this.dispatchEvent(new CustomEvent("motion-action", { detail: { action }, bubbles: true, composed: true }));
    }
    pause() { this.controls.forEach(control => control.pause()); this.state = "paused"; }
    play() {
      if (this.state !== "paused") return;
      this.controls.forEach(control => control.play());
      this.state = "running";
    }
    finish() { this.stop(); this.rest(); this.state = "finished"; }
    cancel() { this.finish(); }
  }
  customElements.define(tag, BellNotification);
}

export const bellRingDemoMarkup = `
  <div class="selection-demo bell-ring-demo">
    <p class="selection-demo-hint">移入轻摇一次 · 点击轻按、柔和回位</p>
    <div class="selection-demo-zoom">
      <sipplay-bell-ring-toggle data-motion duration="0.7" click-duration="0.64" strength="1" label="打开通知（放大预览）"></sipplay-bell-ring-toggle>
    </div>
    <p class="selection-demo-caption">3× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-bell-ring-toggle label="打开通知（原始尺寸）"></sipplay-bell-ring-toggle>
      <span>原始尺寸 · 36 × 36</span>
    </div>
    <output class="selection-demo-state" data-bell-status aria-live="polite">移入试试</output>

  </div>`;
export const bellRingDemoCSS = `
  .selection-demo-zoom sipplay-bell-ring-toggle{transform:scale(3)}
  .bell-ring-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-bell-ring-toggle{transform:scale(2.3)}
`;
