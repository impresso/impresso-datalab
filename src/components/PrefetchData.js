import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useDataStore } from "../store"

const PrefetchData = () => {
  const [setData, isReady] = useDataStore((state) => [
    state.setData,
    state.isReady,
  ])
  console.info("[PrefetchData] load data:", isReady ? "ready" : "not ready")
  // this schema updates the store so that e always have the full list of authors and books
  useQuery({
    queryKey: ["todoss"],
    queryFn: () =>
      Promise.all(
        [
          "/data/authors.json",
          "/data/notebooks.json",
          "/data/collections.json",
          "/data/tutorials.json",
        ].map((url) =>
          axios
            .get((process.env.GATSBY_PATH_PREFIX || "") + url)
            .then((res) => {
              console.debug(`[PrefetchData] ${url}`, res.data)
              return res.data
            })
        )
      ).then((res) => {
        console.info("[PrefetchData] completed.")
        setData({
          authorsMap: res[0],
          notebooksMap: res[1],
          collectionsMap: res[2],
          tutorialsMap: res[3],
        })
        return true
      }),
    enabled: !isReady,
  })
}

export default PrefetchData
