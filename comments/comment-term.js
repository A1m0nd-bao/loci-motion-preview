const ID_PATTERN = /^[a-z0-9][a-z0-9-]{1,120}$/;

function readId(value) {
  const id = typeof value === "string" ? value.trim() : "";
  return ID_PATTERN.test(id) ? id : "";
}

function stablePath(file) {
  if (typeof file !== "string") return "";
  const trimmed = file.trim();
  if (!trimmed || /^(blob:|data:)/i.test(trimmed) || /^https?:\/\//i.test(trimmed)) return "";
  const path = trimmed.replace(/^\.\//, "").split(/[?#]/)[0];
  if (!path || path.split("/").includes("..")) return "";
  return path;
}

/**
 * Discussion key for one motion item.
 * Catalog ids win (web components, Motion examples, v2/v3 releases).
 * A grouped Lottie family keeps one key while playback segments change.
 * Assets with no id use the repo-relative file path, so a title or hash
 * route change cannot move the thread. Temporary blob previews return "".
 */
export function commentTerm(item, family = null) {
  if (!item || item.category === "临时预览") return "";
  if (family?.variants?.length) {
    const familyId = readId(family.sourceComponent) || readId(family.id);
    if (familyId) return familyId;
  }
  const id = readId(item.id) || readId(item.sourceComponent);
  if (id) return id;
  const path = stablePath(item.file);
  return path ? `path:${path}` : "";
}
