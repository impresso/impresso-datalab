import { Col, Container, Row } from "react-bootstrap"
import CollectionCard, { type Collection } from "./CollectionCard"
import CodeSnippet from "./CodeSnippet"
import { useEffect } from "react"
import Link from "./Link"
import GettingStarted from "./GettingStarted"

const CodeSample = `# Install the impresso library
%pip install impresso

from impresso import connect

impresso = connect()

results = impresso.search("moon landing")`

const ImpressoModelsCodeSample = `# Use a pipeline as a high-level helper
%pip install transformers

from transformers import pipeline
nel_tokenizer = AutoTokenizer.from_pretrained("impresso-project/nel-mgenre-multilingual")

nel_pipeline = pipeline("generic-nel", model=NEL_MODEL_NAME, tokenizer=nel_tokenizer, 
  trust_remote_code=True, device='cpu'
)`

const Wall = ({
  // notebooks = [],
  numberOfAuthors = 10,
  numberOfNotebooks = 100,
  numberOfSeries = 2,
  // series = [],
  seriesInTrailingColumn = [],
  seriesInLeadingColumn = [],
  seriesInCentralColumn = [],
  enterImpressoPy,
  enterImpressoModels,
  scrollToTop = false,
}: {
  numberOfAuthors?: number
  numberOfNotebooks?: number
  numberOfSeries?: number
  seriesInTrailingColumn?: Collection[]
  seriesInLeadingColumn?: Collection[]
  seriesInCentralColumn?: Collection[]
  enterImpressoPy: Collection
  enterImpressoModels: Collection
  scrollToTop?: boolean
}) => {
  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0)
    }
  }, [scrollToTop])
  return (
    <div className="Wall mx-lg-5 mx-md-2" style={{ marginTop: 100 }}>
      <Container fluid>
        <Row className="d-flex align-items-end mb-5">
          <Col md={6}>
            <h1 className="display-3 mb-4" style={{ width: "85%" }}>
              Boost your <br />
              Media Monitoring
            </h1>
            <h2 className="m-0 p-0">
              Programmatic access to Impresso's Corpus, Data and Models
            </h2>
            <p style={{ width: "85%" }} className="d-none">
              We collected <b>{numberOfNotebooks}</b>{" "}
              <Link to="/notebooks" underline>
                Jupyter Ipynb notebooks
              </Link>{" "}
              in <b>{numberOfSeries}</b> series, maintained and developed by{" "}
              <b>{numberOfAuthors}</b> authors.
            </p>
          </Col>
          <Col md={6} lg={6} xxl={5}>
            <h3>
              Join us in this early stage of development and help us to improve
              the platform.
            </h3>
            The{" "}
            <a
              href="https://impresso-project.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Impresso project
            </a>{" "}
            strives to create meaningful links across historical media
            collections. The new <i>Impresso Datalab</i> complements the Web App
            and offers a platform for programmatic data access and annotation
            services.
            <p>
              It provides access to our data and models via API and a dedicated
              Python library via Jupyter notebooks. All this with the goal to
              enable custom analyses of the Impresso corpus and the semantic
              indexation of external document collections with the help of
              models created by the project.
            </p>
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom d-none">
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">Tutorials</h3>
          </Col>
          <Col className="  d-flex justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">Work with your data!</h3>
          </Col>
          <Col className=" d-flex  justify-content-center align-items-end ">
            <h3 className=" p-3 w-100">
              Notebooks you didn't think you needed
            </h3>
          </Col>
        </Row>
        <Row className="my-3  align-items-bottom">
          <Col md={6} xl={4} className="order-md-1 order-xl-1">
            <CollectionCard className="mb-3" collection={enterImpressoPy}>
              <GettingStarted />
              <p className="very-small text-muted px-2">
                Copy the code below in a blank jupyter notebook to get started
              </p>
              <CodeSnippet value={CodeSample} />
            </CollectionCard>
            {seriesInLeadingColumn.map((collection) => (
              <CollectionCard
                className="mb-3"
                key={collection.title}
                collection={collection}
              />
            ))}
          </Col>
          <Col md={6} xl={4} className="order-md-3 order-xl-2">
            {seriesInCentralColumn.map((collection) => (
              <CollectionCard
                className="mb-3"
                key={collection.title}
                collection={collection}
              />
            ))}
          </Col>
          <Col md={6} xl={4} className="order-md-2  order-xl-3">
            <CollectionCard className="mb-3" collection={enterImpressoModels}>
              <p className="very-small text-muted px-2">
                Copy the code below in a blank jupyter notebook to get started
              </p>
              <CodeSnippet value={ImpressoModelsCodeSample} />
            </CollectionCard>
            {seriesInTrailingColumn.map((collection) => (
              <CollectionCard
                key={collection.title}
                collection={collection}
                className="mb-3"
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Wall
