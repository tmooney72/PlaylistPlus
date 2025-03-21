import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'https://desirable-emotion-production.up.railway.app',
        changeOrigin: true,
        secure: true,
        ws: true,
        cors: true,
      },
    },
    watch: {
      usePolling: true
    }
  },
})
