/* Regenerates optimised WebP project covers from the PNG masters.
 *
 *   npm i --no-save sharp
 *   node scripts/optimize-covers.mjs
 *
 * Drop new PNGs into src/assets/covers/ and re-run: each is resized to
 * 1600x1000 (16:10 — the same ratio ProjectCard reserves with `aspect-ratio`,
 * so the grid never shifts on load), re-encoded to WebP, and the PNG is
 * removed so only the shipped asset stays in the tree.
 *
 * See docs/ux-research.md §1.2 (CLS / responsive images).
 */
import { readdir, stat, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("src/assets/covers");
const WIDTH = 1600;
const QUALITY = 78;
const kb = (n) => (n / 1024).toFixed(0);

const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith(".png"));

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const input = path.join(SRC, file);
  const output = path.join(SRC, file.replace(/\.png$/i, ".webp"));

  const before = (await stat(input)).size;
  await sharp(input)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(output);

  const after = (await stat(output)).size;
  totalBefore += before;
  totalAfter += after;

  console.log(
    `${file.padEnd(26)} ${kb(before).padStart(5)} KB -> ${kb(after).padStart(4)} KB`,
  );

  // The PNG master has done its job; keep the repo lean.
  await rm(input);
}

console.log(
  `\n${files.length} covers: ${(totalBefore / 1048576).toFixed(1)} MB -> ${(totalAfter / 1048576).toFixed(2)} MB`,
);
