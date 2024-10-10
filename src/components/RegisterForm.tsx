import { useEffect, useRef, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import UserCard from "./UserCard"
import {
  PlanAcademicUser,
  PlanImpressoUser,
  PlanStudentUser,
  PlanLabels,
} from "../constants"

const Colors: string[] = [
  "#96ceb4",
  "#ffeead",
  "#ffcc5c",
  "#ff6f69",
  "#588c7e",
  "#f2e394",
  "#f2ae72",
  "#d96459",
  "#a9bdc8",
  "#677e96",
  "#4a9bb1",
  "#ccd6e6",
  "#4f615b",
  "#3d95a6",
  "#d3deec",
  "#3c4b54",
  "#3e8696",
  "#dce5f4",
  "#45535f",
  "#4a818a",
  "#b2bdcc",
  "#2e4051",
  "#62797d",
]

const generatePattern = (): string[] => {
  const colors = []
  // let palette = Math.floor(Math.random()*this.palettes.length);
  for (let i = 0; i < 5; i++) {
    const mycolor = Colors[Math.floor(Math.random() * Colors.length)]
    colors.push(mycolor)
  }
  return colors
}

const Plans = [PlanImpressoUser, PlanStudentUser, PlanAcademicUser]

export interface RegisterFormPayload {
  email: string
  password: string
  verifyPassword: string
  firstname: string
  lastname: string
  plan: string
}

export interface RegisterFormProps {
  className?: string
  onSubmit: (payload: RegisterFormPayload) => void
}

const RegisterForm: React.FC<RegisterFormProps> = ({ className, onSubmit }) => {
  const previewDelayTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [formPreview, setFormPreview] = useState(() => ({
    email: "",
    firstname: "-",
    lastname: "-",
    username: "",
    profile: {
      pattern: generatePattern(),
    },
    isStaff: false,
    agreedToTerms: false,
  }))

  const formPayload = useRef<RegisterFormPayload>({
    email: "",
    password: "",
    verifyPassword: "",
    firstname: "-",
    lastname: "-",
    plan: PlanImpressoUser,
  })
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // check errors
    console.info("[RegisterForm] @handleOnSubmit")
    onSubmit(formPayload.current)
  }
  const changeProfileColors = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.info("[RegisterForm] @changeProfileColors")
    const pattern = generatePattern()
    setFormPreview((state) => ({
      ...state,
      profile: {
        pattern,
      },
      pattern: pattern.join(","),
    }))
  }

  const updateAgreement = (agreedToTerms: boolean) => {
    setFormPreview((state) => ({
      ...state,
      agreedToTerms,
    }))
    console.info("[RegisterForm] @updateAgreement", agreedToTerms)
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
        ...state,
        pattern: state.profile.pattern.join(","),
        email: formPayload.current.email,
        firstname: formPayload.current.firstname,
        lastname: formPayload.current.lastname,
        username: formPayload.current.email,
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
      <section className="mb-3 d-flex flex-wrap gap-2 align-items-center">
        {Plans.map((plan) => (
          <Form.Check
            className="border rounded"
            key={plan}
            type="radio"
            label={PlanLabels[plan]}
            name="plan"
            onChange={() => updatePreview("plan", plan)}
            id={`ModalRegisterForm.${plan}`}
          />
        ))}
      </section>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.email">
        <Form.Label className="font-weight-bold">Email address</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("email", e.target.value)}
          type="email"
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.firstname">
        <Form.Label className="font-weight-bold">First name</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("firstname", e.target.value)}
          placeholder="your first name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.lastname">
        <Form.Label className="font-weight-bold">Last name</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("lastname", e.target.value)}
          placeholder="your last name"
        />
      </Form.Group>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="ModalRegisterForm.password">
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              onChange={(e) => (formPayload.current.password = e.target.value)}
              type="password"
            />
          </Form.Group>
        </Col>
        {/* retype paswword */}
        <Col>
          <Form.Group
            className="mb-3"
            controlId="ModalRegisterForm.verifyPassword"
          >
            <Form.Label className="font-weight-bold">
              Verify Password
            </Form.Label>
            <Form.Control
              onChange={(e) =>
                (formPayload.current.verifyPassword = e.target.value)
              }
              type="password"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.agreedToTerms">
        <Form.Check
          onChange={(e) => updateAgreement(e.target.checked)}
          label="I agree to the terms and conditions"
        />
      </Form.Group>
      <section className="d-flex gap-4 align-items-center mb-2">
        <div>Preview:</div>
        <UserCard
          user={formPreview}
          className=" shadow-sm border-radius-lg ps-2 py-2 pe-3 "
        />
        <button
          className="btn btn-outline-secondary ms-auto btn-sm"
          onClick={changeProfileColors}
        >
          change colors
        </button>
      </section>
      <button type="submit" className="btn btn-primary btn-lg">
        Register
      </button>
    </Form>
  )
}

export default RegisterForm
