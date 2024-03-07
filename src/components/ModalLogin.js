import React from 'react'
import ModalView from './ModalView'
import { ModalLoginView } from '../store'
import { Button, Form, Modal } from 'react-bootstrap'

const ModalLogin = ({ onClose, ...props }) => {
  return (
    <ModalView viewName={ModalLoginView} onClose={onClose} {...props}>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='ModalLoginForm.email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='name@example.com' />
          </Form.Group>
          <Form.Group className='mb-3' controlId='ModalLoginForm.password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
        <Button variant='primary'>Understood</Button>
      </Modal.Footer>
    </ModalView>
  )
}
export default ModalLogin
