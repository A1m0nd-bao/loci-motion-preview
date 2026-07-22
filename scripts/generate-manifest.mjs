import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceDirs = ["lotties", "motions"];
const manifestPath = join(root, "manifest.json");
const syncStatePath = join(root, ".sync", "lark-state.json");

const kindLabels = {
  lottie: "Lottie",
  hevc: "HEVC with Alpha",
  gif: "GIF",
  rive: "Rive",
  practice: "实践型动效",
};

const supportedExtensions = new Set([
  ".json",
  ".lottie",
  ".gif",
  ".riv",
  ".mp4",
  ".mov",
  ".m4v",
  ".webm",
  ".html",
  ".htm",
  ".zip",
]);

async function collectFiles(dir) {
  const fullDir = join(root, dir);
  try {
    await stat(fullDir);
  } catch {
    return [];
  }

  const entries = await readdir(fullDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(fullDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(relative(root, fullPath))));
    }
    if (entry.isFile() && supportedExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

function titleize(file) {
  return basename(file, extname(file)).replace(/[-_]+/g, " ");
}

async function getLottieMeta(file) {
  try {
    const content = await readFile(file, "utf8");
    const data = JSON.parse(content);
    const frameRate = Number(data.fr) || 0;
    const inPoint = Number(data.ip) || 0;
    const outPoint = Number(data.op) || 0;
    const frames = Math.max(0, Math.round(outPoint - inPoint));
    return {
      name: data.nm || titleize(file),
      width: Number(data.w) || 0,
      height: Number(data.h) || 0,
      frameRate,
      frames,
      duration: frameRate > 0 ? frames / frameRate : 0,
    };
  } catch {
    return { name: titleize(file), width: 0, height: 0, frameRate: 0, frames: 0, duration: 0 };
  }
}

function inferKind(file, meta = {}) {
  const explicit = normalizeKind(meta.kind || meta.format || meta.formatBranch || "");
  if (explicit) return explicit;

  const lower = file.toLowerCase();
  const ext = extname(lower);
  if (ext === ".json" || ext === ".lottie") return "lottie";
  if (ext === ".gif") return "gif";
  if (ext === ".riv") return "rive";
  if (ext === ".html" || ext === ".htm" || ext === ".zip") return "practice";
  if ([".mov", ".mp4", ".m4v", ".webm"].includes(ext)) return lower.includes("hevc") || lower.includes("alpha") ? "hevc" : "video";
  return "practice";
}

function normalizeKind(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text) return "";
  if (text.includes("lottie") || text.includes("json")) return "lottie";
  if (text.includes("hevc") || text.includes("alpha") || text.includes("透明视频")) return "hevc";
  if (text.includes("gif")) return "gif";
  if (text.includes("riv") || text.includes("rive")) return "rive";
  if (text.includes("实践") || text.includes("app") || text.includes("交互")) return "practice";
  return text.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inferCategory(file, meta = {}) {
  if (meta.category) return meta.category;
  const parts = relative(root, file).replaceAll("\\", "/").split("/");
  if (parts[0] === "motions") return parts[2] || "未分类";
  if (parts[0] === "lotties") return parts[1] || "未分类";
  return "未分类";
}

function inferMime(file, kind) {
  const ext = extname(file).toLowerCase();
  if (kind === "lottie" || ext === ".json") return "application/json";
  if (kind === "rive" || ext === ".riv") return "application/octet-stream";
  if (ext === ".gif") return "image/gif";
  if (ext === ".mov") return "video/quicktime";
  if (ext === ".webm") return "video/webm";
  if (ext === ".html" || ext === ".htm") return "text/html";
  if (ext === ".zip") return "application/zip";
  return "video/mp4";
}

const files = (await Promise.all(sourceDirs.map(collectFiles))).flat();
const syncMeta = await loadSyncMeta();
const items = await Promise.all(
  files.map(async (file) => {
    const rel = `./${relative(root, file).replaceAll("\\", "/")}`;
    const meta = syncMeta[rel.replace(/^\.\//, "")] || syncMeta[rel] || {};
    const kind = inferKind(file, meta);
    const category = inferCategory(file, meta);
    const lottieMeta = kind === "lottie" ? await getLottieMeta(file) : {};
    const fallbackName = kind === "lottie" ? lottieMeta.name : titleize(file);

    return {
      name: meta.name || fallbackName,
      file: rel,
      kind,
      kindLabel: kindLabels[kind] || meta.format || kind,
      category,
      interactionType: meta.interactionType || "",
      tags: meta.tags || [],
      mimeType: meta.mimeType || inferMime(file, kind),
      width: lottieMeta.width || 0,
      height: lottieMeta.height || 0,
      frameRate: lottieMeta.frameRate || 0,
      frames: lottieMeta.frames || 0,
      duration: lottieMeta.duration || 0,
      updatedAt: meta.updatedAt || meta.syncedAt || "",
    };
  }),
);

items.sort((left, right) => {
  const byTime = Date.parse(right.updatedAt || "") - Date.parse(left.updatedAt || "");
  if (Number.isFinite(byTime) && byTime !== 0) return byTime;
  return left.file.localeCompare(right.file, "zh-Hans-CN");
});

await writeFile(manifestPath, `${JSON.stringify({ items, kindLabels }, null, 2)}\n`);
console.log(`Generated ${relative(root, manifestPath)} with ${items.length} items.`);

async function loadSyncMeta() {
  try {
    const state = JSON.parse(await readFile(syncStatePath, "utf8"));
    const meta = {};
    for (const item of Object.values(state.synced || {})) {
      if (item.output) meta[item.output] = item;
    }
    return meta;
  } catch {
    return {};
  }
}
