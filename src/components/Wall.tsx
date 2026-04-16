import { Col, Container, Row } from "react-bootstrap"
import SeriesCard from "./SeriesCard"
import CodeSnippet from "./CodeSnippet"
import { useEffect } from "react"
import GettingStarted from "./GettingStarted"
import type { Series } from "../types"

const CodeSample = `# Install the Impresso library
%pip install impresso

from impresso import connect

client = connect()

results = client.search.find("moon landing")
results`

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
  showImpressoModelsCodeSample = false,
}: {
  numberOfAuthors?: number
  numberOfNotebooks?: number
  numberOfSeries?: number
  seriesInTrailingColumn?: Series[]
  seriesInLeadingColumn?: Series[]
  seriesInCentralColumn?: Series[]
  enterImpressoPy: Series
  enterImpressoModels: Series
  scrollToTop?: boolean
  showImpressoModelsCodeSample?: boolean
}) => {
  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0)
    }
  }, [scrollToTop])

  console.info(
    "[Wall] - numberOfAuthors:",
    numberOfAuthors,
    "- numberOfNotebooks:",
    numberOfNotebooks,
    "- numberOfSeries:",
    numberOfSeries,
  )

  return (
    <div className="Wall mx-lg-5 mx-md-2" style={{ marginTop: 100 }}>
      <Container fluid>
        <Row className="d-flex align-items-end mb-5">
          <Col md={5} lg={5} xxl={4}>
            <h1 className="display-3 mb-4" style={{ width: "85%" }}>
              Boost your <br />
              Media Monitoring
            </h1>
            <h2 className="m-0 p-0">
              Programmatic access to Impresso's Corpus, Data and Models
            </h2>
          </Col>

          <Col md={7} lg={7} xxl={6}>
            <div className="shadow-sm p-3 border-radius-sm mb-4 container-fluid">
              <h3>Overview & Resources</h3>
              <p className="mb-3">
                The Impresso Datalab provides programmatic access to historical
                newspaper data, models, and annotation services. It complements
                the Impresso web app and enables custom analyses via Python and
                APIs.
              </p>
              <Row>
                <Col md={6} className="mt-2">
                  <h4 className="h6 mb-1">Getting started</h4>
                  <p className="mb-0">
                    Use the Python API to explore and access Impresso data
                    programmatically.{" "}
                    <a href="https://impresso.readthedocs.io/en/latest/">
                      Python API
                    </a>
                    {" · "}
                    <a href="/notebooks">Notebooks</a>
                  </p>
                </Col>
                <Col md={6} className="mt-2">
                  <h4 className="h6 mb-1">Example notebooks</h4>
                  <p className="mb-0">
                    Explore workflows used in classes and workshops.{" "}
                    <a href="/notebooks">Notebook collection</a>
                    {" · "}
                    <a href="https://github.com/impresso/impresso-datalab-notebooks/wiki">
                      Workshop resources
                    </a>
                  </p>
                </Col>
                <Col md={6} className="mt-3">
                  <h4 className="h6 mb-1">REST API</h4>
                  <p className="mb-0">
                    Use the REST API for direct, low-level access and
                    integration. <a href="/public-api/v1/docs">REST API docs</a>
                  </p>
                </Col>
                <Col md={6} className="mt-3">
                  <h4 className="h6 mb-1">Working with your own data</h4>
                  <p className="mb-0">
                    Use Pipelines and Models to process and enrich external
                    documents.{" "}
                    <a href="https://pypi.org/project/impresso-pipelines/">
                      Pipelines
                    </a>
                    {" · "}
                    <a href="https://huggingface.co/impresso-project/">
                      Models
                    </a>
                  </p>
                </Col>
              </Row>
            </div>
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
            <SeriesCard className="mb-3" series={enterImpressoPy}>
              <GettingStarted />
              <p className="very-small text-muted px-2">
                Copy the code below in a blank jupyter notebook to get started
              </p>
              <CodeSnippet value={CodeSample} />
            </SeriesCard>
            {seriesInLeadingColumn.map((series) => (
              <SeriesCard className="mb-3" key={series.id} series={series} />
            ))}
          </Col>
          <Col md={6} xl={4} className="order-md-3 order-xl-2">
            {seriesInCentralColumn.map((series) => (
              <SeriesCard className="mb-4" key={series.id} series={series} />
            ))}
          </Col>
          <Col md={6} xl={4} className="order-md-2  order-xl-3">
            <SeriesCard className="mb-3" series={enterImpressoModels}>
              {showImpressoModelsCodeSample ? (
                <p className="very-small text-muted px-2">
                  Copy the code below in a blank jupyter notebook to get started
                </p>
              ) : null}
              {showImpressoModelsCodeSample ? (
                <CodeSnippet value={ImpressoModelsCodeSample} />
              ) : null}
            </SeriesCard>
            {seriesInTrailingColumn.map((series) => (
              <SeriesCard key={series.id} series={series} className="mb-3" />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Wall
