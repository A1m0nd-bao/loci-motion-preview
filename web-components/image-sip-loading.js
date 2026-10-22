export function defineImageSipLoading(animate) {
  const tag = 'sipplay-image-sip-loading';
  if (customElements.get(tag)) return;
  const clamp = v => Math.max(0, Math.min(1, v));
  const smooth = v => { v = clamp(v); return v * v * (3 - 2 * v); };
  const settleIn = t => { t = clamp(t) - 1; return 1 + 2.5 * t * t * t + 1.5 * t * t; };
  const waveValue = (x, phase) => {
    const t = (x - 48) * Math.PI * 2 / 29 - phase;
    return Math.sin(t) + .08 * Math.sin(t * 2 + .8);
  };
  const waveSlope = (x, phase) => {
    const t = (x - 48) * Math.PI * 2 / 29 - phase;
    return Math.PI * 2 / 29 * (Math.cos(t) + .16 * Math.cos(t * 2 + .8));
  };
  const surfaces = [
    [61.5681,64.1,66.2,63.2,61,60.9,62.6103,63.1,63.7,64.001],
    [64.7386,66.4343,67.7734,66.7085,65.2607,64.1817,65.5816,66.3,67,67.817],
    [68.7323,69.8071,70.6297,69.9914,68.9951,68.3476,69.212,70,70.2,70.6129],
    [70.5234,71.4116,71.9197,71.5286,70.6036,70.2067,70.7416,71.2,71.5,71.8666],
    [76.6,76.6,76.6,76.6,76.6,76.6,76.6,76.6,76.6,76.6],
  ];
  /**
   * @summary 生图流光吸饮
   * 动效：生图流光吸饮 / sipplay-image-sip-loading
   * 位置：正在生成图片的 125×125 占位图。使用本次提供的白底、圆角、粉橘渐变与杯形图片 SVG；替换生图中的占位内容，不覆盖 Upload / Generate 操作按钮。
   * Figma：待绑定；仅凭图标相似不得批量替换
   * 适配：保留 125×125 画布与 rx=16 比例，图标中心和杯口、吸管的原始路径。预览中的 2× 放大仅便于观察，不进入产品布局。
   * 注释同步：位置待核对
   * 触发：生图请求开始时 active=true 循环：吸管柔和插入 → 连续波纹随吸饮降低 → 吸空后弹出两滴水 → 吸管收回 → 重新蓄满。成功、失败或取消时由业务移除加载态；减少动态效果时静态展示。
   * 状态：active；默认 false，接入时以业务状态覆盖
   * 事件：motion-cycle → { iteration: number }
   * 业务接入：纯展示组件，无内部按钮或点击切换。active 绑定真实请求的 loading 状态；动画循环不是进度或成功信号，不显示虚构百分比。成功后替换为生成图片，失败显示原有重试界面。卸载与浏览器后台会停止或暂停动画。
   * 参数：duration=5.8（吸饮周期（秒））；flow-duration=8（流光周期（秒））
   * 源码：https://github.com/a1m0nd-bao/loci-motion-preview/blob/main/web-components/image-sip-loading.js；初始化 defineImageSipLoading(animate)
   * 依赖：Motion animate
   * API 清单：https://a1m0nd-bao.github.io/loci-motion-preview/custom-elements.json
   * 预览：https://a1m0nd-bao.github.io/loci-motion-preview/web-components/preview.html?id=sipplay-image-sip-loading
   * 注意：已有按钮不要嵌套；保留 SVG 路径、设计尺寸、键盘和减少动态效果逻辑。
   * 映射状态：已核对的节点链接属于项目交付记录；正式 Code Connect 未启用（账号权限限制）。
   * @tag sipplay-image-sip-loading
   * @attribute {boolean} active - 纯展示组件，无内部按钮或点击切换。active 绑定真实请求的 loading 状态；动画循环不是进度或成功信号，不显示虚构百分比。成功后替换为生成图片，失败显示原有重试界面。卸载与浏览器后台会停止或暂停动画。 默认 false。
   * @attribute {number} duration - 吸饮周期（秒）；范围 3.6–10，步长 0.2。
   * @attribute {number} flow-duration - 流光周期（秒）；范围 4–16，步长 0.5。
   * @attribute {string} label - 加载图形的可访问名称。
   * @fires {CustomEvent} motion-cycle - detail: { iteration: number }。纯展示组件，无内部按钮或点击切换。active 绑定真实请求的 loading 状态；动画循环不是进度或成功信号，不显示虚构百分比。成功后替换为生成图片，失败显示原有重试界面。卸载与浏览器后台会停止或暂停动画。
   */
  class ImageSipLoading extends HTMLElement {
    static observedAttributes = ["active", "duration", "flow-duration", "label"];
    constructor() {
      super();
      this.attachShadow({mode:'open'});
      this.controls = [];
      this.surface = new Float64Array(10);
      this.state = 'idle';
      this.epoch = 0;
      this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      this.onReducedMotion = () => this.start();
      this.onVisibility = () => {
        if (document.hidden) {
          if (this.state === 'running') {
            this.pause();
            this.resumeAfterVisibility = true;
          }
        } else if (this.resumeAfterVisibility) {
          this.resumeAfterVisibility = false;
          this.play();
        }
      };
    }
    get active() { return this.hasAttribute('active'); }
    set active(value) { this.toggleAttribute('active', Boolean(value)); }
    get duration() {
      const value = Number(this.getAttribute('duration') ?? 5.8);
      return Number.isFinite(value) ? Math.min(10, Math.max(3.6, value)) : 5.8;
    }
    get flowDuration() {
      const value = Number(this.getAttribute('flow-duration') ?? 8);
      return Number.isFinite(value) ? Math.min(16, Math.max(4, value)) : 8;
    }
    get playState() { return this.state; }
    connectedCallback() {
      if (!this.tile) {
        this.shadowRoot.innerHTML = `
          <style>
            :host{display:inline-block;width:125px;height:125px;vertical-align:middle}
            .tile{position:relative;width:100%;height:100%;overflow:hidden;border-radius:12.8%;isolation:isolate;background:#fff;contain:paint}
            .reference,.flow,.gleam{position:absolute;pointer-events:none}
            .reference{inset:0;background:linear-gradient(135deg,#f4b07866 0%,#ed78f499 50%,#ec584466 100%)}
            .flow{inset:-55%;background:radial-gradient(ellipse at 22% 30%,#f7ad7ae6 0%,transparent 47%),radial-gradient(ellipse at 72% 27%,#ed78f4d9 0%,transparent 45%),radial-gradient(ellipse at 72% 78%,#ed716499 0%,transparent 45%),radial-gradient(ellipse at 26% 80%,#dd9df299 0%,transparent 42%);filter:blur(12px);opacity:.9}
            .gleam{inset:-35%;background:linear-gradient(110deg,transparent 34%,#fff0 39%,#fff9 48%,#fff0 57%,transparent 65%);mix-blend-mode:soft-light;opacity:.7;transform:translateX(-90%) rotate(-12deg)}
            svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
            .straw,.liquid,.sun,.sun-hole{transform-box:view-box;transform-origin:0 0}
            .stream{stroke-dasharray:2.4 6;opacity:0}
            .drop{opacity:0;fill:white}
          </style>
          <div class="tile" role="img" aria-label="正在生成图片">
            <div class="reference"></div><div class="flow"></div><div class="gleam"></div>
            <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <clipPath id="sip-cup"><rect x="48.1738" y="50.3462" width="24.4792" height="24.6528" rx="4"/></clipPath>

              </defs>
              <g class="straw">
                <path d="M63.9707 67.187L71.4785 51.8302C71.5619 51.6596 71.7141 51.5326 71.8969 51.4812L77.1651 49.9995" stroke-width="2" stroke-linecap="round" stroke="white"/>
                <path class="stream" d="M63.9707 67.187L71.4785 51.8302C71.5619 51.6596 71.7141 51.5326 71.8969 51.4812L77.1651 49.9995" stroke-width=".9" stroke-linecap="round" stroke="#ED78F4"/>
              </g>
              <g clip-path="url(#sip-cup)">
                <path class="liquid" d="M51.0531 66.4343L48 64.7386V70.9998C48 73.209 49.7909 74.9998 52 74.9998H68.6528C70.8619 74.9998 72.6528 73.209 72.6528 70.9998V67.817L68.7382 65.5816C66.496 64.3012 63.7738 64.1817 61.428 65.2607L58.2803 66.7085C55.9651 67.7734 53.281 67.6716 51.0531 66.4343Z" fill="white"/>
              </g>
              <path d="M66.5766 50.3462H52.1738C49.9647 50.3462 48.1738 52.1371 48.1738 54.3462V70.999C48.1738 73.2081 49.9647 74.999 52.1738 74.999H68.653C70.8621 74.999 72.653 73.2081 72.653 70.999V60.5892" stroke-width="2.66667" stroke-linecap="round" stroke="white"/>
              <circle class="sun" cx="55.2895" cy="57.29" r="2.77778" fill="white"/>
              <path class="drop" d="M0 -1.7C.45 -.8 1.15 -.15 1.15 .55A1.15 1.15 0 0 1 -1.15 .55C-1.15 -.15 -.45 -.8 0 -1.7Z"/>
              <path class="drop" d="M0 -1.7C.45 -.8 1.15 -.15 1.15 .55A1.15 1.15 0 0 1 -1.15 .55C-1.15 -.15 -.45 -.8 0 -1.7Z"/>
            </svg>
          </div>`;
        const find = s => this.shadowRoot.querySelector(s);
        this.tile = find('.tile'); this.flow = find('.flow'); this.gleam = find('.gleam');
        this.straw = find('.straw'); this.liquid = find('.liquid'); this.sun = find('.sun');
        this.tube = this.straw.querySelector('path'); this.stream = find('.stream');
        this.drops = [...this.shadowRoot.querySelectorAll('.drop')];
      }
      this.reducedMotion.addEventListener('change', this.onReducedMotion);
      document.addEventListener('visibilitychange', this.onVisibility);
      this.start();
    }
    disconnectedCallback() {
      this.stop();
      this.reducedMotion.removeEventListener('change', this.onReducedMotion);
      document.removeEventListener('visibilitychange', this.onVisibility);
    }
    attributeChangedCallback(name) {
      if (!this.tile) return;
      if (name === 'label') this.tile.setAttribute('aria-label', this.getAttribute('label') || (this.active ? '正在生成图片' : '图片占位'));
      else this.start();
    }
    stop() {
      this.epoch++;
      this.resumeAfterVisibility = false;
      for (const control of this.controls) control.cancel();
      this.controls.length = 0;
      this.state = 'idle';
    }
    renderPhase(p, rest = false) {
      const enterT = clamp((p - .025) / .165);
      const enter = settleIn(enterT);
      const drain = smooth((p - .22) / .48);
      const leave = smooth((p - .85) / .10);
      const refill = smooth((p - .88) / .12);
      const amount = clamp(1 - drain + refill);
      const moving = p >= .22 && p < .70;
      const y = this.surface;
      if (rest) {
        y.set(surfaces[1]);
        this.liquid.setAttribute('d', `M48 ${y[0]} C51.5 ${y[1]} 55.5 ${y[2]} 58.3 ${y[3]} C61.2 ${y[4]} 64.5 ${y[5]} 67 ${y[6]} C69 ${y[7]} 71 ${y[8]} 73 ${y[9]} L73 79 L48 79Z`);
      } else {
        // Sample one continuous traveling surface with analytic tangents.
        // Adjacent Beziers share their slope, so crests never hinge at a join.
        const level = 62.8 + 13.8 * clamp(drain - refill);
        const amplitude = .9 * smooth(amount * 5);
        const phase = p * Math.PI * 4;
        const step = 25 / 3;
        y[0] = level + amplitude * waveValue(48, phase);
        for (let i = 0; i < 3; i++) {
          const x0 = 48 + i * step, x1 = x0 + step;
          const end = level + amplitude * waveValue(x1, phase);
          y[i * 3 + 1] = y[i * 3] + amplitude * waveSlope(x0, phase) * step / 3;
          y[i * 3 + 2] = end - amplitude * waveSlope(x1, phase) * step / 3;
          y[i * 3 + 3] = end;
        }
        this.liquid.setAttribute('d', `M48 ${y[0]} C50.7777778 ${y[1]} 53.5555556 ${y[2]} 56.3333333 ${y[3]} C59.1111111 ${y[4]} 61.8888889 ${y[5]} 64.6666667 ${y[6]} C67.4444444 ${y[7]} 70.2222222 ${y[8]} 73 ${y[9]} L73 79 L48 79Z`);
      }
      const breathe = Math.sin(p * Math.PI * 4) * Math.sin(Math.PI * drain);
      const landing = Math.sin(Math.PI * enterT) * Math.sin(Math.PI * enterT * 2);
      const pop = Math.sin(Math.PI * clamp((p - .70) / .15));
      const tx = rest ? 0 : 5 * (1 - enter) + 4 * leave;
      const ty = rest ? 0 : -14 * (1 - enter) - 14 * leave + breathe * .18;
      const angle = rest ? 0 : -9 * (1 - enter) + 7 * leave + breathe * .9 + pop * 1.3;
      const depth = rest ? 0 : smooth((drain - .08) / .88);
      const tipX = 63.9707 - depth * 2.47;
      const tipY = 67.187 + depth * 6.85;
      const bend = rest ? 0 : breathe * .65 + landing * .55 - pop * .35;
      const tube = `M${tipX} ${tipY} C${tipX + 2.6 + bend} ${tipY - 5.2} ${69.8 + bend} 55.6 71.4785 51.8302 Q71.62 51.55 71.8969 51.4812 L77.1651 49.9995`;
      this.tube.setAttribute('d', tube);
      this.stream.setAttribute('d', tube);
      this.straw.setAttribute('transform', `translate(${tx} ${ty}) rotate(${angle} 71.5 52)`);
      this.straw.style.opacity = rest ? '1' : String(clamp(enterT * 5) * (1 - leave));
      this.stream.style.opacity = moving && !rest ? '.45' : '0';
      this.stream.style.strokeDashoffset = String(-p * 110);
      for (let i = 0; i < 2; i++) {
        const u = (p - .70 - i * .025) / .135;
        const visible = !rest && u > 0 && u < 1;
        this.drops[i].style.opacity = visible ? String(smooth(u / .15) * (1 - smooth((u - .58) / .42))) : '0';
        if (visible) {
          const dx = (i === 0 ? 5.2 : -2.8) * u;
          const dy = -29 * u + 25 * u * u;
          const scale = (i === 0 ? .9 : .7) * (.7 + .3 * Math.sin(Math.PI * u));
          this.drops[i].setAttribute('transform', `translate(${77.1651 + dx} ${49.9995 + dy}) rotate(${(i === 0 ? 25 : -22) * u}) scale(${scale} ${scale * (1 + .22 * Math.sin(Math.PI * u))})`);
        }
      }
      const phase = rest ? '静止' : p < .22 ? '吸管插入' : p < .70 ? '吸取图片' : p < .85 ? '水滴弹出' : p < .88 ? '吸管收回' : '重新蓄满';
      if (this.tile.dataset.phase !== phase) this.tile.dataset.phase = phase;
    }
    start() {
      this.stop();
      this.tile.setAttribute('aria-label', this.getAttribute('label') || (this.active ? '正在生成图片' : '图片占位'));
      this.tile.setAttribute('aria-busy', String(this.active));
      this.renderPhase(0, true);
      if (!this.active || this.reducedMotion.matches) return;
      this.renderPhase(0);
      this.iteration = 0; this.lastPhase = 0;
      const epoch = this.epoch;
      this.controls.push(animate(0, 1, {
        duration:this.duration, ease:'linear', repeat:Infinity,
        onUpdate:p => {
          if (epoch !== this.epoch || this.state !== 'running') return;
          if (p < this.lastPhase) {
            this.iteration++;
            this.dispatchEvent(new CustomEvent('motion-cycle', {detail:{iteration:this.iteration},bubbles:true,composed:true}));
          }
          this.lastPhase = p;
          this.renderPhase(p);
        },
      }));
      this.controls.push(animate(this.flow, {
        transform:['translate(-4%, -3%) rotate(0deg)','translate(5%, 3%) rotate(180deg)','translate(-4%, -3%) rotate(360deg)'],
      }, {duration:this.flowDuration, ease:'linear', repeat:Infinity}));
      this.controls.push(animate(this.gleam, {
        transform:['translateX(-90%) rotate(-12deg)','translateX(90%) rotate(-12deg)'], opacity:[0,.65,0],
      }, {duration:this.flowDuration * .72, ease:'easeInOut', repeat:Infinity, repeatDelay:.25}));
      this.state = 'running';
      if (document.hidden) {
        this.pause();
        this.resumeAfterVisibility = true;
      }
    }
    pause() {
      this.resumeAfterVisibility = false;
      for (const control of this.controls) control.pause();
      if (this.controls.length) this.state = 'paused';
    }
    play() {
      if (!this.active || this.reducedMotion.matches) return;
      if (this.state === 'paused') {
        for (const control of this.controls) control.play();
        this.state = 'running';
      } else if (this.state !== 'running') this.start();
    }
    finish() {
      this.stop();
      this.renderPhase(0, true);
      this.state = 'finished';
    }
    cancel() { this.finish(); }
    replay() { this.start(); }
  }
  customElements.define(tag, ImageSipLoading);
}

