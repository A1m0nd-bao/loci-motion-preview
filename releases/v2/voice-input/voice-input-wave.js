const designHeights = [8,12.80078,24,8,8,12.80078,12.80078,24,19.19922,11,4,2,2,4,2,12.80078,24,8,8,12.80078,12.80078,25,19.19922,11,11,4,2,2,8,12.80078,24,8,8,12.80078,12.80078,24,8,12.80078,24,8,8,12.80078,12.80078,24];

export function defineVoiceInputWave() {
  if (customElements.get('sipplay-voice-input-wave')) return;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const mix = (a, b, p) => a + (b - a) * p;
  const random = (n, seed) => {
    const v = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453;
    return v - Math.floor(v);
  };
  const noise = (t, seed) => {
    const n = Math.floor(t), p = t - n, ease = p * p * (3 - 2 * p);
    return mix(random(n, seed), random(n + 1, seed), ease);
  };
  class VoiceInputWave extends HTMLElement {
    static observedAttributes = ['paused', 'quiet', 'speed', 'mode', 'level', 'label'];
    constructor() {
      super(); this.attachShadow({mode:'open'}); this.heights = [];
      this.time = .3; this.raf = 0; this.last = 0;
      this.voices = Array.from({length:44},(_,i)=>({
        rate:2.7+random(i,4)*2.5,phase:random(i,7)*17,
        delay:random(i,11)*.13,attack:30+random(i,19)*24,
        release:9+random(i,23)*10,
      }));
      this.externalLevel = 0; this.smoothedLevel = 0; this.inView = true;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
      this.onEnvironment = () => this.sync(); this.frame = this.frame.bind(this);
    }
    get speed() { return clamp(Number(this.getAttribute('speed')) || 1, .4, 2); }
    get mode() { return this.getAttribute('mode') === 'live' ? 'live' : 'demo'; }
    set mode(value) { this.setAttribute('mode', value === 'live' ? 'live' : 'demo'); }
    get level() { return this.externalLevel; }
    set level(value) {
      if (Number.isFinite(Number(value))) this.externalLevel = clamp(Number(value), 0, 1);
      if (this.group && this.reduced.matches) this.renderStatic();
    }
    connectedCallback() {
      if (!this.group) {
        this.shadowRoot.innerHTML = `<style>
          :host{display:inline-block;width:var(--voice-wave-width,217px);max-width:100%;aspect-ratio:217/25;vertical-align:middle;color:#fff}
          svg{display:block;width:100%;height:100%;overflow:hidden}
        </style><svg width="217" height="25" viewBox="0 0 217 25" fill="currentColor" aria-hidden="true"><g>${Array.from({length:44},(_,i)=>`<rect x="${i*5}" y="11.5" width="1.5" height="2" rx=".75"/>`).join('')}</g></svg>`;
        this.group = this.shadowRoot.querySelector('g');
        this.bars = this.shadowRoot.querySelectorAll('rect');
        this.restart();
      }
      this.setAttribute('role','img'); this.accessibility();
      if (this.hasAttribute('level')) this.level = this.getAttribute('level');
      this.reduced.addEventListener('change',this.onEnvironment);
      document.addEventListener('visibilitychange',this.onEnvironment);
      this.observer = new IntersectionObserver(entries=>{this.inView=entries[0].isIntersecting;this.sync();});
      this.observer.observe(this); this.sync();
    }
    disconnectedCallback() {
      this.stopFrame(); this.observer?.disconnect();
      this.reduced.removeEventListener('change',this.onEnvironment);
      document.removeEventListener('visibilitychange',this.onEnvironment);
    }
    attributeChangedCallback(name) {
      if (name === 'level') this.level = this.getAttribute('level');
      if (!this.group) return;
      if (name === 'label') this.accessibility();
      else this.sync();
    }
    accessibility() { this.setAttribute('aria-label',this.getAttribute('label') || '语音正在输入'); }
    stopFrame() { cancelAnimationFrame(this.raf);this.raf=0;this.last=0; }
    sync() {
      if (this.reduced.matches && this.group) this.renderStatic();
      if (!this.isConnected || this.hasAttribute('paused') || document.hidden || !this.inView || this.reduced.matches) this.stopFrame();
      else if (!this.raf) { this.last=0;this.raf=requestAnimationFrame(this.frame); }
    }
    renderStatic() {
      const amount=this.hasAttribute('quiet')?0:this.mode==='live'?this.externalLevel:.65;
      for(let i=0;i<44;i++)this.heights[i]=2+(designHeights[i]-2)*amount;
      this.paint();
    }
    paint() {
      for(let i=0;i<44;i++) {
        const h=this.heights[i];this.bars[i].setAttribute('y',(25-h)/2);this.bars[i].setAttribute('height',h);
      }
    }
    restart() {
      this.time=.3;this.smoothedLevel=this.mode==='live'?this.externalLevel:.65;
      this.heights=designHeights.map(h=>2+(h-2)*this.smoothedLevel);
      if(this.group){this.group.removeAttribute('transform');this.paint();this.sync();}
    }
    demoLevel(t) {
      t=((t%6.9)+6.9)%6.9;
      const beat=(center,width,gain)=>gain*Math.exp(-(((t-center)/width)**2));
      return clamp(beat(.28,.14,.9)+beat(.64,.19,.75)+beat(1.02,.13,1)
        +beat(1.37,.22,.72)+beat(1.86,.12,.94)+beat(2.13,.18,.82)
        +beat(2.61,.17,.95)+beat(3.18,.18,.77)+beat(3.51,.12,1)
        +beat(3.94,.21,.82)+beat(4.23,.14,.66)+beat(4.82,.19,.96)
        +beat(5.16,.12,.78)+beat(5.43,.15,.92)+beat(6.19,.22,.87),0,1);
    }
    frame(now) {
      this.raf=0;
      const dt=this.last?Math.min((now-this.last)/1000,.05):0;this.last=now;
      this.time+=dt*this.speed;
      const level=this.hasAttribute('quiet')?0:this.mode==='live'?this.externalLevel:this.demoLevel(this.time);
      const response=level>this.smoothedLevel?28:12;
      this.smoothedLevel+=(level-this.smoothedLevel)*(1-Math.exp(-dt*response));
      for(let i=0;i<44;i++) {
        const voice=this.voices[i],region=i/5,band=Math.floor(region);
        const broad=mix(noise(this.time*2.35,band+41),noise(this.time*2.35,band+42),region-band);
        const grain=noise(this.time*voice.rate+voice.phase,i+101);
        const accent=noise(this.time*6.3+voice.phase,i+203);
        const local=.04+.35*broad**1.5+.72*grain**2.2+.2*accent*grain;
        const contour=.19*(designHeights[i]-2)/23+.81*local;
        const presence=.35+.65*noise(this.time*.93+voice.phase,i+307);
        const delayed=this.mode==='demo'&&!this.hasAttribute('quiet')?this.demoLevel(this.time-voice.delay):level;
        const strength=.36*this.smoothedLevel+.64*delayed;
        const target=clamp(2+23*strength*contour**1.7*presence*2.8,2,25);
        const rate=target>this.heights[i]?voice.attack:voice.release;
        this.heights[i]+=(target-this.heights[i])*(1-Math.exp(-dt*rate));
      }
      this.paint();
      this.raf=requestAnimationFrame(this.frame);
    }
    pause() { this.setAttribute('paused',''); }
    play() { this.removeAttribute('paused'); }
  }
  customElements.define('sipplay-voice-input-wave',VoiceInputWave);
}
