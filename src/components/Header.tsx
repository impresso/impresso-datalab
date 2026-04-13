import { Container, Dropdown, Nav, Navbar } from "react-bootstrap"
import LogoImpressoDataLab from "./logos/LogoImpressoDatalab"
import UserArea from "./UserArea"
import Link from "./Link"
import "./Header.css"
import { useLayoutEffect, useRef } from "react"
import { useBrowserStore } from "../store"
import { FlashOff, FlashSolid } from "iconoir-react"
import DropdownCustomToggle from "./DropdownCustomToggle"

const GuidelineLinks: ({
  url: string
  label: string
} | null)[] = [
  {
    url: "https://github.com/impresso/impresso-datalab-notebooks/blob/main/documentation/editorial-pipeline-overview.md",
    label: "Overview",
  },
  null,
  {
    url: "https://github.com/impresso/impresso-datalab-notebooks/blob/main/documentation/authors-guidelines.md",
    label: "For authors",
  },
  {
    url: "https://github.com/impresso/impresso-datalab-notebooks/blob/main/documentation/editors-guidelines.md",
    label: "For editors",
  },
  {
    url: "https://github.com/impresso/impresso-datalab-notebooks/blob/main/documentation/reviewers-guidelines.md",
    label: "For reviewers",
  },
]

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
      <Navbar className="h-100">
        <Container fluid>
          <Navbar.Brand className="ms-2">
            <Link to="/">
              <LogoImpressoDataLab width={90} />
            </Link>
          </Navbar.Brand>
          <Nav className="mx-2">
            <Nav.Item>
              <Link to="/token" className="nav-link ">
                get API token
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/search" className="nav-link ">
                Search
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/about" className="nav-link ">
                about
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Dropdown align={"start"}>
                <Dropdown.Toggle as={DropdownCustomToggle} className="p-2">
                  Guidelines
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {GuidelineLinks.map((link) =>
                    link === null ? (
                      <Dropdown.Divider key="divider" />
                    ) : (
                      <Dropdown.Item
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </Dropdown.Item>
                    ),
                  )}
                </Dropdown.Menu>
              </Dropdown>
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
