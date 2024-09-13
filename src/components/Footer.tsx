import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import axios from "axios"

const Footer: React.FC = () => {
  const { status, data, error } = useQuery({
    queryKey: ["version"],
    queryFn: () => {
      return axios.get(`${import.meta.env.PUBLIC_IMPRESSO_API_PATH}/version`)
    },
  })

  return (
    <div>
      {status}
      {status === "pending" && <p>Loading...</p>}
      {status === "error" && <p>Error: {JSON.stringify(error.message)}</p>}
      {status === "success" && <p>Version: {JSON.stringify(data)}</p>}
    </div>
  )
}

export default function () {
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
  return (
    <QueryClientProvider client={queryClient}>
      <Footer />
    </QueryClientProvider>
  )
}
