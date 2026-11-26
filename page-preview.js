/**
 * Gallery cards contain-fit a designed scene inside a small host.
 * The shared detail window is a real viewport: the iframe fills the stage
 * and the page lays out and scrolls inside it. v1, v2, and v3 share that path.
 */

const PHONE_SCENES = new Set([
  "sipplay-prop-spotlight",
  "sipplay-relic-journey",
  "sipplay-invitation-code",
  "sipplay-invitation-code-autumn",
  "sipplay-gems-pack-popup",
  "sipplay-welcome-gift-collect",
]);

const SCENE_SIZES = {
  "sipplay-billionaire-button-lite": [380, 220],
  "sipplay-ice-hockey-button-lite": [380, 220],
  "sipplay-lifecycle-item-counter": [1040, 850],
  "sipplay-cheers-popup": [500, 640],
  "sipplay-auto-photos": [600, 760],
  "sipplay-voice-input-wave": [269, 220],
  "sipplay-character-select": [750, 504],
  "sipplay-reward-celebration": [644, 644],
  "sipplay-invite-ticket-v13": [1000, 480],
  "sipplay-gem-bonus-composite": [1040, 660],
  "sipplay-red-gold-chest-v3": [420, 510],
  "sipplay-battlepass-pack-textured": [560, 558],
  "sipplay-chest-two-state": [760, 685],
};

export function pageSceneSize(id) {
  if (PHONE_SCENES.has(id)) return { width: 375, height: 812 };
  const pair = SCENE_SIZES[id];
  if (pair) return { width: pair[0], height: pair[1] };
  return { width: 260, height: 220 };
}

/** Gallery cards scale a scene. Detail is a real iframe viewport, same for every version. */
export function pagePreviewMode(detail = false) {
  return detail ? "viewport" : "contain";
}

export function pagePreviewURL(file, detail = false) {
  const [path, query = ""] = String(file || "").split("?");
  const params = new URLSearchParams(query);
  if (pagePreviewMode(detail) === "contain") {
    if (!params.has("compact") && !params.has("embed")) params.set("compact", "1");
    if (!params.has("fit")) params.set("fit", "contain");
  }
  const text = params.toString();
  return text ? `${path}?${text}` : path;
}

export function containScale(contentWidth, contentHeight, boundsWidth, boundsHeight) {
  if (!(contentWidth > 0) || !(contentHeight > 0) || !(boundsWidth > 0) || !(boundsHeight > 0)) return 1;
  return Math.min(boundsWidth / contentWidth, boundsHeight / contentHeight);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function nextFrameBox(current, measured, { detail = false, maxWidth = 1680, maxHeight = 2800 } = {}) {
  const baseW = Math.max(1, Number(current?.width) || 1);
  const baseH = Math.max(1, Number(current?.height) || 1);
  const measuredW = Math.ceil(Number(measured?.width) || 0);
  const measuredH = Math.ceil(Number(measured?.height) || 0);
  let width = baseW;
  let height = baseH;
  if (measuredW > width + 4) width = measuredW;
  if (measuredH > height + 4) height = measuredH;
  if (!detail && measuredW > 0 && measuredW + 4 < width) width = measuredW;
  if (!detail && measuredH > 0 && measuredH + 4 < height) height = measuredH;
  width = clamp(width, 80, maxWidth);
  height = clamp(height, 80, maxHeight);
  return {
    width,
    height,
    changed: Math.abs(width - baseW) > 4 || Math.abs(height - baseH) > 4,
  };
}

function readDocumentBox(frame) {
  const doc = frame.contentDocument;
  const root = doc?.documentElement;
  if (!root) return null;
  const body = doc.body;
  return {
    width: Math.max(root.scrollWidth || 0, body?.scrollWidth || 0, root.offsetWidth || 0),
    height: Math.max(root.scrollHeight || 0, body?.scrollHeight || 0, root.offsetHeight || 0),
  };
}

function fittedWrap(frame) {
  const parent = frame.parentElement;
  if (parent?.classList.contains("page-fit-scale")) return parent;
  const wrap = document.createElement("div");
  wrap.className = "page-fit-scale";
  frame.replaceWith(wrap);
  wrap.append(frame);
  return wrap;
}

function unwrapFrame(frame) {
  const parent = frame.parentElement;
  if (!parent?.classList.contains("page-fit-scale")) return;
  parent.replaceWith(frame);
}

function placeFrame(frame, host, content, { pad = 12, maxScale = 2, detail = false } = {}) {
  const bounds = host.getBoundingClientRect();
  if (!(bounds.width > 0) || !(bounds.height > 0) || !(content.width > 0) || !(content.height > 0)) return;
  const scale = Math.min(
    maxScale,
    containScale(content.width, content.height, Math.max(1, bounds.width - pad), Math.max(1, bounds.height - pad)),
  );
  const scaledW = content.width * scale;
  const scaledH = content.height * scale;
  const x = Math.max(0, (bounds.width - scaledW) / 2);
  const y = Math.max(0, (bounds.height - scaledH) / 2);
  // Scale a wrapper, not the iframe. Transforming the iframe itself leaves
  // nested documents (Relic Journey) unpainted.
  const wrap = fittedWrap(frame);
  wrap.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  wrap.style.pointerEvents = detail ? "auto" : "none";
  frame.style.width = `${content.width}px`;
  frame.style.height = `${content.height}px`;
  frame.style.maxWidth = "none";
  frame.style.maxHeight = "none";
  frame.style.position = "static";
  frame.style.transform = "none";
  frame.dataset.fitScale = String(scale);
}

function mountDetailViewport(frame, host) {
  unwrapFrame(frame);
  frame.classList.add("is-fitted", "is-viewport");
  frame.removeAttribute("scrolling");
  host.classList.add("is-page-viewport");
  host.classList.remove("is-page-fit");
  frame.style.width = "100%";
  frame.style.height = "100%";
  frame.style.maxWidth = "none";
  frame.style.maxHeight = "none";
  frame.style.position = "absolute";
  frame.style.inset = "0";
  frame.style.left = "0";
  frame.style.top = "0";
  frame.style.transform = "none";
  delete frame.dataset.fitScale;
  return () => {
    host.classList.remove("is-page-viewport");
    frame.classList.remove("is-fitted", "is-viewport");
    frame.style.width = "";
    frame.style.height = "";
    frame.style.maxWidth = "";
    frame.style.maxHeight = "";
    frame.style.position = "";
    frame.style.inset = "";
    frame.style.left = "";
    frame.style.top = "";
    frame.style.transform = "";
    delete frame.dataset.fitScale;
  };
}

/**
 * Gallery: size the iframe to the designed scene, then scale that box so it
 * stays inside the card. Detail: the iframe is the page viewport and fills
 * the stage. Taller documents scroll inside the frame. No transform scale.
 */
export function fitWebFrame(frame, host, { scene, detail = false, fluid = false, maxScale = 1.6 } = {}) {
  if (pagePreviewMode(detail) === "viewport") return mountDetailViewport(frame, host);
  const initial = fluid ? null : {
    width: Math.max(80, Number(scene?.width) || 260),
    height: Math.max(80, Number(scene?.height) || 220),
  };
  let box = initial ? { ...initial } : null;
  let raf = 0;
  frame.classList.add("is-fitted");
  frame.setAttribute("scrolling", "no");
  host.classList.add("is-page-fit");
  if (box) {
    const wrap = fittedWrap(frame);
    wrap.style.width = `${box.width}px`;
    wrap.style.height = `${box.height}px`;
    frame.style.width = `${box.width}px`;
    frame.style.height = `${box.height}px`;
  }

  const scaleNow = () => {
    if (!box) return;
    placeFrame(frame, host, box, { maxScale, detail });
  };

  const settle = () => {
    if (!frame.isConnected) return;
    if (!box && fluid) {
      const measured = readDocumentBox(frame);
      const hostBox = host.getBoundingClientRect();
      const overflows = measured && (
        measured.height > hostBox.height + 8 || measured.width > hostBox.width + 8
      );
      if (!overflows) {
        unwrapFrame(frame);
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.style.maxWidth = "";
        frame.style.maxHeight = "";
        frame.style.position = "";
        frame.style.left = "";
        frame.style.top = "";
        frame.style.transform = "";
        delete frame.dataset.fitScale;
        return;
      }
      box = {
        width: Math.max(80, Math.ceil(measured.width)),
        height: Math.max(80, Math.ceil(measured.height)),
      };
      frame.style.width = `${box.width}px`;
      frame.style.height = `${box.height}px`;
    }
    if (!box) return;
    for (let pass = 0; pass < 4; pass += 1) {
      const measured = readDocumentBox(frame);
      if (!measured) break;
      const next = nextFrameBox(box, measured, { detail });
      if (!next.changed) break;
      box = next;
      const wrap = frame.parentElement?.classList.contains("page-fit-scale") ? frame.parentElement : null;
      if (wrap) {
        wrap.style.width = `${box.width}px`;
        wrap.style.height = `${box.height}px`;
      }
      frame.style.width = `${box.width}px`;
      frame.style.height = `${box.height}px`;
    }
    scaleNow();
  };

  const onLoad = () => {
    if (!frame.getAttribute("src") || frame.src === "about:blank") return;
    settle();
  };
  const onResize = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(scaleNow);
  };
  frame.addEventListener("load", onLoad);
  const observer = typeof ResizeObserver === "function" ? new ResizeObserver(onResize) : null;
  observer?.observe(host);
  if (box) scaleNow();
  if (frame.contentDocument?.readyState === "complete" && frame.getAttribute("src") && !frame.src.endsWith("about:blank")) onLoad();

  return () => {
    cancelAnimationFrame(raf);
    observer?.disconnect();
    frame.removeEventListener("load", onLoad);
    host.classList.remove("is-page-fit");
    unwrapFrame(frame);
  };
}
