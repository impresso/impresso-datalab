import { CheckCircle, Timer, ProfileCircle } from "iconoir-react"
import "./PlanCard.css"
import PlanIcon from "./PlanIcon"

type PlanFeature = {
  title: string
  status: string
  iconColor: string
}

type PlanRequirements = {
  title: string
  status: string
  iconColor: string
}

export type Plan = {
  id: string
  title: string
  body: string
  features: PlanFeature[]
  requirements: PlanRequirements[]
  icon: string
}

export type PlanCardProps = {
  plan: Plan
  active?: boolean
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, active = false }) => {
  const intro = plan.body

  const iconStatusCheck = (status: string) => {
    if (status === "ok") {
      return <CheckCircle />
    } else if (status === "limited") {
      return <Timer />
    } else if (status === "person") {
      return <ProfileCircle />
    }
  }

  const iconColorCheck = (iconColor: string) => {
    if (iconColor === "purple") {
      return "purple"
    } else if (iconColor === "orange") {
      return "orange"
    } else {
      return "black"
    }
  }

  const iconValue = (id: string) => {
    if (id === "basic-plan") {
      return "COO"
    } else if (id === "guest-plan") {
      return "B"
    } else if (id === "research-plan") {
      return "R"
    } else if (id === "research-plus") {
      return "R+"
    } else {
      return "?"
    }
  }

  return (
    <div
      className={`PlanCard-wrapper ${plan.id === "basic-plan" ? "active" : ""}`}
    >
      <div className="active-bg">
        <span className="active-plan-tag">ACTIVE PLAN</span>
      </div>
      <div className="PlanCard">
        <h2>{plan.title}</h2>
        <hr />
        <PlanIcon size={40} value={iconValue(plan.id)} />
        <h3>{intro}</h3>
        <b className="mt-2">Features</b>
        {active && <p>Active</p>}
        {plan.features?.map(
          (feature: { title: string; status: string }, index: number) => (
            <div key={index} className="PlanCard-item d-flex">
              <i
                className={`PlanCard-icon d-flex ${iconColorCheck(feature.iconColor)}`}
              >
                {iconStatusCheck(feature.status)}
              </i>
              <p>{feature.title}</p>
            </div>
          ),
        )}
        {plan.requirements ? <b className="mt-2">Requirements</b> : null}
        {plan.requirements?.map(
          (requirements: { title: string; status: string }, index: number) => (
            <div key={index} className="PlanCard-item d-flex">
              <i
                className={`PlanCard-icon d-flex ${iconColorCheck(requirements.iconColor)}`}
              >
                {iconStatusCheck(requirements.status)}
              </i>
              <p>{requirements.title}</p>
            </div>
          ),
        )}
        {plan.id === "research-plan" ? (
          <button
            type="submit"
            className="btn btn-primary mt-3 w-100 justify-content-center"
          >
            Register as researcher
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default PlanCard
