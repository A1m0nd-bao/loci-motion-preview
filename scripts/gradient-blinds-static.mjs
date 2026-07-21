import { Renderer, Program, Mesh, Triangle } from "https://esm.sh/ogl@1.0.11";

const container = document.querySelector("#homeBlinds");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  const colors = ["#0a0c10", "#48d6c6", "#f5c66a", "#161b23"].map(hexToRgb);
  const uniforms = {
    iResolution: { value: [1, 1, 1] },
    iMouse: { value: [0.5, 0.5] },
    iTime: { value: 0 },
    uColor0: { value: colors[0] },
    uColor1: { value: colors[1] },
    uColor2: { value: colors[2] },
    uColor3: { value: colors[3] },
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
    smoothPointer[0] += (lastPointer[0] - smoothPointer[0]) * 0.08;
    smoothPointer[1] += (lastPointer[1] - smoothPointer[1]) * 0.08;
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

  float angle = -0.38;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 tilted = rot * centered;
  float t = tilted.x * 0.34 + 0.52;
  vec3 base = gradientColor(clamp(t, 0.0, 1.0));

  float blindCount = max(8.0, iResolution.x / 92.0);
  float stripe = fract((tilted.x + 1.4) * blindCount + sin(iTime * 0.18) * 0.08);
  float blinds = smoothstep(0.16, 0.86, stripe);
  float shine = pow(1.0 - abs(stripe - 0.5) * 2.0, 3.0);

  vec2 mouse = vec2(iMouse.x, iMouse.y);
  float spotlight = smoothstep(0.72, 0.0, distance(uv, mouse));
  float noise = (rand(gl_FragCoord.xy + iTime) - 0.5) * 0.05;

  vec3 color = base * (0.32 + blinds * 0.42) + shine * vec3(0.12, 0.22, 0.2);
  color += spotlight * vec3(0.16, 0.18, 0.12);
  color += noise;
  gl_FragColor = vec4(color, 1.0);
}
`;

if (container && !prefersReducedMotion) {
  initGradientBlinds(container);
}
