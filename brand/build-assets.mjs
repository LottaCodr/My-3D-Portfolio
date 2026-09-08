/* Regenerates every raster + derived asset from the SVG masters in this folder.
 *
 * One-time deps (not in package.json):
 *   npm i --no-save @resvg/resvg-js @fontsource/inter
 * then:
 *   node brand/build-assets.mjs
 *
 * The SVG masters (logo.svg, og-image.svg) are the source of truth and are
 * hand-editable; the PNGs and the manifest below are generated output.
 */
import { Resvg } from '@resvg/resvg-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8')
const write = (p, data) => {
  fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true })
  fs.writeFileSync(path.join(root, p), data)
}

const GOLD = '#cfa96e'
const INK = '#0a0a0f'

/* ---- font (only needed for the og-image, which contains text) ---- */
const fontDir = 'node_modules/@fontsource/inter/files'
const fontFiles = [
  'inter-latin-400-normal.woff',
  'inter-latin-600-normal.woff',
  'inter-latin-700-normal.woff',
].map((f) => fs.readFileSync(path.join(root, fontDir, f)))

const render = (svg, width, useFont = false) =>
  new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: useFont
      ? { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Inter' }
      : { loadSystemFonts: false },
  })
    .render()
    .asPng()

/* ---- master mark ---- */
const mark = read('brand/logo.svg')
const markBody = `<rect width="64" height="64" rx="15" fill="${GOLD}"/><path d="M19 16h10v20h16v10H19z" fill="${INK}"/><rect x="37" y="16" width="8" height="8" fill="${INK}"/>`

/* Full-bleed variant for maskable icons (no rounded corners). */
const maskable = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" fill="${GOLD}"/><path d="M19 16h10v20h16v10H19z" fill="${INK}"/><rect x="37" y="16" width="8" height="8" fill="${INK}"/></svg>`

/* ---- 1. ship the vector masters where the app expects them ---- */
write('public/logo.svg', mark)
write('src/assets/logo.svg', mark)

/* ---- 2. raster icon set ---- */
const icons = [
  ['public/icons/icon-32.png', mark, 32],
  ['public/apple-touch-icon.png', mark, 180],
  ['public/icons/icon-192.png', mark, 192],
  ['public/icons/icon-512.png', mark, 512],
  ['public/icons/icon-maskable-512.png', maskable(512), 512],
]
for (const [out, svg, w] of icons) write(out, render(svg, w))

/* ---- 3. social / Open Graph card ---- */
write('public/og-image.png', render(read('brand/og-image.svg'), 1200, true))

/* ---- 4. web app manifest ---- */
const manifest = {
  name: 'Mr. Lotta — Portfolio',
  short_name: 'Mr. Lotta',
  description:
    'Portfolio of Mr. Lotta: robust web platforms, engaging mobile apps, and dynamic brand identities.',
  start_url: '/',
  display: 'standalone',
  background_color: '#0a0a0f',
  theme_color: '#0a0a0f',
  icons: [
    { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
}
write('public/site.webmanifest', JSON.stringify(manifest, null, 2) + '\n')

/* ---- report ---- */
const sizes = [
  'public/logo.svg',
  'src/assets/logo.svg',
  'public/icons/icon-32.png',
  'public/apple-touch-icon.png',
  'public/icons/icon-192.png',
  'public/icons/icon-512.png',
  'public/icons/icon-maskable-512.png',
  'public/og-image.png',
  'public/site.webmanifest',
]
for (const s of sizes)
  console.log('  ' + String(fs.statSync(path.join(root, s)).size).padStart(7) + ' B  ' + s)
console.log('done')
