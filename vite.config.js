import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// publicDir is the existing "assets" folder, so nothing has to be moved.
// Its files (logo.png, hero.mp4, robots.txt, ...) are served from the site root.
export default defineConfig({
  plugins: [react()],
  publicDir: 'assets',
})
