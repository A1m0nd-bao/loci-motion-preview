import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  containScale,
  nextFrameBox,
  pagePreviewMode,
  pagePreviewURL,
  pageSceneSize,
} from "./page-preview.js";

const chest = pageSceneSize("sipplay-chest-two-state");
assert.deepEqual(chest, { width: 760, height: 685 });
assert.deepEqual(pageSceneSize("sipplay-invitation-code"), { width: 375, height: 812 });
assert.deepEqual(pageSceneSize("sipplay-relic-journey"), { width: 375, height: 812 });
assert.deepEqual(pageSceneSize("sipplay-character-select"), { width: 750, height: 504 });
assert.deepEqual(pageSceneSize("sipplay-auto-photos"), { width: 600, height: 760 });
assert.deepEqual(pageSceneSize("sipplay-gift-pop"), { width: 260, height: 220 });

const gallery = new URL(pagePreviewURL("./releases/v2/chest-two-state/index.html?v=1", false), "http://localhost/");
assert.equal(gallery.searchParams.get("compact"), "1");
assert.equal(gallery.searchParams.get("fit"), "contain");
assert.equal(gallery.searchParams.get("v"), "1");

const detail = new URL(pagePreviewURL("./releases/v2/invitation-code/index.html?v=9", true), "http://localhost/");
assert.equal(detail.searchParams.get("compact"), null);
assert.equal(detail.searchParams.get("embed"), null);
assert.equal(detail.searchParams.get("fit"), null, "detail is a real viewport, not a contain-fit scene");
assert.equal(detail.searchParams.get("v"), "9");

const chestDetail = new URL(pagePreviewURL("./releases/v2/chest-two-state/index.html?v=3", true), "http://localhost/");
assert.equal(chestDetail.searchParams.get("fit"), null);
assert.equal(chestDetail.searchParams.get("compact"), null);

const keptFit = new URL(pagePreviewURL("./releases/v2/prop-spotlight/index.html?fit=contain", true), "http://localhost/");
assert.equal(keptFit.searchParams.get("fit"), "contain");
assert.equal(keptFit.searchParams.get("compact"), null);

const kept = new URL(pagePreviewURL("./releases/v2/gift-pop/index.html?compact=1", false), "http://localhost/");
assert.equal(kept.searchParams.get("compact"), "1");
assert.equal(kept.searchParams.get("fit"), "contain");

assert.equal(pagePreviewMode(false), "contain");
assert.equal(pagePreviewMode(true), "viewport");
assert.equal(pagePreviewMode(), "contain");
for (const id of ["sipplay-chest-two-state", "sipplay-invitation-code", "sipplay-auto-photos", "sipplay-gift-pop"]) {
  assert.equal(pagePreviewMode(true), "viewport", `${id} detail shares the viewport, not a per-item scene scale`);
  assert.ok(pageSceneSize(id).width > 0);
}

assert.equal(containScale(760, 685, 380, 220), Math.min(380 / 760, 220 / 685));
assert.equal(containScale(0, 100, 10, 10), 1);

const grown = nextFrameBox({ width: 800, height: 900 }, { width: 840, height: 1280 }, { detail: true });
assert.deepEqual({ width: grown.width, height: grown.height }, { width: 840, height: 1280 });
const held = nextFrameBox({ width: 840, height: 980 }, { width: 400, height: 500 }, { detail: true });
assert.equal(held.width, 840);
assert.equal(held.height, 980);
const shrunk = nextFrameBox({ width: 760, height: 812 }, { width: 375, height: 220 }, { detail: false });
assert.equal(shrunk.width, 375);
assert.equal(shrunk.height, 220);

const css = await readFile(new URL("./styles.css", import.meta.url), "utf8");
assert.match(css, /\.media-host\.is-page-viewport > \.web-component-frame/);
assert.match(css, /\.item-comments\b/);
assert.equal(css.includes(".item-comments-frame:empty"), false);
const html = await readFile(new URL("./index.html", import.meta.url), "utf8");
assert.match(html, /styles\.css\?v=preview-comments-20261127/);
assert.match(html, /app\.js\?v=preview-viewport-20261126/);
assert.equal(css.includes("max-height: min(152px, 24dvh)"), false);
assert.match(css, /\.is-web-detail \.detail-shell \{[^}]*minmax\(min\(52dvh, 640px\), 1fr\)/);
assert.match(css, /\.is-web-detail \.detail-shell > \.item-comments \{[^}]*max-height: none/);
assert.match(css, /\.is-web-detail \.detail-shell > \.item-comments \{[^}]*overflow: visible/);
assert.equal(css.includes(".is-web-detail .item-comments-frame"), false);
const app = await readFile(new URL("./app.js", import.meta.url), "utf8");
assert.match(app, /page-preview\.js\?v=preview-viewport-20261126/);
assert.match(app, /integration\.js\?v=preview-viewport-20261126/);
const comments = await readFile(new URL("./comments/item-comments.js", import.meta.url), "utf8");
assert.match(comments, /dataset\.mapping = "specific"/);
assert.match(comments, /dataset\.strict = "1"/);
assert.match(comments, /dataset\.loading = "eager"/);
assert.match(comments, /requestAnimationFrame/);

console.log("page preview fit ok");
