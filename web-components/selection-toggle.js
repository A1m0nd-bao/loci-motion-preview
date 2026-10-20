// Self-contained so the same implementation can be embedded in exported HTML.
export function defineSelectionToggle(animate) {
  const tag = "sipplay-selection-toggle";
  if (customElements.get(tag)) return;

  /**
   * @summary 粉色勾选切换
   * 动效：粉色勾选切换 / sipplay-selection-toggle
   * 位置：设计师指定的粉色圆形勾选节点 730:102857，用于单选。对应节点由设计师确认；所在页面名称及实际业务字段尚未读取，接入时沿用项目已有字段。
   * Figma：设计师指定 / 粉色勾选 https://www.figma.com/design/KZyY9qkYbf0yiwqcovRKy3/Untitled?node-id=730-102857
   * 核对依据：设计师指定节点并确认单选；接入时沿用项目实际字段
   * 选择规则：单选；父级唯一值驱动，重复点击当前项不取消（设计师已确认）
   * 适配：组件 SVG 为 20×20、粉色 #ED78F4；节点实际尺寸与颜色尚未复核，按原稿核对。现成组件内部是独立 toggle 按钮，不能原样当作 radio 使用；应提取动效视图接入原有单选控件，避免按钮嵌套或新增焦点入口。
   * 注释同步：此对应关系目前仅保存在网站和源码，尚未写回 Figma 画布
   * 触发：单选组切换到新选项时，新项弹出粉色圆底并画勾，旧项恢复空心圆。再次点击当前项保持选中，不反向取消；初次挂载直接显示当前选项。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-change → { active: boolean }
   * 业务接入：由单选组唯一的 selectedId / value（名称沿用项目）统一驱动：active = 当前组值等于本项 ID。点击只请求选择本项；当前项不能被再次点击取消。不要让每枚组件独立 toggle()，不要新增多选数组。复用动效视图，并保留现有 radio / radiogroup 语义、方向键与焦点管理；选中不代表提交成功。
   * 参数：duration=0.32（时长（秒））；bounce=0.15（回弹程度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/selection-toggle.js；初始化 defineSelectionToggle(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-selection-toggle
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-selection-toggle
   * @attribute {boolean} active - 由单选组唯一的 selectedId / value（名称沿用项目）统一驱动：active = 当前组值等于本项 ID。点击只请求选择本项；当前项不能被再次点击取消。不要让每枚组件独立 toggle()，不要新增多选数组。复用动效视图，并保留现有 radio / radiogroup 语义、方向键与焦点管理；选中不代表提交成功。 默认 false。
   * @attribute {number} duration - 时长（秒）；范围 0.12–1.5，步长 0.02。
   * @attribute {number} bounce - 回弹程度；范围 0–0.5，步长 0.05。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} motion-change - detail: { active: boolean }。由单选组唯一的 selectedId / value（名称沿用项目）统一驱动：active = 当前组值等于本项 ID。点击只请求选择本项；当前项不能被再次点击取消。不要让每枚组件独立 toggle()，不要新增多选数组。复用动效视图，并保留现有 radio / radiogroup 语义、方向键与焦点管理；选中不代表提交成功。
   */
  class SelectionToggle extends HTMLElement {
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
            button:focus-visible{outline:1px solid #ED78F4;outline-offset:-8px;border-radius:50%}
            svg{display:block;width:20px;height:20px;overflow:visible;pointer-events:none}
            .fill{transform-origin:10px 10px;opacity:0;transform:scale(.4)}
            .check{stroke-dasharray:1 2;stroke-dashoffset:1;opacity:0}
          </style>
          <button type="button" aria-pressed="false">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle class="outline" cx="10" cy="10" r="9.5" stroke="white"/>
              <circle class="fill" cx="10" cy="10" r="10" fill="#ED78F4"/>
              <path class="check" pathLength="1" d="M6 10.0833L7.91074 11.9941C8.23618 12.3195 8.76382 12.3195 9.08926 11.9941L13.0833 8" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>`;
        this.button = this.shadowRoot.querySelector("button");
        this.outline = this.shadowRoot.querySelector(".outline");
        this.fill = this.shadowRoot.querySelector(".fill");
        this.check = this.shadowRoot.querySelector(".check");
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
      this.checkProgress = Math.min(1, Math.max(0, value));
      this.check.style.strokeDashoffset = String(1 - this.checkProgress);
      this.check.style.opacity = this.checkProgress > 0.001 ? "1" : "0";
    }

    apply(instant = false) {
      const from = this.checkProgress ?? 0;
      this.stop();
      this.setCheckProgress(from);
      this.updateAccessibility();
      const on = this.active;
      const duration = instant ? 0 : this.duration;
      const spring = { type: "spring", duration, bounce: instant ? 0 : this.bounce };
      // Finish the purple fill before revealing the check.
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
          duration: duration * (on ? 0.85 : 0.7),
          delay: on && from === 0 ? duration * 0.85 : 0,
          ease: on ? [0.4, 0, 0.2, 1] : "easeIn",
          onUpdate: value => this.setCheckProgress(value),
        }));
      }
      const epoch = this.epoch;
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
  customElements.define(tag, SelectionToggle);
}

export const selectionDemoMarkup = `
  <div class="selection-demo">
    <p class="selection-demo-hint">点击圆形，切换选中状态</p>
    <div class="selection-demo-zoom">
      <sipplay-selection-toggle data-motion duration="0.32" bounce="0.15" label="切换选中状态（放大预览）"></sipplay-selection-toggle>
    </div>
    <p class="selection-demo-caption">4× 细节预览</p>
    <div class="selection-demo-original">
      <sipplay-selection-toggle label="切换选中状态（原始尺寸）"></sipplay-selection-toggle>
      <span>原始尺寸 · 20 × 20</span>
    </div>
    <output class="selection-demo-state" data-selection-status aria-live="polite">未选中</output>
  </div>`;

export const selectionDemoCSS = `
  #demo:has(.selection-demo){padding:24px;gap:0}
  .selection-demo{display:flex;flex-direction:column;align-items:center;gap:0;width:100%;color:#fff}
  .selection-demo-hint{margin:0 0 18px;font-size:14px;color:#aaa5b5}
  .selection-demo-zoom{display:grid;place-items:center;width:176px;height:176px}
  .selection-demo-zoom sipplay-selection-toggle{transform:scale(4)}
  .selection-demo-caption{margin:10px 0 24px;font-size:12px;color:#aaa5b5}
  .selection-demo-original{display:flex;align-items:center;gap:12px;font-size:13px;color:#d5cfdf}
  .selection-demo-state{margin-top:16px;font-size:13px;color:#ed78f4}
  .compact .selection-demo-hint,.compact .selection-demo-caption,.compact .selection-demo-original,.compact .selection-demo-state{display:none}
  .compact .selection-demo-zoom{width:100px;height:120px}
  .compact .selection-demo-zoom sipplay-selection-toggle{transform:scale(3)}
`;
