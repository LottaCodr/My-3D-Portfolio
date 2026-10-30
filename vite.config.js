import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//
// Bound to 0.0.0.0 so the app is reachable from outside the container (dev
// sandboxes, Docker, LAN testing). Vite 5.3.x performs no Host-header
// allowlist check, so proxied preview hosts resolve without extra config;
// if this project is upgraded to Vite >= 5.4.12, add
// `server.allowedHosts: true` alongside these settings.
export default defineConfig({
  plugins: [react()],
  server: { host: '0.0.0.0', port: 5173 },
  preview: { host: '0.0.0.0', port: 4173 },
  build: {
    /* Three.js is a lazy chunk of its own (about 810 kB, 220 kB gzipped) and is
       only fetched once the hero canvas mounts. Raise the warning ceiling so
       a real regression in the eager chunks still reports. */
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        /* Split vendors by change frequency. The app chunk then only carries
           portfolio code, and a UI library update does not invalidate the
           React chunk in visitors' caches. The Three.js bundle stays in its
           own chunk and is only requested when the lazy hero canvas mounts. */
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(three|three-stdlib|@react-three|maath)\//.test(id)) return 'three'
          if (/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
          if (/node_modules\/(@radix-ui|cmdk|class-variance-authority|clsx|tailwind-merge)\//.test(id)) return 'ui'
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return 'react'
          return undefined
        },
      },
    },
  },
})
