<p align="center">
  <img src="brand/logo.svg" alt="Mr. Lotta logo" width="96" height="96" />
</p>

<h1 align="center">Mr. Lotta — 3D Portfolio</h1>

<p align="center">
  Robust web platforms, engaging mobile apps, mesmerizing animations, and dynamic brand identities.
</p>

## Stack

- [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) / [drei](https://github.com/pmndrs/drei)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [Tailwind CSS v3](https://tailwindcss.com/)

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
```

## Brand & logo

The logo is a gold (`#cfa96e`) rounded tile carrying a geometric "L" monogram plus an
aligned square accent — an echo of the terminal/cursor motif used across the site.
The masters live in [`brand/`](brand/):

| File | Purpose |
| ---- | ------- |
| `brand/logo.svg` | Vector mark — source of truth for the favicon & navbar/footer logo |
| `brand/og-image.svg` | Social / Open Graph card master |
| `brand/build-assets.mjs` | Regenerates the derived PNGs + `site.webmanifest` from the masters |

Derived assets (`public/logo.svg`, `src/assets/logo.svg`, `public/icons/*`,
`public/apple-touch-icon.png`, `public/og-image.png`, `public/site.webmanifest`) are
generated from those masters. To regenerate after editing a master:

```bash
npm i --no-save @resvg/resvg-js @fontsource/inter
node brand/build-assets.mjs
```

Design tokens (gold `#cfa96e`, ink `#0a0a0f`, muted `#71717a`) are shared between the
SVG masters and `src/index.css`.

## Deployment

Configured for [Genezio](https://genezio.com/) — see `genezio.yaml` (`publish: dist`).
