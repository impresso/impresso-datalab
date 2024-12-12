import { useEffect, useRef, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import UserCard from "./UserCard"
import {
  PlanResearcher,
  PlanImpressoUser,
  PlanEducational,
  PlanLabels,
  BrowserViewTermsOfUse,
  PlanResearcherPlus,
} from "../constants"
import { useBrowserStore, usePersistentStore } from "../store"
import { DateTime } from "luxon"
import { BadRequest, type FeathersError } from "@feathersjs/errors"
import ErrorManager, { type BadRequestData } from "./ErrorManager"
import type { Group } from "../types"
import { FloppyDiskArrowIn, Refresh } from "iconoir-react"

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

const Plans = [PlanImpressoUser, PlanEducational, PlanResearcher]

export interface RegisterFormPayload {
  email: string
  password: string
  username: string
  verifyPassword: string
  firstname: string
  lastname: string
  plan: string
}

export interface RegisterFormPreview {
  email: string
  firstname: string
  lastname: string
  username: string
  profile: {
    pattern: string[]
  }
  pattern: string
  isStaff: boolean
  agreedToTerms: boolean
  groups: Group[]
}

export interface RegisterFormProps {
  className?: string
  onSubmit: (payload: RegisterFormPayload) => void
  error?: FeathersError | null
  initialValues?: RegisterFormPreview
}

export const InitialDefaultValues: RegisterFormPreview = {
  email: "",
  firstname: "",
  lastname: "",
  username: "",
  profile: {
    pattern: generatePattern(),
  },
  pattern: "",
  isStaff: false,
  agreedToTerms: false,
  groups: [],
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  className,
  onSubmit,
  error,
  initialValues = InitialDefaultValues,
}) => {
  const previewDelayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const acceptTermsDate = usePersistentStore((state) => state.acceptTermsDate)
  const setView = useBrowserStore((state) => state.setView)
  const [formError, setFormError] = useState<Error | null>(null)
  const [formPreview, setFormPreview] = useState<RegisterFormPreview>(
    () => initialValues
  )

  const formPayload = useRef<RegisterFormPayload>({
    email: initialValues.email,
    password: "",
    verifyPassword: "",
    username: initialValues.username,
    firstname: initialValues.firstname,
    lastname: initialValues.lastname,

    plan: PlanImpressoUser,
  })

  console.info("[RegisterForm] @initialValues", initialValues)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // check errors
    const errorsAsData: { [key: string]: BadRequestData } = {}
    console.info("[RegisterForm] @handleOnSubmit")
    if (formPayload.current.password !== formPayload.current.verifyPassword) {
      errorsAsData.verifyPassword = {
        label: "Verify password",
        message: "The passwords you entered don't match. Please try again.",
      }
    }
    // verufy password is complicated enough using a nice regex, numbers, uppercase andlowervase letter and a punctuation mark
    if (
      !formPayload.current.password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
      )
    ) {
      errorsAsData.password = {
        label: "Password",
        message:
          "Your password must contain at least 8 characters, including uppercase, lowercase, numbers and a punctuation mark.",
      }
    }

    // check email address is ok
    if (!formPayload.current.email.match(/.+@.+\..+/)) {
      errorsAsData.email = {
        label: "Email",
        message: "Please enter a valid email address.",
      }
    }
    // check username is lwercase and number only, with '.' and '_' and "-"
    if (!formPayload.current.username.match(/^[a-z0-9-]{8,}$/)) {
      errorsAsData.username = {
        label: "Your user name",
        message:
          "Your user name must be at least 8 characters long, using only lowercase letters and numbers (e.g., johndoe84).",
      }
    }
    // check lastname and firstname not to be empty
    if (formPayload.current.firstname.trim().length < 2) {
      errorsAsData.firstname = {
        label: "First name",
        message: "Please enter your first name.",
      }
    }
    if (formPayload.current.lastname.trim().length < 2) {
      errorsAsData.lastname = {
        label: "Last name",
        message: "Please enter your last name.",
      }
    }
    if (!formPayload.current.plan) {
      errorsAsData.plan = {
        label: "Plan",
        message: "Please select a plan.",
      }
    }
    if (Object.keys(errorsAsData).length > 0) {
      setFormError(new BadRequest("Please check your entries.", errorsAsData))
      return
    }
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

  const updatePreview = (key: keyof RegisterFormPayload, value: string) => {
    formPayload.current[key] = value
    console.info("[RegisterForm] @updatePreview", key, value)
    // handpick the fields to preview
    previewDelayTimerRef.current = setTimeout(() => {
      setFormPreview((state) => ({
        ...state,
        pattern: state.profile.pattern.join(","),
        email: formPayload.current.email,
        firstname: formPayload.current.firstname,
        lastname: formPayload.current.lastname,
        username: formPayload.current.username,
        groups: [
          {
            id: 1,
            name: formPayload.current.plan,
          },
        ],
      }))
    }, 100)
  }

  useEffect(() => {
    console.debug("[RegisterForm] @useEffect - initialValues", initialValues)
    formPayload.current = {
      email: initialValues.email,
      password: formPayload.current.password,
      verifyPassword: formPayload.current.verifyPassword,
      username: initialValues.username,
      firstname: initialValues.firstname,
      lastname: initialValues.lastname,
      plan: PlanImpressoUser,
    }
    setFormPreview(initialValues)
  }, [initialValues])
  useEffect(() => {
    return () => {
      if (previewDelayTimerRef.current) {
        clearTimeout(previewDelayTimerRef.current)
      }
    }
  }, [])

  return (
    <Form onSubmit={handleOnSubmit} className={`RegisterForm ${className}`}>
      <ErrorManager error={error || formError} />
      <section className="mb-3 d-flex flex-wrap gap-2 align-items-center">
        {Plans.map((plan) => (
          <Form.Check
            className={`border rounded-md shadow-sm ${
              formPayload.current.plan === plan ? "active" : ""
            }`}
            key={plan}
            type="radio"
            label={PlanLabels[plan]}
            checked={formPayload.current.plan === plan}
            name="plan"
            onChange={() => updatePreview("plan", plan)}
            id={`ModalRegisterForm.${plan}`}
          />
        ))}
      </section>
      <Row>
        <Col>
          <Form.Group className="mb-3" controlId="ModalRegisterForm.email">
            <Form.Label className="font-weight-bold">Email address</Form.Label>
            <Form.Control
              onChange={(e) => updatePreview("email", e.target.value)}
              type="email"
              value={formPayload.current.email}
              placeholder="name@example.com"
            />
          </Form.Group>
        </Col>
        <Col>
          {/* username */}
          <Form.Group className="mb-3" controlId="ModalRegisterForm.username">
            <Form.Label className="font-weight-bold">User name</Form.Label>
            <Form.Control
              onChange={(e) => updatePreview("username", e.target.value)}
              value={formPayload.current.username}
              placeholder="your user name"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.firstname">
        <Form.Label className="font-weight-bold">First name</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("firstname", e.target.value)}
          value={formPayload.current.firstname}
          placeholder="Your first name"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ModalRegisterForm.lastname">
        <Form.Label className="font-weight-bold">Last name</Form.Label>
        <Form.Control
          onChange={(e) => updatePreview("lastname", e.target.value)}
          value={formPayload.current.lastname}
          placeholder="Your last name"
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
              Verify password
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
          checked={acceptTermsDate !== null}
          onChange={() => {
            if (acceptTermsDate) {
              return
            }
            setView(BrowserViewTermsOfUse)
          }}
          label="I agree to the Terms of Use"
        />
        {acceptTermsDate !== null && (
          <p className="m-2 px-3">
            You accepted the Terms of Use <br />
            <b>
              {DateTime.fromISO(acceptTermsDate)
                .setLocale("en-GB")
                .toLocaleString(DateTime.DATETIME_FULL)}
            </b>
          </p>
        )}
      </Form.Group>
      <section className="d-flex p-2  gap-4 align-items-center mb-2 border-radius-sm ">
        <div>Preview:</div>
        <UserCard
          user={formPreview}
          className="shadow-sm border-radius-lg ps-2 py-2 pe-3 "
        />
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={changeProfileColors}
        >
          <Refresh /> <span className="ms-1">change colors</span>
        </button>
      </section>
      <button type="submit" className="btn btn-primary btn-lg px-4">
        <FloppyDiskArrowIn /> <span className="ms-2">Register</span>
      </button>
    </Form>
  )
}

export default RegisterForm
