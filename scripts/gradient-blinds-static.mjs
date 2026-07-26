const container = document.querySelector("#homeBlinds");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let active = false;
let frame = 0;
let targetX = 60;
let targetY = 52;
let currentX = 60;
let currentY = 52;

function writePointer() {
  frame = 0;
  if (!container || !active) return;

  currentX += (targetX - currentX) * 0.22;
  currentY += (targetY - currentY) * 0.22;
  container.style.setProperty("--home-x", `${currentX.toFixed(2)}%`);
  container.style.setProperty("--home-y", `${currentY.toFixed(2)}%`);

  if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
    frame = window.requestAnimationFrame(writePointer);
  }
}

function requestWrite() {
  if (!frame) frame = window.requestAnimationFrame(writePointer);
}

function updateTarget(event) {
  if (!container || !active) return;
  const rect = container.getBoundingClientRect();
  targetX = ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100;
  targetY = ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100;
  requestWrite();
}

function wakeHomeVisual() {
  if (!container || prefersReducedMotion) return;
  active = true;
  container.classList.add("is-ready");
  requestWrite();
}

function sleepHomeVisual() {
  active = false;
  window.cancelAnimationFrame(frame);
  frame = 0;
}

if (container && !prefersReducedMotion) {
  container.style.setProperty("--home-x", `${currentX}%`);
  container.style.setProperty("--home-y", `${currentY}%`);
  window.addEventListener("pointermove", updateTarget, { passive: true });
  window.addEventListener("motion-home-visual-wake", wakeHomeVisual);
  window.addEventListener("motion-home-visual-sleep", sleepHomeVisual);
  window.addEventListener("pagehide", sleepHomeVisual, { once: true });
}
