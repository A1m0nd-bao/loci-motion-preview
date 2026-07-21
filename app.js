const gallery = document.querySelector("#gallery");
const quickRail = document.querySelector("#quickRail");
const formatNav = document.querySelector("#formatNav");
const homeView = document.querySelector("#homeView");
const homeModules = document.querySelector("#homeModules");
const quickSection = document.querySelector("#quickSection");
const libraryView = document.querySelector("#libraryView");
const homeTrigger = document.querySelector("#homeTrigger");
const sidebar = document.querySelector(".sidebar");
const empty = document.querySelector("#empty");
const count = document.querySelector("#count");
const search = document.querySelector("#search");
const kindSelect = document.querySelector("#kind");
const category = document.querySelector("#category");
const speed = document.querySelector("#speed");
const speedLabel = document.querySelector("#speedLabel");
const previewBg = document.querySelector("#previewBg");
const previewBgLabel = document.querySelector("#previewBgLabel");
const autoplay = document.querySelector("#autoplay");
const loop = document.querySelector("#loop");
const refresh = document.querySelector("#refresh");
const fileInput = document.querySelector("#fileInput");
const dropzone = document.querySelector("#dropzone");
const template = document.querySelector("#motionCard");
const quickTemplate = document.querySelector("#quickCard");
const moduleTemplate = document.querySelector("#moduleCard");
const detailDialog = document.querySelector("#detailDialog");
const detailTitle = document.querySelector("#detailTitle");
const detailPath = document.querySelector("#detailPath");
const detailHost = document.querySelector("#detailPlayer");
const detailClose = document.querySelector("#detailClose");
const detailPlay = document.querySelector("#detailPlay");
const detailPause = document.querySelector("#detailPause");
const detailSpeed = document.querySelector("#detailSpeed");
const detailSpeedLabel = document.querySelector("#detailSpeedLabel");
const detailLoop = document.querySelector("#detailLoop");
const detailPreviewBg = document.querySelector("#detailPreviewBg");
const detailPreviewBgLabel = document.querySelector("#detailPreviewBgLabel");
const detailResolution = document.querySelector("#detailResolution");
const detailTags = document.querySelector("#detailTags");
const detailTimeline = document.querySelector("#detailTimeline");
const detailCurrentFrame = document.querySelector("#detailCurrentFrame");
const detailTotalFrames = document.querySelector("#detailTotalFrames");
const detailCurrentTime = document.querySelector("#detailCurrentTime");
const detailTotalDuration = document.querySelector("#detailTotalDuration");
const detailCopy = document.querySelector("#detailCopy");
const detailOpen = document.querySelector("#detailOpen");
const detailDownload = document.querySelector("#detailDownload");

let motions = [];
let visibleMotions = [];
let activeMotion = null;
let activeMotionInfo = null;
let detailController = null;
let timelineRaf = 0;
let currentView = "home";

const motionInfoCache = new Map();
const previewBackgroundKey = "motion-preview-bg";
const defaultPreviewBackground = "#0a0c10";
const previewPosterFrameRatio = 0.35;
const kindLabels = {
  all: "全部格式",
  lottie: "Lottie",
  hevc: "HEVC with Alpha",
  gif: "GIF",
  rive: "Rive",
  practice: "实践型动效",
  video: "视频",
};
const previewControllers = new WeakMap();
const lazyHostObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(handleHostVisibility, {
        root: null,
        rootMargin: "360px",
        threshold: 0.01,
      })
    : null;

if (window.matchMedia("(max-width: 820px)").matches) {
  sidebar.removeAttribute("open");
}

applyPreviewBackground(localStorage.getItem(previewBackgroundKey) || defaultPreviewBackground, {
  persist: false,
});

