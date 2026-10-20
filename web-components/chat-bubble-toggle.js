// Self-contained so preview and downloadable HTML share one implementation.
export function defineChatBubbleToggle(animate) {
  const tag = "sipplay-chat-bubble-toggle";
  if (customElements.get(tag)) return;
  /**
   * @summary 对话气泡唤醒
   * 动效：对话气泡唤醒 / sipplay-chat-bubble-toggle
   * 位置：建议用于聊天导航图标；本次设计选区未确认位置。
   * Figma：待绑定；仅凭图标相似不得批量替换
   * 触发：选中时气泡填充并绘出波形，取消时反向收笔。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：在底栏中由父级导航驱动；独立使用时 active 绑定当前路由是否为聊天页，不表示语音播放。
   * 参数：duration=0.64（时长（秒））；bounce=0.22（绘制弹性）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/chat-bubble-toggle.js；初始化 defineChatBubbleToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-chat-bubble-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-chat-bubble-toggle
   * @attribute {boolean} active - 在底栏中由父级导航驱动；独立使用时 active 绑定当前路由是否为聊天页，不表示语音播放。 默认 false。
   * @attribute {number} duration - 时长（秒）；范围 0.24–1.6，步长 0.04。
   * @attribute {number} bounce - 绘制弹性；范围 0–0.45，步长 0.01。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。在底栏中由父级导航驱动；独立使用时 active 绑定当前路由是否为聊天页，不表示语音播放。
   */
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
              <defs>
                <path class="wave-guide" d="M7 13.1338L7.212405 12.6968C8.176025 10.71817 10.96825 10.643125 12.0371 12.5669C13.0914 14.4641 15.83355 14.42385 16.83155 12.4966L17 12.1709"/>
                <mask id="wave-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style="mask-type:luminance">
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
        this.waveGuide = this.shadowRoot.querySelector(".wave-guide");
        this.waveLength = this.waveGuide.getTotalLength();
        const steps = Math.ceil(this.waveLength * 4);
        this.wavePoints = Array.from({ length: steps + 1 }, (_, index) => this.wavePoint(this.waveLength * index / steps));
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
    wavePoint(at) {
      const point = this.waveGuide.getPointAtLength(at);
      const before = this.waveGuide.getPointAtLength(Math.max(0, at - 0.01));
      const after = this.waveGuide.getPointAtLength(Math.min(this.waveLength, at + 0.01));
      return { at, x: point.x, y: point.y, angle: Math.atan2(after.y - before.y, after.x - before.x) };
    }
    renderWave(value) {
      const clamped = Math.min(1, Math.max(0, value));
      // Keep spring-driven drawing monotonic, including at the rounded tip.
      const progress = this.active ? Math.max(this.waveProgress, clamped) : Math.min(this.waveProgress, clamped);
      this.waveProgress = progress;
      this.wave.setAttribute("opacity", "1");
      if (progress >= 1) { this.wave.style.clipPath = "none"; return; }
      if (progress <= 0) { this.wave.style.clipPath = "polygon(0px 0px,0px 0px,0px 0px)"; return; }
      // Clip the exact cutout along its centreline; a single mask avoids stale
      // rendering from nested SVG masks. Guide samples are cached on connection.
      const distance = progress * this.waveLength;
      const tip = this.wavePoint(distance);
      const left = [], right = [], radius = 1.12;
      const add = point => {
        const dx = -Math.sin(point.angle) * radius, dy = Math.cos(point.angle) * radius;
        left.push(`${point.x + dx}px ${point.y + dy}px`);
        right.push(`${point.x - dx}px ${point.y - dy}px`);
      };
      for (const point of this.wavePoints) { if (point.at >= distance) break; add(point); }
      add(tip);
      for (let i = 1; i < 12; i++) {
        const a = tip.angle + Math.PI / 2 - Math.PI * i / 12;
        left.push(`${tip.x + Math.cos(a) * radius}px ${tip.y + Math.sin(a) * radius}px`);
      }
      left.push(...right.reverse());
      const start = this.wavePoints[0];
      for (let i = 1; i < 12; i++) {
        const a = start.angle - Math.PI / 2 - Math.PI * i / 12;
        left.push(`${start.x + Math.cos(a) * radius}px ${start.y + Math.sin(a) * radius}px`);
      }
      this.wave.style.clipPath = `polygon(${left.join(",")}) view-box`;
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
