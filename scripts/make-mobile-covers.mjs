/* Regenerates the Flutter app covers as 16:10 WebP art.
 *
 *   npm i --no-save sharp
 *   node scripts/make-mobile-covers.mjs
 *
 * Why generated art rather than screenshots: none of the five Flutter repos
 * ship screenshots, and the portfolio must never imply a screenshot that does
 * not exist. These are abstract, on-brand line illustrations built from the
 * same tokens as the site (background #0a0a0f, accent #cfa96e), so the cards
 * read as a set with the photographic covers next to them instead of looking
 * like holes in the grid.
 *
 * The SVG masters live next to this script so the art is reviewable and
 * reproducible; only the optimised WebP ships in src/assets/covers.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SVG_DIR = path.resolve("scripts/covers-src");
const OUT_DIR = path.resolve("src/assets/covers");
const WIDTH = 1600;
const HEIGHT = 1000;
const QUALITY = 78;

const GOLD = "#cfa96e";
const INK = "#0a0a0f";

/* Grid, glow and panel gradients shared by every cover. */
const defs = `
  <defs>
    <radialGradient id="glow" cx="26%" cy="18%" r="72%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.14"/>
      <stop offset="52%" stop-color="${GOLD}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="82%" cy="92%" r="55%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="#17171f"/>
      <stop offset="100%" stop-color="#0c0c12"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${GOLD}" stroke-opacity="0.13" stroke-width="1"/>
    </pattern>
    <radialGradient id="fade" cx="50%" cy="46%" r="62%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="phoneGlow" x="-40%" y="-20%" width="180%" height="140%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
    <mask id="gridMask">
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)"/>
    </mask>
  </defs>
`;

/* The phone shell every motif sits inside. 320x620 screen, 12px bezel. */
function phone(x, y) {
  return `
    <g>
      <rect x="${x}" y="${y}" width="344" height="700" rx="46" fill="url(#panel)" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="2"/>
      <rect x="${x + 14}" y="${y + 14}" width="316" height="672" rx="34" fill="none" stroke="${GOLD}" stroke-opacity="0.14" stroke-width="1.5"/>
      <rect x="${x + 132}" y="${y + 30}" width="80" height="7" rx="3.5" fill="${GOLD}" fill-opacity="0.35"/>
    </g>
  `;
}

const line = (d, o = 0.8, w = 2, dash = "") =>
  `<path d="${d}" fill="none" stroke="${GOLD}" stroke-opacity="${o}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;

const ring = (cx, cy, r, o = 0.55, w = 2) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${GOLD}" stroke-opacity="${o}" stroke-width="${w}"/>`;

const box = (x, y, w, h, r = 14, o = 0.35, fill = 0.05) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${GOLD}" fill-opacity="${fill}" stroke="${GOLD}" stroke-opacity="${o}" stroke-width="1.5"/>`;

