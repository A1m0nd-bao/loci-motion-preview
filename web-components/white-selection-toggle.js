// Self-contained so the same implementation can be embedded in exported HTML.
export function defineWhiteSelectionToggle(animate) {
  const tag = "sipplay-white-selection-toggle";
  if (customElements.get(tag)) return;

  /**
   * @summary 白色勾选切换
   * 动效：白色勾选切换 / sipplay-white-selection-toggle
   * 位置：Web 设置 → Help & Feedback → Submit Feedback：反馈类型列表每行右侧的圆形勾选。节点 730:82029 是 Suggestion 行的已选状态，用于多选。
   * Figma：Submit Feedback / Suggestion 多选勾选 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-82029
   * 选择规则：多选；每项独立切换，重复点击可取消，不影响其他项
   * 适配：原稿选区为 20×20，白色圆底与镂空勾；保持原稿尺寸及列表间距。复用勾选动效视图接入现有 checkbox，避免把示例 44px 内部按钮嵌入已有控件或新增焦点入口。
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：每个选项独立切换：选中时白色圆底弹出，镂空勾从左侧短笔连续画到右上长笔，取消时沿原路径收回。再次点击已选项可以取消；不改变其他项。初次挂载直接显示已有选中集合。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：沿用项目现有的反馈类型多选数组或集合；active = 已选集合是否包含本项 ID。选中只添加本项，取消只移除本项，不清空其他项、不使用单一 selectedId，也不根据选中动画自动提交反馈。保留原有 checkbox 语义、Space 键操作与焦点管理。提交时读取真实集合；数量限制、必选规则等沿用既有业务，不额外猜测。
   * 参数：duration=0.32（时长（秒））；bounce=0.15（回弹程度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/white-selection-toggle.js；初始化 defineWhiteSelectionToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-white-selection-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-white-selection-toggle
   * @attribute {boolean} active - 沿用项目现有的反馈类型多选数组或集合；active = 已选集合是否包含本项 ID。选中只添加本项，取消只移除本项，不清空其他项、不使用单一 selectedId，也不根据选中动画自动提交反馈。保留原有 checkbox 语义、Space 键操作与焦点管理。提交时读取真实集合；数量限制、必选规则等沿用既有业务，不额外猜测。 默认 false。
   * @attribute {number} duration - 时长（秒）；范围 0.12–1.5，步长 0.02。
   * @attribute {number} bounce - 回弹程度；范围 0–0.5，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。沿用项目现有的反馈类型多选数组或集合；active = 已选集合是否包含本项 ID。选中只添加本项，取消只移除本项，不清空其他项、不使用单一 selectedId，也不根据选中动画自动提交反馈。保留原有 checkbox 语义、Space 键操作与焦点管理。提交时读取真实集合；数量限制、必选规则等沿用既有业务，不额外猜测。
   */
  class WhiteSelectionToggle extends HTMLElement {
    static observedAttributes = ["active", "duration", "bounce", "label"];

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.controls = [];
      this.state = "idle";
      this.epoch = 0;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
    }

    get active() { return this.hasAttribute("active"); }
    set active(value) { this.toggleAttribute("active", Boolean(value)); }
    get duration() { return Math.min(1.5, Math.max(0.12, Number(this.getAttribute("duration")) || 0.32)); }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.15);
      return Number.isFinite(value) ? Math.min(0.5, Math.max(0, value)) : 0.15;
    }
    get playState() { return this.state; }

    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:44px;height:44px;vertical-align:middle}
            button{display:grid;place-items:center;width:44px;height:44px;margin:0;padding:12px;border:0;border-radius:10px;background:transparent;color:white;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid white;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:20px;height:20px;overflow:visible;pointer-events:none}
            .fill{transform-box:view-box!important;transform-origin:10px 10px!important;opacity:0;transform:scale(.4)}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle class="outline" cx="10" cy="10" r="9.5" stroke="white"/>
              <defs>
                <!-- Reveal the supplied cutout, keeping the check transparent on any background. -->
                <path class="check" visibility="hidden" d="M5.922 10.134L8.116 12.676Q8.745 13.405 9.374 12.676L13.922 7.408"/>
                <mask id="circle-cutout" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20" style="mask-type:luminance">
                  <rect width="20" height="20" fill="white"/>
                  <path d="M14.5273 6.70508C14.1402 6.37103 13.5547 6.41457 13.2207 6.80176L8.74512 11.9893L6.62305 9.52832C6.28902 9.14137 5.70451 9.09878 5.31738 9.43262C4.93024 9.76662 4.8868 10.3511 5.2207 10.7383L7.41309 13.2803C8.11475 14.0935 9.37532 14.0933 10.0771 13.2803L14.623 8.01074C14.9569 7.6236 14.9143 7.03911 14.5273 6.70508Z" class="cutout" fill="black" opacity="0"/>
                </mask>
              </defs>
              <g class="fill">
                <path d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0Z" fill="white" mask="url(#circle-cutout)"/>
              </g>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.outline = this.shadowRoot.querySelector(".outline");
        this.fill = this.shadowRoot.querySelector(".fill");
        this.check = this.shadowRoot.querySelector(".check");
        this.cutout = this.shadowRoot.querySelector(".cutout");
        this.checkLength = this.check.getTotalLength();
        this.cutoutShape = this.cutout.getAttribute("d");
        const steps = Math.ceil(this.checkLength / 0.12);
        this.checkSamples = Array.from({ length: steps + 1 }, (_, i) => {
          const distance = this.checkLength * i / steps;
          const point = this.check.getPointAtLength(distance);
          return { distance, command: `${i ? "L" : "M"}${point.x} ${point.y}` };
        });
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
      this.button.setAttribute("aria-label", this.getAttribute("label") || "选择项目");
    }

    stop() {
      this.epoch++;
      // Motion.stop commits the current pose before a new direction starts.
      this.controls.forEach((control) => control.stop());
      this.controls = [];
    }

    setCheckProgress(value) {
      const progress = this.checkProgress = Math.min(1, Math.max(0, value));
      this.cutout.setAttribute("opacity", progress > 0 ? "1" : "0");
      if (progress >= 1) {
        this.cutout.setAttribute("d", this.cutoutShape);
        this.cutout.setAttribute("fill", "black");
        this.cutout.setAttribute("stroke", "none");
        return;
      }
      // Draw the mask geometry itself: CSS clipping inside a mask can skip intermediate frames.
      const distance = this.checkLength * progress;
      let path = this.checkSamples[0].command;
      for (let i = 1; i < this.checkSamples.length; i++) {
        const sample = this.checkSamples[i];
        if (sample.distance >= distance) break;
        path += sample.command;
      }
      const tip = this.check.getPointAtLength(distance);
      this.cutout.setAttribute("d", `${path}L${tip.x} ${tip.y}`);
      this.cutout.setAttribute("fill", "none");
      this.cutout.setAttribute("stroke", "black");
      this.cutout.setAttribute("stroke-width", "1.85");
      this.cutout.setAttribute("stroke-linecap", "round");
      this.cutout.setAttribute("stroke-linejoin", "round");
    }

    apply(instant = false) {
      this.stop();
      const from = this.checkProgress ?? 0;
      const epoch = this.epoch;
      this.updateAccessibility();
      const on = this.active;
      const duration = instant ? 0 : this.duration;
      const spring = { type: "spring", duration, bounce: instant ? 0 : this.bounce };
      // Finish the white fill before revealing the check.
      const fillScale = on && !instant ? [null, 1 + this.bounce * 0.35, 1] : on ? 1 : 0.4;
      const fillTiming = instant ? { duration: 0 } : on
        ? {
            duration: duration * 0.6,
            scale: { times: [0, 0.65, 1], ease: ["easeOut", "easeInOut"] },
            opacity: { duration: duration * 0.28, ease: "easeOut" },
          }
        : { ...spring, delay: duration * 0.2 };
      this.controls = [
        animate(this.fill, { opacity: on ? 1 : 0, scale: fillScale }, fillTiming),
        animate(this.outline, { opacity: on ? 0 : 1 }, { duration: duration * 0.65, delay: !on && !instant ? duration * 0.18 : 0 }),
      ];
      if (instant) {
        this.setCheckProgress(on ? 1 : 0);
      } else {
        this.controls.push(animate(from, on ? 1 : 0, {
          duration: duration * (on ? 0.85 : 0.6),
          delay: on && from === 0 ? duration * 0.65 : 0,
          ease: on ? [0.4, 0, 0.2, 1] : [0.4, 0, 1, 1],
          onUpdate: value => { if (this.epoch === epoch) this.setCheckProgress(value); },
        }));
      }
      this.state = instant ? "finished" : "running";
      Promise.all(this.controls.map((control) => Promise.resolve(control))).then(() => {
        if (this.epoch === epoch) this.state = "finished";
      });
    }

    toggle() {
      this.active = !this.active;
      this.dispatchEvent(new CustomEvent("motion-change", { detail: { active: this.active }, bubbles: true, composed: true }));
    }

    pause() {
      this.pausedControls = this.controls.filter(control => control.duration > 0 && control.state !== "finished");
      this.pausedControls.forEach(control => control.pause());
      if (this.pausedControls.length) this.state = "paused";
    }
    play() {
      if (this.state !== "paused") return;
      this.pausedControls.forEach((control) => control.play());
      this.state = "running";
    }
    finish() { this.apply(true); }
    cancel() { this.removeAttribute("active"); this.apply(true); }
  }
  customElements.define(tag, WhiteSelectionToggle);
}

export const whiteSelectionDemoMarkup = `
  <div class="selection-demo">
    <p class="selection-demo-hint">点击圆形，切换选中状态</p>
    <div class="selection-demo-zoom">
      <sipplay-white-selection-toggle data-motion duration="0.32" bounce="0.15" label="切换选中状态（放大预览）"></sipplay-white-selection-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-white-selection-toggle label="切换选中状态（原始尺寸）"></sipplay-white-selection-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const whiteSelectionDemoCSS = `
  .selection-demo-zoom sipplay-white-selection-toggle{transform:scale(4)}
  .compact .selection-demo-zoom sipplay-white-selection-toggle{transform:scale(3)}
  .selection-demo:has(sipplay-white-selection-toggle) .selection-demo-state{color:#fff}
`;
