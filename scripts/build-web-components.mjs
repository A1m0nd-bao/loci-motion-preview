import { build } from "esbuild";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);
const target = new URL("../web-components/vendor/", import.meta.url);
await mkdir(target, { recursive: true });
await build({
  stdin: { contents: 'export * from "motion-components";', resolveDir: process.cwd() },
  bundle: true, format: "esm", minify: true, target: "es2022",
  outfile: new URL("motion-components.js", target).pathname,
  legalComments: "inline",
});
const packageRoot = resolve(dirname(require.resolve("motion-components")), "..");
await copyFile(resolve(packageRoot, "dist/preload.css"), new URL("preload.css", target));
const fontRoot = dirname(require.resolve("@fontsource-variable/inter/package.json"));
await copyFile(resolve(fontRoot, "files/inter-latin-wght-normal.woff2"), new URL("inter-latin-wght-normal.woff2", target));
const packages = ["motion-components", "motion", "framer-motion", "motion-dom", "motion-utils", "lit", "lit-element", "lit-html", "@lit/reactive-element", "@fontsource-variable/inter"];
const notices = [];
const resolvers = [require, createRequire(resolve(packageRoot, "package.json"))];
for (const name of packages) {
  let entry;
  for (const resolver of resolvers) {
    try { entry = resolver.resolve(name); break; } catch {}
  }
  if (!entry && name !== "@fontsource-variable/inter") throw new Error(`Cannot resolve ${name}`);
  if (entry) resolvers.push(createRequire(entry));
  let directory = name === "motion-components" ? packageRoot : name === "@fontsource-variable/inter" ? fontRoot : dirname(entry);
  let found = false;
  for (let depth = 0; depth < 6; depth++, directory = dirname(directory)) {
    for (const file of ["LICENSE", "LICENSE.md", "LICENSE.txt", "OFL.txt"]) {
      try { notices.push(`${name}\n${await readFile(resolve(directory, file), "utf8")}`); found = true; break; } catch {}
    }
    if (found) break;
  }
  if (!found) throw new Error(`Missing license: ${name}`);
}
await writeFile(new URL("THIRD-PARTY-NOTICES.txt", target), notices.join("\n\n--------------------\n\n"));
console.log("Built local Web Component runtime, preload styles, font and third-party notices.");
