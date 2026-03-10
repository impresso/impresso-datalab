import { Col, Container, Modal, Row } from "react-bootstrap"
import { BrowserViewConfirmRegistration } from "../constants"
import { useBrowserStore } from "../store"
import Alert from "./Alert"
import Link from "./Link"

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
              <h3 className="my-2 font-weight-bold font-size-inherit">
                Thanks for signing up for Impresso!
              </h3>
              <p>
                One of our team members is now reviewing your information to
                ensure everything is set up correctly.
              </p>
              <Alert className="my-3">
                <p className="m-0">
                  You'll receive a separate email notification as soon as your
                  account is activated and ready to go.
                </p>
              </Alert>
              <p>
                If you have registered with a <b>Student User</b> or{" "}
                <b>Academic User</b> plan, please be aware that your account
                will be reviewed by our team before activation. We appreciate
                yourpatience during this process.
              </p>
              <div className="text-center mb-4">
                <Link
                  to="/"
                  onClick={() => setView(null)}
                  className="btn btn-secondary px-5"
                >
                  Back to homepage
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default ConfirmRegistrationModal
