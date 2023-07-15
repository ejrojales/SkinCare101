import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/AMroutines': 'http://localhost:3000',
      '/PMroutines': 'http://localhost:3000'
    }
  }

})
