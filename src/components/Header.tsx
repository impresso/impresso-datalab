import { Container, Nav, Navbar } from "react-bootstrap"
import LogoImpressoDataLab from "./logos/LogoImpressoDatalab"
import UserArea from "./UserArea"
import Link from "./Link"

const Header: React.FC = () => {
  return (
    <header className="Header position-fixed top-0 w-100 z-1">
      <Navbar>
        <Container fluid>
          <Navbar.Brand className="mx-3">
            <Link to="/">
              <LogoImpressoDataLab width={90} />
            </Link>
          </Navbar.Brand>
          <Nav>
            <Link to="/token" className="nav-link me-3">
              get API token
            </Link>
          </Nav>
          <Nav className="ms-auto align-items-center me-3">
            <UserArea />
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
