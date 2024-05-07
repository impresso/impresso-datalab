import React, { useRef } from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import Markdown from "../components/Markdown"
import { GitFork, ArrowDown } from "iconoir-react"
import LogoColab from "../components/_svg/LogoColab"
import CodeSnippet from "../components/CodeSnippet"

const Tutorial = ({ path, pageContext, ...props }) => {
  const modules = pageContext.data.body.split("\n```")

  const codeMirrorRef = useRef(null)

  return (
    <div className="Tutorial">
      <Container>
        <h1>{pageContext.data.title}</h1>
        <div className="button-group d-flex my-3">
          <Button className="me-2" variant="primary">
            <LogoColab width={20} className="me-1" />
            <span>Open in colab</span>
          </Button>
          <Button className="me-2" variant="secondary">
            <GitFork className="me-1" strokeWidth={2} />
            <span>Fork...</span>
          </Button>
          <Button variant="secondary">
            <ArrowDown className="me-1" strokeWidth={2} />
            <span>Download</span>
          </Button>
        </div>
        <Row>
          <Col>
            {modules.map((module, i) => {
              const isCodeBlock = i % 2 === 1
              if (isCodeBlock) {
                return (
                  <CodeSnippet
                    key={i}
                    value={module}
                    codeMirrorRef={codeMirrorRef}
                  />
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
