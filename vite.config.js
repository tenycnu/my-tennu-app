import { defineConfig } from 'vite'
import react from '@vitejs/react-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./" // Sitenin internette doğru yolları bulmasını sağlayan sihirli satır
})