async function loadManifest() {
  try {
    const response = await fetch(`./manifest.json?time=${Date.now()}`);
    if (!response.ok) throw new Error("manifest not found");
    const data = await response.json();
    const remoteLabels = data.kindLabels && typeof data.kindLabels === "object" ? data.kindLabels : {};
    Object.assign(kindLabels, remoteLabels);
    motions = Array.isArray(data.items) ? data.items.map(normalizeMotion) : [];
  } catch {
    motions = [];
  }

  populateKinds();
  populateCategories();
  render();
}

function normalizeMotion(item) {
  const kind = normalizeKind(item.kind || item.format || item.kindLabel || item.file);
  return {
    ...item,
    kind,
    kindLabel: item.kindLabel || kindLabels[kind] || kind,
    category: item.category || "未分类",
    tags: Array.isArray(item.tags) ? item.tags : [],
  };
}

function populateKinds() {
  const selected = kindSelect.value || "all";
  const counts = countBy(motions, (item) => item.kind || "practice");
  const kinds = getOrderedKinds(counts);

  kindSelect.innerHTML = '<option value="all">全部格式</option>';
  for (const kind of kinds) {
    const option = document.createElement("option");
    option.value = kind;
    option.textContent = `${labelForKind(kind)} (${counts[kind]})`;
    kindSelect.append(option);
  }
  kindSelect.value = kinds.includes(selected) ? selected : "all";

  formatNav.replaceChildren();
  formatNav.append(createFormatButton("all", "全部格式", motions.length, "总览所有动效资产"));
  for (const kind of kinds) {
    formatNav.append(createFormatButton(kind, labelForKind(kind), counts[kind], formatDescription(kind)));
  }

  renderHomeModules(kinds, counts);
}

function createFormatButton(kind, label, amount, description) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `format-button${kindSelect.value === kind ? " active" : ""}`;
  button.dataset.kind = kind;
  button.innerHTML = `<strong></strong><span class="format-count"></span><span></span>`;
  button.querySelector("strong").textContent = label;
  button.querySelector(".format-count").textContent = String(amount);
  button.querySelector("span:last-child").textContent = description;
  button.addEventListener("click", () => {
    enterModule(kind);
  });
  return button;
}

function renderHomeModules(kinds, counts) {
  homeModules.replaceChildren();
  for (const kind of kinds) {
    homeModules.append(createModuleCard(kind, counts[kind] || 0));
  }

  for (const kind of ["hevc", "gif", "rive", "practice"]) {
    if (counts[kind]) continue;
    homeModules.append(createModuleCard(kind, 0));
  }
}

function createModuleCard(kind, amount) {
  const node = moduleTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.kind = kind;
  node.querySelector(".module-icon").textContent = moduleIcon(kind);
  node.querySelector("strong").textContent = labelForKind(kind);
  node.querySelector(".module-meta").textContent = `${amount} 个资产 / ${formatDescription(kind)}`;
  node.addEventListener("click", () => enterModule(kind));
  return node;
}

function enterModule(kind) {
  currentView = "library";
  kindSelect.value = kind;
  populateCategories();
  render();
}

function showHome() {
  currentView = "home";
  kindSelect.value = "all";
  populateCategories();
  render();
}

function populateCategories() {
  const selected = category.value || "all";
  const selectedKind = kindSelect.value;
  const source = selectedKind === "all" ? motions : motions.filter((item) => item.kind === selectedKind);
  const categories = [...new Set(source.map((item) => item.category || "未分类"))].sort((a, b) =>
    a.localeCompare(b, "zh-Hans-CN"),
  );
  category.innerHTML = '<option value="all">全部分类</option>';

  for (const item of categories) {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    category.append(option);
  }

  category.value = categories.includes(selected) ? selected : "all";
}

function render() {
  const isHome = currentView === "home";
  const query = search.value.trim().toLowerCase();
  const selectedKind = kindSelect.value;
  const selectedCategory = category.value;

  visibleMotions = isHome ? motions : motions.filter((item) => {
    const haystack = [item.name, item.file, item.kindLabel, item.category, item.interactionType, ...(item.tags || [])]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    const matchesKind = selectedKind === "all" || item.kind === selectedKind;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesKind && matchesCategory;
  });

  lazyHostObserver?.disconnect();
  gallery.replaceChildren();
  quickRail.replaceChildren();
  count.textContent = String(visibleMotions.length);
  empty.hidden = visibleMotions.length > 0;
  homeView.hidden = !isHome;
  quickSection.hidden = isHome;
  libraryView.hidden = isHome;

  if (isHome) {
    updateFormatActiveState();
    return;
  }

  for (const motion of visibleMotions) {
    gallery.append(createCard(motion));
    quickRail.append(createQuickCard(motion));
  }

  updateFormatActiveState();
  syncPreviewHosts();
}

function createQuickCard(motion) {
  const node = quickTemplate.content.firstElementChild.cloneNode(true);
  const host = node.querySelector(".media-host");
  const label = node.querySelector("span");

  setupPreviewHost(host, motion);
  label.textContent = motion.name || filenameToName(motion.file);
  node.title = `${label.textContent} - ${motion.kindLabel} - ${motion.category || "未分类"}`;
  node.addEventListener("click", () => openDetail(motion));

  return node;
}

function createCard(motion) {
  const node = template.content.firstElementChild.cloneNode(true);
  const host = node.querySelector(".media-host");
  const title = node.querySelector("h2");
  const path = node.querySelector(".path");
  const resolution = node.querySelector(".resolution");
  const badge = node.querySelector(".badge");
  const tags = node.querySelector(".tags");
  const openLink = node.querySelector("a");
  const downloadLink = node.querySelector(".download-link");

  setupPreviewHost(host, motion);

  title.textContent = motion.name || filenameToName(motion.file);
  path.textContent = motion.file;
  path.title = motion.file;
  resolution.textContent = "规格 --";
  badge.textContent = motion.kindLabel || labelForKind(motion.kind);
  openLink.href = motion.file;
  downloadLink.href = motion.file;
  downloadLink.download = getDownloadName(motion);

  const tagValues = [motion.category, motion.interactionType, ...(motion.tags || [])].filter(Boolean);
  for (const tag of tagValues) {
    const tagNode = document.createElement("span");
    tagNode.textContent = tag;
    tags.append(tagNode);
  }

  node.addEventListener("click", async (event) => {
    const action = event.target.dataset.action;
    if (!action && event.target.closest("a")) return;
    if (!action) {
      openDetail(motion);
      return;
    }

    const controller = ensurePreviewController(host, motion);
    if (action === "play") controller.play?.();
    if (action === "pause") controller.pause?.();
    if (action === "detail") openDetail(motion);
    if (action === "copy") {
      await navigator.clipboard.writeText(motion.file);
      event.target.textContent = "已复制";
      window.setTimeout(() => {
        event.target.textContent = "复制路径";
      }, 1100);
    }
  });

  return node;
}

function setupPreviewHost(host, motion) {
  host.classList.toggle("is-lottie", motion.kind === "lottie");
  host.dataset.loaded = "false";
  host.dataset.visible = "false";
  host.dataset.kind = motion.kind;
  host.dataset.src = motion.file;

  if (lazyHostObserver) {
    lazyHostObserver.observe(host);
    return;
  }

  host.dataset.visible = "true";
  ensurePreviewController(host, motion);
  syncPreviewHost(host);
  updateVisibleCardResolution(host, motion);
}

function handleHostVisibility(entries) {
  for (const entry of entries) {
    const host = entry.target;
    const motion = motions.find((item) => item.file === host.dataset.src);
    host.dataset.visible = entry.isIntersecting ? "true" : "false";

    if (entry.isIntersecting && motion) {
      ensurePreviewController(host, motion);
      syncPreviewHost(host);
      updateVisibleCardResolution(host, motion);
    } else {
      previewControllers.get(host)?.pause?.();
    }
  }
}

