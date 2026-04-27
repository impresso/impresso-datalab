import { Col, Container, Row } from "react-bootstrap"
import SeriesCard from "./SeriesCard"
import CodeSnippet from "./CodeSnippet"
import { useEffect } from "react"
import GettingStarted from "./GettingStarted"
import type { Series } from "../types"

const CodeSample = `# Install the Impresso library
%pip install impresso

from impresso import connect
client = connect()`

const CodeResultSample = `# Search the corpus
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
      <Container fluid="xxl">
        <Row className="d-flex align-items-center mb-5">
          <Col md={5} lg={5} xxl={5}>
            <h1
              className="display-3 mb-4 mx-3 mx-md-0"
              style={{ width: "85%" }}
            >
              Boost your <br />
              Media Monitoring
            </h1>
          </Col>

          <Col md={7} lg={7} xxl={6}>
            <div className="m-3">
              <h2 className="m-0 p-0">
                Programmatic access to Impresso's Search, Data and Models
              </h2>
              <p className="fs-4 mt-3">
                Impresso Datalab complements the Impresso Web App and enables
                data access, custom analyses and annotation services via Python
                and APIs.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="align-items-start">
          <Col md={12}>
            <h2 className="fs-4 font-weight-medium mb-0 mx-3 mx-md-0">
              {enterImpressoPy.title}
            </h2>
          </Col>
          <Col md={7} xl={5} xxl={5}>
            <section className="my-3 mx-3 mx-md-0">
              <h3 className="fs-6 font-weight-bold ">
                1. {enterImpressoPy.excerpt}
              </h3>
              <div>
                <p className="small text-muted px-2">
                  Copy the code below into a Jupyter notebook 👇
                </p>
                <CodeSnippet
                  value={CodeSample}
                  basicSetup={{ lineNumbers: false }}
                />
                <p className="small text-muted px-2 my-2">
                  Once run, the notebook{" "}
                  <b>will prompt you to paste your API token ⎘</b>.
                </p>

                <CodeSnippet
                  className="my-2"
                  value={CodeResultSample}
                  basicSetup={{ lineNumbers: false }}
                />
                <p className="small text-muted m-0 pt-2">
                  Then you're ready to <b>explore results!</b>
                </p>
                <div className="d-flex justify-content-center">
                  <GettingStarted className="my-3" />
                </div>
              </div>
            </section>
          </Col>
          <Col md={5} xl={7} xxl={7}>
            <Row>
              <Col md={12} xl={6}>
                <section className="p-3">
                  <h3 className="fs-6 font-weight-bold ">
                    2. Try out our example notebooks
                  </h3>
                  <p className="small text-muted px-2">
                    Explore selected workflows, including more advanced
                    analyses, visualizations, and aggregations. <br />
                    See below.
                  </p>
                </section>
              </Col>
              <Col md={12} xl={6}>
                <section className="p-3 border-xl-start">
                  <h3 className="fs-6 font-weight-bold ">
                    3. Work with your own data
                  </h3>
                  <p className="small text-muted px-2">
                    Use pipelines and models to process and enrich external
                    documents. Check our{" "}
                    <a
                      href="https://huggingface.co/spaces/impresso-project/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hugging Face spaces
                    </a>{" "}
                    for ready-to-use pipelines and models
                  </p>
                </section>
              </Col>
              <Col md={12} xl={12}>
                <section className=" border-xl-top p-3">
                  <h3 className="fs-6 font-weight-bold ">
                    4. Get full control with the REST API
                  </h3>
                  <p className="small text-muted px-2">
                    The Impresso Python library is built on top of our Json REST
                    API, which you can also use for direct, low-level access and
                    integration.
                    <br />
                    <a
                      href="/public-api/v1/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check out the API documentation
                    </a>
                    .
                  </p>
                </section>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="my-3  align-items-bottom">
          <Col xl={6} xxl={4} className="order-md-1 order-xl-1">
            {seriesInLeadingColumn.map((series) => (
              <SeriesCard className="mb-3" key={series.id} series={series} />
            ))}
          </Col>
          <Col xl={6} xxl={4} className="order-md-3 order-xl-2">
            {seriesInCentralColumn.map((series) => (
              <SeriesCard className="mb-4" key={series.id} series={series} />
            ))}
          </Col>
          <Col xl={6} xxl={4} className="order-md-2  order-xl-3">
            <SeriesCard className="mb-3" series={enterImpressoModels}>
              {showImpressoModelsCodeSample ? (
                <p className="very-small text-muted px-2">
                  Copy the code below into a Jupyter notebook
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
