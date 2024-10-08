import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query"
import { usePersistentStore } from "../store"
import { useEffect, useRef } from "react"
import axios, { AxiosError } from "axios"
import Token from "./Token"
import Alert from "./Alert"
import LoginForm from "./LoginForm"

const TokenWrapper: React.FC<{ delay?: number }> = ({ delay = 2000 }) => {
  const llToken = usePersistentStore((state) => state.token)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()
  const { status, data, error, mutate } = useMutation({
    mutationFn: (payload: {
      strategy: string
      accessToken?: string
      email?: string
      password?: string
    }) =>
      axios
        .post(
          `${import.meta.env.PUBLIC_IMPRESSO_API_PATH}/authentication`,
          payload,
        )
        .then((res) => res.data),
  })

  useEffect(() => {
    if (llToken) {
      console.info(
        "[TokenWrapper] llToken is set, calling the mutation in",
        delay,
        "ms",
      )
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        mutate({
          strategy: "jwt-app",
          accessToken: llToken,
        })
      }, delay)
    }
    return () => clearTimeout(timerRef.current)
  }, [llToken])

  const errorIsUnauthorized = (error as AxiosError)
    ? (error as AxiosError).response?.status === 401 ||
      (error as AxiosError).response?.status === 403
    : false

  const errorIsFailure = error && !errorIsUnauthorized

  const showLoginForm =
    (status === "idle" && !llToken) ||
    (status === "error" && errorIsUnauthorized)

  return (
    <div>
      {status === "pending" && <h2>Loading your API token...</h2>}
      {status === "error" && errorIsFailure && (
        <h2>An unexpected error. It happens...</h2>
      )}
      {status === "success" && <h2>Your Api token</h2>}
      {showLoginForm && (
        <>
          <h2>Please login to get your Api Token</h2>
          <LoginForm
            className="mb-3"
            onSubmit={(payload) => mutate({ strategy: "local", ...payload })}
          />
        </>
      )}

      <Alert
        className={"mb-3"}
        value="API access is always subject to the Terms of use. More info in the documentation section."
      />

      {errorIsFailure && (
        <Alert
          className={"mb-3"}
          value="There was an error while generating the access token."
        >
          {error.message}
        </Alert>
      )}
      {status === "success" && (
        <Token token={data.accessToken} className={"mt-4 mb-3"} />
      )}

      <p>
        Access tokens programmatically authenticate your identity to the
        Impresso Datalab, allowing applications to provide you specific data
        based on your request. Visit the documentation to discover how to use
        them.
      </p>
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
      <TokenWrapper />
    </QueryClientProvider>
  )
}
