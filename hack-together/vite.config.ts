import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import ViteYaml from '@modyfi/vite-plugin-yaml'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    ViteYaml(),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
