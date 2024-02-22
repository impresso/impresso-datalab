import { Link } from 'gatsby'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Layout = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <footer>
        <Container>
          <Row>
            <Col>
              <ul>
                <li>
                  <Link to='/'>impresso-datalab</Link>
                </li>
                <li>
                  <Link to='/about'>about!</Link>
                </li>
              </ul>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

export default Layout
