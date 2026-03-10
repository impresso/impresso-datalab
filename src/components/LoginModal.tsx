import { Modal } from "react-bootstrap"
import { FeathersError } from "@feathersjs/errors"
import { usePersistentStore } from "../store"
import LoginForm, { type LoginFormPayload } from "./LoginForm"
import { loginService } from "../services"
import { useEffect, useState } from "react"

export interface LoginModalProps {
  show: boolean
  onHide: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({
  show = false,
  onHide = () => {},
}) => {
  const setAuthenticatedUser = usePersistentStore(
    (state) => state.setAuthenticatedUser,
  )
  const [error, setError] = useState<FeathersError | null>(null)

  const checkCredentials = (credentials: LoginFormPayload) => {
    console.debug("[LoginModal] call loginService...")
    loginService
      .create({
        strategy: "local",
        ...credentials,
      })
      .then((data) => {
        console.debug("[LoginModal] loginService.create", data)
        setAuthenticatedUser(data.user, data.accessToken)
        onHide()
      })
      .catch((err: FeathersError) => {
        setError(err)
        console.error("loginService.create", err)
      })
  }

  useEffect(() => {
    setError(null)
  }, [show])
  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <p>Log in to your account</p>
        <LoginForm onSubmit={checkCredentials} error={error} />
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
