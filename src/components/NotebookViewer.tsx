import { Col, Container, Row } from "react-bootstrap"
import CodeSnippet from "./CodeSnippet"
import MarkdownSnipped from "./MarkdownSnippet"
import NotebookCard from "./NotebookCard"
import AuthorCard from "./AuthorCard"
import Alert from "./Alert"
import { DateTime } from "luxon"
import "./NotebookViewer.css"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import type { CellInfo, Notebook } from "../types"
import { ModelLanguagesLabels } from "../constants"
import { Fragment } from "react/jsx-runtime"
import { useRef } from "react"

export interface NotebookViewerProps {
  notebook: Notebook
  raw?: string
}

const splitTextWithCellInfo = (text: string): Array<CellInfo> => {
  const cells: Array<CellInfo> = []
  const regex = /\{\/*\*\s*cell:(\d+)\s*cell_type:(\w+)\s*\*\/\}/g
  let match
  while ((match = regex.exec(text)) !== null) {
    cells.push({
      idx: match.index,
      l: match[0].length,
      cellNumber: parseInt(match[1]),
      cellType: match[2],
      content: "",
      hl: 0,
      h: "",
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
      // remove all links in html format
      .replace(/<a[\s\S]*?<\/a>/g, "")
      .trim()
    // check if the cell is markdown and extract the heading level
    if (cells[i].cellType === "markdown") {
      const headingMatch = cells[i].content.match(/^#+ /)
      if (headingMatch) {
        cells[i].hl = headingMatch[0].length
        cells[i].h = cells[i].content.split("\n")[0].replace(/^#+ /, "")
      }
    }
  }

  return cells
}
const getGithubIssuesUrl = (
  githubUrl: string
): { url: string; account: string; repository: string } => {
  const repoPattern = /github\.com\/([^/]+)\/([^/]+)/
  const match = repoPattern.exec(githubUrl)
  if (match) {
    const account = match[1]
    const repository = match[2]
    const url = `https://github.com/${account}/${repository}/issues`
    return { url, account, repository }
  }
  return { url: "", account: "", repository: "" }
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

  const headings = cells.filter((cell) => cell.hl)
  // Example usage:
  const githubUrl = notebook.githubUrl ?? ""
  const { url: issueUrl } = getGithubIssuesUrl(githubUrl)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToHeading = (cellNumber: number) => {
    const heading = document.getElementById(notebook.href + cellNumber)

    if (heading) {
      const offsetTop = heading.getBoundingClientRect().top

      const container = containerRef.current?.parentElement
      if (container) {
        console.log("offsetTop", offsetTop)

        container.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    }
  }
  return (
    <Container className="NotebookViewer" ref={containerRef}>
      <Row className="my-3">
        <h1 dangerouslySetInnerHTML={{ __html: notebook.title }} />
      </Row>
      <Row className="my-3">
        <Col lg="7">
          <section className="d-flex  justify-content-between">
            <div>
              By{" "}
              {notebook.authors.map((author) => (
                <AuthorCard key={author.id} author={author} />
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
          <Alert className="my-2 p-3">
            <div className="me-2">
              <b>Note:</b> This is a static preview of the Jupyter notebook.
            </div>
          </Alert>
        </Col>
        <Col lg="5" className="ps-4">
          <a target="_blank" href={issueUrl}>
            Report an issue
          </a>
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
          {excerpt.length > 0 && (
            <>
              <h4>Abstract</h4>
              <MarkdownSnipped className="m-0 small" value={excerpt} />
            </>
          )}

          <div
            style={{
              position: "sticky",
              top: 0,
            }}
          >
            {headings.length > 0 && (
              <>
                <h4>Table of contents</h4>
                <ul className="list-unstyled">
                  {headings.map((heading) => (
                    <li key={heading.cellNumber}>
                      <button
                        className="btn btn-link no-smallcaps text-decoration-none"
                        onClick={() => scrollToHeading(heading.cellNumber)}
                        dangerouslySetInnerHTML={{ __html: heading.h }}
                      />
                    </li>
                  ))}
                </ul>
              </>
            )}
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
            {notebook.showLinks &&
            Array.isArray(notebook.links) &&
            notebook.links.length > 0 ? (
              <>
                <h4>Links</h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  {notebook.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotebookViewer
