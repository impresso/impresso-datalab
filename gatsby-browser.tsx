import React, { Suspense } from "react"

import "./src/styles/fonts.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./src/styles/style.css"

// import { useBrowserStore } from "./src/store"
import App from "./src/components/App"
import PageLayout from "./src/components/PageLayout"

const AppLazy = React.lazy(() => import("./src/components/App"))
const PageLayoutLazy = React.lazy(() => import("./src/components/PageLayout"))
// Logs when the client route changes
export function onRouteUpdate({ location, prevLocation }) {
  console.log("[Layout] render")
  console.log(
    "[gatsby-browser]@onRouteUpdate new pathname",
    location.pathname,
    "prev pathname",
    prevLocation?.pathname,
  )
  // useBrowserStore.getState().setPath(location.pathname, prevLocation?.pathname)
}

// Wraps every page in a component
export function wrapRootElement({ element, props }) {
  return (
    <Suspense>
      <AppLazy {...props}>{element}</AppLazy>
    </Suspense>
  )
}

// wraps every page in a component
export function wrapPageElement({ element, props }) {
  console.log("[gatsby-browser]@wrapPageElement", props)

  // display all other pages a s modals
  return (
    <main className="position-fixed">
      <Suspense>
        <PageLayoutLazy {...props}>{element}</PageLayoutLazy>
      </Suspense>
    </main>
  )
}

export function shouldUpdateScroll() {
  return false
}
