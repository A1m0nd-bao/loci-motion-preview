const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export class LemonMotion {
 constructor(){this.amount=0;this.velocity=0;this.accumulator=0;this.readyDuration=0;this.released=false;this.opacity=0;this.fadeFrom=0;this.fadeTarget=0;this.fadeElapsed=0;this.fadeDuration=.5;}
 static target(water){const t=clamp((84-water)/(84-38.0044),0,1);return t*t*(3-2*t);}
 settle(water){this.amount=LemonMotion.target(water);this.velocity=0;this.accumulator=0;this.readyDuration=0;this.released=LemonMotion.target(water)>0;this.opacity=this.released?1:0;this.fadeFrom=this.opacity;this.fadeTarget=this.opacity;this.fadeElapsed=0;}
 step(dt,water,iceReady=true){
  if(water>=84){this.readyDuration=0;this.released=false;}
  else if(!this.released){this.readyDuration=iceReady?this.readyDuration+dt:0;if(this.readyDuration>=.1)this.released=true;}
  const target=this.released?LemonMotion.target(water):0;
  const visible=this.released&&target>.001?1:0;
  if(visible!==this.fadeTarget){this.fadeFrom=this.opacity;this.fadeTarget=visible;this.fadeElapsed=0;this.fadeDuration=visible?.5:.18;}
  this.fadeElapsed=Math.min(this.fadeDuration,this.fadeElapsed+dt);
  const t=this.fadeElapsed/this.fadeDuration,ease=t*t*(3-2*t);
  this.opacity=this.fadeFrom+(this.fadeTarget-this.fadeFrom)*ease;
  this.velocity+=((target-this.amount)*190-this.velocity*28)*dt;
  this.amount+=this.velocity*dt;
  if(Math.abs(this.amount-target)<0.00001&&Math.abs(this.velocity)<0.0001){this.amount=target;this.velocity=0;}
 }
 advance(dt,water,iceReady=true){this.accumulator+=clamp(dt,0,1/15);while(this.accumulator+1e-12>=1/120){this.step(1/120,water,iceReady);this.accumulator-=1/120;}}
}
