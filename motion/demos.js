import { animate, hover, press, stagger, scroll } from "motion";

export const motionDemoMarkup = {
  "motion-js-spring": '<div class="m-stage"><div class="m-track"><div class="m-puck" data-puck>✦</div></div><button class="m-button" type="button" data-replay aria-pressed="false">切换位置</button></div>',
  "motion-js-stagger": '<div class="m-stage"><div class="m-tiles"><div class="m-tile"><span>01</span><strong>Design</strong></div><div class="m-tile"><span>02</span><strong>Motion</strong></div><div class="m-tile"><span>03</span><strong>Ship</strong></div></div><button class="m-button" type="button" data-replay>重播入场</button></div>',
  "motion-js-gesture": '<div class="m-stage"><button class="m-touch" type="button">按住试试 <span>↗</span></button><output class="m-status" aria-live="polite">悬停、按住或使用键盘</output></div>',
  "motion-js-sequence": '<div class="m-stage"><article class="m-story"><span class="m-kicker" data-step>MAKE IT MOVE</span><h2 data-step>Small moves.<br>Good feelings.</h2><p data-step>让每个元素，在合适的时刻出现。</p><span class="m-chip" data-step>Motion timeline ↗</span></article><button class="m-button" type="button" data-replay>重播时间线</button></div>',
  "motion-js-path": '<div class="m-stage"><svg class="m-path" width="280" height="140" viewBox="0 0 280 140" fill="none" aria-label="曲线描边"><path d="M22 96C48 96 43 40 76 40S103 112 137 103S161 24 195 38S221 101 258 47" stroke="#c8b7fe" stroke-width="5" stroke-linecap="round"/></svg><button class="m-button" type="button" data-replay>重播描边</button></div>',
  "motion-js-scroll": '<div class="m-stage"><div class="m-scroll-wrap"><div class="m-progress-track"><div class="m-progress" role="progressbar" aria-label="滚动进度" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div></div><div class="m-scroll" tabindex="0" role="region" aria-label="在此滚动体验"><section><small>01 / SCROLL</small><h2>往下滚动 ↓</h2><p>上方进度条会跟随你的位置。</p></section><section><small>02 / PROGRESS</small><h2>Keep moving.</h2><p>也可以使用方向键和 Page Down。</p></section><section><small>03 / DONE</small><h2>到达终点。</h2><p>向上滚动，进度也会一起回退。</p></section></div></div></div>',
};

// This function is serialized into downloadable HTML; retain its lexical imports.
export function mountMotionDemo(root, id, values = {}, compact = false) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let controls = [];
  const cleanups = [];
  let disposed = false;
  let paused = false;
  let right = false;
  let syncScroll;
  const duration = () => reduced.matches ? 0 : (values.duration ?? 0.6);
  const stop = () => { controls.forEach(control => control.stop()); controls = []; };
  const track = control => { controls.push(control); if (paused) control.pause(); return control; };
  const on = (element, event, fn) => { element.addEventListener(event, fn); cleanups.push(() => element.removeEventListener(event, fn)); };
  const replay = () => {
    if (disposed) return;
    stop();
    if (id === "motion-js-spring") {
      const puck = root.querySelector("[data-puck]");
      root.querySelector("[data-replay]").setAttribute("aria-pressed", String(right));
      track(animate(puck, { x: right ? 76 : -76, rotate: right ? 8 : -8 }, { type: "spring", duration: duration(), bounce: values.bounce ?? 0.3 }));
    }
    if (id === "motion-js-stagger") {
      track(animate(root.querySelectorAll(".m-tile"), { y: [28, 0], opacity: [0, 1], scale: [0.92, 1] }, {
        duration: duration(), delay: reduced.matches ? 0 : stagger(values.interval ?? 0.1), ease: [0.22, 1, 0.36, 1],
      }));
    }
    if (id === "motion-js-sequence") {
      const steps = [...root.querySelectorAll("[data-step]")];
      track(animate([
        [steps[0], { opacity: [0, 1], y: [12, 0] }, { at: 0 }],
        [steps[1], { opacity: [0, 1], y: [20, 0] }, { at: reduced.matches ? 0 : (values.interval ?? 0.12) }],
        [steps[2], { opacity: [0, 1], y: [16, 0] }, { at: reduced.matches ? 0 : (values.interval ?? 0.12) * 2 }],
        [steps[3], { opacity: [0, 1], scale: [0.9, 1] }, { at: reduced.matches ? 0 : (values.interval ?? 0.12) * 3 }],
      ], { defaultTransition: { duration: duration(), ease: [0.22, 1, 0.36, 1] } }));
    }
    if (id === "motion-js-path") {
      const path = root.querySelector("path");
      const length = path.getTotalLength();
      path.style.strokeDasharray = String(length);
      track(animate(path, { strokeDashoffset: [length, 0] }, { duration: duration(), ease: "easeInOut" }));
    }
  };
  const replayButton = root.querySelector("[data-replay]");
  if (replayButton) on(replayButton, "click", () => { right = !right; replay(); });
  if (id === "motion-js-gesture") {
    const button = root.querySelector(".m-touch");
    const status = root.querySelector(".m-status");
    const move = (scale, rotate, text) => {
      stop(); status.textContent = text;
      track(animate(button, { scale, rotate }, { type: "spring", duration: duration(), bounce: values.bounce ?? 0.3 }));
    };
    cleanups.push(hover(button, () => {
      move(1.06, -2, "轻轻抬起");
      return () => move(1, 0, "悬停、按住或使用键盘");
    }));
    cleanups.push(press(button, () => {
      move(0.92, 0, "按压中…");
      return (_, event) => move(1, 0, event ? "松开，轻轻回弹" : "已收稳");
    }));
  }
  if (id === "motion-js-scroll") {
    const container = root.querySelector(".m-scroll");
    const progress = root.querySelector(".m-progress");
    syncScroll = () => {
      const value = container.scrollTop / Math.max(1, container.scrollHeight - container.clientHeight);
      progress.style.transform = `scaleX(${value})`;
      progress.setAttribute("aria-valuenow", String(Math.round(value * 100)));
    };
    cleanups.push(scroll(() => { if (!paused) syncScroll(); }, { container }));
    syncScroll();
  }
  const onReduce = () => { if (reduced.matches) { replay(); controls.forEach(control => control.complete()); } };
  reduced.addEventListener("change", onReduce);
  cleanups.push(() => reduced.removeEventListener("change", onReduce));
  replay();
  return {
    replay() { paused = false; replay(); },
    play() {
      if (disposed) return;
      if (paused) { paused = false; controls.forEach(control => control.play()); syncScroll?.(); }
      else if (compact) { right = !right; replay(); }
    },
    pause() { paused = true; controls.forEach(control => control.pause()); },
    finish() { controls.forEach(control => control.complete()); paused = true; },
    destroy() { disposed = true; stop(); cleanups.forEach(cleanup => cleanup()); },
  };
}

