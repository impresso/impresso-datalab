import { Container, Nav, Navbar } from "react-bootstrap"
import LogoImpressoDataLab from "./logos/LogoImpressoDatalab"
import UserArea from "./UserArea"
import Link from "./Link"
import "./Header.css"
import { useLayoutEffect, useRef } from "react"
import { useBrowserStore } from "../store"
import { FlashOff, FlashSolid } from "iconoir-react"

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null)
  const wsStatus = useBrowserStore((state) => state.wsStatus)

  useLayoutEffect(() => {
    window.onscroll = () => {
      const header = headerRef.current
      if (header) {
        if (window.scrollY > 0) {
          header.classList.add("active")
        } else {
          header.classList.remove("active")
        }
      }
    }
  }, [])
  return (
    <header ref={headerRef} className="Header position-fixed top-0 w-100 z-1">
      <Navbar>
        <Container fluid>
          <Navbar.Brand className="mx-3">
            <Link to="/">
              <LogoImpressoDataLab width={90} />
            </Link>
          </Navbar.Brand>
          <Nav className="mx-3">
            <Nav.Item>
              <Link to="/token" className="nav-link ">
                get API token
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/notebooks" className="nav-link ">
                browse Ipynb notebooks
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/plans" className="nav-link ">
                Plans
              </Link>
            </Nav.Item>
          </Nav>
          <Nav className="ms-auto align-items-center me-3">
            {wsStatus === "connected" && (
              <span className="badge text-success">
                <FlashSolid width={12} />
                online
              </span>
            )}
            {wsStatus === "idle" && (
              <span className="badge text-dark">
                <FlashSolid width={12} />
                waiting...
              </span>
            )}
            {wsStatus === "connecting" && (
              <span className="badge text-dark">
                <FlashSolid width={12} />
                loading...
              </span>
            )}
            {wsStatus === "closed" && (
              <span className="badge text-danger">
                <FlashOff /> offline ...
              </span>
            )}
            <UserArea />
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
