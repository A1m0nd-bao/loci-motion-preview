import { Renderer, Program, Mesh, Triangle } from "https://esm.sh/ogl@1.0.11";

const container = document.querySelector("#homeBlinds");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MAX_COLORS = 8;
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

  const { colors, count } = prepStops(gradientConfig.gradientColors);
  const uniforms = {
    iResolution: { value: [1, 1, 1] },
    iMouse: { value: [0, 0] },
    iTime: { value: 0 },
    uColor0: { value: colors[0] },
    uColor1: { value: colors[1] },
    uColor2: { value: colors[2] },
    uColor3: { value: colors[3] },
    uColor4: { value: colors[4] },
    uColor5: { value: colors[5] },
    uColor6: { value: colors[6] },
    uColor7: { value: colors[7] },
    uColorCount: { value: count },
    uAngle: { value: (gradientConfig.angle * Math.PI) / 180 },
    uNoise: { value: gradientConfig.noise },
    uBlindCount: { value: gradientConfig.blindCount },
    uSpotlightRadius: { value: gradientConfig.spotlightRadius },
    uSpotlightSoftness: { value: gradientConfig.spotlightSoftness },
    uSpotlightOpacity: { value: gradientConfig.spotlightOpacity },
    uMirror: { value: gradientConfig.mirrorGradient ? 1 : 0 },
    uDistort: { value: gradientConfig.distortAmount },
    uShineFlip: { value: gradientConfig.shineDirection === "right" ? 1 : 0 },
  };

  const program = new Program(gl, { vertex, fragment, uniforms });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
  let frame = 0;
  let lastTime = 0;
  const targetPointer = [0, 0];

  const resize = () => {
    const rect = target.getBoundingClientRect();
    renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height));
    uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
    targetPointer[0] = gl.drawingBufferWidth / 2;
    targetPointer[1] = gl.drawingBufferHeight / 2;
    uniforms.iMouse.value = [targetPointer[0], targetPointer[1]];
    if (gradientConfig.blindMinWidth > 0) {
      uniforms.uBlindCount.value = Math.max(
        1,
        Math.min(gradientConfig.blindCount, Math.floor(rect.width / gradientConfig.blindMinWidth)),
      );
    }
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(target);
  resize();

  const onPointerMove = (event) => {
    const rect = target.getBoundingClientRect();
    const scaleX = gl.drawingBufferWidth / Math.max(1, rect.width);
    const scaleY = gl.drawingBufferHeight / Math.max(1, rect.height);
    targetPointer[0] = (event.clientX - rect.left) * scaleX;
    targetPointer[1] = (rect.height - (event.clientY - rect.top)) * scaleY;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true });

  const render = (time) => {
    frame = window.requestAnimationFrame(render);
    const dt = lastTime ? (time - lastTime) / 1000 : 0;
    lastTime = time;
    const factor =
      gradientConfig.mouseDampening > 0
        ? 1 - Math.exp(-dt / Math.max(0.0001, gradientConfig.mouseDampening))
        : 1;
    uniforms.iMouse.value[0] += (targetPointer[0] - uniforms.iMouse.value[0]) * factor;
    uniforms.iMouse.value[1] += (targetPointer[1] - uniforms.iMouse.value[1]) * factor;
    uniforms.iTime.value = time * 0.001;
    renderer.render({ scene: mesh });
  };
  frame = window.requestAnimationFrame(render);

  window.addEventListener(
    "pagehide",
    () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      resizeObserver.disconnect();
    },
    { once: true },
  );
}

function prepStops(input) {
  const fallback = ["#6ef8a4", "#1f8ffd"];
  const stops = (Array.isArray(input) && input.length ? input : fallback).slice(0, MAX_COLORS);
  if (stops.length === 1) stops.push(stops[0]);
  while (stops.length < MAX_COLORS) stops.push(stops[stops.length - 1]);
  return {
    colors: stops.map(hexToRgb),
    count: Math.max(2, Math.min(MAX_COLORS, Array.isArray(input) && input.length ? input.length : 2)),
  };
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
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;
uniform int uColorCount;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
varying vec2 vUv;

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 gradientColor(float t) {
  float tt = clamp(t, 0.0, 1.0);
  int count = uColorCount;
  if (count < 2) count = 2;
  float scaled = tt * float(count - 1);
  float seg = floor(scaled);
  float f = fract(scaled);
  if (seg < 1.0) return mix(uColor0, uColor1, f);
  if (seg < 2.0 && count > 2) return mix(uColor1, uColor2, f);
  if (seg < 3.0 && count > 3) return mix(uColor2, uColor3, f);
  if (seg < 4.0 && count > 4) return mix(uColor3, uColor4, f);
  if (seg < 5.0 && count > 5) return mix(uColor4, uColor5, f);
  if (seg < 6.0 && count > 6) return mix(uColor5, uColor6, f);
  if (seg < 7.0 && count > 7) return mix(uColor6, uColor7, f);
  if (count > 7) return uColor7;
  if (count > 6) return uColor6;
  if (count > 5) return uColor5;
  if (count > 4) return uColor4;
  if (count > 3) return uColor3;
  if (count > 2) return uColor2;
  return uColor1;
}

void main() {
  vec2 uv0 = vUv;
  float aspect = iResolution.x / max(iResolution.y, 1.0);
  vec2 p = uv0 * 2.0 - 1.0;
  p.x *= aspect;

  mat2 rot = mat2(cos(uAngle), -sin(uAngle), sin(uAngle), cos(uAngle));
  vec2 pr = rot * p;
  pr.x /= aspect;
  vec2 uv = pr * 0.5 + 0.5;

  vec2 uvMod = uv;
  if (uDistort > 0.0) {
    float a = uvMod.y * 6.0;
    float b = uvMod.x * 6.0;
    float w = 0.01 * uDistort;
    uvMod.x += sin(a) * w;
    uvMod.y += cos(b) * w;
  }

  float t = uv.x;
  if (uMirror > 0.5) {
    t = 1.0 - abs(1.0 - 2.0 * fract(t));
  }
  vec3 base = gradientColor(clamp(t, 0.0, 1.0));

  vec2 mouse = vec2(iMouse.x / iResolution.x, iMouse.y / iResolution.y);
  float radius = max(0.001, uSpotlightRadius);
  float d = length(uv0 - mouse);
  float dn = d / radius;
  float spotlight = (1.0 - 2.0 * pow(dn, uSpotlightSoftness)) * uSpotlightOpacity;
  float noise = (rand(gl_FragCoord.xy + iTime) - 0.5) * uNoise * 0.16;

  float stripe = fract(uvMod.x * max(uBlindCount, 1.0));
  if (uShineFlip > 0.5) stripe = 1.0 - stripe;

  vec3 color = vec3(spotlight) + base - vec3(stripe);
  color += noise;
  gl_FragColor = vec4(color, 1.0);
}
`;

if (container && !prefersReducedMotion) {
  initGradientBlinds(container);
}
