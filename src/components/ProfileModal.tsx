import { Modal } from "react-bootstrap"
import { useBrowserStore } from "../store"
import { BrowserViewProfile } from "../constants"
// import { useState } from "react"
// import { type User } from "./UserCard"
import RegisterForm, { type RegisterFormPreview } from "./RegisterForm"
import Link from "./Link"
import { useEffect, useState } from "react"
import type { FeathersError } from "@feathersjs/errors"
import { userService } from "../services"

const ProfileModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  const [error, setError] = useState<FeathersError | null>(null)
  const [userFormPreview, setUserFormPreview] =
    useState<RegisterFormPreview | null>(null)
  useEffect(() => {
    setError(null)
    if (view !== BrowserViewProfile) {
      return
    }
    userService
      .find()
      .then((data) => {
        console.info("[ProfileModal] @useEffect - user", data)
        setUserFormPreview({
          username: data.username,
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          profile: {
            pattern: data.pattern.split(","),
          },
          agreedToTerms: data.agreedToTerms,
          isStaff: data.isStaff,
          pattern: data.pattern,
          groups: data.groups,
        })
      })
      .catch((error) => {
        console.error("[ProfileModal] @useEffect - error", error)
        setError(error)
      })
  }, [view])

  return (
    <Modal
      centered
      show={view == BrowserViewProfile}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-3">
        <RegisterForm
          onSubmit={(payload) => {
            console.info("[RegisterModal] @onSubmit", payload)
          }}
          error={error}
        />
      </Modal.Body>
    </Modal>
  )
}

export default ProfileModal
