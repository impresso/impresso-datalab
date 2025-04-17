import { Modal } from "react-bootstrap"
import { useBrowserStore } from "../store"
import {
  BrowserViewConfirmRegistration,
  BrowserViewRegister,
} from "../constants"
// import { useState } from "react"
// import { type User } from "./UserCard"
import RegisterForm, { type RegisterFormPayload } from "./RegisterForm"
import Link from "./Link"
import { useEffect, useState } from "react"
import type { FeathersError } from "@feathersjs/errors"
import { usersService } from "../services"

const RegisterModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)

  const [error, setError] = useState<FeathersError | null>(null)

  const createUser = (payload: RegisterFormPayload) => {
    usersService
      .create({
        ...payload,
        displayName: `${payload.firstname} ${payload.lastname}`,
      })
      .then((data) => {
        console.log("[RegisterModal] create", data)
        // setAuthenticatedUser(data.user, data.accessToken)
        setView(BrowserViewConfirmRegistration)
      })
      .catch((err: FeathersError) => {
        setError(err)
        console.error("[RegisterModal] create", err, err.message, err.data)
      })
  }

  useEffect(() => {
    setError(null)
  }, [view])

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
          Create your Impresso account to explore the full potential of our Web
          App and Datalab. Be careful to select the{" "}
          <Link to="/plans" target="_blank" underline>
            User Plan
          </Link>{" "}
          which best describes your current status and be prepared to{" "}
          <b>provide evidence</b> for Student User and Academic User
          registrations.
        </p>
        <RegisterForm
          onSubmit={(payload) => {
            console.info("[RegisterModal] @onSubmit", payload)
            createUser(payload)
          }}
          error={error}
        />
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