/* Motifs are authored in a 320 x 620 local box. */
const motifs = {
  trainer: () => `
    ${ring(160, 168, 96, 0.30)}
    ${ring(160, 168, 74, 0.50)}
    ${ring(160, 168, 52, 0.85)}
    <circle cx="160" cy="168" r="52" fill="none" stroke="${GOLD}" stroke-opacity="0.95" stroke-width="6" stroke-dasharray="205 122" stroke-linecap="round" transform="rotate(-90 160 168)"/>
    <circle cx="160" cy="168" r="8" fill="${GOLD}" fill-opacity="0.9"/>
    <g>
      <rect x="92" y="296" width="30" height="76" rx="12" fill="${GOLD}" fill-opacity="0.14" stroke="${GOLD}" stroke-opacity="0.6" stroke-width="2"/>
      <rect x="198" y="296" width="30" height="76" rx="12" fill="${GOLD}" fill-opacity="0.14" stroke="${GOLD}" stroke-opacity="0.6" stroke-width="2"/>
      <rect x="122" y="326" width="76" height="16" rx="8" fill="${GOLD}" fill-opacity="0.35"/>
    </g>
    ${[44, 92, 140, 188, 236].map((x, i) => `<rect x="${x}" y="${520 - [38, 64, 92, 54, 76][i]}" width="20" height="${[38, 64, 92, 54, 76][i]}" rx="8" fill="${GOLD}" fill-opacity="0.22"/>`).join("")}
    ${line("M30 540H290", 0.22, 1.5)}
  `,
  driver: () => `
    ${ring(160, 160, 82, 0.85, 2.5)}
    ${ring(160, 160, 30, 0.6, 2)}
    ${line("M160 130V78", 0.5, 2)}
    ${line("M133 176L91 198", 0.5, 2)}
    ${line("M187 176L229 198", 0.5, 2)}
    <g opacity="0.30">
      ${line("M20 300H300", 0.5, 1)}
      ${line("M20 348H300", 0.5, 1)}
      ${line("M20 396H300", 0.5, 1)}
      ${line("M84 268V420", 0.5, 1)}
      ${line("M168 268V420", 0.5, 1)}
      ${line("M252 268V420", 0.5, 1)}
    </g>
    ${line("M34 392C86 392 96 300 150 316S214 404 288 300", 0.9, 3, "9 12")}
    <circle cx="34" cy="392" r="9" fill="${GOLD}" fill-opacity="0.85"/>
    <g>
      <path d="M288 276l0 30" stroke="${GOLD}" stroke-opacity="0.8" stroke-width="2"/>
      <circle cx="288" cy="300" r="11" fill="none" stroke="${GOLD}" stroke-opacity="0.9" stroke-width="2.5"/>
    </g>
    ${box(38, 470, 244, 62, 16, 0.3)}
    ${line("M62 500H150", 0.5, 6)}
    ${line("M62 512H210", 0.28, 6)}
  `,
  medic: () => `
    ${line("M18 152H86L104 106L124 206L142 152H196L212 132L228 152H302", 0.95, 3.5)}
    ${box(26, 236, 268, 74, 16, 0.32)}
    ${box(26, 326, 268, 74, 16, 0.32)}
    ${box(26, 416, 268, 74, 16, 0.32)}
    ${[0, 1, 2].map((i) => `<circle cx="64" cy="${273 + i * 90}" r="16" fill="${GOLD}" fill-opacity="0.22" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="1.5"/>`).join("")}
    ${[0, 1, 2].map((i) => line(`M96 ${266 + i * 90}H236`, 0.4, 7)).join("")}
    ${[0, 1, 2].map((i) => line(`M96 ${286 + i * 90}H${i === 1 ? 190 : 214}`, 0.22, 6)).join("")}
    ${[26, 52, 78, 104, 130].map((x, i) => `<rect x="${x + 118}" y="${556 - [26, 44, 34, 58, 46][i]}" width="18" height="${[26, 44, 34, 58, 46][i]}" rx="6" fill="${GOLD}" fill-opacity="0.25"/>`).join("")}
  `,
  traveller: () => `
    ${ring(160, 150, 84, 0.85, 2.5)}
    <ellipse cx="160" cy="150" rx="38" ry="84" fill="none" stroke="${GOLD}" stroke-opacity="0.45" stroke-width="1.5"/>
    <ellipse cx="160" cy="150" rx="84" ry="38" fill="none" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1.5"/>
    ${line("M76 150H244", 0.4, 1.5)}
    ${line("M82 246C132 214 196 268 250 236", 0.9, 2.5, "8 11")}
    <path d="M250 236l20 6-14 12z" fill="${GOLD}" fill-opacity="0.8"/>
    <g>
      ${box(52, 330, 216, 116, 18, 0.4)}
      <circle cx="92" cy="388" r="22" fill="${GOLD}" fill-opacity="0.18" stroke="${GOLD}" stroke-opacity="0.5" stroke-width="1.5"/>
      ${line("M128 372H226", 0.45, 7)}
      ${line("M128 392H196", 0.25, 6)}
    </g>
    <g>
      ${box(84, 430, 216, 116, 18, 0.3)}
      <circle cx="124" cy="488" r="22" fill="${GOLD}" fill-opacity="0.12" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1.5"/>
      ${line("M160 472H258", 0.35, 7)}
      ${line("M160 492H228", 0.2, 6)}
    </g>
    ${[0, 1, 2].map((i) => `<circle cx="${104 + i * 32}" cy="580" r="4" fill="${GOLD}" fill-opacity="${0.7 - i * 0.18}"/>`).join("")}
  `,
  chat: () => `
    <g>
      ${box(24, 110, 216, 82, 26, 0.45, 0.07)}
      <path d="M64 192l-6 22 26-22z" fill="${GOLD}" fill-opacity="0.2"/>
      ${line("M56 140H186", 0.45, 7)}
      ${line("M56 162H140", 0.25, 6)}
    </g>
    <g>
      ${box(86, 232, 210, 74, 24, 0.55, 0.10)}
      <circle cx="264" cy="244" r="13" fill="${GOLD}" fill-opacity="0.85"/>
      ${line("M116 260H232", 0.5, 7)}
      ${line("M116 280H196", 0.28, 6)}
    </g>
    <g>
      ${box(24, 334, 176, 66, 22, 0.3, 0.05)}
      <path d="M60 400l-4 18 22-18z" fill="${GOLD}" fill-opacity="0.15"/>
      ${line("M54 358H158", 0.35, 7)}
      ${line("M54 378H124", 0.2, 6)}
    </g>
    ${box(24, 452, 272, 96, 20, 0.22, 0.04)}
    ${line("M48 488H200", 0.3, 8)}
    ${line("M48 514H152", 0.2, 8)}
  `,
};

