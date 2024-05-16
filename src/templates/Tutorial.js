import React from "react"
import { Col, Container, Row, Button } from "react-bootstrap"
import Markdown from "../components/Markdown"
import { GitFork, ArrowDown, Calendar } from "iconoir-react"
import LogoColab from "../components/_svg/LogoColab"
import CodeSnippet from "../components/CodeSnippet"
import { DateTime } from "luxon"
import Badge from "../components/Badge"

const Tutorial = ({ path, pageContext, ...props }) => {
  const modules = pageContext.data.body.split("\n```")
  const accessTime = pageContext?.data.accessTime
  const accessDateTime = DateTime.fromISO(accessTime)

  return (
    <div className="Tutorial">
      <Container>
        <h1 className="mb-4">{pageContext.data.title}</h1>
        <Badge value="P2c" color="var(--secondary)" />

        <Row>
          <Col>
            <div className="date">
              <i className="me-1">
                <Calendar width={18} />
              </i>
              <span>{accessDateTime.toFormat("yyyy LLL dd")}</span>
            </div>
            <div className="button-group d-flex my-3">
              <Button className="me-2" variant="primary" size="sm">
                <LogoColab width={20} className="me-1" />
                <span>Open in colab</span>
              </Button>
              <Button className="me-2" variant="secondary" size="sm">
                <GitFork className="me-1" strokeWidth={2} />
                <span>Fork...</span>
              </Button>
              <Button variant="secondary" size="sm">
                <ArrowDown className="me-1" strokeWidth={2} />
                <span>Download</span>
              </Button>
            </div>

            {modules.map((module, i) => {
              const isCodeBlock = i % 2 === 1
              if (isCodeBlock) {
                return <CodeSnippet key={i} value={module} />
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
