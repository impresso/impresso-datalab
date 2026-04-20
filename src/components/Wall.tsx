import { Col, Container, Row } from "react-bootstrap"
import SeriesCard from "./SeriesCard"
import CodeSnippet from "./CodeSnippet"
import { useEffect } from "react"
import GettingStarted from "./GettingStarted"
import type { Series } from "../types"
import LogoReadTheDocs from "./logos/LogoReadTheDocs"
import LogoHuggingFace from "./logos/LogoHuggingFace"
import LogoJSON from "./logos/LogoJSON"
import LogoGitHub from "./logos/LogoGitHub"

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
        <Row className="d-flex align-items-end mb-5">
          <Col md={5} lg={5} xxl={5}>
            <h1 className="display-3 mb-4" style={{ width: "85%" }}>
              Boost your <br />
              Media Monitoring
            </h1>
            <h2 className="m-0 p-0">
              Programmatic access to Impresso's Corpus, Data and Models
            </h2>
          </Col>

          <Col md={7} lg={7} xxl={6}>
            <div className="m-3">
              <h3>Overview & Resources</h3>
              <b>Impresso Datalab</b> complements the Impresso Web App and
              enables data access, custom analyses and annotation services via
              Python and APIs.
              <Row>
                <Col md={6} xl={4} className="mt-3">
                  <LogoReadTheDocs
                    width={22}
                    href="https://impresso.readthedocs.io/en/latest/"
                    title="Impresso Python library (Read the Docs)"
                  >
                    Impresso Python library
                  </LogoReadTheDocs>
                </Col>
                <Col md={6} xl={4} className="mt-3">
                  <LogoReadTheDocs
                    width={22}
                    href="https://pypi.org/project/impresso-pipelines/"
                    title="Impresso Pipelines"
                  >
                    Impresso Pipelines
                  </LogoReadTheDocs>
                </Col>
                <Col md={6} xl={4} className="mt-3">
                  <LogoHuggingFace
                    width={22}
                    href="https://huggingface.co/impresso-project/"
                    title="Impresso models on Hugging Face"
                  >
                    Impresso Models
                  </LogoHuggingFace>
                </Col>
                <Col md={6} xl={4} className="mt-3">
                  <LogoJSON
                    width={22}
                    href="/public-api/v1/docs"
                    title="Impresso Rest API documentation"
                  >
                    Rest API docs
                  </LogoJSON>
                </Col>
                <Col md={6} xl={4} className="mt-3">
                  <LogoGitHub
                    width={22}
                    href="https://github.com/impresso/impresso-datalab-notebooks/wiki"
                    title="Workshop Resources on GitHub"
                  >
                    Workshop Resources
                  </LogoGitHub>
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
                Copy the code below into a Jupyter notebook
              </p>
              <CodeSnippet
                value={CodeSample}
                basicSetup={{ lineNumbers: false }}
              />
              <p className="very-small text-muted px-2 pt-2">
                The notebook will prompt you to paste your API token. Then
                you're ready to explore results!
              </p>
              <CodeSnippet
                value={CodeResultSample}
                basicSetup={{ lineNumbers: false }}
              />
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
