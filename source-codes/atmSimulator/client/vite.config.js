import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/atm/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
