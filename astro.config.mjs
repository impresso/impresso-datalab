import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import dotenv from "dotenv"
import proxyMiddleware from "./plugins/proxy-middleware.mjs"

dotenv.config()

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx(), proxyMiddleware()],
  site: process.env.PUBLIC_IMPRESSO_DATALAB_SITE || "http://localhost:4321",
  base: process.env.PUBLIC_IMPRESSO_DATALAB_BASE || "/",
})
