import { Col, Container, Modal, Row } from "react-bootstrap"
import { BrowserViewConfirmRegistration } from "../constants"
import { useBrowserStore } from "../store"
import Alert from "./Alert"

const ConfirmRegistrationModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  return (
    <Modal
      centered
      show={view === BrowserViewConfirmRegistration}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Registration almost completed...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <p>
                Thank you for completing the first step of the registration.
              </p>
              <Alert>
                <p className="m-0">
                  Download and sign the{" "}
                  <a
                    href="https://impresso-project.ch/assets/documents/impresso_NDA.pdf"
                    download
                  >
                    Non-Disclosure Agreement (NDA)
                  </a>
                  , then email it to{" "}
                  <a href="mailto:info@impresso-project.ch">
                    info@impresso-project.ch
                  </a>{" "}
                  to complete your registration.
                </p>
              </Alert>
              <p className="mt-3">
                Once we have received the signed NDA, your account will be
                activated within two working days. Download and sign the
                Non-Disclosure Agreement (NDA), then email it to
                info@impresso-project.ch to complete your registration.
              </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmRegistrationModal
