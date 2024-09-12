import React, { useEffect, useRef } from "react"
import Alert from "./Alert"
import { Button, Form } from "react-bootstrap"
import { RefreshDouble, PlusCircle } from "iconoir-react"
import Token from "./Token"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import UserCard from "./UserCard"
import LoginForm, { LoginFormPayload } from "./LoginForm"

export interface AccessToApiProps {
  llToken?: string | null
}
export interface ApiError extends Error {
  status: number
}

const AccessToApi: React.FC<AccessToApiProps> = ({ llToken }) => {
  const { status, data, error, mutate } = useMutation({
    mutationFn: (payload: {
      strategy: string
      accessToken?: string
      email?: string
      password?: string
    }) =>
      axios.post("/public-api/authentication", payload).then((res) => res.data),
  })

  const errorIsUnauthorized = error
    ? error.response?.status === 401 || error.response?.status === 403
    : false

  const errorIsFailure = error && !errorIsUnauthorized

  const handleOnSubmit = (payload: LoginFormPayload) => {
    mutate({
      strategy: "local",
      ...payload,
    })
  }

  useEffect(() => {
    if (llToken && llToken.length > 0) {
      console.info("[AccessToApi] llToken is set, calling the mutation")
      // call the mutation
      mutate({
        strategy: "local",
        accessToken: llToken,
      })
    }
  }, [llToken])

  return (
    <div>
      {status === "pending" && <h2>Loading your API token...</h2>}
      {status === "error" && errorIsFailure && (
        <h2>An unexpected error. It happens...</h2>
      )}
      {status === "success" && <h2>Your Api token</h2>}
      {status === "idle" && <h2>Get your API token</h2>}
      {status === "error" && errorIsUnauthorized && (
        <h2>Please login to get your Api Token</h2>
      )}

      {errorIsUnauthorized && (
        <LoginForm className="mb-3" onSubmit={handleOnSubmit} />
      )}
      {status}
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

export default AccessToApi
