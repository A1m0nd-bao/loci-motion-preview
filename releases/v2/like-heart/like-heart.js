export const heartPath = 'M8.2 2.91C7.44 2.28 6.4 1.8 5.2 1.8C3.04 1.8 1.36 3.56 1.36 5.8C1.36 9.0783 4.3255 12.32 8.2 13.68C12.0745 12.32 15.04 9.0783 15.04 5.8C15.04 3.56 13.36 1.8 11.2 1.8C10 1.8 8.96 2.28 8.2 2.91Z';

export function defineLikeHeart(animate) {
  if (customElements.get('sipplay-like-heart')) return;
  class LikeHeart extends HTMLElement {
    static observedAttributes = ['active', 'label', 'disabled', 'size'];
    constructor() {
      super();
      this.attachShadow({mode:'open'});
      this.controls = [];
      this.fillProgress = 0;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
      this.onReduced = () => { if (this.reduced.matches) this.finish(); };
    }
    get active() { return this.hasAttribute('active'); }
    set active(value) { this.toggleAttribute('active', Boolean(value)); }
    connectedCallback() {
      if (!this.button) {
        this.shadowRoot.innerHTML = `<style>
          :host{display:inline-block;width:44px;height:44px;color:var(--heart-color,#fff);vertical-align:middle}
          button{display:grid;place-items:center;width:100%;height:100%;padding:0;border:0;border-radius:12px;background:none;color:inherit;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
          button:focus-visible{outline:1px solid currentColor;outline-offset:1px}button:disabled{opacity:.4;cursor:default}
          svg{width:var(--heart-size,16px);height:var(--heart-size,16px);overflow:visible;pointer-events:none}
          .pose{display:block;width:var(--heart-size,16px);height:var(--heart-size,16px);transform-origin:50% 50%}.spark{opacity:0}
        </style><button type="button"><span class="pose"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <defs><clipPath id="fill"><rect class="fill-clip" x="0" y="16" width="16" height="0"/></clipPath></defs>
        <g class="sparks">${[-155,-95,-35,25,85,145].map(angle => {
          const a=angle*Math.PI/180;
          return `<path class="spark" d="M${8+Math.cos(a)*10} ${8+Math.sin(a)*10}l${Math.cos(a)*1.4} ${Math.sin(a)*1.4}" stroke="currentColor" stroke-width=".8" stroke-linecap="round"/>`;
        }).join('')}</g>
        <g class="heart"><path d="${heartPath}" fill="currentColor" clip-path="url(#fill)"/>
        <path d="${heartPath}" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></g>
        </svg></span></button>`;
        this.button=this.shadowRoot.querySelector('button');
        this.heart=this.shadowRoot.querySelector('.pose');
        this.clip=this.shadowRoot.querySelector('.fill-clip');
        this.sparks=[...this.shadowRoot.querySelectorAll('.spark')];
        this.button.addEventListener('click',()=>{
          this.active=!this.active;
          this.dispatchEvent(new CustomEvent('motion-change',{detail:{active:this.active},bubbles:true,composed:true}));
        });
      }
      this.reduced.addEventListener('change',this.onReduced);
      this.finish();
    }
    disconnectedCallback(){this.stop();this.reduced.removeEventListener('change',this.onReduced);}
    attributeChangedCallback(name){
      if(!this.button)return;
      if(name==='active')this.apply(this.reduced.matches);else this.accessibility();
    }
    accessibility(){
      this.style.setProperty('--heart-size',(this.getAttribute('size')==='20'?20:16)+'px');
      this.button.setAttribute('aria-pressed',String(this.active));
      this.button.setAttribute('aria-label',this.getAttribute('label')||(this.active?'取消点赞':'点赞'));
      this.button.disabled=this.hasAttribute('disabled');
    }
    stop(){this.controls.forEach(c=>c.stop());this.controls=[];}
    renderFill(value){this.fillProgress=value;this.clip.setAttribute('y',16*(1-value));this.clip.setAttribute('height',16*value);}
    apply(instant=false){
      this.stop();this.accessibility();
      this.sparks.forEach(s=>{s.style.opacity=0;});
      if(instant){this.heart.style.transform='none';this.renderFill(this.active?1:0);return;}
      this.controls.push(animate(this.fillProgress,this.active?1:0,{
        duration:this.active?.23:.18,delay:this.active?.055:0,ease:[.22,1,.36,1],onUpdate:v=>this.renderFill(v)
      }));
      this.controls.push(animate(this.heart,this.active?{
        scale:[null,.84,1.17,.97,1.025,1],rotate:[null,-6,7,-3,1,0],y:[null,.6,-2.1,.15,-.1,0]
      }:{scale:[null,.92,1],rotate:0,y:0},this.active?{
        duration:.56,times:[0,.14,.43,.68,.84,1],ease:['easeOut',[.16,.8,.26,1],'easeInOut','easeInOut','easeOut']
      }:{duration:.22,ease:'easeInOut'}));
      if(this.active)this.sparks.forEach((spark,i)=>{
        const a=[-155,-95,-35,25,85,145][i]*Math.PI/180;
        this.controls.push(animate(spark,{
          opacity:[0,.8,0],x:[-Math.cos(a)*1.5,Math.cos(a)*2.5],y:[-Math.sin(a)*1.5,Math.sin(a)*2.5]
        },{duration:.29,delay:.14+(i%3)*.018,times:[0,.18,1],ease:'easeOut'}));
      });
    }
    finish(){if(this.button)this.apply(true);}
    replay(){this.toggleAttribute('active',false);this.finish();this.active=true;}
    pause(){this.controls.forEach(c=>c.pause());}
    play(){this.controls.forEach(c=>c.play());}
  }
  customElements.define('sipplay-like-heart',LikeHeart);
}
