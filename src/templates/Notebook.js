import React, { useRef } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Markdown from "../components/Markdown"
import CodeSnippet from "../components/CodeSnippet"
import { DateTime } from "luxon"
import { Calendar } from "iconoir-react"

const Notebook = ({ path, pageContext, ...props }) => {
  const accessTime = pageContext?.data.accessTime
  const accessDateTime = DateTime.fromISO(accessTime)
  const codeMirrorRef = useRef(null)
  // @todo: move this to gatsby node creation
  const cells = pageContext.data.body
    .trim()
    .split(/(\{\/\* cell:\d+ cell_type:[a-z]+ \*\/\})/)
    .filter((d) => d !== "")
  // Create pairs
  const cellPairs = []
  for (let i = 0; i < cells.length; i += 2) {
    // cell_type from "{/* cell:8 cell_type:markdown */}" = markdown
    const cellType = cells[i].replace(
      /{\/\* cell:\d+ cell_type:([a-z]+) \*\/}/,
      "$1"
    )
    cellPairs.push({
      cellType,
      content: cells[i + 1],
    })
  }
  console.log(cells, cellPairs)

  return (
    <div className="Notebook">
      <Container>
        <h1 className="mb-4">{pageContext.data.title}</h1>

        <Row>
          <Col lg="8">
            <div className="date">
              <i className="me-1">
                <Calendar width={18} />
              </i>
              <span>{accessDateTime.toFormat("yyyy LLL dd")}</span>
            </div>
            {cellPairs.map((cell, i) => {
              if (cell.cellType === "markdown") {
                return <Markdown key={i}>{cell.content}</Markdown>
              } else {
                return <CodeSnippet key={i} value={cell.content} />
              }
            })}
          </Col>
          <Col lg="4">
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

export default Notebook
