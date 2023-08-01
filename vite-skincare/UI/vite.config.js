import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/routines': 'http://localhost:3000',
      '/protectedResource': 'http://localhost:3000'
    }
  }

})
