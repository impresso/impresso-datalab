import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import axios from "axios"
import { Col, Container, Row } from "react-bootstrap"
import GitInfo from "./GitInfo"
import LogoEpfl from "./logos/LogoEpfl"
import LogoSnsf from "./logos/LogoSnsf"
import LogoUni from "./logos/LogoUni"
import LogoUnil from "./logos/LogoUnil"
import LogoFnr from "./logos/LogoFnr"
import LogoDofcl from "./logos/LogoDofcl"
import AssociatedPartner, {
  type AssociatedPartnerProps,
} from "./AssociatedPartner"
import Link from "./Link"
import { GithubCircle } from "iconoir-react"

const Footer: React.FC<{
  associatedPartners: AssociatedPartnerProps[]
}> = ({ associatedPartners = [] }) => {
  const { status, data, error } = useQuery({
    queryKey: ["version"],
    queryFn: () => {
      return axios.get(`${import.meta.env.PUBLIC_IMPRESSO_API_PATH}/version`)
    },
  })

  return (
    <footer className="footer mt-5 mx-lg-5 mx-md-2">
      <Container fluid>
        <Row className="border-top border-dark py-3">
          <Col>
            <h3 className="mt-2">Quick links & Documentation</h3>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="3" xxl="3">
            <p>
              Browse all <b>Impresso models</b> at{" "}
              <a
                href="https://huggingface.co/impresso-project/"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                🤗 Hugging Face
              </a>{" "}
              and the source code of all our tools in our{" "}
              <a
                href="https://github.com/impresso"
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                <GithubCircle width={16} />
                &nbsp;GitHub repositories
              </a>
              .
            </p>
          </Col>
          <Col md="6" lg="3" xxl="3">
            <p>
              Check out our{" "}
              <a href="/public-api/v1/docs">Rest API documentation</a> or the
              documentation of our{" "}
              <a href="https://pypi.org/project/impresso">
                Impresso Python Library
              </a>{" "}
              to interact with the Impresso API in Python notebooks or scripts.
            </p>
          </Col>
          <Col md="6" lg="3" xxl="3">
            <p>
              Our{" "}
              <Link to="/notebooks" underline>
                Notebooks
              </Link>{" "}
              are a great way to get started with the data. They are interactive
              and can be run in the cloud.
            </p>
          </Col>
        </Row>
        <Row className="border-top border-dark py-3">
          <Col>
            <h3 className="mt-2">Partners</h3>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <LogoEpfl width={140} className="mb-3" />
            <span>
              Digital Humanities Laboratory (DHLAB) Ecole Polytechnique Federale
              de Lausanne, Switzerland
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <LogoDofcl width={180} className="mb-3" />
            <span>
              Department of Computational Linguistics, University of Zürich,
              Switzerland
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <LogoUni width={180} className="mb-3" />
            <span>
              Center for Contemporary and Digital History (C²DH) University of
              Luxembourg, Luxembourg
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <LogoUnil width={180} className="mb-3" />
            <span>History department, University of Lausanne, Switzerland</span>
          </Col>
        </Row>
        <Row className="border-top border-dark py-3">
          <Col>
            <h3 className="mt-2">Associated Partners</h3>
          </Col>
        </Row>
        <Row>
          {associatedPartners.map((associatedPartner) => (
            <Col
              key={associatedPartner.name}
              sm="12"
              md="6"
              lg="4"
              xxl="4"
              className="footer-logo py-2 py-md-3"
            >
              <AssociatedPartner {...associatedPartner} />
            </Col>
          ))}
        </Row>
        <Row className="border-top border-dark py-3">
          <Col>
            <h3 className="mt-2">Funding agencies</h3>
          </Col>
        </Row>
        <Row>
          <Col md={6} lg={4} className="footer-logo py-4">
            <LogoSnsf width={180} className="mb-3" />
            <span>
              The Swiss National Science Foundation (SNSF) funds excellent
              research at universities and other institutions – from chemistry
              to medicine to sociology
            </span>
          </Col>
          <Col md={6} lg={4} className="footer-logo py-4">
            <LogoFnr width={180} className="mb-3" />
            <span>
              The Luxembourg National Research Fund (FNR) is the main funder of
              research activities in Luxembourg
            </span>
          </Col>
        </Row>
        <Row className="mb-5 py-4 border-top border-dark">
          <Col md={6} lg={4}>
            <GitInfo
              version={import.meta.env.PUBLIC_VERSION}
              gitBranch={import.meta.env.PUBLIC_GIT_BRANCH}
              gitBuildDate={import.meta.env.PUBLIC_BUILD_DATE}
              gitCommitSha={import.meta.env.PUBLIC_GIT_COMMIT_SHA}
              gitTag={import.meta.env.PUBLIC_GIT_TAG}
              gitRemoteOriginUrl={import.meta.env.PUBLIC_GIT_REMOTE}
            >
              <p>
                Data version:{" "}
                <b>
                  {status === "pending" && <span>Loading...</span>}
                  {status === "error" && (
                    <span>Error: {JSON.stringify(error.message)}</span>
                  )}
                  {status === "success" && <span>{data?.data.version}</span>}
                </b>
              </p>
            </GitInfo>
          </Col>
          <Col md={6} lg={4}>
            <ul className="list-unstyled">
              <li>
                <h4>Contact</h4>
              </li>
              <li>
                <a
                  href="mailto:info@impresso-project.ch"
                  className="text-decoration-none"
                >
                  info@impresso-project.ch
                </a>
              </li>
            </ul>
          </Col>
          <Col md={6} lg={4}>
            <ul className="list-unstyled">
              <li>
                <h4>Links</h4>
              </li>
              <li>
                <Link underline to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link underline to="/notebooks">
                  Browse notebooks
                </Link>
              </li>
              <li>
                <Link underline to="/plans">
                  Plans
                </Link>
              </li>
              <li>
                <Link underline to="/datasets">
                  Datasets
                </Link>
              </li>
              <li>
                <Link underline to="/terms-of-use">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default function ({
  associatedPartners,
}: {
  associatedPartners: AssociatedPartnerProps[]
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        // Add a timeout of 10 seconds
        staleTime: 10000,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Footer associatedPartners={associatedPartners} />
    </QueryClientProvider>
  )
}
