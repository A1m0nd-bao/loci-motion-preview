import { exampleDocument } from "./examples.js?v=20261020-user-rise-ref";
import { exampleMarkup, normalizeValues } from "./catalog.js?v=20261020-user-rise-ref";

const controllers = new Set();

export function createWebController(host, entry, { detail = false } = {}) {
  const frame = document.createElement("iframe");
  frame.title = `${entry.name} · 可交互 Web 示例`;
  frame.src = `${entry.file}${detail ? "" : "&compact=1"}`;
  frame.setAttribute("referrerpolicy", "no-referrer");
  frame.className = "web-component-frame";
  frame.tabIndex = detail ? 0 : -1;
  host.dataset.kind = "web";
  host.append(frame);
  let loaded = false;
  let disposed = false;
  let state = detail ? "play" : "poster";
  let values = null;
  let resolveReady;
  const ready = new Promise((resolve) => { resolveReady = resolve; });
  const send = (command, extra = {}) => {
    if (loaded && !disposed) frame.contentWindow?.postMessage({ type: "sipplay-web-command", command, ...extra }, location.origin);
  };
  const background = () => send("background", { color: getComputedStyle(document.documentElement).getPropertyValue("--preview-bg").trim() });
  const listener = (event) => {
    if (event.source !== frame.contentWindow || event.origin !== location.origin || event.data?.type !== "sipplay-web-preview" || event.data.id !== entry.id) return;
    if (event.data.status === "error") { fail(); return; }
    if (event.data.status !== "ready") return;
    if (!loaded) {
      loaded = true;
      if (values) send("configure", { values });
      send(state);
      background();
      clearTimeout(timeout);
      resolveReady();
    }
  };
  const fail = () => {
    if (disposed) return;
    const message = document.createElement("p");
    message.className = "web-preview-error";
    message.textContent = "示例加载失败，请点击重播重试。";
    host.replaceChildren(message);
    resolveReady();
  };
  let timeout = setTimeout(fail, 15000);
  window.addEventListener("message", listener);
  const controller = {
    ready: () => ready,
    play() { state = "play"; send("play"); },
    pause() { state = "pause"; send("pause"); },
    showPoster() { state = "poster"; send("poster"); },
    replay() {
      state = "play";
      if (!frame.isConnected) {
        loaded = false;
        clearTimeout(timeout);
        timeout = setTimeout(fail, 15000);
        host.replaceChildren(frame);
        frame.src = frame.src;
      }
      else send("replay");
    },
    configure(nextValues) { values = nextValues; send("configure", { values }); },
    background,
    destroy() {
      disposed = true;
      clearTimeout(timeout);
      window.removeEventListener("message", listener);
      controllers.delete(controller);
      frame.remove();
      resolveReady();
    },
  };
  controllers.add(controller);
  return controller;
}

export function syncWebBackgrounds() { controllers.forEach((controller) => controller.background()); }

export async function copyExample(button, entry, values = {}) {
  try {
    await navigator.clipboard.writeText(exampleDocument(entry, values));
    button.textContent = "已复制 HTML";
  } catch {
    button.textContent = "复制失败，请下载 HTML";
  }
  setTimeout(() => { if (button.isConnected) button.textContent = "复制 HTML"; }, 1600);
}

export function downloadExample(entry, values = {}) {
  const url = URL.createObjectURL(new Blob([exampleDocument(entry, values)], { type: "text/html;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${entry.id}.html`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

let currentValues = {};
let editTimer;
export function getWebValues() { return currentValues; }

export function setupWebDetail(entry, getController) {
  clearTimeout(editTimer);
  const panel = document.querySelector("#webCodePanel");
  const controls = document.querySelector("#webParameters");
  const docs = document.querySelector("#webDocs");
  const isWeb = entry.kind === "web" || entry.kind === "motion";
  panel.hidden = controls.hidden = docs.hidden = !isWeb;
  docs.hidden = !isWeb || !entry.docs;
  document.querySelectorAll("#detailDialog [data-media-only]").forEach((el) => { el.hidden = isWeb; });
  document.querySelector("#detailDialog").classList.toggle("is-web-detail", isWeb);
  document.querySelector("#detailPlay").textContent = isWeb ? "重播 / 恢复交互" : "播放";
  document.querySelector("#detailPause").textContent = isWeb ? "暂停动效" : "暂停";
  document.querySelector("#detailCopy").textContent = isWeb ? "复制 HTML" : "复制路径";
  document.querySelector("#detailOpen").textContent = isWeb ? "独立体验示例 ↗" : "打开文件";
  document.querySelector("#detailDownload").textContent = isWeb ? "下载 HTML 示例" : "下载文件";
  controls.replaceChildren();
  if (!isWeb) return;
  currentValues = normalizeValues(entry);
  docs.href = entry.docs;
  document.querySelector("#webDescription").textContent = entry.description;
  const code = document.querySelector("#webCode");
  const updateCode = () => {
    if (entry.kind === "motion") {
      code.textContent = exampleDocument(entry, currentValues);
      return;
    }
    const setup = entry.custom ? "<!-- 自定义 SVG 状态组件；复制 / 下载 HTML 包含完整实现。 -->" : `// npm install motion-components@1.3.0\nimport 'motion-components/${entry.id}';\nimport 'motion-components/preload.css';`;
    code.textContent = `${setup}\n\n${exampleMarkup(entry, currentValues).replace(/ data-motion/g, "")}`;
  };
  updateCode();
  if (entry.controls.length) {
    const heading = document.createElement("strong");
    heading.textContent = "调整参数";
    controls.append(heading);
  }
  for (const control of entry.controls) {
    const label = document.createElement("label");
    label.className = "field web-parameter";
    const text = document.createElement("span");
    text.textContent = control.label;
    const input = document.createElement("input");
    Object.assign(input, { type: "range", min: control.min, max: control.max, step: control.step, value: control.value });
    input.name = control.attribute;
    const output = document.createElement("output");
    output.textContent = String(control.value);
    label.append(text, input, output);
    input.addEventListener("input", () => {
      currentValues[control.attribute] = Number(input.value);
      output.textContent = input.value;
      updateCode();
      clearTimeout(editTimer);
      editTimer = setTimeout(() => getController()?.configure(currentValues), 160);
    });
    controls.append(label);
  }
  document.querySelector("#webReset").onclick = () => {
    setupWebDetail(entry, getController);
    getController()?.configure(currentValues);
  };
}