export const imageSipLoadingDemoMarkup = `
  <section class="image-sip-demo">
    <div class="image-sip-large"><sipplay-image-sip-loading data-motion active duration="5.8" flow-duration="8"></sipplay-image-sip-loading></div>
    <p class="image-sip-title">正在生成图片</p>
    <p class="image-sip-caption">流光 · 吸饮 · 水滴 · 蓄满</p>
    <div class="image-sip-original"><sipplay-image-sip-loading active duration="5.8" flow-duration="8"></sipplay-image-sip-loading><span>原始尺寸 · 125 × 125</span></div>
  </section>`;

export const imageSipLoadingDemoCSS = `
.image-sip-demo{display:flex;flex-direction:column;align-items:center;gap:12px}
.image-sip-large{width:250px;height:250px;margin-bottom:8px}
.image-sip-large sipplay-image-sip-loading{width:100%;height:100%}
.image-sip-title{margin:0!important;font-size:17px;letter-spacing:.04em;font-weight:550;color:#e8e1eb}
.image-sip-caption{margin:0!important;font-size:11px;letter-spacing:.12em;color:#85818d}
.image-sip-original{display:flex;align-items:center;gap:20px;margin-top:22px;text-align:left}
.image-sip-original span{font-size:11px;color:#85818d;white-space:nowrap}
.compact .image-sip-large{width:148px;height:148px;margin:0}
.compact .image-sip-title,.compact .image-sip-caption,.compact .image-sip-original{display:none}
.compact .image-sip-demo{gap:0}
`;
