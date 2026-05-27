import { Container, Row, Col, Badge } from "react-bootstrap"
import { ArrowRight } from "iconoir-react"
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
          <Col>
            <h1>{dataProvider.title}</h1>
          </Col>
        </Row>

        <Row className="my-4">
          <Col lg="7">
            {/* Left Column: Overview and Reference */}

            <div className="d-flex gap-2 mb-4 flex-wrap">
              <Badge bg="primary" pill className="py-2 px-3 text-dark">
                {dataProvider.type}
              </Badge>
              {dataProvider.acronym && (
                <Badge bg="secondary" pill className="py-2 px-3">
                  {dataProvider.acronym}
                </Badge>
              )}
            </div>

            <div className="markdown-content">
              <MarkdownSnippet value={content} />
            </div>
          </Col>

          <Col lg="5">
            {/* Right Column: All Links */}
            {/* Main Links */}
            {dataProvider.Reference && (
              <section className=" mb-3 border-bottom border-dark">
                <h4>Reference</h4>
                <p className="text-muted small">{dataProvider.Reference}</p>
              </section>
            )}
            <section className="mb-3 border-bottom border-dark">
              <h4>External Links</h4>
              <ul className="list-unstyled">
                {links.map((link) => (
                  <li
                    key={link.label}
                    className="mb-1 d-flex align-items-start"
                  >
                    <ArrowRight className="me-1" width={16} />
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline link-underline-opacity-0 link-underline-opacity-100-hover"
                    >
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
            </section>
            <TableOfContents entries={toc} />
          </Col>
        </Row>
      </Container>
    </Page>
  )
}

export default DataProviderModal
