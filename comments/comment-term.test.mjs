import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { commentTerm } from "./comment-term.js";
import { giscusConfig, isGiscusConfigured } from "./giscus-config.js";

const manifest = JSON.parse(await readFile(new URL("../manifest.json", import.meta.url), "utf8"));
const terms = new Map();

for (const item of manifest.items) {
  const term = commentTerm(item);
  assert.match(term, /^path:/);
  assert.equal(term, commentTerm({ ...item, name: "标题已改", file: `${item.file}?cache=1#route` }));
  assert.equal(terms.has(term), false, term);
  terms.set(term, item.file);
}

for (const version of ["v1", "v2", "v3"]) {
  const release = JSON.parse(await readFile(new URL(`../releases/${version}/release.json`, import.meta.url), "utf8"));
  for (const component of release.components) {
    const item = { id: component.id, name: component.name, file: `./releases/${version}/${component.id}/index.html?v=1` };
    assert.equal(commentTerm(item), component.id);
    assert.equal(commentTerm({ ...item, name: "另一个标题" }), component.id);
  }
}

assert.equal(commentTerm({ id: "motion-js-spring", file: "./motion/preview.html?id=motion-js-spring" }), "motion-js-spring");
assert.equal(commentTerm({ file: "./lotties/a.json", category: "临时预览" }), "");
assert.equal(commentTerm({ file: "blob:http://localhost/1234", name: "本地" }), "");
assert.equal(commentTerm({ file: "https://example.com/a.json" }), "");
assert.equal(commentTerm({ file: "../secret.json" }), "");

const family = {
  sourceComponent: "sipplay-pin",
  variants: [{ file: "./lotties/动效 v1/sipplay-pin-toggle-on.json" }, { file: "./lotties/动效 v1/sipplay-pin-reveal-on.json" }],
};
assert.equal(commentTerm({ sourceComponent: "sipplay-pin-toggle", file: family.variants[0].file }, family), "sipplay-pin");
assert.equal(commentTerm({ sourceComponent: "sipplay-pin-reveal", file: family.variants[1].file }, family), "sipplay-pin");
assert.equal(commentTerm({ sourceComponent: "sipplay-bell-ring-toggle", file: "./lotties/动效 v1/sipplay-bell-ring-toggle-on.json" }), "sipplay-bell-ring-toggle");

assert.equal(giscusConfig.repo, "A1m0nd-bao/loci-motion-preview");
assert.equal(giscusConfig.repoId, "R_kgDOS8X1yg");
assert.equal(giscusConfig.categoryId, "");
assert.equal(isGiscusConfigured(), false);
assert.equal(isGiscusConfigured({ ...giscusConfig, category: "动效备注", categoryId: "not-an-id" }), false);

console.log(`comment terms ok (${terms.size} manifest paths)`);
