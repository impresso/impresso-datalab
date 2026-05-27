import { Col, Container, Row } from "react-bootstrap"
import CodeSnippet from "./CodeSnippet"
import MarkdownSnipped from "./MarkdownSnippet"
import NotebookCard from "./NotebookCard"
import AuthorCard from "./AuthorCard"
import Alert from "./Alert"
import { DateTime } from "luxon"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import type { CellInfo, Notebook, TOCEntry } from "../types"
import { ModelLanguagesLabels } from "../constants"
import { Fragment } from "react/jsx-runtime"
import { splitTextWithCellInfo } from "../utils/ipynb"
import TableOfContents from "./TableOfContents"

export interface NotebookViewerProps {
  notebook: Notebook
  raw?: string
}

const NotebookViewer: React.FC<NotebookViewerProps> = ({
  notebook,
  raw = "",
}) => {
  const cells: CellInfo[] = splitTextWithCellInfo(raw)
  const accessTime = notebook.date ?? new Date()
  const accessDateTime = DateTime.fromJSDate(accessTime)
  const headings = cells.filter((cell) => cell.hl)

  const toc: TOCEntry[] = headings.map((heading) => ({
    id: heading.hId ?? "n-a",
    title: heading.h,
    level: heading.hl ?? 3,
  }))

  return (
    <Container className="NotebookViewer">
      <Row className="my-3">
        <h1 dangerouslySetInnerHTML={{ __html: notebook.title }} />
      </Row>
      <Row className="my-3">
        <Col lg="7">
          <section className="d-flex  justify-content-between">
            <div>
              By{" "}
              {notebook.authors.map((author) => (
                <AuthorCard key={author.name} author={author} />
              ))}
            </div>
            {notebook.langModel ? (
              <div className="LangModelTag d-flex">
                <p className="m-0">Language model is limited to:&nbsp;</p>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="button-tooltip-3">
                      <span>
                        {
                          ModelLanguagesLabels[
                            notebook.langModel.toLocaleLowerCase()
                          ]
                        }
                      </span>
                    </Tooltip>
                  }
                >
                  <span className="lang-tag-name">{notebook.langModel}</span>
                </OverlayTrigger>
              </div>
            ) : null}
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
          <Alert className="my-2 p-2">
            <div className="me-2">
              <b>Note:</b> This is a static preview of the Jupyter notebook.
            </div>
          </Alert>
          {cells
            .filter((cell) => {
              if (cell.cellType === "code" && !cell.content.length) {
                return false
              }
              return true
            })
            .map((cell, i) => (
              <Fragment key={cell.cellNumber}>
                {cell.hl ? <a id={notebook.href + cell.cellNumber}></a> : null}
                <div>
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
              </Fragment>
            ))}
        </Col>
        <Col lg="5" className="ps-4">
          {Array.isArray(notebook.seealso) ? (
            <>
              <h4>See also</h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {notebook.seealso.map((notebook) => (
                  <li key={notebook.id} className="mb-2">
                    <NotebookCard notebook={notebook} />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <TableOfContents className="pt-2 mt-2" entries={toc} />
        </Col>
      </Row>
    </Container>
  )
}

export default NotebookViewer
