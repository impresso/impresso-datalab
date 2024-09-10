import { createProxyMiddleware } from "http-proxy-middleware"

export default (context, options) => {
  return {
    name: "proxy",
    hooks: {
      "astro:server:setup": ({ server }) => {
        server.middlewares.use(
          "/api/socket.io",
          createProxyMiddleware({
            target: "https://dev.impresso-project.ch",
            ws: true,
            changeOrigin: true,
          }),
        )
      },
    },
  }
}
