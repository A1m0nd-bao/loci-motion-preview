export function defineTapTab(animate) {
  const tag = "sipplay-tap-tab";
  if (customElements.get(tag)) return;
  class TapTab extends HTMLElement {
    static observedAttributes = ["value", "duration", "bounce", "label"];
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.items = [
        { value: "character", label: "Character Setup", icon: "sipplay-profile-rise-toggle", required: true },
        { value: "intro", label: "Intro", icon: "sipplay-layer-stack-toggle", required: true },
        { value: "advanced", label: "Advanced Settings", icon: "sipplay-wrench-turn-toggle" },
      ];
      this.controls = [];
      this.epoch = 0;
      this.state = "idle";
      this.current = null;
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.onReducedMotion = () => { if (this.reducedMotion.matches) this.finish(); };
      this.onVisibility = () => { if (document.hidden) this.finish(); };
      this.onFontsLoaded = () => { if (this.isConnected) this.finish(); };
    }
    get value() { return this.items.some(item => item.value === this.getAttribute("value")) ? this.getAttribute("value") : "character"; }
    set value(value) { if (this.items.some(item => item.value === value)) this.setAttribute("value", value); }
    get duration() {
      const value = Number(this.getAttribute("duration") ?? 0.3);
      return Number.isFinite(value) ? Math.min(1.2, Math.max(0.16, value)) : 0.3;
    }
    get bounce() {
      const value = Number(this.getAttribute("bounce") ?? 0.18);
      return Number.isFinite(value) ? Math.min(0.4, Math.max(0, value)) : 0.18;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.nav) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:block;width:100%;max-width:912px;container-type:inline-size;color:white}
            *{box-sizing:border-box}
            .tablist{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));position:relative;width:100%;max-width:702px;height:44px;margin-inline:auto}
            button{display:flex;justify-content:center;align-items:flex-start;min-width:0;min-height:44px;padding:0 5px;border:0;border-radius:5px;background:transparent;color:inherit;font:400 16px/20px -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}
            button:focus-visible{outline:1px solid #a1a1aa;outline-offset:3px}
            .content{display:flex;align-items:center;gap:9px;max-width:100%;min-width:0;padding:0 5px;opacity:.4;transform-origin:center 10px}
            button[aria-selected=true] .content{opacity:1}
            .icon{display:block;position:relative;flex:0 0 20px;width:20px;height:20px;pointer-events:none}
            .icon>*{position:absolute;left:-12px;top:-12px;pointer-events:none}
            .label{min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;letter-spacing:-.025em}
            .required{margin-left:3px;color:inherit}button[aria-selected=true] .required{color:#ec5b53}
            .underline{position:absolute;left:0;bottom:11px;width:1px;height:1px;background:white;pointer-events:none;transform-origin:50% 50%;opacity:0}
            section[hidden]{display:none}
            @container(max-width:560px){
              .tablist{height:68px}button{min-height:68px;padding:0 2px;font-size:12px;line-height:16px}
              .content{flex-direction:column;gap:7px;padding:0 3px}.label{max-width:100%;letter-spacing:-.035em}.underline{bottom:5px}
            }
            @container(max-width:350px){button{font-size:10.5px}.content{gap:7px;padding:0 2px}.required{margin-left:1px}}
          </style>
          <div class="tablist" role="tablist" aria-label="设置导航">
            ${this.items.map((item, index) => `<button type="button" role="tab" id="tab-${item.value}" aria-controls="panel-${item.value}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-value="${item.value}"><span class="content"><span class="icon" inert aria-hidden="true"><${item.icon}></${item.icon}></span><span class="label">${item.label}${item.required ? '<span class="required" aria-hidden="true">*</span>' : ""}</span></span></button>`).join("")}
            <span class="underline" aria-hidden="true"></span>
          </div>
          ${this.items.map((item, index) => `<section role="tabpanel" id="panel-${item.value}" aria-labelledby="tab-${item.value}" ${index ? "hidden" : ""}><slot name="${item.value}"></slot></section>`).join("")}`;
        this.nav = this.shadowRoot.querySelector(".tablist");
        this.tabs = [...this.shadowRoot.querySelectorAll("[role=tab]")];
        this.contents = this.tabs.map(tab => tab.querySelector(".content"));
        this.icons = this.tabs.map(tab => tab.querySelector(".icon").firstElementChild);
        this.panels = [...this.shadowRoot.querySelectorAll("[role=tabpanel]")];
        this.line = this.shadowRoot.querySelector(".underline");
        for (const icon of this.icons) {
          const style = document.createElement("style");
          style.textContent = "svg{color:white!important}";
          icon.shadowRoot.append(style);
        }
        this.tabs.forEach((tab, index) => {
          tab.addEventListener("click", () => this.select(this.items[index].value));
          tab.addEventListener("keydown", event => {
            let next = index;
            if (event.key === "ArrowRight") next = (index + 1) % this.items.length;
            else if (event.key === "ArrowLeft") next = (index + this.items.length - 1) % this.items.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = this.items.length - 1;
            else return;
            event.preventDefault();
            this.tabs[next].focus();
            this.select(this.items[next].value);
          });
        });
      }
      this.reducedMotion.addEventListener("change", this.onReducedMotion);
      document.addEventListener("visibilitychange", this.onVisibility);
      document.fonts?.addEventListener("loadingdone", this.onFontsLoaded);
      this.resizeObserver = new ResizeObserver(() => this.finish());
      this.resizeObserver.observe(this.nav);
      this.apply(true);
    }
    disconnectedCallback() {
      this.stop();
      this.icons?.forEach(icon => icon.finish());
      this.resizeObserver?.disconnect();
      this.reducedMotion.removeEventListener("change", this.onReducedMotion);
      document.removeEventListener("visibilitychange", this.onVisibility);
      document.fonts?.removeEventListener("loadingdone", this.onFontsLoaded);
    }
    attributeChangedCallback(name) {
      if (!this.nav) return;
      if (name === "value") this.apply(this.reducedMotion.matches);
      else if (name === "label") this.nav.setAttribute("aria-label", this.getAttribute("label") || "设置导航");
    }
    stop() {
      this.epoch++;
      this.controls.forEach(control => control.stop());
      this.controls = [];
    }
    target() {
      const tab = this.tabs[this.items.findIndex(item => item.value === this.value)];
      const nav = this.nav.getBoundingClientRect(), rect = tab.getBoundingClientRect();
      const width = Math.min(170, Math.max(1, nav.width / this.items.length - 16));
      return { x: rect.left - nav.left + (rect.width - width) / 2, width };
    }
    apply(instant = false) {
      if (!this.nav) return;
      const previous = this.current;
      const changed = previous !== this.value;
      const matrix = new DOMMatrix(getComputedStyle(this.line).transform);
      const from = { x: matrix.e, width: this.line.getBoundingClientRect().width };
      this.stop();
      this.current = this.value;
      this.nav.setAttribute("aria-label", this.getAttribute("label") || "设置导航");
      for (let index = 0; index < this.items.length; index++) {
        const active = this.items[index].value === this.value;
        this.tabs[index].setAttribute("aria-selected", String(active));
        this.tabs[index].tabIndex = active ? 0 : -1;
        this.panels[index].hidden = !active;
        const icon = this.icons[index];
        icon.active = active;
        if (instant) icon.finish();
        const content = this.contents[index];
        this.controls.push(animate(content, { opacity: active ? 1 : 0.4, y: 0 }, { duration: instant ? 0 : 0.18, ease: "easeOut" }));
      }
      const target = this.target();
      this.line.style.opacity = "1";
      this.line.style.width = `${target.width}px`;
      if (instant || !previous || !changed) {
        this.controls.push(animate(this.line, { x: target.x, scaleX: 1 }, { duration: 0 }));
      } else {
        const distance = Math.abs(target.x - from.x);
        const stretch = Math.min(distance * (0.14 + this.bounce * 0.4), target.width * 0.42);
        const peakScale = Math.max(from.width / target.width, 1 + stretch / target.width);
        this.controls.push(animate(this.line, {
          x: target.x,
          scaleX: [from.width / target.width, peakScale, 1],
        }, {
          x: { duration: this.duration, ease: [0.16, 1, 0.3, 1] },
          scaleX: { duration: this.duration, times: [0, 0.22, 1], ease: [[0.2, 0.8, 0.2, 1], [0.2, 0.8, 0.2, 1]] },
        }));
      }
      const epoch = this.epoch;
      this.state = instant ? "finished" : "running";
      Promise.all([...this.controls, ...this.icons.flatMap(icon => icon.controls)].map(control => Promise.resolve(control))).then(() => {
        if (epoch === this.epoch) this.state = "finished";
      });
    }
    select(value) {
      if (!this.items.some(item => item.value === value)) return;
      if (value === this.value) { this.replay(); return; }
      const previous = this.value;
      this.value = value;
      this.dispatchEvent(new CustomEvent("tab-change", { detail: { value, previous, index: this.items.findIndex(item => item.value === value) }, bubbles: true, composed: true }));
    }
    replay() {
      const icon = this.icons[this.items.findIndex(item => item.value === this.value)];
      icon.apply(this.reducedMotion.matches);
      const epoch = ++this.epoch;
      this.state = this.reducedMotion.matches ? "finished" : "running";
      Promise.all([...this.controls, ...icon.controls].map(control => Promise.resolve(control))).then(() => {
        if (epoch === this.epoch) this.state = "finished";
      });
    }
    pause() { [...this.controls, ...this.icons.flatMap(icon => icon.controls)].forEach(control => control.pause()); this.state = "paused"; }
    play() {
      if (this.state !== "paused") return;
      [...this.controls, ...this.icons.flatMap(icon => icon.controls)].forEach(control => control.play());
      this.state = "running";
    }
    finish() { if (this.nav) this.apply(true); }
    cancel() { this.finish(); }
    preview(active) {
      if (active) this.select(this.value === "character" ? "intro" : "character");
      else { this.value = "character"; this.finish(); }
    }
  }
  customElements.define(tag, TapTab);
}

export const tapTabDemoMarkup = `
  <div class="tap-tab-demo">
    <p class="tap-tab-hint">点击切换 · 图标响应，下划线跟随</p>
    <sipplay-tap-tab data-motion value="character" duration="0.3" bounce="0.18" label="创作设置"></sipplay-tap-tab>
    <p class="tap-tab-caption">人物探出 · 图层落下 · 扳手拧动</p>
  </div>`;

export const tapTabDemoCSS = `
  .tap-tab-demo{display:flex;flex-direction:column;align-items:center;gap:46px;width:min(100%,912px)}
  .tap-tab-hint,.tap-tab-caption{margin:0;color:#8e8e98;font-size:12px;line-height:1.5;letter-spacing:.02em}
  .tap-tab-caption{font-size:11px;color:#6f6f7a}
  .compact .tap-tab-demo{gap:24px}.compact .tap-tab-caption{display:none}.compact .tap-tab-hint{font-size:10px}
`;
