import React from 'react'
import {
  Navbar,
  Container,
  Nav,
  Form,
  InputGroup,
  Button,
} from 'react-bootstrap'
import { Link } from 'gatsby'
import './Header.css'

const Header = () => {
  return (
    <header className='Header'>
      <Navbar>
        <Container fluid>
          <Navbar.Brand href='#home'>
            <em>impresso</em> <b>datalab</b>
          </Navbar.Brand>
          <Nav className='me-auto'>
            <Link className='mx-2' to='/notebooks'>
              Notebooks
            </Link>
            <Link className='mx-2' to='/collections'>
              Collections
            </Link>{' '}
            <Nav.Item className='border-end border-dark mx-2'></Nav.Item>
            <Link className='mx-2' to='/submit-notebook'>
              Submit a notebook
            </Link>
            <Link className='mx-2' to='/submit-notebook'>
              get your API token
            </Link>
          </Nav>
          <Nav className='ms-auto'>
            <Form inline>
              <InputGroup>
                <Form.Control
                  size='sm'
                  placeholder='search notebooks...'
                  aria-label='Search Notebooks'
                />
                <Button size='sm' variant='dark'>
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
