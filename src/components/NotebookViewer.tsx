import { Col, Container, Row } from "react-bootstrap"
import CodeSnippet from "./CodeSnippet"
import MarkdownSnipped from "./MarkdownSnippet"
import type { Notebook } from "./NotebookCard"
import NotebookCard from "./NotebookCard"
import AuthorCard from "./AuthorCard"
import { GithubCircle } from "iconoir-react"

export interface NotebookViewerProps {
  notebook: Notebook
  raw?: string
}

const splitTextWithCellInfo = (
  text: string,
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
          <section class="d-flex gap-2 align-items-center">
            {notebook.googleColabUrl ? (
              <a target="_blank" href={notebook.googleColabUrl}>
                <img
                  src="https://colab.research.google.com/assets/colab-badge.svg"
                  alt="Open In Colab"
                />
              </a>
            ) : null}
            <a
              href={notebook.githubUrl}
              className="small d-flex gap-1 align-items-end"
            >
              <GithubCircle width={16} className="pt-1" />
              Browse source code
            </a>
          </section>
        </Col>
        <Col lg="5">
          <p className="m-0">{notebook.excerpt}</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg="7">
          {cells.map((cell, i) => (
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
