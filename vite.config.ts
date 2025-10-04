import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tailwindcss()],
      base: command === 'build' ? '/shadcn-chartgrid' : undefined,
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    },
  }
})
