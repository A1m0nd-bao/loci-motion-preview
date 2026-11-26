// Preview-only clock. Original source files and downloads are never rewritten.
export function previewClock(config) {
  const SearchParams = URLSearchParams;
  if (config.search) window.URLSearchParams = class extends SearchParams { constructor(value) { super(value === location.search ? config.search : value); } };
  const realNow = performance.now.bind(performance), realRaf = requestAnimationFrame.bind(window);
  const realCancel = cancelAnimationFrame.bind(window), realTimeout = setTimeout.bind(window), realClear = clearTimeout.bind(window);
  let running = true, explicitlyPlayed = false, rate = 1, elapsed = realNow(), anchor = realNow(), frame = 0, wake = 0, sequence = 1;
  const epoch = Date.now() - elapsed, frames = new Map(), timers = new Map(), held = new Set(), rates = new WeakMap(), appliedRates = new WeakMap(), iterations = new WeakMap();
  const now = () => elapsed + (running ? (realNow() - anchor) * rate : 0);
  const freeze = () => { elapsed = now(); anchor = realNow(); };
  performance.now = now;
  Date.now = () => epoch + now();
  function nativeAnimations() { return document.getAnimations().filter(a => !a.effect?.target?.closest?.('[data-preview-ui]')); }
  function applyNative() {
    for (const a of nativeAnimations()) {
      if (!rates.has(a) || (appliedRates.has(a) && a.playbackRate !== appliedRates.get(a))) rates.set(a, a.playbackRate || 1);
      const playbackRate = rates.get(a) * rate;
      a.updatePlaybackRate(playbackRate); appliedRates.set(a, playbackRate);
      if (!running && (a.playState === 'running' || a.pending)) { held.add(a); a.pause(); }
      else if (running && held.has(a)) { held.delete(a); a.play(); }
    }
  }
  function schedule() {
    if (!running || frame || wake) return;
    if (frames.size) frame = realRaf(tick);
    else if (timers.size) {
      const next = Math.min(...[...timers.values()].map(t => t.at));
      wake = realTimeout(() => { wake = 0; tick(); }, Math.max(1, (next - now()) / rate));
    }
  }
  function tick() {
    frame = 0; if (!running) return;
    const time = now(), callbacks = [...frames]; frames.clear();
    for (const [id, timer] of [...timers]) {
      if (timer.at > time || !timers.has(id)) continue;
      if (timer.interval) timer.at = time + timer.interval; else timers.delete(id);
      try { typeof timer.fn === 'function' ? timer.fn(...timer.args) : window.eval(String(timer.fn)); } catch (e) { realTimeout(() => { throw e; }); }
    }
    for (const [, fn] of callbacks) { try { fn(time); } catch (e) { realTimeout(() => { throw e; }); } }
    schedule();
  }
  window.requestAnimationFrame = fn => { const id = sequence++; frames.set(id, fn); if (wake) { realClear(wake); wake = 0; } schedule(); return id; };
  window.cancelAnimationFrame = id => frames.delete(id);
  function timer(fn, delay, interval, args) {
    const id = sequence++; timers.set(id, {fn, args, at:now() + Math.max(0, Number(delay) || 0), interval});
    if (wake) { realClear(wake); wake = 0; } schedule(); return id;
  }
  window.setTimeout = (fn, delay, ...args) => timer(fn, delay, 0, args);
  window.setInterval = (fn, delay, ...args) => timer(fn, delay, Math.max(1, Number(delay) || 0), args);
  window.clearTimeout = window.clearInterval = id => timers.delete(id);
  const originalAnimate = Element.prototype.animate;
  Element.prototype.animate = function(...args) { const a = originalAnimate.apply(this, args); realTimeout(applyNative); return a; };
  function setRunning(value) {
    freeze(); running = !!value; anchor = realNow();
    if (!running) { realCancel(frame); realClear(wake); frame = wake = 0; }
    applyNative(); schedule();
  }
  function setSpeed(value) { freeze(); rate = Math.max(.25, Math.min(3, Number(value) || 1)); applyNative(); if (wake) { realClear(wake); wake = 0; } schedule(); }
  function setLoop(value) {
    let supported = false;
    for (const a of nativeAnimations()) {
      if (!iterations.has(a)) iterations.set(a, a.effect.getTiming().iterations);
      const original = iterations.get(a);
      if (original > 1) { supported = true; a.effect.updateTiming({iterations:value ? original : 1}); }
    }
    return supported;
  }
  function background(color) {
    document.documentElement.style.setProperty('--preview-bg', color);
    document.documentElement.style.setProperty('background-color', color, 'important');
    document.body?.style.setProperty('background-color', color, 'important');
  }
  window.__motionPreview = {play:() => { explicitlyPlayed=true;setRunning(true); }, pause:() => setRunning(false), speed:setSpeed, loop:setLoop, background,
    state:() => ({running, rate, time:now(), pendingFrames:frames.size, pendingTimers:timers.size, loopSupported:nativeAnimations().some(a => (iterations.get(a) || a.effect?.getTiming().iterations) > 1)})};
  addEventListener('pagehide', () => setRunning(false));
  document.addEventListener('visibilitychange', () => { if (document.hidden) setRunning(false); });
  addEventListener('animationstart', () => realTimeout(applyNative), true);
  document.addEventListener('DOMContentLoaded', () => {
    setSpeed(config.speed); background(config.background);
    parent.postMessage({type:'sipplay-preview-ready',token:config.readyToken},new URL(document.baseURI).origin);
    realTimeout(() => { if (config.poster && !explicitlyPlayed) setRunning(false); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500);
  }, {once:true});
}
