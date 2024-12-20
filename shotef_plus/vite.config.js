import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import InjectCSS from '@itsy/vite-css-inject';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    InjectCSS()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests")
    }
  }
})
