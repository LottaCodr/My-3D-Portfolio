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
})
