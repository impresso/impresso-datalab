import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useDataStore } from "../store"

const PrefetchData = () => {
  const [setData, isReady] = useDataStore((state) => [
    state.setData,
    state.isReady,
  ])
  console.info("[PrefetchData] load data", !isReady)
  // this schema updates the store so that e always have the full list of authors and books
  useQuery({
    queryKey: ["todoss"],
    queryFn: () =>
      Promise.all(
        [
          "/data/authors.json",
          "/data/notebooks.json",
          "/data/collections.json",
        ].map((url) =>
          axios
            .get((process.env.GATSBY_PATH_PREFIX || "") + url)
            .then((res) => {
              console.info(`[PrefetchData] ${url}`, res.data)
              return res.data
            })
        )
      ).then((res) => {
        console.info("[PrefetchData] done", res)

        setData({
          authors: res[0],
          notebooks: res[1],
          collections: res[2],
        })
        return true
      }),
    enabled: !isReady,
  })
}

export default PrefetchData
