import React, { useEffect, useState } from "react"
import { usePersistentStore } from "../store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Layout from "../components/Layout"
import PrefetchData from "../components/PrefetchData"
import Modals from "../components/Modals"

console.info(
  "Impresso datalab",
  "\n - PATH_PREFIX:",
  process.env.PATH_PREFIX,
  "\n - GATSBY_PATH_PREFIX:",
  process.env.GATSBY_PATH_PREFIX,
)

// setTimeout(() => {
//   console.info("[gatsby-browser] load version...")
//   versionService.find().then((data) => {
//     console.info("[gatsby-browser] use version:", data)
//   })
// }, 3000)

const App: React.FC = ({ props, children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            // Add a timeout of 10 seconds
            staleTime: 10000,
          },
        },
      }),
  )
  console.log("[App] rendering...", window)
  useEffect(() => {
    // get fresh data from the localstorage
    const existingToken = window.localStorage.getItem("feathers-jwt")

    if (existingToken && usePersistentStore.getState().token === null) {
      console.info("[usePersistentStore] use existing token from feathers-jwt")
      usePersistentStore.setState({ token: existingToken })
    } else {
      console.info("[usePersistentStore] use fresh token")
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <PrefetchData />
      <Modals />
      <Layout {...props}>{children}</Layout>
    </QueryClientProvider>
  )
}

export default App
