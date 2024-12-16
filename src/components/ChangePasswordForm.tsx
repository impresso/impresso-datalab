import { BadRequest, type FeathersError } from "@feathersjs/errors"
import React, { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import ErrorManager, { type BadRequestData } from "./ErrorManager"
import { FloppyDiskArrowIn } from "iconoir-react"

export type ChangePasswordFormPayload = {
  currentPassword: string
  password: string
  verifyPassword: string
}

export interface ChangePasswordFormProps {
  className?: string
  onSubmit: (payload: ChangePasswordFormPayload) => void
  error?: FeathersError | null
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  className,
  onSubmit,
  error,
}) => {
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [formError, setFormError] = useState<Error | null>(null)

  const formPayload = useRef<ChangePasswordFormPayload>({
    currentPassword: "",
    password: "",
    verifyPassword: "",
  })

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.info("[ChangePasswordForm] @handleOnSubmit")
    const errorsAsData: { [key: string]: BadRequestData } = {}
    if (formPayload.current.password !== formPayload.current.verifyPassword) {
      errorsAsData.verifyPassword = {
        label: "Verify password",
        message: "The passwords you entered don't match. Please try again.",
      }
    }
    if (Object.keys(errorsAsData).length > 0) {
      setFormError(new BadRequest("Please check your entries.", errorsAsData))
      return false
    }
    onSubmit(formPayload.current)
  }

  const updateValue = (key: keyof ChangePasswordFormPayload, value: string) => {
    formPayload.current[key] = value
    console.info("[RegisterForm] @updatePreview", key, value)
    // handpick the fields to preview
    delayTimerRef.current = setTimeout(() => {
      setFormError(null)
    }, 400)
  }

  console.info("[ChangePasswordForm] @render", { error })

  useEffect(() => {
    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <Form
        onSubmit={handleOnSubmit}
        className={`ChangePasswordForm ${className}`}
      >
        <ErrorManager error={error || formError} />

        <Form.Group
          className="mb-3"
          controlId="ModalChangePasswordorm.password"
        >
          <Form.Label className="font-weight-bold">Current Password</Form.Label>
          <Form.Control
            onChange={(e) => updateValue("currentPassword", e.target.value)}
            type="password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ModalChangePassword.password">
          <Form.Label className="font-weight-bold">New Password</Form.Label>
          <Form.Control
            onChange={(e) => updateValue("password", e.target.value)}
            type="password"
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="ModalChangePassword.verifyPassword"
        >
          <Form.Label className="font-weight-bold">
            Verify New Password
          </Form.Label>
          <Form.Control
            onChange={(e) => updateValue("verifyPassword", e.target.value)}
            type="password"
          />
        </Form.Group>
        <button type="submit" className="btn btn-primary btn-lg px-4">
          <FloppyDiskArrowIn /> <span className="ms-2">Register</span>
        </button>
      </Form>

      <p className="mt-2">
        Any Questions? <br />
        Contact us at{" "}
        <a href="mailto:info@impresso-project.ch">info@impresso-project.ch</a>
      </p>
    </>
  )
}

export default ChangePasswordForm
