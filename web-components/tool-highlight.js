export function defineToolHighlight(animate) {
  if (customElements.get("sipplay-brackets-tool") && customElements.get("sipplay-image-tool")) return;
  const circle = "M0 13C0 5.8203 5.8203 0 13 0V0C20.1797 0 26 5.8203 26 13V13C26 20.1797 20.1797 26 13 26V26C5.8203 26 0 20.1797 0 13V13Z";
  const edge = "M0 13M26 13M26 13M0 13M13 0M26 13M13 26M0 13M13 26V25.5409C6.07388 25.5409 0.459143 19.9261 0.459143 13H0H-0.459143C-0.459143 20.4333 5.56672 26.4591 13 26.4591V26ZM26 13H25.5409C25.5409 19.9261 19.9261 25.5409 13 25.5409V26V26.4591C20.4333 26.4591 26.4591 20.4333 26.4591 13H26ZM13 0V0.459143C19.9261 0.459143 25.5409 6.07388 25.5409 13H26H26.4591C26.4591 5.56672 20.4333 -0.459143 13 -0.459143V0ZM13 0V-0.459143C5.56672 -0.459143 -0.459143 5.56672 -0.459143 13H0H0.459143C0.459143 6.07388 6.07388 0.459143 13 0.459143V0Z";
  const glyphs = {
    brackets: `<path d="M9.21464 19.6827C8.80975 19.1633 8.47642 18.605 8.21467 18.0079C7.95292 17.4108 7.75865 16.7748 7.63186 16.1C7.50507 15.4211 7.44168 14.6992 7.44168 13.9344C7.44168 13.1655 7.50303 12.4436 7.62573 11.7688C7.75251 11.0899 7.94678 10.4519 8.20853 9.85474C8.47438 9.25762 8.80975 8.7014 9.21464 8.18607H10.3864C10.1615 8.47236 9.95287 8.83023 9.76064 9.25967C9.56842 9.6891 9.40073 10.1635 9.25759 10.6829C9.11444 11.1983 9.00401 11.734 8.92631 12.2903C8.8486 12.8465 8.80975 13.3945 8.80975 13.9344C8.80975 14.4743 8.8486 15.0223 8.92631 15.5785C9.00401 16.1347 9.11444 16.6726 9.25759 17.192C9.40073 17.7073 9.56842 18.1797 9.76064 18.6091C9.95287 19.0386 10.1615 19.3964 10.3864 19.6827H9.21464ZM16.2451 19.6827H15.0734C15.2942 19.3964 15.5008 19.0386 15.693 18.6091C15.8893 18.1797 16.057 17.7073 16.1961 17.192C16.3392 16.6726 16.4496 16.1347 16.5273 15.5785C16.6091 15.0223 16.65 14.4743 16.65 13.9344C16.65 13.3945 16.6091 12.8465 16.5273 12.2903C16.4496 11.734 16.3392 11.1983 16.1961 10.6829C16.057 10.1635 15.8893 9.6891 15.693 9.25967C15.5008 8.83023 15.2942 8.47236 15.0734 8.18607H16.2451C16.65 8.7014 16.9834 9.25762 17.2451 9.85474C17.5069 10.4519 17.6991 11.0899 17.8218 11.7688C17.9486 12.4436 18.012 13.1655 18.012 13.9344C18.012 14.6992 17.9486 15.4211 17.8218 16.1C17.695 16.7748 17.5007 17.4108 17.239 18.0079C16.9813 18.605 16.65 19.1633 16.2451 19.6827Z" fill="white"/>`,
    image: `<path d="M8.88704 19.4478L15.1744 13.5303L18.1332 16.4891M8.88704 19.4478H16.2839C17.5095 19.4478 18.503 18.4543 18.503 17.2287V13.5303M8.88704 19.4478C7.66148 19.4478 6.66797 18.4543 6.66797 17.2287V9.83185C6.66797 8.60629 7.66148 7.61278 8.88704 7.61278H13.695M17.7633 11.1843L17.7633 9.09216M17.7633 9.09216L17.7633 7M17.7633 9.09216L15.6712 9.09216M17.7633 9.09216L19.8555 9.09216M11.1061 10.9414C11.1061 11.5542 10.6094 12.0509 9.99657 12.0509C9.38379 12.0509 8.88704 11.5542 8.88704 10.9414C8.88704 10.3286 9.38379 9.83185 9.99657 9.83185C10.6094 9.83185 11.1061 10.3286 11.1061 10.9414Z" stroke="white" stroke-width="1.04112" stroke-linecap="round" stroke-linejoin="round"/>`,
  };
  /**
   * @summary 括号工具单击高亮 / 添加图片单击高亮
   * 动效：括号工具单击高亮 / sipplay-brackets-tool
   * 位置：Web 聊天页：底部 Your message 输入框右侧，与图片工具并排的 26×26 圆形 ( ) 按钮。
   * Figma：聊天输入框 / ( ) 工具 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67212
   * 适配：原稿括号是 SF Pro 文本，组件为 SVG 字形；保持原稿视觉与字号，不要求逐路径一致。
   * 注释同步：位置已核对；本次 Figma 调用额度用尽，新增注释目前仅在网站和源码
   * 触发：悬停提亮、点击短亮后自动恢复；不保留选中。
   * 状态：无持久状态；默认 静止，接入时以业务状态覆盖
   * 事件：tool-activate → { icon: 'brackets' }
   * 业务接入：监听 tool-activate 执行项目原有括号工具操作；设计稿未说明具体编辑语义，不把它猜成代码编辑器或新路由。没有 active 状态。
   * 参数：duration=0.18（提亮时长（秒））
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/tool-highlight.js；初始化 defineToolHighlight(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-brackets-tool
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   *
   * 动效：添加图片单击高亮 / sipplay-image-tool
   * 位置：Web 聊天页：底部 Your message 输入框右侧，26×26 圆形添加图片工具。内图形与源码路径一致。
   * Figma：聊天输入框 / 添加图片 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67209
   * 适配：保留原稿尺寸、背景和原业务点击区；示例内部按钮不得直接嵌套
   * 注释同步：位置已核对；本次 Figma 调用额度用尽，新增注释目前仅在网站和源码
   * 触发：悬停提亮、点击短亮后自动恢复；不保留选中。
   * 状态：无持久状态；默认 静止，接入时以业务状态覆盖
   * 事件：tool-activate → { icon: 'image' }
   * 业务接入：监听 tool-activate 打开现有图片选择器；组件不上传文件，没有 active 状态。
   * 参数：duration=0.18（提亮时长（秒））
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/tool-highlight.js；初始化 defineToolHighlight(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-image-tool
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @attribute {string} icon - 基础工具图形；具体别名固定为 brackets 或 image。
   * @attribute {number} duration - 提亮时长（秒）；范围 0.08–0.5，步长 0.02。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} tool-activate - detail: { icon: 'image' }。监听 tool-activate 打开现有图片选择器；组件不上传文件，没有 active 状态。
   */
  class ToolHighlight extends HTMLElement {
    static observedAttributes = ["icon", "duration", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.pausedControls = [];
      this.hovered = this.focused = this.previewed = this.touching = false;
      this.flashing = false;
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) { this.hovered = this.previewed = this.touching = false; this.finish(); } };
    }
    get icon() { return this.getAttribute("icon") === "image" ? "image" : "brackets"; }
    get highlighted() { return this.hovered || this.focused || this.previewed || this.touching; }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.18);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0.08, value)) : 0.18;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:9px;border:0;border-radius:50%;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:1px}
            svg{display:block;width:26px;height:26px;overflow:hidden;pointer-events:none}
          </style>
          <button type="button"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <mask id="tool-edge" fill="white"><path d="${circle}"/></mask>
            <path d="${circle}" fill="black" fill-opacity="0.1"/>
            <path class="wash" d="${circle}" fill="white" opacity="0"/>
            <path class="edge" d="${edge}" fill="white" fill-opacity="0.4" mask="url(#tool-edge)"/>
            <g class="glyph" opacity="0.5" transform="${this.icon === "brackets" ? "translate(0.27316 -0.934385)" : ""}">${glyphs[this.icon]}</g>
          </svg></button>`;
        this.button = this.shadowRoot.querySelector("button");
        for (const name of ["glyph", "edge", "wash"]) this[name] = this.shadowRoot.querySelector(`.${name}`);
        this.button.addEventListener("pointerenter", event => { if (event.pointerType === "mouse" || event.pointerType === "pen") this.hoverIn(); });
        this.button.addEventListener("pointerleave", () => { this.hovered = this.touching = false; this.apply(this.reducedMotion.matches); });
        this.button.addEventListener("pointerdown", event => { if (event.pointerType === "touch") { this.touching = true; this.apply(this.reducedMotion.matches); } });
        const release = () => { if (this.touching) { this.touching = false; this.apply(this.reducedMotion.matches); } };
        this.button.addEventListener("pointerup", release);
        this.button.addEventListener("pointercancel", release);
        this.button.addEventListener("focus", () => { this.focused = this.button.matches(":focus-visible"); if (this.focused) this.apply(this.reducedMotion.matches); });
        this.button.addEventListener("blur", () => { this.focused = false; this.apply(this.reducedMotion.matches); });
        this.button.addEventListener("click", () => this.trigger());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.apply(true);
    }
    disconnectedCallback() {
      this.stop();
      this.flashing = false;
      this.hovered = this.focused = this.previewed = this.touching = false;
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === "icon") {
        this.glyph.innerHTML = glyphs[this.icon];
        this.glyph.setAttribute("transform", this.icon === "brackets" ? "translate(0.27316 -0.934385)" : "");
      }
      this.updateAccessibility();
      if (name !== "label") this.apply(true);
    }
    updateAccessibility() {
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.icon === "image" ? "添加图片" : "括号工具"));
    }
    stop() { this.epoch++; this.controls.forEach(control => control.stop()); this.controls = []; this.pausedControls = []; }
    apply(instant = false) {
      if (this.flashing && !instant) return;
      if (instant) this.flashing = false;
      this.stop();
      this.updateAccessibility();
      const on = this.highlighted, d = instant ? 0 : this.duration * (on ? 1 : 1.22);
      const timing = { duration: d, ease: [0.22, 1, 0.36, 1] };
      this.controls = [animate(this.glyph, { opacity: on ? 1 : 0.5 }, timing), animate(this.edge, { fillOpacity: on ? 0.75 : 0.4 }, timing), animate(this.wash, { opacity: on ? 0.055 : 0 }, timing)];
      const epoch = this.epoch;
      this.state = instant ? "finished" : "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => { if (epoch === this.epoch) this.state = "finished"; });
    }
    trigger(emit = true) {
      this.stop();
      this.flashing = true;
      const timing = { duration: this.reducedMotion.matches ? 0.12 : Math.max(0.14, this.duration * 1.25), times: [0, 0.45, 1], ease: ["easeOut", "linear"] };
      this.controls = [
        animate(this.glyph, { opacity: [null, 1, 1] }, timing),
        animate(this.edge, { fillOpacity: [null, 1, 1] }, timing),
        animate(this.wash, { opacity: [null, 0.12, 0.12] }, timing),
        animate(0, 1, { duration: timing.duration, ease: "linear" }),
      ];
      const epoch = this.epoch;
      this.state = "running";
      Promise.all(this.controls.map(control => Promise.resolve(control))).then(() => {
        if (epoch !== this.epoch || !this.isConnected) return;
        this.flashing = false;
        this.apply(this.reducedMotion.matches);
      });
      if (emit) this.dispatchEvent(new CustomEvent("tool-activate", { detail: { icon: this.icon }, bubbles: true, composed: true }));
    }
    hoverIn() { if (!this.hovered) { this.hovered = true; this.apply(this.reducedMotion.matches); } }
    hoverOut() { if (this.hovered) { this.hovered = false; this.apply(this.reducedMotion.matches); } }
    preview(active) { this.previewed = active; this.apply(this.reducedMotion.matches); }
    pause() {
      if (this.state !== "running") return;
      this.pausedControls = this.controls.filter(control => control.duration > 0 && control.state !== "finished");
      this.pausedControls.forEach(control => control.pause()); this.state = "paused";
    }
    play() { if (this.state === "paused") { this.pausedControls.forEach(control => control.play()); this.state = "running"; } }
    finish() { this.apply(true); }
    cancel() { this.hovered = this.focused = this.previewed = this.touching = false; this.flashing = false; this.finish(); }
  }
  if (!customElements.get("sipplay-brackets-tool")) customElements.define("sipplay-brackets-tool", class extends ToolHighlight { get icon() { return "brackets"; } });
  if (!customElements.get("sipplay-image-tool")) customElements.define("sipplay-image-tool", class extends ToolHighlight { get icon() { return "image"; } });
}

const toolDemo = (tag, label) => `
  <div class="selection-demo tool-highlight-demo">
    <p class="selection-demo-hint">移入提亮 · 单击短亮后自动恢复</p>
    <div class="selection-demo-zoom"><${tag} data-motion duration="0.18" label="${label}（放大预览）"></${tag}></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><${tag} label="${label}（原始尺寸）"></${tag}><span>原始尺寸 · 26 × 26</span></div>
    <output class="selection-demo-state" data-tool-status aria-live="polite">待触发</output>
  </div>`;
export const bracketsToolDemoMarkup = toolDemo("sipplay-brackets-tool", "括号工具");
export const imageToolDemoMarkup = toolDemo("sipplay-image-tool", "添加图片");
export const toolHighlightDemoCSS = `
  .selection-demo-zoom :is(sipplay-brackets-tool,sipplay-image-tool){transform:scale(4)}
  .compact .selection-demo-zoom :is(sipplay-brackets-tool,sipplay-image-tool){transform:scale(3)}
  .tool-highlight-demo .selection-demo-state{color:#fff}
`;
