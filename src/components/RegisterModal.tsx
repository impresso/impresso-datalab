import { Modal } from "react-bootstrap"
import { useBrowserStore } from "../store"
import { BrowserViewRegister } from "../constants"
// import { useState } from "react"
// import { type User } from "./UserCard"
import RegisterForm from "./RegisterForm"
import Link from "./Link"

const RegisterModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  // const [candidate, setCandidate] = useState<User>(() => ({
  //   username: "",
  //   isStaff: false,
  //   firstname: "",
  //   lastname: "",
  //   profile: {
  //     pattern: [],
  //   },
  //   agreedToTerms: false,
  // }))

  return (
    <Modal
      centered
      show={view == BrowserViewRegister}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <p>
          Register a new Account to access all features of the Impresso App and
          Impresso Datalab.{" "}
          <Link to="/plans" underline>
            View available Plans
          </Link>{" "}
          to check which one describes best your situation.
        </p>
        <RegisterForm
          onSubmit={(payload) =>
            console.info("[RegisterModal] @onSubmit", payload)
          }
        />
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
