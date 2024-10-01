import Page from "./Page"
import PlanCard from "./PlanCard"
import { Col, Container, Row } from "react-bootstrap"
import type { Plan } from "./PlanCard"
import { usePersistentStore } from "../store"
import { PlanGuest, PlanImpressoUser } from "../constants"

const PlansModal: React.FC<{
  plans: Plan[]
}> = ({ plans = [] }) => {
  const user = usePersistentStore((state) => state.user)

  let useActivePlan = PlanGuest
  if (user !== null) {
    useActivePlan = PlanImpressoUser
  }
  return (
    <Page
      className="PlansModal"
      title="Plans for Impresso Datalab"
      fullscreen="xl-down"
      size="xl"
    >
      <Container>
        <Row>
          {plans.map((plan) => (
            <Col md={6} xl={4} className="mb-3" key={plan.id}>
              <PlanCard plan={plan} active={plan.id === useActivePlan} />
            </Col>
          ))}
        </Row>
      </Container>
    </Page>
  )
}

export default PlansModal