const covers = [
  { file: "flutter-trainer", phone: { x: 196, y: 150 }, motif: "trainer" },
  { file: "flutter-driver", phone: { x: 1060, y: 150 }, motif: "driver" },
  { file: "flutter-medic", phone: { x: 196, y: 150 }, motif: "medic" },
  { file: "flutter-traveller", phone: { x: 1060, y: 150 }, motif: "traveller" },
  { file: "flutter-chat", phone: { x: 196, y: 150 }, motif: "chat" },
];

function svg({ phone: p, motif }) {
  const localX = p.x + 12;
  const oppX = p.x < WIDTH / 2 ? 1200 : 400;
  const localY = p.y + 40;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
${defs}
<rect width="${WIDTH}" height="${HEIGHT}" fill="${INK}"/>
<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" mask="url(#gridMask)"/>
<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
<rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow2)"/>
<g opacity="0.55">
  <circle cx="${oppX}" cy="470" r="250" fill="none" stroke="${GOLD}" stroke-opacity="0.10" stroke-width="1.5"/>
  <circle cx="${oppX}" cy="470" r="176" fill="none" stroke="${GOLD}" stroke-opacity="0.07" stroke-width="1.5"/>
  <circle cx="${oppX}" cy="470" r="4" fill="${GOLD}" fill-opacity="0.35"/>
  <path d="M${oppX - 250} 810H${oppX + 250}" stroke="${GOLD}" stroke-opacity="0.10" stroke-width="1.5"/>
</g>
<g filter="url(#phoneGlow)">
  <rect x="${p.x + 8}" y="${p.y + 10}" width="328" height="680" rx="44" fill="${GOLD}" fill-opacity="0.10"/>
</g>
${phone(p.x, p.y)}
<g transform="translate(${localX} ${localY})">${motifs[motif]()}</g>
</svg>
`;
}

await mkdir(SVG_DIR, { recursive: true });
await mkdir(OUT_DIR, { recursive: true });

for (const cover of covers) {
  const art = svg(cover);
  await writeFile(path.join(SVG_DIR, `${cover.file}.svg`), art, "utf8");
  await sharp(Buffer.from(art))
    .resize({ width: WIDTH, height: HEIGHT, fit: "cover" })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(path.join(OUT_DIR, `${cover.file}.webp`));
  console.log(`wrote ${cover.file}.webp`);
}