function ensurePreviewController(host, motion) {
  if (previewControllers.has(host)) return previewControllers.get(host);
  const controller = createMediaController(host, motion, { detail: false });
  previewControllers.set(host, controller);
  host.dataset.loaded = "true";
  return controller;
}

function syncPreviewHosts() {
  for (const host of document.querySelectorAll(".gallery .media-host, .quick-rail .media-host")) {
    syncPreviewHost(host);
  }
}

function syncPreviewHost(host) {
  const controller = previewControllers.get(host);
  if (!controller) return;

  controller.setSpeed?.(Number(speed.value));
  controller.setLoop?.(loop.checked);

  const shouldPlay = autoplay.checked && host.dataset.visible === "true";
  if (shouldPlay) controller.play?.();
  if (!shouldPlay) controller.pause?.();
}

async function openDetail(motion) {
  activeMotion = motion;
  const title = motion.name || filenameToName(motion.file);
  detailTitle.textContent = title;
  detailPath.textContent = motion.file;
  detailPath.title = motion.file;
  stopTimelineLoop();
  resetTimeline();
  detailResolution.textContent = "--";
  detailController?.destroy?.();
  detailController = null;
  detailHost.replaceChildren();
  detailOpen.href = motion.file;
  detailDownload.href = motion.file;
  detailDownload.download = getDownloadName(motion);
  detailTags.replaceChildren();

  const tags = [motion.kindLabel || labelForKind(motion.kind), motion.category, motion.interactionType, ...(motion.tags || [])].filter(Boolean);
  for (const tag of tags) {
    const node = document.createElement("span");
    node.textContent = tag;
    detailTags.append(node);
  }

  detailDialog.showModal();
  updateDetailInfo(motion);
  await nextFrame();
  detailController = createMediaController(detailHost, motion, { detail: true });
  syncDetailPlayer();
  await detailController.ready?.();
  await updateDetailInfo(motion);
  detailController.play?.();
  startTimelineLoop();
}

function createMediaController(host, motion, options = {}) {
  host.replaceChildren();
  if (motion.kind === "lottie") return createLottieController(host, motion, options);
  if (motion.kind === "gif") return createImageController(host, motion);
  if (motion.kind === "hevc" || motion.kind === "video") return createVideoController(host, motion);
  if (motion.kind === "rive") return createRiveController(host, motion);
  return createFallbackController(host, motion);
}

function createLottieController(host, motion, options = {}) {
  const player = document.createElement("lottie-player");
  player.setAttribute("background", "transparent");
  player.setAttribute("loading", "lazy");
  player.setAttribute("src", motion.file);
  host.append(player);
  let animationItem = null;

  const ready = async () => {
    if (typeof player.load === "function") {
      try {
        await player.load(motion.file);
      } catch {
        player.setAttribute("src", motion.file);
      }
    }

    try {
      if (typeof player.getLottie === "function") animationItem = await player.getLottie();
      if (!options.detail && animationItem) {
        const totalFrames = Number(animationItem.totalFrames) || Number(animationItem.animationData?.op) || 0;
        const frame = Math.max(1, Math.floor(totalFrames * previewPosterFrameRatio));
        animationItem.goToAndStop(frame, true);
      }
    } catch {
      animationItem = null;
    }
  };

  const readyPromise = ready();
  return {
    element: player,
    ready: () => readyPromise,
    play: () => player.play?.(),
    pause: () => player.pause?.(),
    setLoop: (value) => player.toggleAttribute("loop", value),
    setSpeed: (value) => player.setSpeed?.(value),
    seek: (frame) => animationItem?.goToAndStop?.(frame, true) || player.seek?.(frame),
    getFrame: () => Number(animationItem?.currentFrame || 0),
    destroy: () => player.pause?.(),
  };
}

