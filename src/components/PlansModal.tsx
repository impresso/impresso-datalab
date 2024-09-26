import Page from "./Page"
import PlanCard from "./PlanCard"
import { Col, Container, Row } from "react-bootstrap"
import type { Plan } from "./PlanCard"

const PlansModal: React.FC<{
  plans: Plan[]
}> = ({ plans = [] }) => {
  return (
    <Page
      className="PlansModal"
      title="Only for Impresso users"
      fullscreen="xl-down"
      size="xl"
    >
      <Container>
        <Row>
          {plans.map((plan) => (
            <Col md={6} xl={4} className="mb-3" key={plan.id}>
              <PlanCard plan={plan} />
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  )
}

export default PlansModal
