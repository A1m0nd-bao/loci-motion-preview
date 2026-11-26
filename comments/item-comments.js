import { commentTerm } from "./comment-term.js";
import { giscusConfig, isGiscusConfigured } from "./giscus-config.js";

const GISCUS_ORIGIN = "https://giscus.app";
const observers = new WeakMap();
const cleanups = new WeakMap();
let desiredTerm = "";

const LOAD_ERROR = "评论没有加载。若 Giscus GitHub App 还没安装到这个仓库，或 giscus.app 暂时访问不了，这里不会出现输入框。浏览和播放不需要登录。";

function hintText(version) {
  const close = "处理完成后回复「已在 vX 处理」。浏览和播放不需要登录。";
  if (version) return `当前预览是 ${version}。留言请写上动效版本；${close}`;
  return `留言请写上动效版本。${close}`;
}

function disconnect(slot) {
  observers.get(slot)?.disconnect();
  observers.delete(slot);
  cleanups.get(slot)?.();
  cleanups.delete(slot);
}

export function clearItemComments(slot) {
  if (!slot) return;
  disconnect(slot);
  slot.querySelector("script[data-giscus-client]")?.remove();
  slot.querySelector("iframe.giscus-frame")?.remove();
  delete slot.dataset.term;
  delete slot.dataset.version;
  slot.hidden = true;
  slot.replaceChildren();
}

export function mountItemComments(slot, item, options = {}) {
  if (!slot) return;
  for (const other of document.querySelectorAll(".item-comments")) {
    if (other !== slot) clearItemComments(other);
  }

  const term = commentTerm(item, options.family);
  const version = options.version || "";
  const live = slot.querySelector("iframe.giscus-frame, script[data-giscus-client], .item-comments-frame, .item-comments-note");
  if (!slot.hidden && slot.dataset.term === term && slot.dataset.version === version && live) return;

  disconnect(slot);
  slot.hidden = false;
  slot.dataset.term = term;
  slot.dataset.version = version;
  slot.replaceChildren();

  const heading = document.createElement("h3");
  heading.id = slot.id ? `${slot.id}Title` : "itemCommentsTitle";
  heading.textContent = "修订备注";
  const hint = document.createElement("p");
  hint.textContent = hintText(version);
  slot.append(heading, hint);
  slot.setAttribute("aria-labelledby", heading.id);

  if (!term) {
    const note = document.createElement("p");
    note.className = "item-comments-note";
    note.textContent = "临时文件没有稳定编号，不挂评论。";
    slot.append(note);
    return;
  }

  const key = document.createElement("p");
  key.className = "item-comments-key";
  key.textContent = `讨论编号 ${term}`;
  slot.append(key);

  if (!isGiscusConfigured()) {
    const note = document.createElement("p");
    note.className = "item-comments-note";
    note.textContent = "评论已按这个编号预留。仓库尚未开启 Discussions，也还没有 Giscus 分类编号，所以现在不能发表。";
    slot.append(note);
    return;
  }

  const frame = document.createElement("div");
  frame.className = "item-comments-frame";
  frame.dataset.term = term;
  const status = document.createElement("p");
  status.className = "item-comments-status";
  status.textContent = "正在连接评论…";
  frame.append(status);
  slot.append(frame);
  whenVisible(slot, frame, term);
}

function whenVisible(slot, frame, term) {
  const root = slot.closest(".detail-shell, .release-detail-shell");
  const load = () => {
    if (frame.isConnected && frame.dataset.term === term) ensureGiscus(frame, term);
  };
  // Load as soon as the dialog paints. An empty frame used to be display:none,
  // so an IntersectionObserver on that frame never ran and Giscus never started.
  requestAnimationFrame(load);
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      observers.delete(slot);
      load();
    },
    { root: root instanceof Element ? root : null, rootMargin: "240px 0px", threshold: 0.01 },
  );
  observers.set(slot, observer);
  observer.observe(slot);
}

function ensureGiscus(frame, term) {
  desiredTerm = term;
  const pending = frame.querySelector("script[data-giscus-client]");
  const iframe = frame.querySelector("iframe.giscus-frame");
  if (iframe) {
    retarget(iframe, term);
    frame.querySelector(".item-comments-status")?.remove();
    return;
  }
  if (pending?.dataset.term === term) return;
  pending?.remove();
  const status = frame.querySelector(".item-comments-status") || document.createElement("p");
  status.className = "item-comments-status";
  if (!status.textContent) status.textContent = "正在连接评论…";
  frame.replaceChildren(status, createScript(term));
  watchFrame(frame);
}

function watchFrame(frame) {
  const slot = frame.closest(".item-comments");
  cleanups.get(slot)?.();
  const finish = (message) => {
    const status = frame.querySelector(".item-comments-status");
    if (frame.querySelector("iframe.giscus-frame")) {
      status?.remove();
      cleanups.get(slot)?.();
      cleanups.delete(slot);
      return;
    }
    if (message && status) status.textContent = message;
  };
  const observer = new MutationObserver(() => finish());
  observer.observe(frame, { childList: true, subtree: true });
  const timer = window.setTimeout(() => finish(LOAD_ERROR), 8000);
  const script = frame.querySelector("script[data-giscus-client]");
  const onError = () => finish(LOAD_ERROR);
  script?.addEventListener("error", onError);
  const stop = () => {
    observer.disconnect();
    window.clearTimeout(timer);
    script?.removeEventListener("error", onError);
  };
  if (slot) cleanups.set(slot, stop);
}

function retarget(iframe, term) {
  let current = "";
  try {
    current = new URL(iframe.src).searchParams.get("term") || "";
  } catch {
    current = "";
  }
  if (current === term) return;
  const url = new URL(iframe.src);
  url.searchParams.set("term", term);
  url.searchParams.set("strict", "1");
  iframe.src = url.href;
}

function createScript(term) {
  const script = document.createElement("script");
  script.src = `${GISCUS_ORIGIN}/client.js`;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.giscusClient = "true";
  script.dataset.repo = giscusConfig.repo;
  script.dataset.repoId = giscusConfig.repoId;
  script.dataset.category = giscusConfig.category;
  script.dataset.categoryId = giscusConfig.categoryId;
  script.dataset.mapping = "specific";
  script.dataset.term = term;
  script.dataset.strict = "1";
  script.dataset.reactionsEnabled = "1";
  script.dataset.emitMetadata = "0";
  script.dataset.inputPosition = "bottom";
  script.dataset.theme = giscusConfig.theme;
  script.dataset.lang = giscusConfig.lang;
  script.dataset.loading = "eager";
  script.addEventListener("load", () => {
    const iframe = script.parentElement?.querySelector("iframe.giscus-frame");
    if (!iframe || !desiredTerm || desiredTerm === term) return;
    retarget(iframe, desiredTerm);
  });
  return script;
}
