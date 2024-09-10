import { Container, Nav, Navbar } from "react-bootstrap"
import LogoImpressoDataLab from "./LogoImpressoDatalab"
import UserArea from "./UserArea"

const Header: React.FC = () => {
  return (
    <header className="Header position-fixed top-0 w-100">
      <Navbar>
        <Container fluid>
          <Navbar.Brand className="mx-3">
            <a href="/">
              <LogoImpressoDataLab width={90} />
            </a>
          </Navbar.Brand>
          <Nav className="ms-auto align-items-center me-3">
            <UserArea />
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
