import { Renderer, Program, Mesh, Triangle } from "https://esm.sh/ogl@1.0.11";

const container = document.querySelector("#homeBlinds");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const gradientConfig = {
  gradientColors: ["#6ef8a4", "#1f8ffd"],
  angle: 0,
  noise: 0.3,
  blindCount: 30,
  blindMinWidth: 60,
  mouseDampening: 0.2,
  mirrorGradient: false,
  spotlightRadius: 0.4,
  spotlightSoftness: 1,
  spotlightOpacity: 1,
  distortAmount: 0,
  shineDirection: "left",
};

function initGradientBlinds(target) {
  const renderer = new Renderer({
    dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    alpha: true,
    antialias: false,
  });
  const gl = renderer.gl;
  const canvas = gl.canvas;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  target.append(canvas);

  const colors = normalizeColors(gradientConfig.gradientColors).map(hexToRgb);
  const uniforms = {
    iResolution: { value: [1, 1, 1] },
    iMouse: { value: [0.5, 0.5] },
    iTime: { value: 0 },
    uColor0: { value: colors[0] },
    uColor1: { value: colors[1] },
    uColor2: { value: colors[2] },
    uColor3: { value: colors[3] },
    uAngle: { value: gradientConfig.angle },
    uNoise: { value: gradientConfig.noise },
    uBlindCount: { value: gradientConfig.blindCount },
    uSpotlightRadius: { value: gradientConfig.spotlightRadius },
    uSpotlightSoftness: { value: gradientConfig.spotlightSoftness },
    uSpotlightOpacity: { value: gradientConfig.spotlightOpacity },
    uMirrorGradient: { value: gradientConfig.mirrorGradient ? 1 : 0 },
    uDistortAmount: { value: gradientConfig.distortAmount },
    uShineDirection: { value: gradientConfig.shineDirection === "right" ? 1 : -1 },
  };

  const program = new Program(gl, { vertex, fragment, uniforms });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  let frame = 0;
  let lastPointer = [0.52, 0.6];
  let smoothPointer = [0.52, 0.6];

  const resize = () => {
    const rect = target.getBoundingClientRect();
    renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height));
    uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    uniforms.uBlindCount.value =
      rect.width >= gradientConfig.blindCount * gradientConfig.blindMinWidth
        ? gradientConfig.blindCount
        : Math.max(12, Math.min(gradientConfig.blindCount, Math.floor(rect.width / 36)));
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(target);
  resize();

  const onPointerMove = (event) => {
    const rect = target.getBoundingClientRect();
    lastPointer = [
      (event.clientX - rect.left) / Math.max(1, rect.width),
      1 - (event.clientY - rect.top) / Math.max(1, rect.height),
    ];
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  const render = (time) => {
    frame = window.requestAnimationFrame(render);
    smoothPointer[0] += (lastPointer[0] - smoothPointer[0]) * gradientConfig.mouseDampening;
    smoothPointer[1] += (lastPointer[1] - smoothPointer[1]) * gradientConfig.mouseDampening;
    uniforms.iMouse.value = smoothPointer;
    uniforms.iTime.value = time * 0.001;
    renderer.render({ scene: mesh });
  };
  frame = window.requestAnimationFrame(render);

  window.addEventListener(
    "pagehide",
    () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
    },
    { once: true },
  );
}

function normalizeColors(input) {
  const fallback = ["#6ef8a4", "#1f8ffd"];
  const colors = Array.isArray(input) && input.length ? input : fallback;
  while (colors.length < 4) colors.push(colors[colors.length - 1]);
  return colors.slice(0, 4);
}

function hexToRgb(hex) {
  const value = hex.replace("#", "").padEnd(6, "0");
  return [
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255,
  ];
}

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 iResolution;
uniform vec2 iMouse;
uniform float iTime;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirrorGradient;
uniform float uDistortAmount;
uniform float uShineDirection;
varying vec2 vUv;

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 gradientColor(float t) {
  if (t < 0.34) return mix(uColor0, uColor1, smoothstep(0.0, 0.34, t));
  if (t < 0.68) return mix(uColor1, uColor2, smoothstep(0.34, 0.68, t));
  return mix(uColor2, uColor3, smoothstep(0.68, 1.0, t));
}

void main() {
  vec2 uv = vUv;
  float aspect = iResolution.x / max(iResolution.y, 1.0);
  vec2 centered = uv * 2.0 - 1.0;
  centered.x *= aspect;

  centered += vec2(
    sin(centered.y * 5.0 + iTime * 0.24),
    cos(centered.x * 4.0 + iTime * 0.2)
  ) * uDistortAmount * 0.08;

  mat2 rot = mat2(cos(uAngle), -sin(uAngle), sin(uAngle), cos(uAngle));
  vec2 tilted = rot * centered;
  float t = tilted.x * 0.34 + 0.52;
  if (uMirrorGradient > 0.5) {
    t = 1.0 - abs(1.0 - 2.0 * fract(t));
  }
  vec3 base = gradientColor(clamp(t, 0.0, 1.0));

  float blindCount = max(1.0, uBlindCount);
  float stripe = fract((tilted.x + 1.4) * blindCount + sin(iTime * 0.18) * 0.08);
  float blinds = smoothstep(0.16, 0.86, stripe);
  float shineBase = uShineDirection < 0.0 ? 1.0 - stripe : stripe;
  float shine = pow(1.0 - abs(shineBase - 0.5) * 2.0, 3.0);

  vec2 mouse = vec2(iMouse.x, iMouse.y);
  float radius = max(0.001, uSpotlightRadius);
  float softness = max(0.001, uSpotlightSoftness);
  float spotlight = smoothstep(radius + softness * 0.35, radius * 0.16, distance(uv, mouse)) * uSpotlightOpacity;
  float noise = (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise * 0.16;

  vec3 color = base * (0.18 + blinds * 0.3) + shine * vec3(0.06, 0.12, 0.12);
  color += spotlight * vec3(0.08, 0.12, 0.1);
  color += noise * 0.7;
  gl_FragColor = vec4(color, 1.0);
}
`;

if (container && !prefersReducedMotion) {
  initGradientBlinds(container);
}
