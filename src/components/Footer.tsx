import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import axios from "axios"
import { Col, Container, Row } from "react-bootstrap"
import GitInfo from "./GitInfo"

const Footer: React.FC = () => {
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
            <h3 className="mt-2">Partners</h3>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <span>
              Digital Humanities Laboratory (DHLAB) Ecole Polytechnique Federale
              de Lausanne, Switzerland
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <span>
              Institute of Computational Linguistics Zurich University,
              Switzerland
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <span>
              Center for Contemporary and Digital History (C²DH) University of
              Luxembourg, Luxembourg
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <span>History department, University of Lausanne, Switzerland</span>
          </Col>
        </Row>
        <Row className="border-top border-dark py-3">
          <Col>
            <h3 className="mt-2">Associated Partners</h3>
          </Col>
        </Row>
        <Row className="border-top border-dark py-3">
          <Col>
            <h3 className="mt-2">Funding agencies</h3>
          </Col>
        </Row>
        <Row>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <span>
              The Swiss National Science Foundation (SNSF) funds excellent
              research at universities and other institutions – from chemistry
              to medicine to sociology
            </span>
          </Col>
          <Col md="6" lg="3" xxl="3" className="footer-logo py-4">
            <span>
              The Luxembourg National Research Fund (FNR) is the main funder of
              research activities in Luxembourg
            </span>
          </Col>
        </Row>
        <Row className="mb-5 py-3 border-top border-dark">
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
        </Row>
      </Container>
    </footer>
  )
}

export default function () {
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
      <Footer />
    </QueryClientProvider>
  )
}
