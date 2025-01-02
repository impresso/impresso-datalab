import { type FeathersError } from "@feathersjs/errors"
import React, { useEffect, useRef, useState } from "react"
import { Form } from "react-bootstrap"
import ErrorManager from "./ErrorManager"
import { SendMail } from "iconoir-react"
import { AvailablePlans, PlanImpressoUser, PlanLabels } from "../constants"

export type ChangePlanRequestFormPayload = {
  plan: string
}

export interface ChangePlanRequestFormProps {
  className?: string
  onSubmit: (payload: ChangePlanRequestFormPayload) => void
  error?: FeathersError | null
  plan?: string
}

const ChangePlanRequestForm: React.FC<ChangePlanRequestFormProps> = ({
  className,
  onSubmit,
  error,
  plan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(plan)

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.info("[ChangePlanRequestForm] @handleOnSubmit", selectedPlan)
    if (selectedPlan) {
      onSubmit({ plan: selectedPlan })
    } else {
      console.error("Selected plan is undefined")
    }
  }

  console.info("[ChangePlanRequestForm] @render", { error })

  useEffect(() => {
    console.info("[ChangePlanRequestForm] @useEffect", { plan })
    setSelectedPlan(plan)
  }, [plan])

  return (
    <>
      <Form
        onSubmit={handleOnSubmit}
        className={`ChangePlanRequestForm ${className}`}
      >
        <ErrorManager error={error} />
        <section className="mb-3 d-flex flex-wrap gap-2 align-items-center">
          {AvailablePlans.map((plan) => (
            <Form.Check
              className={`border rounded-md shadow-sm ${
                selectedPlan === plan ? "active" : ""
              }`}
              key={plan}
              type="radio"
              label={PlanLabels[plan]}
              checked={selectedPlan === plan}
              name="plan"
              onChange={() => setSelectedPlan(plan)}
              id={`ChangePlanRequestForm.${plan}`}
            />
          ))}
        </section>
        <button
          type="submit"
          disabled={plan === selectedPlan}
          className="btn btn-primary btn-lg px-4"
        >
          <SendMail /> <span className="ms-2">Confirm Plan Change Request</span>
        </button>
      </Form>

      <p className="mt-2">
        Any Questions? <br />
        Contact us at{" "}
        <a href="mailto:info@impresso-project.ch">info@impresso-project.ch</a>
      </p>
    </>
  )
}

export default ChangePlanRequestForm
