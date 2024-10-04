import { Modal } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import { BrowserViewLogin } from "../constants"
import LoginForm, { type LoginFormPayload } from "./LoginForm"
import { loginService } from "../services"

const LoginModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  const setAuthenticatedUser = usePersistentStore(
    (state) => state.setAuthenticatedUser
  )

  const checkCredentials = (credentials: LoginFormPayload) => {
    loginService
      .create({
        strategy: "local",
        ...credentials,
      })
      .then((data) => {
        // console.log("loginService.create", data)
        setAuthenticatedUser(data.user, data.accessToken)
        setView(null)
      })
      .catch((err) => {
        console.error("loginService.create", err)
      })
  }

  return (
    <Modal
      centered
      show={view === BrowserViewLogin}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <p>Log in to your account</p>
        <LoginForm onSubmit={checkCredentials} />
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
