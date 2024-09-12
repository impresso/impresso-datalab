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
import { useBrowserStore, usePersistentStore } from "./src/store"
import { versionService } from "./src/services"
import Page from "./src/components/Page"

// Logs when the client route changes
export function onRouteUpdate({ location, prevLocation }) {
  console.log("[Layout] render")
  console.log(
    "[gatsby-browser]@onRouteUpdate new pathname",
    location.pathname,
    "prev pathname",
    prevLocation?.pathname,
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
  process.env.GATSBY_PATH_PREFIX,
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

  // get fresh data from the localstorage
  const existingToken = window.localStorage.getItem("feathers-jwt")

  if (existingToken && usePersistentStore.getState().token === null) {
    console.info("[usePersistentStore] use existing token from feathers-jwt")
    usePersistentStore.setState({ token: existingToken })
  } else {
    console.info("[usePersistentStore] use fresh token")
  }

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

  if (props.path === "/plans/") {
    return <Page {...props}>hello{element}</Page>
  }
  // display all other pages a s modals
  return (
    <main className="position-fixed">
      <PageLayout {...props}>{element}</PageLayout>
    </main>
  )
}

export function shouldUpdateScroll() {
  return false
}
