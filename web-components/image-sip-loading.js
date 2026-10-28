export function defineImageSipLoading(animate) {
  const tag = 'sipplay-image-sip-loading';
  if (customElements.get(tag)) return;
  const clamp = v => Math.max(0, Math.min(1, v));
  const smooth = v => { v = clamp(v); return v * v * (3 - 2 * v); };
  const settleIn = t => { t = clamp(t) - 1; return 1 + 2.5 * t * t * t + 1.5 * t * t; };
  // The four supplied SVGs, translated into the 125px tile coordinates.
  // Each top boundary has the same M / L / C / L / C / L topology.
  const surfaces = [
    [48,61.5681,49.3778,62.5561,52.6058,64.8699,56.8958,65.0549,60.3108,63.0275,60.5938,62.8592,63.5848,61.0834,67.2828,60.9891,70.3608,62.6103,73,64.001],
    [48,64.7386,51.0531,66.4343,53.281,67.6716,55.9651,67.7734,58.2803,66.7085,61.428,65.2607,63.7738,64.1817,66.496,64.3012,68.7382,65.5816,72.6528,67.817],
    [48,68.7323,51.2124,69.8071,53.4791,70.5655,55.9208,70.6297,58.2242,69.9914,61.8198,68.9951,64.1566,68.3476,66.6348,68.4232,68.9278,69.212,73,70.6129],
    [48,70.5234,51.71676,71.4116,53.67593,71.8798,55.71307,71.9197,57.6891,71.5286,62.3626,70.6036,64.3681,70.2067,66.4362,70.2538,68.4216,70.7416,73,71.8666],
    [48,76.6,51.71676,76.6,53.67593,76.6,55.71307,76.6,57.6891,76.6,62.3626,76.6,64.3681,76.6,66.4362,76.6,68.4216,76.6,73,76.6],
  ];
  const tangent = (a, b) => a * b > 0 ? 2 * a * b / (a + b) : 0;
  // Same cubic wave and 3.2s leftward loop as the supplied liquid-rise reference,
  // scaled from its 21.6926px cup to this 24.4792px cup.
  const waveScale = 24.4792 / 21.6926;
  const wavePeriod = 16 * waveScale;
  const waveAmplitude = 4 * waveScale;
  const waveDuration = 3.2;
  /**
   * @summary 生图流光吸饮
   * 动效：生图流光吸饮 / sipplay-image-sip-loading
   * 位置：正在生成图片的 125×125 占位图。使用本次提供的圆角、深棕到黑渐变与 #D2D0D0 灰色杯形图片 SVG；替换生图中的占位内容，不覆盖 Upload / Generate 操作按钮。
   * Figma：待绑定；仅凭图标相似不得批量替换
   * 适配：保留 125×125 画布与 rx=16 比例，图标中心和杯口、吸管的原始路径。预览中的 2× 放大仅便于观察，不进入产品布局。
   * 注释同步：位置待核对
   * 触发：生图请求开始时 active=true 循环：吸管柔和插入 → 沿用彩色液面参考的连续波纹与 3.2 秒向左流动节奏，同时按设计液位降低 → 吸空后两滴水沿吸管口向右飞出并下落 → 吸管收回 → 重新蓄满。成功、失败或取消时由业务移除加载态；减少动态效果时静态展示。
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
      this.surface = new Float64Array(20);
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
            .reference{inset:0}
            .flow{inset:-55%;background:radial-gradient(ellipse at 22% 30%,#4c333366 0%,transparent 47%),radial-gradient(ellipse at 72% 27%,#30202099 0%,transparent 45%),radial-gradient(ellipse at 72% 78%,#00000080 0%,transparent 45%),radial-gradient(ellipse at 26% 80%,#4c333333 0%,transparent 42%);filter:blur(12px);opacity:.9}
            .gleam{inset:-35%;background:linear-gradient(110deg,transparent 34%,#fff0 39%,#d2d0d040 48%,#fff0 57%,transparent 65%);mix-blend-mode:soft-light;opacity:.7;transform:translateX(-90%) rotate(-12deg)}
            svg{position:absolute;inset:0;display:block;width:100%;height:100%;overflow:visible}
            .straw,.liquid,.sun,.sun-hole{transform-box:view-box;transform-origin:0 0}
            .drop{opacity:0;fill:#D2D0D0}
          </style>
          <div class="tile" role="img" aria-label="正在生成图片">
            <div class="reference"><svg viewBox="0 0 125 125" width="125" height="125" aria-hidden="true"><defs><linearGradient id="sip-dark-background" x1="62.5" y1="-2.86965e-06" x2="8.83226" y2="94.5316" gradientUnits="userSpaceOnUse"><stop stop-color="#4C3333"/><stop offset="1" stop-color="#000000"/></linearGradient></defs><rect width="125" height="125" rx="16" fill="url(#sip-dark-background)"/></svg></div><div class="flow"></div><div class="gleam"></div>
            <svg width="125" height="125" viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <clipPath id="sip-cup"><rect x="48.1738" y="50.3462" width="24.4792" height="24.6528" rx="4"/></clipPath>

              </defs>
              <g class="straw">
                <path d="M63.9707 67.187L71.4785 51.8302C71.5619 51.6596 71.7141 51.5326 71.8969 51.4812L77.1651 49.9995" stroke-width="2" stroke-linecap="round" stroke="#D2D0D0"/>
              </g>
              <g clip-path="url(#sip-cup)">
                <path class="liquid" d="M51.0531 66.4343L48 64.7386V70.9998C48 73.209 49.7909 74.9998 52 74.9998H68.6528C70.8619 74.9998 72.6528 73.209 72.6528 70.9998V67.817L68.7382 65.5816C66.496 64.3012 63.7738 64.1817 61.428 65.2607L58.2803 66.7085C55.9651 67.7734 53.281 67.6716 51.0531 66.4343Z" fill="#D2D0D0"/>
              </g>
              <path d="M66.5766 50.3462H52.1738C49.9647 50.3462 48.1738 52.1371 48.1738 54.3462V70.999C48.1738 73.2081 49.9647 74.999 52.1738 74.999H68.653C70.8621 74.999 72.653 73.2081 72.653 70.999V60.5892" stroke-width="2.66667" stroke-linecap="round" stroke="#D2D0D0"/>
              <circle class="sun" cx="55.2895" cy="57.29" r="2.77778" fill="#D2D0D0"/>
              <path class="drop" d="M0 -1.7C.45 -.8 1.15 -.15 1.15 .55A1.15 1.15 0 0 1 -1.15 .55C-1.15 -.15 -.45 -.8 0 -1.7Z"/>
              <path class="drop" d="M0 -1.7C.45 -.8 1.15 -.15 1.15 .55A1.15 1.15 0 0 1 -1.15 .55C-1.15 -.15 -.45 -.8 0 -1.7Z"/>
            </svg>
          </div>`;
        const find = s => this.shadowRoot.querySelector(s);
        this.tile = find('.tile'); this.flow = find('.flow'); this.gleam = find('.gleam');
        this.straw = find('.straw'); this.liquid = find('.liquid'); this.sun = find('.sun');
        this.tube = this.straw.querySelector('path');
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
      this.iteration = 0;
    }
    renderPhase(p, rest = false) {
      const enterT = clamp((p - .025) / .165);
      const enter = settleIn(enterT);
      const drain = smooth((p - .22) / .48);
      const leave = smooth((p - .85) / .10);
      const refill = smooth((p - .88) / .12);
      const y = this.surface;
      if (rest) {
        y.set(surfaces[1]);
      } else {
        const position = clamp(drain - refill) * 4;
        const index = Math.min(3, Math.floor(position));
        const t = position - index, t2 = t * t, t3 = t2 * t;
        const a = surfaces[index], b = surfaces[index + 1];
        const before = surfaces[Math.max(0, index - 1)];
        const after = surfaces[Math.min(4, index + 2)];
        // Interpolate the supplied design levels with matching velocity at each keyframe.
        // The flowing surface below reuses the user-provided liquid-rise wave.
        for (let i = 0; i < 20; i++) {
          const delta = b[i] - a[i];
          const m0 = index === 0 ? delta : tangent(a[i] - before[i], delta);
          const m1 = index === 3 ? delta : tangent(delta, after[i] - b[i]);
          y[i] = (2 * t3 - 3 * t2 + 1) * a[i] + (t3 - 2 * t2 + t) * m0
            + (-2 * t3 + 3 * t2) * b[i] + (t3 - t2) * m1;
        }
      }
      if (rest) {
        this.liquid.setAttribute('d', `M${y[0]} ${y[1]} L${y[2]} ${y[3]} C${y[4]} ${y[5]} ${y[6]} ${y[7]} ${y[8]} ${y[9]} L${y[10]} ${y[11]} C${y[12]} ${y[13]} ${y[14]} ${y[15]} ${y[16]} ${y[17]} L${y[18]} ${y[19]} L73 79 L48 79Z`);
        this.liquid.setAttribute('transform', 'translate(0 0)');
      } else {
        const level = (y[1] + y[19]) / 2;
        const amplitude = waveAmplitude * smooth(clamp(1 - drain + refill) * 5);
        const left = 48 - wavePeriod * 2;
        let path = `M${left} ${level}`;
        for (let i = 0; i < 6; i++) {
          const x = left + i * wavePeriod;
          path += ` C${x + wavePeriod / 2} ${level - amplitude} ${x + wavePeriod / 2} ${level + amplitude} ${x + wavePeriod} ${level}`;
        }
        this.liquid.setAttribute('d', path + ` L${left + wavePeriod * 6} 79 H${left}Z`);
        // Carry time through loading-loop boundaries so the wave never resets mid-flow.
        const elapsed = ((this.iteration || 0) + p) * this.duration;
        const offset = -(elapsed / waveDuration % 1) * wavePeriod;
        this.liquid.setAttribute('transform', `translate(${offset} 0)`);
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
      this.straw.setAttribute('transform', `translate(${tx} ${ty}) rotate(${angle} 71.5 52)`);
      this.straw.style.opacity = rest ? '1' : String(clamp(enterT * 5) * (1 - leave));
      for (let i = 0; i < 2; i++) {
        const u = (p - .70 - i * .025) / .135;
        const visible = !rest && u > 0 && u < 1;
        this.drops[i].style.opacity = visible ? String(smooth(u / .15) * (1 - smooth((u - .58) / .42))) : '0';
        if (visible) {
          // Leave along the actual outlet tangent; both drops travel right.
          // The nozzle recoil is included in each drop's launch origin.
          const recoil = 1.3 * Math.sin(Math.PI * (i * .025) / .15) * Math.PI / 180;
          const direction = Math.atan2(-1.4817, 5.2682) + recoil;
          const speed = i === 0 ? 13.5 : 10.5;
          const vx = Math.cos(direction) * speed;
          const vy = Math.sin(direction) * speed;
          const gravity = 6.5;
          const originX = 71.5 + 5.6651 * Math.cos(recoil) + 2.0005 * Math.sin(recoil);
          const originY = 52 + 5.6651 * Math.sin(recoil) - 2.0005 * Math.cos(recoil);
          const x = originX + vx * u;
          const y = originY + vy * u + gravity * u * u;
          const rotation = Math.atan2(vy + 2 * gravity * u, vx) * 180 / Math.PI - 90;
          const scale = (i === 0 ? .9 : .7) * (.7 + .3 * Math.sin(Math.PI * u));
          this.drops[i].setAttribute('transform', `translate(${x} ${y}) rotate(${rotation}) scale(${scale} ${scale * (1 + .18 * (1 - u))})`);
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