function createImageController(host, motion) {
  const image = document.createElement("img");
  image.src = motion.file;
  image.alt = motion.name || filenameToName(motion.file);
  image.loading = "lazy";
  host.append(image);
  return {
    element: image,
    play: () => {},
    pause: () => {},
    setLoop: () => {},
    setSpeed: () => {},
    destroy: () => {},
  };
}

function createVideoController(host, motion) {
  const video = document.createElement("video");
  video.src = motion.file;
  video.muted = true;
  video.playsInline = true;
  video.preload = "metadata";
  video.controls = false;
  host.append(video);
  return {
    element: video,
    ready: () =>
      new Promise((resolve) => {
        if (Number.isFinite(video.duration) && video.duration > 0) resolve();
        else video.addEventListener("loadedmetadata", resolve, { once: true });
      }),
    play: () => video.play().catch(() => {}),
    pause: () => video.pause(),
    setLoop: (value) => {
      video.loop = value;
    },
    setSpeed: (value) => {
      video.playbackRate = value;
    },
    seek: (frame) => {
      if (!activeMotionInfo?.frameRate) return;
      video.currentTime = Number(frame) / activeMotionInfo.frameRate;
    },
    getFrame: () => (activeMotionInfo?.frameRate ? video.currentTime * activeMotionInfo.frameRate : 0),
    destroy: () => video.pause(),
  };
}

function createRiveController(host, motion) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 640;
  host.append(canvas);
  let riveInstance = null;

  if (window.rive?.Rive) {
    riveInstance = new window.rive.Rive({
      src: motion.file,
      canvas,
      autoplay: false,
      fit: window.rive.Fit?.Contain,
    });
  } else {
    host.replaceChildren(createFallbackNode("Rive 预览器加载失败", "可以打开文件下载查看"));
  }

  return {
    element: canvas,
    play: () => riveInstance?.play?.(),
    pause: () => riveInstance?.pause?.(),
    setLoop: () => {},
    setSpeed: () => {},
    destroy: () => riveInstance?.cleanup?.(),
  };
}

function createFallbackController(host, motion) {
  const node = createFallbackNode(motion.kindLabel || labelForKind(motion.kind), "点击查看可打开完整文件");
  host.append(node);
  return {
    element: node,
    play: () => {},
    pause: () => {},
    setLoop: () => {},
    setSpeed: () => {},
    destroy: () => {},
  };
}

function createFallbackNode(title, subtitle) {
  const node = document.createElement("div");
  node.className = "fallback-preview";
  const strong = document.createElement("strong");
  const span = document.createElement("span");
  strong.textContent = title;
  span.textContent = subtitle;
  node.append(strong, span);
  return node;
}

function syncDetailPlayer() {
  detailSpeedLabel.textContent = `${detailSpeed.value}x`;
  detailController?.setSpeed?.(Number(detailSpeed.value));
  detailController?.setLoop?.(detailLoop.checked);
}

function applyPreviewBackground(value, options = {}) {
  const color = normalizeHexColor(value) || defaultPreviewBackground;
  const label = color.toUpperCase();
  document.documentElement.style.setProperty("--preview-bg", color);
  previewBg.value = color;
  detailPreviewBg.value = color;
  previewBgLabel.textContent = label;
  detailPreviewBgLabel.textContent = label;

  if (options.persist !== false) {
    localStorage.setItem(previewBackgroundKey, color);
  }
}

