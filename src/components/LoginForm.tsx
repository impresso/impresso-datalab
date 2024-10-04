import React, { useRef } from "react"
import { Form } from "react-bootstrap"

export interface LoginFormPayload {
  email: string
  password: string
}

export interface LoginFormProps {
  className?: string
  onSubmit: (payload: LoginFormPayload) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onSubmit }) => {
  const formPayload = useRef({ email: "", password: "" })
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.info("[LoginForm] @handleOnSubmit")
    onSubmit(formPayload.current)
  }

  return (
    <Form onSubmit={handleOnSubmit} className={`LoginForm ${className}`}>
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
      <button type="submit" className="btn btn-primary">
        Log in
      </button>
    </Form>
  )
}

export default LoginForm
