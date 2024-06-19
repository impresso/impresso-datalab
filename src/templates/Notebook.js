import React, { useMemo } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Markdown from "../components/Markdown"
import CodeSnippet from "../components/CodeSnippet"
import { DateTime } from "luxon"
import { Calendar } from "iconoir-react"

const Notebook = ({ path, pageContext, ...props }) => {
  const accessTime = pageContext?.data.accessTime
  const accessDateTime = DateTime.fromISO(accessTime)

  // @todo: move this to gatsby node creation
  const cells = useMemo(() => {
    const cellSections = pageContext.data.body
      .trim()
      .split(/(\{\/\* cell:\d+ cell_type:[a-z]+ \*\/\})/)
      .filter((d) => d !== "")
    // Create pairs
    const cells = []
    for (let i = 0; i < cellSections.length; i += 2) {
      // cell_type from "{/* cell:8 cell_type:markdown */}" = markdown
      const cellType = cellSections[i].replace(
        /{\/\* cell:\d+ cell_type:([a-z]+) \*\/}/,
        "$1"
      )
      cells.push({
        cellType,
        content: cellSections[i + 1],
      })
    }
    return cells
    // only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {cells.map((cell, i) => {
              if (cell.cellType === "markdown") {
                return <Markdown key={i}>{cell.content}</Markdown>
              } else {
                return <CodeSnippet key={i} value={cell.content} />
              }
            })}
          </Col>
          <Col lg="4">
            {pageContext.data.excerpt}
            <pre>{JSON.stringify(pageContext.data, null, 2)}</pre>
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
