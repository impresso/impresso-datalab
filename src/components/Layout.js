import { Link } from 'gatsby'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from './Header'

const Layout = ({ children }) => {
  console.log('[Layout] render')
  return (
    <>
      <Header />
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
