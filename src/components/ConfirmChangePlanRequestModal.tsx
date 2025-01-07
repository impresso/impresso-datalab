import { Col, Container, Modal, Row } from "react-bootstrap"
import { BrowserViewConfirmChangePlanRequest } from "../constants"
import { useBrowserStore } from "../store"

const ConfirmChangePlanRequestModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  return (
    <Modal
      centered
      show={view === BrowserViewConfirmChangePlanRequest}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Your request to change your plan has been submitted.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <p>
                Your request to change your plan has been received. Please wait
                for an email from us with further instructions. You will need to
                reply to that email with the required documentation to complete
                the process. If you have any issues, please contact{" "}
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

export default ConfirmChangePlanRequestModal
