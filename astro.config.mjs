import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import mdx from "@astrojs/mdx"
import dotenv from "dotenv"

dotenv.config()

const WsApiTarget = process.env.PUBLIC_IMPRESSO_WS_API_HOST ?? "http://localhost"
const WsApiPath = process.env.PUBLIC_IMPRESSO_WS_API_PATH ?? "/api/socket.io"
const PublicApiTarget = process.env.PUBLIC_IMPRESSO_API_HOST ?? "http://localhost"
const PublicApiPath = process.env.PUBLIC_IMPRESSO_API_PATH ?? "/public-api"


// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  site: process.env.PUBLIC_IMPRESSO_DATALAB_SITE || "http://localhost:4321",
  base: process.env.PUBLIC_IMPRESSO_DATALAB_BASE || "/",
  ssr: {
    exclude: [WsApiPath, PublicApiPath]
  },
  vite: {
    server: {
      proxy: {
        [WsApiPath]: {
          target: `${WsApiTarget}${WsApiPath}`,
          changeOrigin: true,
          ws: false,
        },
        [PublicApiPath]: {
          target: `${PublicApiTarget}${PublicApiPath}`,
          changeOrigin: true,
          ws: true,
        },
      },
    }
  }
})
