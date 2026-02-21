import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import markdown from './vite-plugin-markdown.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), markdown()],
})
