import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://energetic-pear-vest.cyclic.cloud/',
        changeOrigin: true,
        secure: false
      },
    },
  },
})
