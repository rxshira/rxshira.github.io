import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// For GitHub Pages: if repo name is different from username.github.io, 
// update the base path to match your repository name (e.g., '/Website/')
export default defineConfig(({ mode }) => {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true' || mode === 'production'
  
  return {
    plugins: [react()],
    // Using '/' because this is a username.github.io repository
    base: '/',
    build: {
      outDir: 'dist',
    },
  }
})

