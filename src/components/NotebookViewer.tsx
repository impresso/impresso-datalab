import { Col, Container, Row } from "react-bootstrap"
import CodeSnippet from "./CodeSnippet"
import MarkdownSnipped from "./MarkdownSnippet"
import type { Notebook } from "./NotebookCard"
import NotebookCard from "./NotebookCard"
import AuthorCard from "./AuthorCard"
import Alert from "./Alert"
import { DateTime } from "luxon"

export interface NotebookViewerProps {
  notebook: Notebook
  raw?: string
}

const splitTextWithCellInfo = (
  text: string
): Array<{ cellNumber: number; cellType: string; content: string }> => {
  const cells: Array<{
    cellNumber: number
    cellType: string
    content: string
    idx: number
    l: number
  }> = []
  const regex = /\{\/*\*\s*cell:(\d+)\s*cell_type:(\w+)\s*\*\/\}/g
  let match

  while ((match = regex.exec(text)) !== null) {
    cells.push({
      idx: match.index,
      l: match[0].length,
      cellNumber: parseInt(match[1]),
      cellType: match[2],
      content: "",
    })
  }
  // now based on the indexes we can extract the content
  for (let i = 0; i < cells.length; i++) {
    const start = cells[i].idx + cells[i].l
    const end = cells[i + 1]?.idx
    cells[i].content = text
      .slice(start, end)
      .trim()
      .replace(/^```python/, "")
      .replace(/```$/, "")
      .trim()
  }

  return cells
}

const NotebookViewer: React.FC<NotebookViewerProps> = ({
  notebook,
  raw = "",
}) => {
  // split the raw parameter
  // according to {/* cell:7 cell_type:markdown */}
  const cells = splitTextWithCellInfo(raw)
  const accessTime = notebook.date ?? new Date()
  const accessDateTime = DateTime.fromJSDate(accessTime)
  const excerpt = notebook.excerpt ?? ""
  return (
    <Container>
      <Row className="my-3">
        <h1 dangerouslySetInnerHTML={{ __html: notebook.title }} />
      </Row>
      <Row className="my-3">
        <Col lg="7">
          <section>
            By{" "}
            {notebook.authors.map((author) => (
              <AuthorCard key={author.name} author={author} />
            ))}
          </section>
          <section className="d-flex gap-2 align-items-center">
            {notebook.googleColabUrl ? (
              <a target="_blank" href={notebook.googleColabUrl}>
                <img
                  src="https://img.shields.io/badge/Open_in_Colab-212529?logo=googlecolab"
                  alt="Open In Colab"
                />
              </a>
            ) : null}
            <a href={notebook.githubUrl}>
              <img
                src="https://img.shields.io/badge/Open_in_GitHub-212529?logo=GitHub"
                alt="Open In GitHub"
              ></img>
            </a>
          </section>
          <section className="small mt-2">
            Last update: <b>{accessDateTime.toFormat("yyyy LLL dd")}</b>
          </section>
          <Alert className="my-2 p-3">
            <div className="me-2">
              <b>Note:</b> This is a static preview of the Jupyter notebook.
            </div>
          </Alert>
        </Col>
        <Col lg="5">
          <MarkdownSnipped className="m-0" value={notebook.excerpt} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg="7">
          {cells
            .filter((cell) => {
              if (cell.cellType === "code" && !cell.content.length) {
                return false
              }
              return true
            })
            .map((cell, i) => (
              <div key={cell.cellNumber}>
                {cell.cellType === "markdown" && (
                  <MarkdownSnipped
                    className={i > 0 ? "my-3" : "mb-3"}
                    value={cell.content}
                  />
                )}
                {cell.cellType === "code" && (
                  <CodeSnippet value={cell.content} readonly />
                )}
              </div>
            ))}
        </Col>
        <Col lg="5">
          {Array.isArray(notebook.seealso) ? (
            <div
              style={{
                position: "sticky",
                top: 0,
              }}
            >
              <h4>See also</h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {notebook.seealso.map((notebook) => (
                  <li key={notebook.slug}>
                    <NotebookCard notebook={notebook} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Col>
      </Row>
    </Container>
  )
}

export default NotebookViewer
