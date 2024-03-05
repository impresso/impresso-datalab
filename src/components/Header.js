import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Link } from "gatsby";
import "./Header.css";
import LogoImpressoDataLab from "./_svg/LogoImpressoDataLab";

const Header = () => {
  return (
    <header className="Header py-3">
      <Navbar>
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <LogoImpressoDataLab width={110} />
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className="mx-2" to="/submit-notebook">
              Why Datalab?
            </Link>
            <Link className="mx-2" to="/submit-notebook">
              get your API token
            </Link>
          </Nav>
          <Nav className="ms-auto">
            <Form inline>
              <InputGroup>
                <Form.Control
                  size="sm"
                  placeholder="search notebooks..."
                  aria-label="Search Notebooks"
                />
                <Button size="sm" variant="dark">
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
