/**
 * Giscus connection for per-item motion notes.
 *
 * `repo` and `repoId` were read from GitHub on 2026-11-26
 * (repository node id R_kgDOS8X1yg).
 * `category` and `categoryId` are the Announcements discussion category
 * read from this repo (DIC_kwDOS8X1ys4DMA0U). Do not invent ids.
 *
 * Steps: comments/SETUP.md
 */
export const giscusConfig = {
  repo: "A1m0nd-bao/loci-motion-preview",
  repoId: "R_kgDOS8X1yg",
  category: "Announcements",
  categoryId: "DIC_kwDOS8X1ys4DMA0U",
  theme: "transparent_dark",
  lang: "zh-CN",
};

const REPO_ID = /^R_[A-Za-z0-9_-]{4,}$/;
const CATEGORY_ID = /^DIC_[A-Za-z0-9_-]{4,}$/;

export function isGiscusConfigured(config = giscusConfig) {
  return Boolean(
    config &&
      config.repo === "A1m0nd-bao/loci-motion-preview" &&
      REPO_ID.test(config.repoId || "") &&
      String(config.category || "").trim() &&
      CATEGORY_ID.test(config.categoryId || ""),
  );
}