export const motionDemoCSS = `
:root{color-scheme:dark;--demo-bg:#0a0c10;font-family:Inter,system-ui,sans-serif;color:#f5f2fa}
*{box-sizing:border-box}body{margin:0;background:var(--demo-bg)}button{font:inherit;cursor:pointer}button:focus-visible,[tabindex]:focus-visible{outline:2px solid #c8b7fe;outline-offset:5px}
#demo{display:grid;place-items:center;min-height:100vh;padding:28px;text-align:center;overflow:hidden}.m-stage{display:flex;flex-direction:column;align-items:center;gap:28px;width:min(100%,340px)}
.m-button{min-height:40px;padding:10px 18px;background:#20202a;border:1px solid #3a3448;border-radius:9px;color:#d8d1e5;font-size:13px}.m-track{display:grid;place-items:center;width:280px;height:130px;border:1px dashed #39323f;border-radius:18px;background:#14121b}.m-puck{display:grid;place-items:center;width:64px;height:64px;background:#c8b7fe;color:#211b2a;border-radius:18px;font-size:32px}
.m-tiles{display:flex;gap:10px;width:100%}.m-tile{display:flex;flex:1;min-width:0;flex-direction:column;align-items:flex-start;gap:30px;padding:18px 13px;border:1px solid #514561;border-radius:13px;background:#272030;text-align:left}.m-tile span{font-size:12px;color:#a99cba}.m-tile strong{font-size:17px}.m-tile:nth-child(2){background:#342b45}.m-tile:nth-child(3){background:#3c2e3f}
.m-touch{display:flex;align-items:center;gap:35px;min-height:74px;padding:20px 25px;border:0;border-radius:16px;background:#c8b7fe;color:#211b2a;font-size:21px;font-weight:650;touch-action:manipulation}.m-touch span{font-size:28px}.m-status{color:#a9a5b6;font-size:12px;min-height:20px}
.m-story{width:100%;padding:28px;text-align:left;background:#221c2b;border:1px solid #4d405b;border-radius:18px}.m-kicker{display:block;font-size:10px;letter-spacing:.16em;color:#c8b7fe}.m-story h2{margin:18px 0 12px;font-size:30px;line-height:1.13;letter-spacing:-.04em}.m-story p{margin:0 0 22px;color:#b1a7bd;font-size:12px;line-height:1.7}.m-chip{display:inline-block;background:#c8b7fe;color:#211b2a;border-radius:30px;padding:6px 11px;font-size:11px}
.m-path{display:block;width:min(100%,280px);height:auto}.m-scroll-wrap{width:min(100%,300px);border:1px solid #40354d;border-radius:14px;overflow:hidden;background:#1d1826}.m-progress-track{height:5px;background:#37303e}.m-progress{height:100%;width:100%;background:#c8b7fe;transform:scaleX(0);transform-origin:left}.m-scroll{height:250px;overflow-y:auto;overscroll-behavior:contain;text-align:left;scrollbar-width:thin}.m-scroll section{min-height:240px;padding:34px 24px}.m-scroll section:nth-child(2){background:#282034}.m-scroll section:nth-child(3){background:#31283c}.m-scroll small{color:#c8b7fe;font-size:10px;letter-spacing:.12em}.m-scroll h2{font-size:26px;letter-spacing:-.04em}.m-scroll p{font-size:12px;color:#aaa0b5;line-height:1.7}
.compact #demo{padding:16px}.compact .m-stage{gap:14px}.compact .m-button,.compact .m-status{display:none}.compact .m-track{width:240px;height:115px}.compact .m-story{padding:20px}.compact .m-story h2{font-size:25px;margin:10px 0}.compact .m-story p{margin-bottom:14px}.compact .m-scroll{height:160px}.compact .m-tile{padding:14px 10px;gap:22px}.compact .m-tile strong{font-size:14px}
@media(max-width:360px){#demo{padding:18px}.m-tile{padding:15px 10px}.m-tile strong{font-size:15px}}
`;
