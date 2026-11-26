import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  containScale,
  detailLayoutSize,
  nextFrameBox,
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
assert.equal(detail.searchParams.get("fit"), "contain");
assert.equal(detail.searchParams.get("v"), "9");

const kept = new URL(pagePreviewURL("./releases/v2/gift-pop/index.html?compact=1", false), "http://localhost/");
assert.equal(kept.searchParams.get("compact"), "1");
assert.equal(kept.searchParams.get("fit"), "contain");

const layout = detailLayoutSize(chest);
assert.ok(layout.width >= chest.width);
assert.ok(layout.height > chest.height + 160, "detail layout leaves room under the designed scene for playback chrome");

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
assert.equal(css.includes(".item-comments-frame:empty"), false);
const comments = await readFile(new URL("./comments/item-comments.js", import.meta.url), "utf8");
assert.match(comments, /dataset\.mapping = "specific"/);
assert.match(comments, /dataset\.strict = "1"/);
assert.match(comments, /dataset\.loading = "eager"/);
assert.match(comments, /requestAnimationFrame/);

console.log("page preview fit ok");
