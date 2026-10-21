export function defineLiquidRiseToggle(animate) {
  const tag = "sipplay-liquid-rise-toggle";
  if (customElements.get(tag)) return;
  const referenceLiquid = "M13.3177 26.1261L10.1738 24.3738V30.4578C10.1738 32.1377 11.5356 33.4995 13.2155 33.4995H28.9786C30.6584 33.4995 32.0202 32.1377 32.0202 30.4578V27.1115L28.1093 24.8702C26.4005 23.8908 24.3232 23.7994 22.5349 24.6249L18.829 26.3356C17.0639 27.1504 15.0158 27.0725 13.3177 26.1261Z";
  /**
   * @summary 彩色液面升起流动
   * 动效：彩色液面升起流动 / sipplay-liquid-rise-toggle
   * 位置：创建页 Character Setup → Appearance：尚未设置角色图片时，Upload / Generate 两个入口上方的加号、杯子与渐变液面图标。位于“创建生成图片链路更新”的首次图片设置页面。
   * Figma：创建页 Appearance / 图片设置引导图形 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-98165
   * 适配：Figma 选区为 40.04×40，整体透明度 80%；组件 SVG 为 41×40。保留原稿位置、尺寸、透明度及杯子/加号/渐变；不得把示例 44px 内部按钮直接替换进去。
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：位置与图形已确认；何时开始注入、何时回落尚待设计确认。确认前保持设计稿静态外观，不因进入页面、悬停、点击 Upload / Generate 或请求进行中而自动播放。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：此处是图片设置区域的引导图形，不是已确认的开关或进度指示器。组件 active 仅控制液面升起/回落；不能绑定生成百分比。保留原有 Upload / Generate 业务按钮，图形使用被动视图，不新增点击切换、按钮或 Tab 焦点。触发策略确认后再绑定对应业务事件。
   * 参数：duration=0.78（升起时长（秒））；flow-duration=3.2（流动周期（秒））；strength=1（起伏幅度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/liquid-rise-toggle.js；初始化 defineLiquidRiseToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-liquid-rise-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-liquid-rise-toggle
   * @attribute {boolean} active - 此处是图片设置区域的引导图形，不是已确认的开关或进度指示器。组件 active 仅控制液面升起/回落；不能绑定生成百分比。保留原有 Upload / Generate 业务按钮，图形使用被动视图，不新增点击切换、按钮或 Tab 焦点。触发策略确认后再绑定对应业务事件。 默认 false。
   * @attribute {number} duration - 升起时长（秒）；范围 0.3–1.6，步长 0.02。
   * @attribute {number} flow-duration - 流动周期（秒）；范围 1.6–6，步长 0.2。
   * @attribute {number} strength - 起伏幅度；范围 0.4–1.5，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。此处是图片设置区域的引导图形，不是已确认的开关或进度指示器。组件 active 仅控制液面升起/回落；不能绑定生成百分比。保留原有 Upload / Generate 业务按钮，图形使用被动视图，不新增点击切换、按钮或 Tab 焦点。触发策略确认后再绑定对应业务事件。
   */
  class LiquidRiseToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "flow-duration", "strength", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.pausedControls = [];
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => this.apply(this.reducedMotion.matches);
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
      const value = Number(this.getAttribute("duration") ?? 0.78);
      return Number.isFinite(value) ? Math.min(1.6, Math.max(0.3, value)) : 0.78;
    }
    get flowDuration() {
      const value = Number(this.getAttribute("flow-duration") ?? 3.2);
      return Number.isFinite(value) ? Math.min(6, Math.max(1.6, value)) : 3.2;
    }
    get strength() {
      const value = Number(this.getAttribute("strength") ?? 1);
      return Number.isFinite(value) ? Math.min(1.5, Math.max(0.4, value)) : 1;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:48px;height:48px;vertical-align:middle}
            button{display:grid;place-items:center;width:48px;height:48px;margin:0;padding:4px 3.5px;border:0;border-radius:9px;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #d4d4d8;outline-offset:2px}
            svg{display:block;width:41px;height:40px;pointer-events:none;overflow:hidden}
            .liquid,.wave{transform-box:view-box!important;transform-origin:0 0!important}
            .liquid{transform:translateY(12px)}
            .straw{transform:translate(-1px,6px);transform-box:view-box!important;transform-origin:24.3271px 26.5517px!important}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="liquid-gradient" x1="32.0202" y1="28.4043" x2="10.1738" y2="28.4043" gradientUnits="userSpaceOnUse"><stop stop-color="#FFDAA2"/><stop offset="1" stop-color="#ED78F4"/></linearGradient>
                <clipPath id="liquid-cup"><rect x="10.3271" y="11.5747" width="21.6926" height="21.9248" rx="3.04167"/></clipPath>
                <clipPath id="liquid-surface"><path class="wave" d="${referenceLiquid}"/></clipPath>
              </defs>
              <g opacity="0.8">
                <g class="straw"><path d="M24.3271 26.5517L30.997 12.8599C31.0603 12.73 31.176 12.6333 31.315 12.594L36.0196 11.2661" stroke="white" stroke-width="1.52083" stroke-linecap="round"/></g>
                <g clip-path="url(#liquid-cup)"><g class="liquid"><g clip-path="url(#liquid-surface)"><rect x="10.1738" y="11.5747" width="21.8464" height="21.9248" fill="url(#liquid-gradient)"/></g></g></g>
                <path d="M26.635 11.5747H13.3688C11.6889 11.5747 10.3271 12.9365 10.3271 14.6164V30.4579C10.3271 32.1378 11.6889 33.4995 13.3688 33.4995H28.978C30.6579 33.4995 32.0197 32.1377 32.0197 30.4579V20.6843" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <ellipse cx="16.6344" cy="17.7443" rx="2.46157" ry="2.4704" fill="white"/>
                <path d="M8.32715 6.00049C9.08067 6.00049 9.68828 6.61294 9.68848 7.36475V9.4585H11.7734C12.527 9.45853 13.1347 10.0708 13.1348 10.8228C13.1348 11.5747 12.5271 12.187 11.7734 12.187H9.68848V14.7144C9.68848 15.4663 9.08079 16.0796 8.32715 16.0796C7.57354 16.0795 6.96582 15.4663 6.96582 14.7144V12.187H4.88086C4.12731 12.1869 3.51953 11.5747 3.51953 10.8228C3.51956 10.0709 4.12733 9.45861 4.88086 9.4585H6.96582V7.36475C6.96602 6.61297 7.57366 6.00053 8.32715 6.00049Z" fill="white" stroke="#49383C"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.svg = this.shadowRoot.querySelector("svg");
        this.liquid = this.shadowRoot.querySelector(".liquid");
        this.wave = this.shadowRoot.querySelector(".wave");
        this.straw = this.shadowRoot.querySelector(".straw");
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || (this.active ? "收回彩色液体" : "注入彩色液体"));
    }
    stop() {
      this.resumeAfterVisibility = false;
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
      this.pausedControls = [];
    }
    wavePath() {
      const level = 25.7, amplitude = 4 * this.strength;
      let path = `M-32 ${level}`;
      for (let x = -32; x < 80; x += 16) path += `C${x + 8} ${level - amplitude} ${x + 8} ${level + amplitude} ${x + 16} ${level}`;
      return `${path}L80 46H-32Z`;
    }
    apply(instant = false) {
      const phase = ((new DOMMatrix(getComputedStyle(this.wave).transform).e % 16) + 16) % 16;
      this.stop();
      this.updateAccessibility();
      if (instant) {
        this.wave.setAttribute("d", referenceLiquid);
        this.controls = [animate(this.wave, { x: 0 }, { duration: 0 }), animate(this.liquid, { y: this.active ? 0 : 12 }, { duration: 0 }), animate(this.straw, { x: this.active ? 0 : -1, y: this.active ? 0 : 6, rotate: 0 }, { duration: 0 })];
        this.state = "finished";
        return;
      }
      this.wave.setAttribute("d", this.wavePath());
      animate(this.wave, { x: phase }, { duration: 0 });
      const epoch = this.epoch;
      this.state = "running";
      if (this.active) {
        this.controls = [
          animate(this.liquid, { y: [null, -0.55, 0] }, { duration: this.duration, times: [0, 0.75, 1], ease: [[0.2, 0.85, 0.25, 1], "easeInOut"] }),
          animate(this.wave, { x: [phase, phase - 16] }, { duration: this.flowDuration, repeat: Infinity, ease: "linear" }),
          animate(this.straw, { x: 0, y: 0 }, { duration: this.duration * 0.82, delay: this.duration * 0.12, ease: [0.2, 0.85, 0.25, 1] }),
          animate(this.straw, { rotate: [null, 5.5 * this.strength, -2.2 * this.strength, 0.75 * this.strength, 0] }, {
            duration: this.duration * 1.12, times: [0, 0.26, 0.58, 0.8, 1], ease: "easeInOut",
            onComplete: () => {
              if (epoch !== this.epoch || !this.active || !this.isConnected) return;
              const drift = animate(this.straw, { rotate: [0, 0.65 * this.strength, 0, -0.45 * this.strength, 0] }, { duration: this.flowDuration, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut", repeat: Infinity });
              this.controls.push(drift);
              if (this.state === "paused") { drift.pause(); this.pausedControls.push(drift); }
            },
          }),
        ];
      } else {
        const drainDuration = Math.min(0.4, this.duration * 0.55);
        this.controls = [
          animate(this.liquid, { y: 12 }, { duration: drainDuration, ease: [0.4, 0, 0.6, 1], onComplete: () => { if (epoch === this.epoch) this.state = "finished"; } }),
          animate(this.straw, { x: -1, y: 6, rotate: 0 }, { duration: drainDuration * 0.6, ease: [0.22, 1, 0.36, 1] }),
        ];
      }
      if (document.hidden) this.onVisibility();
    }
    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }
    pause() {
      this.resumeAfterVisibility = false;
      if (this.state !== "running") return;
      this.pausedControls = this.controls.filter(control => control.state !== "finished");
      this.pausedControls.forEach(control => control.pause());
      this.state = "paused";
    }
    play() {
      this.resumeAfterVisibility = false;
      if (this.state === "paused" && this.pausedControls.length) {
        this.pausedControls.forEach(control => control.play());
        this.state = "running";
      } else if (this.active && this.state !== "running") this.apply(this.reducedMotion.matches);
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, LiquidRiseToggle);
}

export const liquidRiseDemoMarkup = `
  <div class="selection-demo liquid-rise-demo">
    <p class="selection-demo-hint">点击注入液体 · 吸管随液面升起、轻摆</p>
    <div class="selection-demo-zoom"><sipplay-liquid-rise-toggle data-motion duration="0.78" flow-duration="3.2" strength="1" label="切换彩色液体（放大预览）"></sipplay-liquid-rise-toggle></div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original"><sipplay-liquid-rise-toggle label="切换彩色液体（原始尺寸）"></sipplay-liquid-rise-toggle><span>原始尺寸 · 41 × 40</span></div>
    <output class="selection-demo-state" data-selection-status data-active-text="已注入 · 液面流动中" data-inactive-text="空态" aria-live="polite">空态</output>
  </div>`;
export const liquidRiseDemoCSS = `
  .liquid-rise-demo .selection-demo-zoom{width:260px;height:210px}
  .selection-demo-zoom sipplay-liquid-rise-toggle{transform:scale(4)}
  .liquid-rise-demo .selection-demo-state{color:#deb7dc}
  .compact .liquid-rise-demo .selection-demo-zoom{width:180px;height:150px}
  .compact .selection-demo-zoom sipplay-liquid-rise-toggle{transform:scale(3)}
`;
