const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export class IcePhysics {
  constructor(poses,onRender,onSplash=()=>{}) {
    this.poses=poses;this.onRender=onRender;this.onSplash=onSplash;this.water=185.09;this.clock=0;this.accumulator=0;
    this.bodies=Array.from({length:4},(_,i)=>({x:80,y:15,vx:0,vy:0,angle:0,spin:0,size:24,alpha:0,visible:0,delay:0,inWater:false,spawned:false,index:i,target:null}));
  }
  setTarget(position,water,instant=false){
    this.water=water;const lo=Math.min(2,Math.floor(position)),t=position-lo;
    for(let i=0;i<4;i++){
      const a=this.poses[lo][i]||this.poses[lo+1][i]||this.poses.find(state=>state[i])[i],b=this.poses[lo+1][i]||a;
      const presence=i===0?1:clamp(position-i+1,0,1),body=this.bodies[i];
      const target={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,angle:a.angle+(b.angle-a.angle)*t,size:a.size+(b.size-a.size)*t,alpha:a.alpha+(b.alpha-a.alpha)*t,presence};
      if(body.visible<=.005 && presence>.005 && !body.spawned){body.spawned=true;body.x=target.x+(i%2?3:-3);body.y=10-i*5;body.vx=(i%2?1:-1)*9;body.vy=0;body.angle=target.angle+(i%2?22:-20);body.spin=(i%2?1:-1)*40;body.delay=this.clock+i*.075;body.inWater=false;}
      if(presence<=.005&&body.visible<.003)body.spawned=false;
      body.target=target;
      if(instant){Object.assign(body,{x:target.x,y:target.y,angle:target.angle,size:target.size,alpha:target.alpha,visible:presence,spawned:presence>0,vx:0,vy:0,spin:0,inWater:true});}
    }
    if(instant)this.onRender(this.bodies);
  }
  advance(elapsed,position,water){
    this.accumulator+=clamp(elapsed,0,1/15);
    const h=1/120;
    while(this.accumulator+1e-12>=h){this.setTarget(position,water);this.step(h);this.accumulator-=h;}
  }
  get garnishReady(){
    for(const b of this.bodies)if(!b.target||b.target.presence<.95||b.visible<.95||!b.inWater||Math.hypot(b.vx,b.vy)>35)return false;
    return true;
  }
  step(dt){
    dt=clamp(dt,0,1/30);this.clock+=dt;
    for(const b of this.bodies){
      const q=b.target;if(!q)continue;
      if(this.clock<b.delay)continue;
      b.visible+=(q.presence-b.visible)*(1-Math.exp(-dt*(q.presence>b.visible?13:10)));
      b.alpha=q.alpha;b.size+=(q.size-b.size)*(1-Math.exp(-dt*12));
      if(b.visible<.003)continue;
      const wet=b.y>this.water-2;
      if(wet&&!b.inWater&&b.vy>25){this.onSplash(Math.min(1.3,b.vy*.008));b.vy*=.38;b.vx+=(b.index%2?-1:1)*8;b.spin+=(b.index%2?1:-1)*32;}
      b.inWater=wet;
      const depthTarget=q.y+(q.presence<.3?6:0);
      const ax=(q.x-b.x)*27-b.vx*(wet?6.6:2.1);
      const ay=wet?(depthTarget-b.y)*48-b.vy*10.4:360;
      b.vx+=ax*dt;b.vy=clamp(b.vy+ay*dt,-160,175);b.x+=b.vx*dt;b.y+=b.vy*dt;
      const desired=q.angle+b.vx*.25;
      b.spin+=((desired-b.angle)*28-b.spin*(wet?7:2.3))*dt;b.angle+=b.spin*dt;
      const theta=b.angle*Math.PI/180,half=b.size*.5*(Math.abs(Math.cos(theta))+Math.abs(Math.sin(theta)));
      const left=48+half+.7,right=113-half-.7;
      if(b.x<left){b.x=left;b.vx=Math.abs(b.vx)*.23;b.spin+=Math.min(22,Math.abs(b.vy)*.2);}
      if(b.x>right){b.x=right;b.vx=-Math.abs(b.vx)*.23;b.spin-=Math.min(22,Math.abs(b.vy)*.2);}
      if(b.y>202-b.size*.42){b.y=202-b.size*.42;b.vy=-Math.abs(b.vy)*.16;}
    }
    // Circle proxies keep transparent rounded squares from passing through one another.
    for(let pass=0;pass<3;pass++)for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
      const a=this.bodies[i],b=this.bodies[j];if(a.visible<.15||b.visible<.15)continue;
      let dx=b.x-a.x,dy=b.y-a.y;let distance=Math.hypot(dx,dy);const minimum=(a.size+b.size)*.43;
      if(distance>=minimum)continue;if(distance<.001){dx=1;dy=.1;distance=Math.hypot(dx,dy);}
      const nx=dx/distance,ny=dy/distance,overlap=(minimum-distance)*.48;
      a.x-=nx*overlap;a.y-=ny*overlap;b.x+=nx*overlap;b.y+=ny*overlap;
      const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
      if(relative<0){const impulse=-relative*.56;a.vx-=impulse*nx;a.vy-=impulse*ny;b.vx+=impulse*nx;b.vy+=impulse*ny;
        const tangent=(b.vx-a.vx)*(-ny)+(b.vy-a.vy)*nx;a.spin-=tangent*.12;b.spin+=tangent*.12;
      }
    }
    this.onRender(this.bodies);
  }
}
