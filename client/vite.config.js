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
        secure: false,
        ws: true,
        cors: true,
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            if (req.body) {
              const bodyData = JSON.stringify(req.body);
              proxyReq.setHeader('Content-Type', 'application/json');
              proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
              proxyReq.write(bodyData);
            }
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // Forward cookies from the backend
            const cookies = proxyRes.headers['set-cookie'];
            if (cookies) {
              res.setHeader('Set-Cookie', cookies);
            }
          });
        }
      },
    },
    watch: {
      usePolling: true
    }
  },
})
