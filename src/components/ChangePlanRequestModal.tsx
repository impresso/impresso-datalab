import { Modal } from "react-bootstrap"
import {
  BrowserViewChangePlanRequest,
  BrowserViewConfirmChangePlanRequest,
  PlanLabels,
} from "../constants"
import { useBrowserStore, usePersistentStore } from "../store"
import Alert from "./Alert"
import { useEffect, useRef, useState } from "react"
import type { FeathersError } from "@feathersjs/errors"
import { userChangePlanRequestService } from "../services"
import ChangePlanRequestForm, {
  type ChangePlanRequestFormPayload,
} from "./ChangePlanRequestForm"
import { DateTime } from "luxon"

const ChangePlanRequestModal = () => {
  const [user, userPlan] = usePersistentStore((state) => [
    state.user,
    state.userPlan,
  ])
  const view = useBrowserStore((state) => state.view)
  const setView = useBrowserStore((state) => state.setView)
  const [error, setError] = useState<FeathersError | null>(null)
  const [response, setResponse] = useState<{
    status: "idle" | "loading" | "success" | "error"
    data: any
    error: FeathersError | null
  }>({
    status: "idle",
    data: null,
    error: null,
  })

  const handleOnSubmit = (payload: ChangePlanRequestFormPayload) => {
    console.info("[ChangePlanModal] @handleOnSubmit", payload)

    userChangePlanRequestService
      .create({
        plan: payload.plan,
      })
      .then((data) => {
        console.info(
          "[ChangePlanModal] Password changed successfully. data:",
          data
        )
        setView(BrowserViewConfirmChangePlanRequest)
      })
      .catch((err: FeathersError) => {
        setError(err)
        console.error("[ChangePlanModal] create", err.message, err.data)
      })
  }

  useEffect(() => {
    setError(null)
    if (view === BrowserViewChangePlanRequest) {
      setResponse({
        status: "loading",
        data: null,
        error: null,
      })
      // load current status
      userChangePlanRequestService
        .find()
        .then((data) => {
          console.info(
            "[ChangePlanModal] @useEffect - userChangePlanRequestService",
            data
          )
          setResponse({
            status: "success",
            data,
            error: null,
          })
        })
        .catch((err: FeathersError) => {
          console.error(
            "[ChangePlanModal] @useEffect - userChangePlanRequestService",
            err.message,
            err.data
          )
          setResponse({
            status: "error",
            data: null,
            error: err,
          })
        })
    }
  }, [view, user])

  console.debug("[ChangePlanRequestModal] @render", { view, response })

  const isFormVisible =
    response.status === "success" || response.status === "error"

  return (
    <Modal
      centered
      show={view === BrowserViewChangePlanRequest}
      onHide={() => setView(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Plan</Modal.Title>
      </Modal.Header>
      {user !== null ? (
        <Modal.Body className="p-3">
          <p>
            You can request to change your plan. Please select the plan you want
            to change to.
          </p>
          {response.status === "success" && (
            <Alert className="mb-2">
              Plan: {PlanLabels[response.data.plan.name]}
              <b className="mx-1">{response.data.status}</b>
              for you on{" "}
              <span>
                {DateTime.fromISO(response.data.dateLastModified).toFormat(
                  "yyyy LLL dd"
                )}
              </span>
            </Alert>
          )}
          {isFormVisible && (
            <>
              <ChangePlanRequestForm
                onSubmit={handleOnSubmit}
                plan={userPlan}
                error={error}
              />
            </>
          )}
          {response.status === "loading" && "loading...."}
        </Modal.Body>
      ) : (
        <Modal.Body className="p-3">
          <p>Please log in again, your session has expired.</p>
        </Modal.Body>
      )}
    </Modal>
  )
}

export default ChangePlanRequestModal
