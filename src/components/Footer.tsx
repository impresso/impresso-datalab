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
          <Col md="6" lg="3" xxl="3">
            <h3 className="mt-2">Contact us</h3>
          </Col>
          <Col>
            <h3 className="mt-2">Resources overview</h3>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="3" xxl="3">
            <ul className="list-unstyled">
              <li>info @ impresso-project [dot] ch</li>
              <li>
                project website:{" "}
                <a href="/" target="_blank">
                  impresso-project.ch
                </a>
              </li>
              <li className="mt-2">
                GitHub:{" "}
                <a href="https://github.com/impresso" target="_blank">
                  @impresso
                </a>
              </li>
              <li>
                Mastodon:{" "}
                <a href="https://fedihum.org/@impresso" target="_blank">
                  @impresso
                </a>
              </li>
              <li>
                Bluesky:{" "}
                <a
                  href="https://bsky.app/profile/impresso.bsky.social"
                  target="_blank"
                >
                  impresso.bsky.social
                </a>
              </li>
              <li>
                Discord:{" "}
                <a href="https://discord.gg/tYvuD8Nfur" target="_blank">
                  Impresso
                </a>
              </li>
            </ul>
          </Col>
          <Col md="6" lg="3" xxl="3">
            <h4 className="h6 mt-2">Documentation</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://impresso.readthedocs.io/en/latest/">
                  Python API
                </a>
              </li>
              <li>
                <a href="/public-api/v1/docs">REST API</a>
              </li>
              <li>
                <Link to="/notebooks" underline>
                  Notebooks
                </Link>
              </li>
            </ul>
          </Col>
          <Col md="6" lg="3" xxl="3">
            <h4 className="h6 mt-2">Data processing</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://pypi.org/project/impresso-pipelines/">
                  Pipelines
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/impresso-project/">Models</a>
              </li>
              <li>
                <a href="https://github.com/impresso">GitHub organization</a>
              </li>
            </ul>
          </Col>
          <Col md="6" lg="3" xxl="3">
            <h4 className="h6 mt-2">Project and workshops</h4>
            <ul className="list-unstyled">
              <li>
                <a href="https://impresso-project.ch">Impresso project website</a>
              </li>
              <li>
                <a href="https://github.com/impresso/impresso-datalab-notebooks/wiki">
                  Workshop resources
                </a>
              </li>
            </ul>
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
            <LogoUnil width={120} className="mb-3" />
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
                <Link underline to="/corpus-overview">
                  Corpus Overview
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
