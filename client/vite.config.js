import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), , tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target:'https://desirable-emotion-production.up.railway.app', // Your Flask app's URL
        changeOrigin: true,
      },
    },
    watch: {
      usePolling: true
    }
  },
})
