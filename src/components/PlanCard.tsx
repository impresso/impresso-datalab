import { CheckCircle, Timer, ProfileCircle } from "iconoir-react"
import "./PlanCard.css"
import PlanIcon from "./PlanIcon"
import { marked } from "marked"
import { RequirementToU } from "../constants"
import Requirement from "./Requirement"

type PlanFeature = {
  title: string
  status: string
  iconColor: string
}

export type Plan = {
  id: string
  title: string
  body: string
  features: PlanFeature[]
  requirements: string[]
  icon: string
}

export type PlanCardProps = {
  plan: Plan
  termsOfUse?: boolean
  active?: boolean
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  termsOfUse = false,
  active = false,
}) => {
  const intro = marked.parse(plan.body)
  const iconStatusCheck = (status: string) => {
    if (status === RequirementToU && !termsOfUse) {
      return <Timer />
    } else if (status === "ok") {
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
    } else if (id === "impresso-user") {
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
    <div className={`PlanCard-wrapper ${active ? "active" : ""}`}>
      <div className="active-bg">
        <span className="active-plan-tag small-caps">current plan</span>
      </div>
      <div className="PlanCard">
        <h2>{plan.title}</h2>
        <hr />
        <PlanIcon size={40} value={iconValue(plan.id)} />
        <div dangerouslySetInnerHTML={{ __html: intro }} />
        <h3 className="mt-2">Features</h3>
        {active && <p>This is your current plan</p>}
        {plan.features?.map(
          (
            feature: { title: string; status: string; iconColor: string },
            index: number,
          ) => (
            <div
              key={index}
              className="PlanCard-item d-flex align-items-center mb-2 "
            >
              <div
                className={`PlanCard-icon d-flex ${iconColorCheck(feature.iconColor)}`}
              >
                {iconStatusCheck(feature.status)}
              </div>
              <p className="m-0">{feature.title}</p>
            </div>
          ),
        )}
        <h3 className="mt-2">Requirements</h3>
        {plan.requirements.map((requirement: string) => (
          <Requirement key={requirement} requirement={requirement} />
        ))}
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
