import { Link } from "gatsby";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { useDataStore } from "../store";
import Background from "./Background";

const Layout = ({ children }) => {
  const isDataReady = useDataStore((state) => state.isReady);

  console.log("[Layout] render");
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
                  <Link to="/">impresso-datalab</Link>
                </li>
                <li>
                  <Link to="/about">about!</Link>
                </li>
              </ul>
            </Col>
            <Col>{isDataReady ? "ready" : "loading"}</Col>
          </Row>
        </Container>
      </footer>
      <Background />
    </>
  );
};

export default Layout;