function normalizeHexColor(value) {
  const color = String(value || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(color)) return color.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`.toLowerCase();
  }
  return "";
}

async function updateVisibleCardResolution(host, motion) {
  const resolution = host.closest(".motion-card")?.querySelector(".resolution");
  if (!resolution || resolution.dataset.loaded === "true") return;
  resolution.dataset.loaded = "true";
  try {
    const info = await getMotionInfo(motion);
    resolution.textContent = `规格 ${formatInfoSummary(info, motion)}`;
  } catch {
    resolution.textContent = "规格 未知";
  }
}

async function updateDetailInfo(motion) {
  try {
    const info = await getMotionInfo(motion);
    if (activeMotion?.file !== motion.file) return;
    applyMotionInfo(info, motion);
    detailResolution.textContent = formatResolution(info);
  } catch {
    if (activeMotion?.file !== motion.file) return;
    resetTimeline("未知");
    detailResolution.textContent = "未知";
  }
}

async function getMotionInfo(motion) {
  if (motionInfoCache.has(motion.file)) return motionInfoCache.get(motion.file);
  let info;
  if (motion.kind === "lottie") info = await getLottieInfo(motion.file);
  else if (motion.kind === "hevc" || motion.kind === "video") info = await getVideoInfo(motion.file);
  else if (motion.kind === "gif") info = await getImageInfo(motion.file);
  else info = { width: 0, height: 0, frames: 0, duration: 0, frameRate: 0 };
  motionInfoCache.set(motion.file, info);
  return info;
}

async function getLottieInfo(file) {
  const response = await fetch(file);
  if (!response.ok) throw new Error("Unable to read lottie json");
  const data = await response.json();
  const frameRate = Number(data.fr) || 0;
  const inPoint = Number(data.ip) || 0;
  const outPoint = Number(data.op) || 0;
  const width = Number(data.w) || 0;
  const height = Number(data.h) || 0;
  const frames = Math.max(0, Math.round(outPoint - inPoint));
  const duration = frameRate > 0 ? frames / frameRate : 0;
  return { frameRate, inPoint, outPoint, width, height, frames, duration };
}

function getVideoInfo(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      const duration = Number(video.duration) || 0;
      const frameRate = 30;
      resolve({
        width: video.videoWidth || 0,
        height: video.videoHeight || 0,
        frameRate,
        frames: Math.round(duration * frameRate),
        duration,
      });
    };
    video.onerror = reject;
    video.src = file;
  });
}

function getImageInfo(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () =>
      resolve({
        width: image.naturalWidth || 0,
        height: image.naturalHeight || 0,
        frames: 0,
        duration: 0,
        frameRate: 0,
      });
    image.onerror = reject;
    image.src = file;
  });
}

function formatInfoSummary(info, motion) {
  const resolution = formatResolution(info);
  if (motion.kind === "lottie" && info.frames) return `${resolution} / ${info.frames.toLocaleString()}帧`;
  if ((motion.kind === "hevc" || motion.kind === "video") && info.duration) return `${resolution} / ${formatSeconds(info.duration)}s`;
  return resolution;
}

function formatResolution(info) {
  if (!info?.width || !info?.height) return "未知";
  return `${Math.round(info.width).toLocaleString()} × ${Math.round(info.height).toLocaleString()}`;
}

function resetTimeline(label = "--") {
  activeMotionInfo = null;
  detailTimeline.disabled = true;
  detailTimeline.min = "0";
  detailTimeline.max = "0";
  detailTimeline.value = "0";
  detailCurrentFrame.textContent = label;
  detailTotalFrames.textContent = label;
  detailCurrentTime.textContent = label;
  detailTotalDuration.textContent = label;
}

function applyMotionInfo(info, motion) {
  activeMotionInfo = info;
  const hasTimeline = (motion.kind === "lottie" || motion.kind === "hevc" || motion.kind === "video") && info.frames > 0;
  detailTimeline.disabled = !hasTimeline;
  detailTimeline.min = "0";
  detailTimeline.max = String(info.frames || 0);
  detailTimeline.value = "0";
  detailTotalFrames.textContent = info.frames ? info.frames.toLocaleString() : "--";
  detailTotalDuration.textContent = info.duration ? `${formatSeconds(info.duration)}s` : "--";
  updateTimelineLabels(0);
}

function updateTimelineLabels(frame) {
  if (!activeMotionInfo) return;
  const safeFrame = Math.min(activeMotionInfo.frames || 0, Math.max(0, Math.round(frame)));
  const currentSeconds = activeMotionInfo.frameRate > 0 ? safeFrame / activeMotionInfo.frameRate : 0;
  detailCurrentFrame.textContent = activeMotionInfo.frames ? safeFrame.toLocaleString() : "--";
  detailCurrentTime.textContent = activeMotionInfo.duration ? `${formatSeconds(currentSeconds)}s` : "--";
  detailTimeline.value = String(safeFrame);
}

function seekDetailFrame(frame) {
  const targetFrame = Number(frame);
  if (!Number.isFinite(targetFrame)) return;

  detailController?.pause?.();
  stopTimelineLoop();
  detailController?.seek?.(targetFrame);
  updateTimelineLabels(targetFrame);
}

function startTimelineLoop() {
  stopTimelineLoop();

  const tick = () => {
    if (activeMotionInfo && detailController?.getFrame) {
      updateTimelineLabels(detailController.getFrame());
    }

    timelineRaf = window.requestAnimationFrame(tick);
  };

  timelineRaf = window.requestAnimationFrame(tick);
}

function stopTimelineLoop() {
  if (!timelineRaf) return;
  window.cancelAnimationFrame(timelineRaf);
  timelineRaf = 0;
}

function nextFrame() {
  return new Promise((resolve) => window.requestAnimationFrame(resolve));
}

function formatSeconds(value) {
  if (!Number.isFinite(value)) return "0.00";
  return value >= 10 ? value.toFixed(1) : value.toFixed(2);
}

function filenameToName(file) {
  return file
    .split("/")
    .pop()
    .replace(/\.[^.]+$/i, "")
    .replace(/[-_]+/g, " ");
}

function getDownloadName(motion) {
  if (motion.downloadName) return motion.downloadName;

  try {
    const url = new URL(motion.file, window.location.href);
    return decodeURIComponent(url.pathname.split("/").pop() || "") || `${slugifyFileName(motion.name || "motion")}.json`;
  } catch {
    return String(motion.file || "").split("/").pop() || `${slugifyFileName(motion.name || "motion")}.json`;
  }
}

function slugifyFileName(value) {
  return (
    String(value)
      .trim()
      .replace(/\.[^.]+$/i, "")
      .replace(/[\\/:*?"<>|]+/g, "-")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "motion"
  );
}

function addLocalFiles(files) {
  const localItems = [...files]
    .filter((file) => inferKindFromFile(file.name, file.type))
    .map((file) => {
      const kind = inferKindFromFile(file.name, file.type);
      return {
        name: filenameToName(file.name),
        file: URL.createObjectURL(file),
        downloadName: file.name,
        kind,
        kindLabel: labelForKind(kind),
        category: "临时预览",
        tags: ["local"],
        mimeType: file.type,
      };
    });

  motions = [...localItems, ...motions.filter((item) => item.category !== "临时预览")];
  populateKinds();
  populateCategories();
  category.value = "临时预览";
  render();
}

function normalizeKind(value) {
  const text = String(value || "").trim().toLowerCase();
  if (text.includes("lottie") || text.includes("json") || text.endsWith(".lottie")) return "lottie";
  if (text.includes("hevc") || text.includes("alpha") || text.includes("透明视频")) return "hevc";
  if (text.includes("gif") || text.endsWith(".gif")) return "gif";
  if (text.includes("riv") || text.includes("rive") || text.endsWith(".riv")) return "rive";
  if (text.includes("实践") || text.includes("app") || text.includes("交互") || /\.html?$/i.test(text)) return "practice";
  if (/\.(mov|mp4|m4v|webm)$/i.test(text)) return "hevc";
  return "practice";
}

function inferKindFromFile(name, type = "") {
  const text = `${name} ${type}`.toLowerCase();
  if (text.includes("application/json") || /\.json$/i.test(name) || /\.lottie$/i.test(name)) return "lottie";
  if (text.includes("image/gif") || /\.gif$/i.test(name)) return "gif";
  if (/\.riv$/i.test(name)) return "rive";
  if (/\.html?$/i.test(name)) return "practice";
  if (text.includes("video/") || /\.(mov|mp4|m4v|webm)$/i.test(name)) return "hevc";
  return "";
}

function labelForKind(kind) {
  return kindLabels[kind] || kind || "实践型动效";
}

function formatDescription(kind) {
  return {
    lottie: "JSON / dotLottie",
    hevc: "透明视频或短片",
    gif: "轻量循环图",
    rive: "状态机与交互动画",
    practice: "App 内交互原型",
    video: "普通视频预览",
  }[kind] || "自定义格式";
}

function moduleIcon(kind) {
  return {
    lottie: "L",
    hevc: "A",
    gif: "G",
    rive: "R",
    practice: "P",
    video: "V",
  }[kind] || "M";
}

function getOrderedKinds(counts) {
  const order = ["lottie", "hevc", "gif", "rive", "practice", "video"];
  return Object.keys(counts).sort((a, b) => {
    const left = order.indexOf(a);
    const right = order.indexOf(b);
    if (left !== -1 || right !== -1) return (left === -1 ? 999 : left) - (right === -1 ? 999 : right);
    return labelForKind(a).localeCompare(labelForKind(b), "zh-Hans-CN");
  });
}

function countBy(list, getter) {
  return list.reduce((result, item) => {
    const key = getter(item);
    result[key] = (result[key] || 0) + 1;
    return result;
  }, {});
}

function updateFormatActiveState() {
  for (const button of formatNav.querySelectorAll(".format-button")) {
    button.classList.toggle("active", button.dataset.kind === kindSelect.value);
  }
}

search.addEventListener("input", render);
homeTrigger.addEventListener("click", showHome);
kindSelect.addEventListener("change", () => {
  enterModule(kindSelect.value);
});
category.addEventListener("change", render);
refresh.addEventListener("click", loadManifest);

speed.addEventListener("input", () => {
  speedLabel.textContent = `${speed.value}x`;
  syncPreviewHosts();
});

previewBg.addEventListener("input", (event) => applyPreviewBackground(event.target.value));
autoplay.addEventListener("change", syncPreviewHosts);
loop.addEventListener("change", syncPreviewHosts);
fileInput.addEventListener("change", (event) => addLocalFiles(event.target.files));
detailClose.addEventListener("click", () => detailDialog.close());
detailPlay.addEventListener("click", () => {
  detailController?.play?.();
  startTimelineLoop();
});
detailPause.addEventListener("click", () => {
  detailController?.pause?.();
  stopTimelineLoop();
});
detailSpeed.addEventListener("input", syncDetailPlayer);
detailLoop.addEventListener("change", syncDetailPlayer);
detailPreviewBg.addEventListener("input", (event) => applyPreviewBackground(event.target.value));
detailTimeline.addEventListener("input", (event) => seekDetailFrame(event.target.value));

detailCopy.addEventListener("click", async () => {
  if (!activeMotion) return;
  await navigator.clipboard.writeText(activeMotion.file);
  detailCopy.textContent = "已复制";
  window.setTimeout(() => {
    detailCopy.textContent = "复制路径";
  }, 1100);
});

detailDialog.addEventListener("click", (event) => {
  if (event.target === detailDialog) detailDialog.close();
});

detailDialog.addEventListener("close", () => {
  detailController?.pause?.();
  detailController?.destroy?.();
  detailController = null;
  stopTimelineLoop();
});

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropzone.classList.add("active");
});

dropzone.addEventListener("dragleave", () => dropzone.classList.remove("active"));

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.classList.remove("active");
  addLocalFiles(event.dataTransfer.files);
});

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    button.classList.add("active");
    gallery.classList.toggle("list", button.dataset.view === "list");
  });
});

loadManifest();
window.setInterval(loadManifest, 30000);
