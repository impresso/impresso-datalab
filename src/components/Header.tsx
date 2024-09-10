import { Container, Nav, Navbar } from "react-bootstrap"
import LogoImpressoDataLab from "./LogoImpressoDatalab"
import UserArea from "./UserArea"
import Link from "./Link"

const Header: React.FC = () => {
  return (
    <header className="Header position-fixed top-0 w-100">
      <Navbar>
        <Container fluid>
          <Navbar.Brand className="mx-3">
            <Link to="/">
              <LogoImpressoDataLab width={90} />
            </Link>
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
