const container = document.querySelector("#homeWaves");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let Renderer;
let Program;
let Mesh;
let Triangle;
let initPromise = null;
let controller = null;

const lineWavesConfig = {
  speed: 0.3,
  innerLineCount: 32,
  outerLineCount: 36,
  warpIntensity: 1,
  rotation: -45,
  edgeFadeWidth: 0,
  colorCycleSpeed: 1,
  brightness: 0.2,
  color1: "#FCD1C5",
  color2: "#FCD1C5",
  color3: "#C8B7FE",
  enableMouseInteraction: true,
  mouseInfluence: 2,
};

async function loadOgl() {
  if (Renderer) return;
  const ogl = await import("https://esm.sh/ogl@1.0.11");
  Renderer = ogl.Renderer;
  Program = ogl.Program;
  Mesh = ogl.Mesh;
  Triangle = ogl.Triangle;
}

async function initLineWaves(target) {
  await loadOgl();

  const renderer = new Renderer({
    dpr: 1,
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
    powerPreference: "high-performance",
  });
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  const canvas = gl.canvas;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  target.append(canvas);

  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: [1, 1, 1] },
    uSpeed: { value: lineWavesConfig.speed },
    uInnerLines: { value: lineWavesConfig.innerLineCount },
    uOuterLines: { value: lineWavesConfig.outerLineCount },
    uWarpIntensity: { value: lineWavesConfig.warpIntensity },
    uRotation: { value: (lineWavesConfig.rotation * Math.PI) / 180 },
    uEdgeFadeWidth: { value: lineWavesConfig.edgeFadeWidth },
    uColorCycleSpeed: { value: lineWavesConfig.colorCycleSpeed },
    uBrightness: { value: lineWavesConfig.brightness },
    uColor1: { value: hexToVec3(lineWavesConfig.color1) },
    uColor2: { value: hexToVec3(lineWavesConfig.color2) },
    uColor3: { value: hexToVec3(lineWavesConfig.color3) },
    uMouse: { value: new Float32Array([0.5, 0.5]) },
    uMouseInfluence: { value: lineWavesConfig.mouseInfluence },
    uEnableMouse: { value: lineWavesConfig.enableMouseInteraction },
  };

  const program = new Program(gl, { vertex, fragment, uniforms });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  let frame = 0;
  let running = false;
  const currentMouse = [0.5, 0.5];
  const targetMouse = [0.5, 0.5];

  const resize = () => {
    const rect = target.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    renderer.setSize(width, height);
    uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height, gl.canvas.width / Math.max(1, gl.canvas.height)];
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(target);
  resize();

  const onPointerMove = (event) => {
    if (!lineWavesConfig.enableMouseInteraction) return;
    const rect = target.getBoundingClientRect();
    targetMouse[0] = clamp01((event.clientX - rect.left) / Math.max(1, rect.width));
    targetMouse[1] = clamp01(1 - (event.clientY - rect.top) / Math.max(1, rect.height));
  };

  const onPointerLeave = () => {
    targetMouse[0] = 0.5;
    targetMouse[1] = 0.5;
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });
  window.addEventListener("mouseleave", onPointerLeave, { passive: true });

  const render = (time) => {
    if (!running) return;
    frame = window.requestAnimationFrame(render);
    uniforms.uTime.value = time * 0.001;

    currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
    currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
    uniforms.uMouse.value[0] = currentMouse[0];
    uniforms.uMouse.value[1] = currentMouse[1];

    renderer.render({ scene: mesh });
    target.classList.add("is-ready");
  };

  const start = () => {
    if (running || prefersReducedMotion) return;
    running = true;
    frame = window.requestAnimationFrame(render);
  };

  const stop = () => {
    running = false;
    window.cancelAnimationFrame(frame);
  };

  controller = { start, stop };
  if (document.body.classList.contains("is-home-view")) start();

  window.addEventListener(
    "pagehide",
    () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      resizeObserver.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
    { once: true },
  );
}

function wakeHomeVisual() {
  if (!container || prefersReducedMotion) return;
  if (!initPromise) {
    initPromise = initLineWaves(container).catch(() => {
      container.classList.add("is-fallback");
    });
  }
  initPromise.then(() => controller?.start?.());
}

function sleepHomeVisual() {
  controller?.stop?.();
}

if (container) {
  window.addEventListener("motion-home-visual-wake", wakeHomeVisual);
  window.addEventListener("motion-home-visual-sleep", sleepHomeVisual);
  if (document.body.classList.contains("is-home-view")) wakeHomeVisual();
}

function hexToVec3(hex) {
  const h = hex.replace("#", "").padEnd(6, "0");
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

const vertex = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)), 5.0);

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;
