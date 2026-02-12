import { Container, Row, Col, Badge, Card } from "react-bootstrap"
import { Link as LinkIcon, OpenNewWindow } from "iconoir-react"
import Page from "./Page"
import MarkdownSnippet from "./MarkdownSnippet"
import TableOfContents from "./TableOfContents"
import type { DataProvider, TOCEntry } from "../types"

interface DataProviderModalProps {
  dataProvider: DataProvider
  content?: string
  toc?: TOCEntry[]
}

const DataProviderModal: React.FC<DataProviderModalProps> = ({
  dataProvider,
  content = "",
  toc = [],
}) => {
  const links = dataProvider.links || []
  return (
    <Page title={dataProvider.title} fullscreen="xl-down" size="lg">
      <Container className="DataProviderModal">
        {/* Header Section */}
        <Row className="my-3">
          <h1>{dataProvider.title}</h1>
        </Row>

        <Row className="my-3">
          <Col lg="7">
            {/* Left Column: Overview and Reference */}
            <div className="mb-4">
              <div className="d-flex gap-2 mb-3 flex-wrap">
                <Badge bg="primary" pill className="py-2 px-3">
                  {dataProvider.type}
                </Badge>
                {dataProvider.acronym && (
                  <Badge bg="secondary" pill className="py-2 px-3">
                    {dataProvider.acronym}
                  </Badge>
                )}
              </div>
              <p className="text-muted fs-5 mb-4">{dataProvider.provider}</p>

              <div className="markdown-content">
                <MarkdownSnippet value={content} />
              </div>

              {dataProvider.Reference && (
                <div className="mt-4 pt-4 border-top">
                  <p className="mb-2">
                    <strong>Reference:</strong>
                  </p>
                  <p className="text-muted small">{dataProvider.Reference}</p>
                </div>
              )}
            </div>
          </Col>

          <Col lg="5">
            {/* Right Column: All Links */}
            {/* Main Links */}

            <h4>Links</h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
              }}
            >
              {links.map((link) => (
                <li key={link.label} className="mb-2">
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.label}
                    {link.access && (
                      <Badge
                        bg={
                          link.access === "public"
                            ? "info"
                            : link.access === "developer"
                              ? "warning"
                              : "secondary"
                        }
                        className="text-dark small-caps ms-2 "
                      >
                        {link.access}
                      </Badge>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            {links.length === 0 && (
              <p>No resources links available for this data provider.</p>
            )}
            <TableOfContents entries={toc} />
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default DataProviderModal
