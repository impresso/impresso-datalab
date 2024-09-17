import { Col, Container, Row } from "react-bootstrap"
import CodeSnippet from "./CodeSnippet"
import MarkdownSnipped from "./MarkdownSnippet"
import type { Notebook } from "./NotebookCard"
import NotebookCard from "./NotebookCard"

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
        <Col lg="7">
          <h1 dangerouslySetInnerHTML={{ __html: notebook.title }} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col lg="7">
          {cells.map((cell) => (
            <div key={cell.cellNumber}>
              {cell.cellType === "markdown" && (
                <MarkdownSnipped className="my-3" value={cell.content} />
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
