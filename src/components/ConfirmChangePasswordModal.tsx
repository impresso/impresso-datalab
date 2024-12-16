import { Col, Container, Modal, Row } from "react-bootstrap"
import { BrowserViewConfirmChangePassword } from "../constants"
import { useBrowserStore } from "../store"

const ConfirmChangePasswordModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  return (
    <Modal
      centered
      show={view === BrowserViewConfirmChangePassword}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Password changed successfully</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <p>
                You can now log in with your new password. If you have any
                issues, please contact{" "}
                <a href="mailto:info@impresso-project.ch">
                  info@impresso-project.ch
                </a>{" "}
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmChangePasswordModal
