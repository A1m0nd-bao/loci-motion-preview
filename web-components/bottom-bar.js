export function defineBottomBar() {
  const tag = "sipplay-bottom-bar";
  if (customElements.get(tag)) return;
  /**
   * @summary 四页动效底栏
   * 动效：四页动效底栏 / sipplay-bottom-bar
   * 位置：建议用于首页/聊天/添加/用户四页底部导航整组；本次设计选区未确认位置。
   * Figma：待绑定；仅凭图标相似不得批量替换
   * 触发：互斥切换时播放相应图标；重复点击当前项只重播图标。
   * 状态：value；默认 home，接入时以业务状态覆盖
   * 事件：nav-change → { value, previous, index, label }
   * 业务接入：value 绑定当前路由，监听 nav-change 执行业务导航；组件不包含页面和路由器。外部设置 value 不发出 nav-change。
   * 参数：speed=1（播放速度）
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/bottom-bar.js；初始化 defineBottomBar(animate)
   * 依赖：sipplay-home-settle-toggle, sipplay-chat-bubble-toggle, sipplay-plus-selection-toggle, sipplay-user-page-toggle（先注册）
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-bottom-bar
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-bottom-bar
   * @attribute {string} value - value 绑定当前路由，监听 nav-change 执行业务导航；组件不包含页面和路由器。外部设置 value 不发出 nav-change。 默认 home。
   * @attribute {number} speed - 播放速度；范围 0.6–1.6，步长 0.1。
   * @attribute {string} label - 内部交互控件的可访问名称。
   * @fires {CustomEvent} nav-change - detail: { value, previous, index, label }。value 绑定当前路由，监听 nav-change 执行业务导航；组件不包含页面和路由器。外部设置 value 不发出 nav-change。
   */
  class BottomBar extends HTMLElement {
    static observedAttributes = ["value", "speed", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.items = [
        { value: "home", label: "首页", icon: "sipplay-home-settle-toggle", duration: 0.56 },
        { value: "chat", label: "聊天", icon: "sipplay-chat-bubble-toggle", duration: 0.64 },
        { value: "add", label: "添加", icon: "sipplay-plus-selection-toggle", duration: 0.46 },
        { value: "user", label: "用户", icon: "sipplay-user-page-toggle", duration: 0.64 },
      ];
      this.state = "idle";
      this.epoch = 0;
      this.pausedIcons = [];
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) this.finish(); };
    }
    get value() { return this.items.some(item => item.value === this.getAttribute("value")) ? this.getAttribute("value") : "home"; }
    set value(value) { if (this.items.some(item => item.value === value)) this.setAttribute("value", value); }
    get speed() {
      const value = Number(this.getAttribute("speed") ?? 1);
      return Number.isFinite(value) ? Math.min(1.6, Math.max(0.6, value)) : 1;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.nav) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:block;width:375px;max-width:100%;height:48px;vertical-align:middle}
            *{box-sizing:border-box}
            nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));width:100%;height:48px;padding:0 1.5px;background:rgba(22,10,12,.7);box-shadow:0 3px 5px rgba(0,0,0,.16)}
            button{display:grid;place-items:center;min-width:0;width:100%;height:48px;margin:0;padding:0;border:0;border-radius:0;background:transparent;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid rgba(255,255,255,.65);outline-offset:-3px}
            .icon{display:block;position:relative;width:24px;height:24px;pointer-events:none}
            .icon>*{position:absolute;left:-10px;top:-10px;pointer-events:none}
          </style>
          <nav aria-label="底部导航">
            ${this.items.map((item, index) => `<button type="button" data-value="${item.value}" aria-label="${item.label}" aria-pressed="${index === 0}" ${index === 0 ? 'aria-current="page"' : ""}><span class="icon" aria-hidden="true" inert><${item.icon}></${item.icon}></span></button>`).join("")}
          </nav>`;
        this.nav = this.shadowRoot.querySelector("nav");
        this.buttons = [...this.shadowRoot.querySelectorAll("button")];
        this.icons = this.buttons.map(button => button.querySelector(".icon").firstElementChild);
        this.buttons.forEach((button, index) => {
          button.addEventListener("click", () => this.select(this.items[index].value));
          button.addEventListener("keydown", event => {
            let next;
            if (event.key === "ArrowRight") next = (index + 1) % this.items.length;
            else if (event.key === "ArrowLeft") next = (index + this.items.length - 1) % this.items.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = this.items.length - 1;
            else return;
            event.preventDefault();
            this.buttons[next].focus();
            this.select(this.items[next].value);
          });
        });
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      this.apply(true);
    }
    disconnectedCallback() {
      this.epoch++;
      this.icons?.forEach(icon => icon.stop());
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
    }
    attributeChangedCallback(name) {
      if (!this.nav) return;
      if (name === "label") this.nav.setAttribute("aria-label", this.getAttribute("label") || "底部导航");
      else this.apply(name !== "value" || this.reducedMotion.matches);
    }
    track(instant = false) {
      const epoch = ++this.epoch;
      this.pausedIcons = [];
      this.state = instant ? "finished" : "running";
      Promise.all(this.icons.flatMap(icon => icon.controls).map(control => Promise.resolve(control))).then(() => {
        if (epoch === this.epoch) this.state = "finished";
      });
    }
    apply(instant = false) {
      if (!this.nav) return;
      this.nav.setAttribute("aria-label", this.getAttribute("label") || "底部导航");
      this.items.forEach((item, index) => {
        const active = item.value === this.value, icon = this.icons[index];
        const duration = String(item.duration / this.speed);
        if (icon.getAttribute("duration") !== duration) icon.setAttribute("duration", duration);
        this.buttons[index].setAttribute("aria-pressed", String(active));
        if (active) this.buttons[index].setAttribute("aria-current", "page");
        else this.buttons[index].removeAttribute("aria-current");
        if (icon.active !== active) icon.active = active;
        if (instant) icon.finish();
        else if (icon.playState === "paused") icon.play();
      });
      this.track(instant);
    }
    select(value) {
      const index = this.items.findIndex(item => item.value === value);
      if (index < 0) return;
      if (this.value === value) { this.replay(); return; }
      const previous = this.value;
      this.value = value;
      this.dispatchEvent(new CustomEvent("nav-change", { detail: { value, previous, index, label: this.items[index].label }, bubbles: true, composed: true }));
    }
    replay() {
      if (!this.icons) return;
      this.icons[this.items.findIndex(item => item.value === this.value)].apply(this.reducedMotion.matches);
      this.track(this.reducedMotion.matches);
    }
    pause() {
      if (this.state !== "running") return;
      this.pausedIcons = this.icons.filter(icon => icon.playState === "running");
      this.pausedIcons.forEach(icon => icon.pause());
      this.state = "paused";
    }
    play() {
      if (this.state === "paused") {
        this.pausedIcons.forEach(icon => icon.play());
        this.state = "running";
      } else if (this.state !== "running") this.replay();
    }
    finish() { this.apply(true); }
    cancel() { this.finish(); }
    preview(active) {
      if (active) this.select(this.items[(this.items.findIndex(item => item.value === this.value) + 1) % this.items.length].value);
      else { this.value = "home"; this.finish(); }
    }
  }
  customElements.define(tag, BottomBar);
}

export const bottomBarDemoMarkup = `
  <div class="bottom-bar-demo">
    <p class="bottom-bar-hint">点击切换页面 · 再点当前项重播</p>
    <div class="bottom-bar-stage"><sipplay-bottom-bar data-motion value="home" speed="1" label="主页面导航"></sipplay-bottom-bar></div>
    <p class="bottom-bar-caption">原始尺寸 · 375 × 48</p>
    <output class="bottom-bar-state" data-bottom-bar-status aria-live="polite">当前：首页</output>
  </div>`;
export const bottomBarDemoCSS = `
  #demo:has(.bottom-bar-demo){padding:24px 5px}
  .bottom-bar-demo{display:flex;flex-direction:column;align-items:center;width:min(100%,385px)}
  .bottom-bar-hint{margin:0 0 32px;color:#aaa5b5;font-size:13px}
  .bottom-bar-stage{width:100%;padding:2px 5px 8px}
  .bottom-bar-caption{margin:24px 0 12px;color:#8e8e98;font-size:12px}
  .bottom-bar-state{color:#dedade;font-size:13px}
  .compact .bottom-bar-hint,.compact .bottom-bar-caption,.compact .bottom-bar-state{display:none}
`;
