import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

const SubmitNotebook = () => {
  return (
    <Container>
      <h2>Submit Notebook</h2>
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Your email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Git repo</Form.Label>
          <Form.Control type='url' placeholder='https://...' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit'>
          check!
        </Button>
      </Form>
    </Container>
  )
}

export default SubmitNotebook
