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

// Logs when the client route changes
export function onRouteUpdate({ location, prevLocation }) {
  console.log("[Layout] render")
  console.log("[gatsby-browser]@onRouteUpdate new pathname", location)
  // let view = null
  // let viewId = null
  // // update zustand with search params, if any
  // if (location.search) {
  //   const params = new URLSearchParams(location.search)
  //   const paramView = params.get("view")
  //   const paramViewId = params.get("viewId")

  //   if (AvailableModalsViews.includes(paramView)) {
  //     console.log("[gatsby-browser]@onRouteUpdate view:", paramView)
  //     view = String(paramView)
  //   } else {
  //     console.log(
  //       "[gatsby-browser]@onRouteUpdate view not recognized, close everything:",
  //       paramView
  //     )
  //   }

  //   // test view id against a regex (lowercase letters and numbers, only trailing slash)
  //   if (paramViewId && /^[a-z0-9-]+$/.test(paramViewId)) {
  //     console.log("[gatsby-browser]@onRouteUpdate viewId:", paramViewId)
  //     viewId = String(paramViewId)
  //   } else {
  //     console.log(
  //       "[gatsby-browser]@onRouteUpdate viewId not recognized, close everything:",
  //       paramViewId
  //     )
  //   }
  // }

  // always update store with view and viewId
  // useBrowserStore.setState({
  //   view,
  //   viewId,
  // })
}

// Create a client
const queryClient = new QueryClient()
console.info(
  "Impresso datalab",
  "\n - PATH_PREFIX:",
  process.env.PATH_PREFIX,
  "\n - GATSBY_PATH_PREFIX:",
  process.env.GATSBY_PATH_PREFIX
)

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
