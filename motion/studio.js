import { animate } from "motion";
let controls = [];
function replay() {
  controls.forEach(control => control.stop());
  controls = [
    animate(".studio-orb", { x: [-80, 80, -80], rotate: [-10, 10, -10] }, {
      duration: 1.6, ease: "easeInOut", times: [0, 0.5, 1],
    }),
    animate(".studio-panel", { opacity: [0, 1], y: [20, 0], scale: [0.94, 1] }, {
      duration: 0.65, ease: [0.22, 1, 0.36, 1],
    }),
  ];
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) controls.forEach(control => control.complete());
}
document.querySelector("#studioReplay").addEventListener("click", replay);
window.addEventListener("pagehide", () => controls.forEach(control => control.stop()));
replay();
