import { Modal } from "react-bootstrap"
import { useBrowserStore } from "../store"
import { BrowserViewLogin } from "../constants"

const LoginModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)

  return (
    <Modal show={view === BrowserViewLogin} onHide={() => setView(null)}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Log in to your account</p>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
