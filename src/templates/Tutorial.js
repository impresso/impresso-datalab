import React from "react"
import { Col, Container, Row } from "react-bootstrap"
import Markdown from "../components/Markdown"

const Tutorial = ({ path, pageContext, ...props }) => {
  const modules = pageContext.data.body.split("\n```")
  return (
    <div className="Tutorial">
      <Container>
        <h1>{pageContext.data.title}</h1>
        <Row>
          <Col>
            {modules.map((module, i) => {
              const isCodeBlock = i % 2 === 1
              if (isCodeBlock) {
                return (
                  <pre key={i} className="bg-dark text-light p-3">
                    {module}
                  </pre>
                )
              } else {
                return <Markdown key={i}>{module}</Markdown>
              }
            })}
          </Col>
          <Col>
            {pageContext.data.excerpt}
            <ul>
              {pageContext.data.tableOfContents.items?.map((d, i) => (
                <li key={i}>{d.title}</li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Tutorial
