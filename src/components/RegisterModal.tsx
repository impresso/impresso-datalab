import { Modal } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import { BrowserViewRegister } from "../constants"
import LoginForm, { type LoginFormPayload } from "./LoginForm"
import { loginService } from "../services"
import { useRef, useState } from "react"
import { type User } from "./UserCard"
import RegisterForm from "./RegisterForm"

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

const RegisterModal = () => {
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  const [candidate, setCandidate] = useState<User>(() => ({
    username: "",
    isStaff: false,
    firstname: "",
    lastname: "",
    profile: {
      pattern: [],
    },
    agreedToTerms: false,
  }))

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
        <p>Register a new Account</p>
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
