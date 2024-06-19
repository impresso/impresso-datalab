import React from "react"
import Layout from "./src/components/Layout"
import "./src/styles/fonts.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./src/styles/style.css"
import Modals from "./src/components/Modals"
// import { AvailableModalsViews } from "./src/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import PrefetchData from "./src/components/PrefetchData"
import PageLayout from "./src/components/PageLayout"
import { useBrowserStore } from "./src/store"
import { versionService } from "./src/services"

// Logs when the client route changes
export function onRouteUpdate({ location, prevLocation }) {
  console.log("[Layout] render")
  console.log(
    "[gatsby-browser]@onRouteUpdate new pathname",
    location.pathname,
    "prev pathname",
    prevLocation?.pathname
  )
  useBrowserStore.getState().setPath(location.pathname, prevLocation?.pathname)
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // Add a timeout of 10 seconds
      staleTime: 10000,
    },
  },
})
console.info(
  "Impresso datalab",
  "\n - PATH_PREFIX:",
  process.env.PATH_PREFIX,
  "\n - GATSBY_PATH_PREFIX:",
  process.env.GATSBY_PATH_PREFIX
)

setTimeout(() => {
  console.info("[gatsby-browser] load version...")
  versionService.find().then((data) => {
    console.info("[gatsby-browser] use version:", data)
  })
}, 3000)

// Wraps every page in a component
export function wrapRootElement({ element, props }) {
  console.log("[gatsby-browser]@wrapRootElement")
  return (
    <QueryClientProvider client={queryClient}>
      <PrefetchData />
      <Modals />
      <Layout {...props}>{element}</Layout>
    </QueryClientProvider>
  )
}

// wraps every page in a component
export function wrapPageElement({ element, props }) {
  console.log("[gatsby-browser]@wrapPageElement", props)
  return <PageLayout {...props}>{element}</PageLayout>
}

export function shouldUpdateScroll() {
  return false
}
