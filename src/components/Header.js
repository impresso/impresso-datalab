import React from "react"
import {
  Navbar,
  Container,
  Nav,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap"
import { Link } from "gatsby"
import "./Header.css"
import LogoImpressoDataLab from "./_svg/LogoImpressoDataLab"
import UserArea from "./UserArea"
import { Search } from "iconoir-react"

const Header = () => {
  return (
    <header className="Header py-3">
      <Navbar>
        <Container fluid>
          <Navbar.Brand className="mx-3">
            <Link to="/">
              <LogoImpressoDataLab width={110} />
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="mx-2" to="/submit-notebook">
              Why Datalab?
            </Link>
            <Link className="mx-2" to="/access-to-api">
              start using the API
            </Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            <Form className="Search" inline="true">
              <InputGroup>
                <Form.Control
                  size="sm"
                  placeholder="search notebooks..."
                  aria-label="Search Notebooks"
                />
                <Button
                  style={{ marginLeft: "-2rem", zIndex: "6" }}
                  size="sm"
                  variant="transparent"
                >
                  <Search />
                </Button>
              </InputGroup>
            </Form>
            <UserArea />
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
