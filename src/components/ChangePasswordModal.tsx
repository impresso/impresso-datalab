import { Col, Container, Form, Modal, Row } from "react-bootstrap"
import { BrowserViewChangePassword } from "../constants"
import { useBrowserStore } from "../store"
import Alert from "./Alert"
import { useRef, useState } from "react"
import ChangePasswordForm, {
  type ChangePasswordFormPayload,
} from "./ChangePasswordForm"
import type { FeathersError } from "@feathersjs/errors"
import { changePasswordService } from "../services"

const ChangePassword = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  const [error, setError] = useState<FeathersError | null>(null)

  const handleOnSubmit = (payload: ChangePasswordFormPayload) => {
    console.info("[ChangePasswordModal] @handleOnSubmit", payload)
    changePasswordService
      .create({
        password: payload.password,
        currentPassword: payload.currentPassword,
      })
      .then((data) => {
        console.info(
          "[ChangePasswordModal] Password changed successfully. data:",
          data
        )
        setView(null)
      })
      .catch((err: FeathersError) => {
        setError(err)
        console.error("[ChangePasswordModal] create", err.message, err.data)
      })
  }

  return (
    <Modal
      centered
      show={view === BrowserViewChangePassword}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <ChangePasswordForm onSubmit={handleOnSubmit} error={error} />
      </Modal.Body>
    </Modal>
  )
}

export default ChangePassword
