// Preview and portable HTML share this self-contained Motion definition.
export function defineHistoryClock(animate) {
  const tag = "sipplay-history-clock";
  if (customElements.get(tag)) return;
  /**
   * @summary 历史时钟描绘旋转
   * 动效：历史时钟描绘旋转 / sipplay-history-clock
   * 位置：Web 聊天页：消息操作浮层中的 Backtrack（回溯）入口，20×20。不是通用历史记录列表入口。
   * Figma：聊天消息 / Backtrack https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67269
   * 适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：悬停或点击重播一次；外部可 replay()。
   * 状态：无持久状态；默认 静止，接入时以业务状态覆盖
   * 事件：motion-replay → 无 detail
   * 业务接入：没有 active 状态。保留既有 Backtrack 点击与回溯流程；hover/click 播放动画，motion-replay 仅表示动画开始，不触发或确认回溯。
   * 参数：duration=0.8（总时长（秒））；bounce=0.4（填白回弹）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/history-clock.js；初始化 defineHistoryClock(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-history-clock
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-history-clock
   * @attribute {number} duration - 总时长（秒）；范围 0.3–1.6，步长 0.05。
   * @attribute {number} bounce - 填白回弹；范围 0–0.5，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-replay - detail: 无 detail。没有 active 状态。保留既有 Backtrack 点击与回溯流程；hover/click 播放动画，motion-replay 仅表示动画开始，不触发或确认回溯。
   * @fires {CustomEvent} motion-finish - detail: 无 detail。本次动画自然播放完成时发出；finish() 不发出。
   */
  class HistoryClock extends HTMLElement {
    static observedAttributes = ["duration", "bounce", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.epoch = 0;
      this.state = "idle";
      this.hovered = false;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) this.finish(); };
    }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.8);
      return Number.isFinite(value) ? Math.min(1.6, Math.max(0.3, value)) : 0.8;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.4);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0, value)) : 0.4;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:12px;border:0;border-radius:10px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:20px;height:20px;pointer-events:none;overflow:visible}
            .clock{transform-box:view-box!important;transform-origin:8.75194px 10px!important}
          </style>
          <button type="button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <g class="clock" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16.2539 10C16.2539 14.1421 12.8952 17.5 8.75194 17.5C4.60874 17.5 1.25 14.1421 1.25 10C1.25 5.85786 4.60874 2.5 8.75194 2.5C11.5287 2.5 13.9531 4.00824 15.2503 6.25" pathLength="1"/>
                <path d="M14.1959 10.823L16.0714 8.94805L17.9469 10.823" pathLength="1"/>
                <path d="M11.5625 12.0451L8.75 11.1076V7.1875" pathLength="1"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.clock = this.shadowRoot.querySelector(".clock");
        this.strokes = [...this.shadowRoot.querySelectorAll("path")];
        this.button.addEventListener("pointerenter", event => {
          if (event.pointerType === "mouse" || event.pointerType === "pen") this.hoverIn();
        });
        this.button.addEventListener("pointerleave", () => this.hoverOut());
        this.button.addEventListener("pointercancel", () => this.hoverOut());
        this.button.addEventListener("click", () => this.replay());
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "重播历史时钟动效");
    }
    stop() {
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    rest() {
      this.controls = [animate(this.clock, { rotate: 0 }, { duration: 0 })];
      for (const stroke of this.strokes) {
        stroke.style.strokeDasharray = "1 1";
        this.controls.push(animate(stroke, { strokeDashoffset: 0, opacity: 1 }, { duration: 0 }));
      }
    }
    hoverIn() {
      if (this.hovered) return;
      this.hovered = true;
      this.replay();
    }
    hoverOut() { this.hovered = false; }
    replay(emit = true) {
      this.stop();
      if (this.reducedMotion.matches) {
        this.rest();
        this.state = "finished";
      } else {
        const d = this.duration;
        const transform = getComputedStyle(this.clock).transform;
        const matrix = transform === "none" ? new DOMMatrix() : new DOMMatrix(transform);
        const angle = (Math.atan2(matrix.b, matrix.a) * 180 / Math.PI - 360) % 360;
        this.controls = [animate(this.clock, { rotate: [angle, -360 - 12 * this.bounce, -360] }, {
          duration: d, times: [0, 0.86, 1],
          ease: [[0.3, 0.05, 0.2, 1], "easeOut"],
        })];
        for (let index = 0; index < this.strokes.length; index++) {
          const stroke = this.strokes[index];
          const from = Number.parseFloat(getComputedStyle(stroke).strokeDashoffset) || 0;
          const opacity = Number(getComputedStyle(stroke).opacity);
          stroke.style.strokeDasharray = "1 1";
          const lead = d * (0.2 + 0.08 * index);
          // Negative offsets reveal from the path's end: the ring draws counterclockwise.
          this.controls.push(animate([
            [stroke, { strokeDashoffset: [from, -1] }, { duration: d * 0.2, ease: "easeIn", at: 0 }],
            [stroke, { opacity: [opacity, 0] }, { duration: d * 0.06, ease: "easeIn", at: d * 0.14 }],
            [stroke, { opacity: [0, 1] }, { duration: d * 0.04, ease: "easeOut", at: lead }],
            [stroke, { strokeDashoffset: [-1, 0] }, { type: "spring", bounce: 0, duration: d * 0.64, at: lead }],
          ]));
        }
        this.state = "running";
        const epoch = this.epoch;
        Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
          if (this.epoch !== epoch) return;
          this.state = "finished";
          this.dispatchEvent(new CustomEvent("motion-finish", { bubbles: true, composed: true }));
        });
      }
      if (emit) this.dispatchEvent(new CustomEvent("motion-replay", { bubbles: true, composed: true }));
    }
    pause() { this.controls.forEach(control => control.pause()); this.state = "paused"; }
    play() {
      if (this.state === "paused") {
        this.controls.forEach(control => control.play());
        this.state = "running";
      } else if (this.state !== "running") this.replay();
    }
    finish() { this.stop(); this.rest(); this.state = "finished"; }
    cancel() { this.finish(); }
  }
  customElements.define(tag, HistoryClock);
}

export const historyClockDemoMarkup = `
  <div class="selection-demo history-clock-demo">
    <p class="selection-demo-hint">悬停或点击 · 逆时针绘制与旋转 · 以圆环中心为轴</p>
    <div class="selection-demo-zoom">
      <sipplay-history-clock data-motion duration="0.8" bounce="0.4" label="重播历史时钟动效（放大预览）"></sipplay-history-clock>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-history-clock label="重播历史时钟动效（原始尺寸）"></sipplay-history-clock>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-history-status aria-live="polite">悬停或点击试试</output>
  </div>`;
export const historyClockDemoCSS = `
  .selection-demo-zoom sipplay-history-clock{transform:scale(4)}
  .history-clock-demo .selection-demo-state{color:#d4d4d8}
  .compact .selection-demo-zoom sipplay-history-clock{transform:scale(3)}
`;
