import { createProxyMiddleware } from "http-proxy-middleware"
const WsApiTarget =
  process.env.PUBLIC_IMPRESSO_WS_API_HOST ?? "http://localhost"
const WsApiPath = process.env.PUBLIC_IMPRESSO_WS_API_PATH ?? "/socket.io"
const PublicApiTarget =
  process.env.PUBLIC_IMPRESSO_API_HOST ?? "http://localhost"
const PublicApiPath = process.env.PUBLIC_IMPRESSO_API_PATH ?? "/public-api"

export default () => {
  return {
    name: "proxy",
    hooks: {
      "astro:server:setup": ({ server }) => {
        console.log('proxy-middleware "astro:server:setup"')
        console.log(" - WsApiTarget:", WsApiTarget)
        console.log(" - WsApiPath:", WsApiPath)
        console.log(" - PublicApiTarget:", PublicApiTarget)
        console.log(" - PublicApiPath:", PublicApiPath)

        server.middlewares.use(
          WsApiPath,
          createProxyMiddleware({
            target: WsApiTarget,
            ws: true,
            changeOrigin: true,
          }),
        )
        server.middlewares.use(
          "/public-api",
          createProxyMiddleware({
            target: PublicApiTarget,
            ws: true,
            changeOrigin: true,
          }),
        )
      },
    },
  }
}
