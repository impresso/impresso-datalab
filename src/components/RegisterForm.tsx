import { useEffect, useRef, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import UserCard, { type User } from "./UserCard"

export interface RegisterFormPayload {
  email: string
  password: string
  verifyPassword: string
  firstname: string
  lastname: string
}

export interface RegisterFormProps {
  className?: string
  onSubmit: (payload: RegisterFormPayload) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ className, onSubmit }) => {
  const previewDelayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [formPreview, setFormPreview] = useState<User>(() => ({
    email: "",
    firstname: "-",
    lastname: "-",
    username: "",
    profile: {
      pattern: ["#4f615b", "#3d95a6", "#d3deec", "#3c4b54", "#3e8696"],
    },
    isStaff: false,
    agreedToTerms: false,
  }))

  const formPayload = useRef<RegisterFormPayload>({
    email: "",
    password: "",
    verifyPassword: "",
    firstname: "",
    lastname: "",
  })
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.info("[RegisterForm] @handleOnSubmit")
    onSubmit(formPayload.current)
  }

  const updatePreview = (key: keyof RegisterFormPayload, value: string) => {
    formPayload.current[key] = value
    console.info("[RegisterForm] @updatePreview", key, value)
    // handpick the fields to preview
    previewDelayTimerRef.current = setTimeout(() => {
      console.info(
        "[RegisterForm] @updatePreview",
        "previewing",
        formPayload.current,
      )
      setFormPreview((state) => ({
        email: formPayload.current.email,
        firstname: formPayload.current.firstname,
        lastname: formPayload.current.lastname,
        ...state,
      }))
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (previewDelayTimerRef.current) {
        clearTimeout(previewDelayTimerRef.current)
      }
    }
  }, [])

  return (
    <Form onSubmit={handleOnSubmit} className={`RegisterForm ${className}`}>
      <Container>
        <Row>
          <Col>preview:</Col>
          <Col>
            <UserCard user={formPreview} />
          </Col>
          {JSON.stringify(formPreview)}
        </Row>
      </Container>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.email">
        <Form.Label className="font-weight-bold">Email address</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("email", e.target.value)}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.firstname">
        <Form.Label className="font-weight-bold">Firstname</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("firstname", e.target.value)}
          type="email"
          placeholder="your first name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.lastname">
        <Form.Label className="font-weight-bold">lastname</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("lastname", e.target.value)}
          type="email"
          placeholder="your last name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.password">
        <Form.Label className="font-weight-bold">Password</Form.Label>
        <Form.Control
          onChange={(e) => (formPayload.current.password = e.target.value)}
          type="password"
        />
      </Form.Group>
      {/* retype paswword */}
      <Form.Group className="mb-3" controlId="ModalRegisterForm.verifyPassword">
        <Form.Label className="font-weight-bold">Verify Password</Form.Label>
        <Form.Control
          onChange={(e) =>
            (formPayload.current.verifyPassword = e.target.value)
          }
          type="password"
        />
      </Form.Group>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </Form>
  )
}

export default RegisterForm
