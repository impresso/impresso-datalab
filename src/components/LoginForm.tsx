import {
  BadRequest,
  NotAuthenticated,
  type FeathersError,
} from "@feathersjs/errors"
import React, { useRef } from "react"
import { Form } from "react-bootstrap"
import { useBrowserStore } from "../store"
import { BrowserViewRegister } from "../constants"

export interface LoginFormPayload {
  email: string
  password: string
}

export interface LoginFormProps {
  className?: string
  onSubmit: (payload: LoginFormPayload) => void
  error?: FeathersError
}

const LoginForm: React.FC<LoginFormProps> = ({
  className,
  onSubmit,
  error,
}) => {
  const setView = useBrowserStore((state) => state.setView)
  const formPayload = useRef({ email: "", password: "" })
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.info("[LoginForm] @handleOnSubmit")
    onSubmit(formPayload.current)
  }

  console.info("[LoginForm] @render", { error })
  let errorMessages: { key: string; message: string }[] = []

  if (error instanceof BadRequest && error.data) {
    errorMessages = Object.keys(error.data).map((key) => {
      return { key, message: error.data[key].message }
    })
  } else if (error instanceof NotAuthenticated) {
    errorMessages = [{ key: "Error", message: error.message }]
  } else if (error) {
    errorMessages = [{ key: "Error", message: error.message }]
  }
  return (
    <>
      <Form onSubmit={handleOnSubmit} className={`LoginForm ${className}`}>
        {errorMessages.length > 0 ? (
          <div className="alert alert-danger" role="alert">
            <ul className="list-unstyled m-0">
              {errorMessages.map((d, _i) => (
                <li key={_i}>
                  <b>{d.key}</b>:&nbsp;
                  {d.message}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <Form.Group className="mb-3" controlId="ModalLoginForm.email">
          <Form.Label className="font-weight-bold">Email address</Form.Label>
          <Form.Control
            onChange={(e) => (formPayload.current.email = e.target.value)}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ModalLoginForm.password">
          <Form.Label className="font-weight-bold">Password</Form.Label>
          <Form.Control
            onChange={(e) => (formPayload.current.password = e.target.value)}
            type="password"
          />
        </Form.Group>
        <div className="">
          <button
            type="submit"
            className="btn btn-primary w-100 d-flex justify-content-center px-5"
          >
            Log in
          </button>
        </div>
      </Form>
      {/* Did you forget your password?  */}
      <p className="mt-3">
        Did you forget your password?{" "}
        <a href="https://impresso-project.ch/app/password-reset">
          Reset your password
        </a>
      </p>
      <p className="my-3 py-3 gap-3 border-top border-bottom d-flex align-items-center">
        Don't have an account?
        <button
          onClick={() => setView(BrowserViewRegister)}
          className="btn btn-secondary px-5"
        >
          Register
        </button>
      </p>

      <p className="mt-2">
        Any Questions? <br />
        Contact us at{" "}
        <a href="mailto:info@impresso-project.ch">info@impresso-project.ch</a>
      </p>
    </>
  )
}

export default LoginForm
