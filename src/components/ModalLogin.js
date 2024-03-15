import React, { useRef } from "react"
import ModalView from "./ModalView"
import { ModalLoginView, useBrowserStore, usePersistentStore } from "../store"
import { Button, Form, Modal } from "react-bootstrap"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

const ModalLogin = ({ onClose, ...props }) => {
  const setAuthenticatedUser = usePersistentStore(
    (store) => store.setAuthenticatedUser
  )
  const setView = useBrowserStore((store) => store.setView)
  const formPayload = useRef({
    email: "",
    password: "",
    strategy: "local",
  })

  const { mutate, status, error, data } = useMutation({
    mutationFn: (data) => {
      console.info("[ModalLogin] mutate", data.email)
      return axios
        .post("/api/authentication", data)
        .then((res) => {
          console.info("[ModalLogin] mutate success", res.data)
          formPayload.current = {
            email: "",
            password: "",
            strategy: "local",
          }
          setAuthenticatedUser(res.data.user, res.data.accessToken)
          // setView null is going to close ModalView, see component useEffect behaviour.
          setView(null)
          return res.data
        })
        .catch((err) => {
          console.error(
            "[ModalLogin] mutate error",
            err.code,
            err.response?.data
          )

          return err
        })
    },
  })

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.info("[ModalLogin] onSubmitHandler", formPayload.current)
    mutate(formPayload.current)
  }
  // # get ac
  return (
    <ModalView
      viewName={ModalLoginView}
      backdrop="static"
      onClose={onClose}
      {...props}
    >
      <Form onSubmit={onSubmitHandler}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="ModalLoginForm.email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => (formPayload.current.email = e.target.value)}
              type="email"
              placeholder="name@example.com"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ModalLoginForm.password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => (formPayload.current.password = e.target.value)}
              type="password"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            discard
          </Button>
          <Button type="submit" variant="primary" onClick={onSubmitHandler}>
            login
          </Button>
        </Modal.Footer>
      </Form>
    </ModalView>
  )
}
export default ModalLogin
