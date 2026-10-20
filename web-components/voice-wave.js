// Self-contained so the platform and exported HTML share the same voice rhythm.
export function defineVoiceWave(animate) {
  const tag = "sipplay-voice-wave";
  if (customElements.get(tag)) return;
  const rest = [2, 5, 10, 8, 6];
  // Uneven syllables, accents and breaths, rather than five identical oscillators.
  const speech = [
    rest, [4, 8, 13, 6, 3], [8, 14, 10, 5, 7], [3, 7, 15, 11, 5],
    [2, 4, 8, 13, 8], [5, 10, 14, 7, 3], [3, 7, 5, 10, 6], [2, 3, 4, 3, 2],
    [2, 2, 3, 2, 2], [3, 6, 10, 5, 3], [7, 12, 8, 14, 6], [4, 8, 15, 9, 4],
    [6, 14, 11, 6, 9], [3, 6, 8, 12, 5], [2, 4, 6, 4, 3], [2, 2, 3, 2, 2],
    [2, 3, 4, 3, 2], [4, 7, 11, 5, 3], [9, 13, 8, 12, 5], [5, 8, 14, 7, 10],
    [3, 6, 9, 15, 7], [7, 12, 14, 8, 4], [4, 8, 11, 6, 3], [2, 4, 5, 3, 2],
    [2, 2, 2, 2, 2], [2, 2, 3, 2, 2], [3, 6, 9, 5, 3], [6, 11, 14, 7, 4],
    [4, 8, 10, 13, 6], [3, 5, 12, 7, 4], [2, 4, 7, 5, 3], rest,
  ];
  /**
   * @summary 灵动语音条
   * 动效：灵动语音条 / sipplay-voice-wave
   * 位置：Web 聊天页：角色消息气泡左上方的五条声纹播放入口，可见于 Frame 3549；与消息气泡连接。
   * Figma：角色聊天消息 / 语音入口 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-67162
   * 适配：此稿外框约 59×33，底色随消息主题；示例固定 58×28、深色。保留原稿位置、形状、底色和五条声纹节奏，不能整块覆盖为示例黑底。
   * 注释同步：位置已核对；本次 Figma 调用额度用尽，新增注释目前仅在网站和源码
   * 触发：active=true 循环声纹；false 时平滑收稳。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：只提供视觉，不含音频播放器。以真实音频 playing / pause / ended / error 事件驱动 active；点击事件应交给业务音频控制，不以动画启动作为播放成功。
   * 参数：duration=4.8（节奏周期（秒））；strength=1（声纹幅度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/voice-wave.js；初始化 defineVoiceWave(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-voice-wave
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-voice-wave
   * @attribute {boolean} active - 只提供视觉，不含音频播放器。以真实音频 playing / pause / ended / error 事件驱动 active；点击事件应交给业务音频控制，不以动画启动作为播放成功。 默认 false。
   * @attribute {number} duration - 节奏周期（秒）；范围 2.4–8，步长 0.2。
   * @attribute {number} strength - 声纹幅度；范围 0.35–1.4，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。只提供视觉，不含音频播放器。以真实音频 playing / pause / ended / error 事件驱动 active；点击事件应交给业务音频控制，不以动画启动作为播放成功。
   */
  class VoiceWave extends HTMLElement {
    static observedAttributes = ["active", "duration", "strength", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.heights = [...rest];
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => this.apply(this.reducedMotion.matches);
      this.onVisibility = () => {
        if (document.hidden) {
          const wasRunning = this.active && this.state === "running";
          this.pause();
          this.resumeAfterVisibility = wasRunning;
        } else if (this.resumeAfterVisibility) {
          this.resumeAfterVisibility = false;
          if (this.active) this.play();
        }
      };
    }
    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 4.8);
      return Number.isFinite(value) ? Math.min(8, Math.max(2.4, value)) : 4.8;
    }
    get strength() {
      const value = Number(this.getAttribute("strength") ?? 1);
      return Number.isFinite(value) ? Math.min(1.4, Math.max(0.35, value)) : 1;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:74px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:74px;height:44px;margin:0;padding:8px;border:0;border-radius:16px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:-4px}
            svg{display:block;width:58px;height:28px;pointer-events:none;overflow:hidden}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="58" height="28" viewBox="0 0 58 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M0 16C0 7.16344 7.16344 0 16 0H44C51.732 0 58 6.26801 58 14V14C58 21.732 51.732 28 44 28H0V16Z" fill="#18181B"/>
              <g stroke="white" stroke-width="2" stroke-linecap="round">
                <line x1="17" y1="13" x2="17" y2="15"/>
                <line x1="23" y1="11.5" x2="23" y2="16.5"/>
                <line x1="29" y1="9" x2="29" y2="19"/>
                <line x1="35" y1="10" x2="35" y2="18"/>
                <line x1="41" y1="11" x2="41" y2="17"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.bars = [...this.shadowRoot.querySelectorAll("line")];
        this.button.addEventListener("click", () => this.toggle());
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.apply(this.reducedMotion.matches || !this.active);
    }
    disconnectedCallback() {
      this.stop();
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback(name) {
      if (!this.button) return;
      if (name === "label") this.updateAccessibility();
      else this.apply(this.reducedMotion.matches || (name !== "active" && !this.active));
    }
    updateAccessibility() {
      this.button.setAttribute("aria-pressed", String(this.active));
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.active ? "取消选中并停止声纹" : "选中并播放声纹"));
    }
    draw(heights) {
      this.heights = heights;
      // Animate endpoints to keep 2px strokes and round caps constant in size.
      this.bars.forEach((bar, index) => {
        bar.setAttribute("y1", (14 - heights[index] / 2).toFixed(3));
        bar.setAttribute("y2", (14 + heights[index] / 2).toFixed(3));
      });
    }
    stop() {
      this.resumeAfterVisibility = false;
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    apply(instant = false) {
      this.stop();
      this.updateAccessibility();
      const initial = [...this.heights];
      if (instant) {
        this.draw(rest);
        this.state = "finished";
        return;
      }
      this.state = "running";
      if (!this.active) {
        const epoch = this.epoch;
        this.controls = [animate(0, 1, { duration: 0.26, ease: [0.22, 1, 0.36, 1], onUpdate: progress => {
          this.draw(initial.map((height, index) => height + (rest[index] - height) * progress));
        }, onComplete: () => { if (epoch === this.epoch) this.state = "finished"; } })];
        return;
      }
      let firstPass = true;
      let previousPhase = 0;
      const duration = this.duration;
      const strength = this.strength;
      this.controls = [animate(0, 1, { duration, repeat: Infinity, ease: "linear", onUpdate: phase => {
        if (phase < previousPhase) firstPass = false;
        previousPhase = phase;
        const position = phase * (speech.length - 1);
        const index = Math.min(speech.length - 2, Math.floor(position));
        const fraction = position - index;
        const blend = firstPass ? Math.min(1, phase * duration / 0.14) : 1;
        const heights = speech[index].map((height, bar) => {
          const next = speech[index + 1][bar];
          const ease = next > height ? 1 - (1 - fraction) ** 2 : fraction * fraction * (3 - 2 * fraction);
          const target = Math.min(20, 2 + (height + (next - height) * ease - 2) * strength);
          return initial[bar] + (target - initial[bar]) * blend;
        });
        this.draw(heights);
      } })];
      if (document.hidden) this.onVisibility();
    }
    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    pause() {
      this.resumeAfterVisibility = false;
      this.controls.forEach(control => control.pause());
      this.state = "paused";
    }
    play() {
      this.resumeAfterVisibility = false;
      if (this.state === "paused" && this.controls.length) {
        this.controls.forEach(control => control.play());
        this.state = "running";
      } else if (this.active && this.state !== "running") this.apply(this.reducedMotion.matches);
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, VoiceWave);
}

export const voiceWaveDemoMarkup = `
  <div class="selection-demo voice-wave-demo">
    <p class="selection-demo-hint">点击选中后声纹跳动，取消选中柔和收稳</p>
    <div class="selection-demo-zoom">
      <sipplay-voice-wave data-motion duration="4.8" strength="1" label="切换语音条选中状态（放大预览）"></sipplay-voice-wave>
    </div>
    <p class="selection-demo-caption">3× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-voice-wave label="切换语音条选中状态（原始尺寸）"></sipplay-voice-wave>
      <span>原始尺寸 · 58 × 28</span>
    </div>
    <output class="selection-demo-state" data-selection-status data-active-text="已选中 · 声纹播放中" data-inactive-text="未选中" aria-live="polite">未选中</output>
  </div>`;
export const voiceWaveDemoCSS = `
  .voice-wave-demo .selection-demo-zoom{width:240px;height:160px}
  .selection-demo-zoom sipplay-voice-wave{transform:scale(3)}
  .voice-wave-demo .selection-demo-state{color:#d4d4d8}
  .compact .voice-wave-demo .selection-demo-zoom{width:160px;height:110px}
  .compact .selection-demo-zoom sipplay-voice-wave{transform:scale(2)}
`;
