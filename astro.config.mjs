import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import vue from "@astrojs/vue"
import mdx from "@astrojs/mdx"
import dotenv from "dotenv"

console.log("NODE_ENV:", process.env.NODE_ENV)
dotenv.config({
  path: [
    ".env",
    ".env.local",
    `.env.${process.env.NODE_ENV}`,
    `.env.${process.env.NODE_ENV}.local`,
  ],
  debug: true,
  override: true,
})
const WsApiTarget =
  process.env.PUBLIC_IMPRESSO_WS_API_HOST ?? "http://localhost"
const WsApiPath = process.env.PUBLIC_IMPRESSO_WS_API_PATH ?? "/api/socket.io"

const PublicApiTarget =
  process.env.PUBLIC_IMPRESSO_API_HOST ?? "http://localhost"
const PublicApiPath = process.env.PUBLIC_IMPRESSO_API_PATH ?? "/public-api/v1"

// these values are relevant only when the proxy is used with different paths, e.g; for a local instance of impresso middle layer
const ProxyPublicApiPath =
  process.env.PUBLIC_IMPRESSO_API_PATH ?? "/public-api/v1"
const ProxyWsApiPath =
  process.env.PUBLIC_IMPRESSO_WS_API_PATH ?? "/api/socket.io"

if (process.env.NODE_ENV === "development") {
  console.log("WsApiTarget:", WsApiTarget)
  console.log("WsApiPath:", WsApiPath)
  console.log("PublicApiTarget:", PublicApiTarget)
  console.log("PublicApiPath:", PublicApiPath)
  console.log("ProxyPublicApiPath:", ProxyPublicApiPath)
  console.log("ProxyWsApiPath:", ProxyWsApiPath)
}
// https://astro.build/config
export default defineConfig({
  integrations: [
    vue({
      /* 
        if this is set to `true` - extra configuration needed to reconcile react and vue.
        See https://docs.astro.build/en/guides/integrations-guide/react/#combining-multiple-jsx-frameworks
      */
      jsx: false,
    }),
    react({}),
    mdx(),
  ],
  site: process.env.PUBLIC_IMPRESSO_DATALAB_SITE || "http://localhost:4321",
  base: process.env.PUBLIC_IMPRESSO_DATALAB_BASE || "/",
  ssr: {
    exclude: [WsApiPath, PublicApiPath],
  },
  vite: {
    plugins: [],
    server: {
      proxy: {
        [WsApiPath]: {
          target: `${WsApiTarget}${WsApiPath}`,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            const rewrittenPath = path
              .replace(WsApiPath, ProxyWsApiPath)
              .replace("//", "/")
            console.log(
              "[PROXY WS]",
              path,
              "->",
              `${WsApiTarget}${rewrittenPath}`,
            )
            return rewrittenPath
          },
        },
        [PublicApiPath]: {
          target: `${PublicApiTarget}`,
          changeOrigin: true,
          rewrite: (path) => {
            const rewrittenPath = path
              .replace(PublicApiPath, ProxyPublicApiPath)
              .replace("//", "/")
            console.log(
              "[PROXY]",
              path,
              "->",
              `${PublicApiTarget}${rewrittenPath}`,
            )
            return rewrittenPath
          },
        },
      },
    },
  },
})
