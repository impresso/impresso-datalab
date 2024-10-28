import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query"
import { useBrowserStore, usePersistentStore } from "../store"
import { useEffect, useRef, useState } from "react"
import axios, { AxiosError } from "axios"
import Token from "./Token"
import Alert from "./Alert"
import { Container } from "react-bootstrap"
import { BrowserViewLogin, BrowserViewTermsOfUse } from "../constants"
import { DateTime } from "luxon"

const TokenWrapper: React.FC<{ delay?: number }> = ({ delay = 2000 }) => {
  const [llToken, acceptTermsDate] = usePersistentStore((state) => [
    state.token,
    state.acceptTermsDate,
  ])

  const setView = useBrowserStore((state) => state.setView)
  const [isBusy, setIsBusy] = useState(false)

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
        .then((res) => res.data)

        .finally(() => setIsBusy(false)),
  })

  useEffect(() => {
    if (llToken && acceptTermsDate) {
      console.info(
        "[TokenWrapper] llToken is set, calling the mutation in",
        delay,
        "ms",
      )
      clearTimeout(timerRef.current)
      setIsBusy(true)
      timerRef.current = setTimeout(() => {
        mutate({
          strategy: "jwt-app",
          accessToken: llToken,
        })
      }, delay)
    }
    return () => clearTimeout(timerRef.current)
  }, [llToken, acceptTermsDate])

  const errorIsUnauthorized = (error as AxiosError)
    ? (error as AxiosError).response?.status === 401 ||
      (error as AxiosError).response?.status === 403
    : false

  const errorIsFailure = error && !errorIsUnauthorized

  const showLoginForm =
    (status === "idle" && !llToken) ||
    (status === "error" && errorIsUnauthorized)

  return (
    <Container>
      <h1>
        {status === "idle" && !isBusy && "Generate your API token"}
        {(isBusy || status === "pending") && "Generating your API token..."}
        {status === "error" &&
          errorIsFailure &&
          !isBusy &&
          "An unexpected error happened. It happens..."}
        {status === "success" && !isBusy && "Your Api token"}
      </h1>

      {errorIsFailure && (
        <Alert
          type="error"
          className={"mb-3"}
          value="There was an error while generating the access token."
        >
          {error.message}
        </Alert>
      )}
      <Alert
        className={"mb-3"}
        type={!acceptTermsDate ? "warning" : "info"}
        value=""
      >
        <div className="ms-3">
          {acceptTermsDate !== null ? (
            <p className="m-0">
              API access is always subject to the&nbsp;
              <button
                className="btn btn-link d-inline-block"
                onClick={() => {
                  setView(BrowserViewTermsOfUse)
                }}
              >
                Terms of use
              </button>
              . You accepted the Terms of Use{" "}
              <b>
                {DateTime.fromISO(acceptTermsDate)
                  .setLocale("en-GB")
                  .toLocaleString(DateTime.DATETIME_FULL)}
              </b>
            </p>
          ) : (
            <p className="m-0">
              You have not accepted our <b>Terms of Use</b> yet. Please read the{" "}
              <b>entire</b> terms of use document carefully and accept it before
              using the token.
            </p>
          )}
        </div>
      </Alert>
      {acceptTermsDate === null && (
        <button
          className="btn btn-secondary mt-3 mx-auto"
          onClick={() => {
            setView(BrowserViewTermsOfUse)
          }}
        >
          Read and accept the Terms of use to generate the token
        </button>
      )}
      {showLoginForm && (
        <section className="my-4 d-flex flex-column justify-content-center">
          <h2 className="mx-auto ">Please login to get your Api Token</h2>
          <button
            type="submit"
            className="btn btn-secondary mx-auto d-flex justify-content-center px-5"
            onClick={() => setView(BrowserViewLogin)}
          >
            Log in or Register
          </button>
        </section>
      )}
      {isBusy && (
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {status === "success" && acceptTermsDate !== null && (
        <Token token={data.accessToken} className={"mt-4 mb-3"} />
      )}

      <p>
        Access tokens programmatically authenticate your identity to the
        Impresso Datalab, allowing applications to provide you specific data
        based on your request.
      </p>
    </Container>
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
