import { useEffect, useRef, useState, type ChangeEvent } from "react"
import AcceptTermsOfUse from "./AcceptTermsOfUse"
import Page from "./Page"
import { Col, Container, Row } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import { accountDetailsService } from "../services"
import { DateTime } from "luxon"
import { useOnScreen } from "@custom-react-hooks/use-on-screen"
import MarkdownSnippet from "./MarkdownSnippet"

const TermsOfUseModal: React.FC<{ content: string }> = ({
  content,
}: {
  content: string
}) => {
  const { ref: bottomRef, isIntersecting } = useOnScreen(
    { threshold: 0.5 },
    false,
  )

  const wsStatus = useBrowserStore((state) => state.wsStatus)
  const [token] = usePersistentStore((state) => [state.token, state.user])
  const [isBusy, setIsBusy] = useState<boolean>(false)

  const [acceptedTermsDate, setAcceptedTermsDate] = useState<DateTime | null>(
    null,
  )

  const [enableAcceptTermsButton, setEnableAcceptTermsButton] =
    useState<boolean>(false)

  useEffect(
    () => {
      if (wsStatus !== "connected") {
        console.debug(
          "[TermsOfUseModal] @useEffect - ws not connected, current status",
          wsStatus,
        )
        return
      }
      if (token === null) {
        return
      }
      console.debug(
        "[TermsOfUseModal] @useEffect - ws connected, call accountDetails.find() ...",
      )
      setIsBusy(true)
      accountDetailsService
        .find()
        .then((data) => {
          console.debug(
            "[TermsOfUseModal] @useEffect accountDetails.find() success:",
            data,
          )
          setAcceptedTermsDate(DateTime.fromISO(data.dateAcceptedTerms))
          setIsBusy(false)
        })
        .catch((err) => {
          console.error("[TermsOfUseModal] @useEffect - error", err)
          setIsBusy(false)
        })
    },
    // eslint-disable-next-line
    [wsStatus, token],
  )

  useEffect(() => {
    if (!enableAcceptTermsButton && isIntersecting) {
      setEnableAcceptTermsButton(true)
    }
  }, [enableAcceptTermsButton, isIntersecting])

  const AcceptTermsOfUseOnChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (isBusy) {
      console.debug("[TermsOfUseModal] AcceptTermsOfUse@onChange - isBusy")
      return
    }
    console.debug(
      "[TermsOfUseModal] AcceptTermsOfUse@onChange call accountDetails.patch() ...",
    )
    setIsBusy(true)
    accountDetailsService
      .patch(null, {
        acceptTerms: event.target.checked,
      })
      .then((data) => {
        console.debug(
          "[TermsOfUseModal] AcceptTermsOfUse@onChange call accountDetails.patch() success:",
          data,
        )
      })
      .finally(() => {
        setIsBusy(false)
      })
  }
  return (
    <Page
      title="Terms Of Use - Impresso Datalab"
      fullscreen="xl-down"
      size="xl"
      modalBodyClassName="pt-0 px-2"
      footer={
        <AcceptTermsOfUse
          checked={acceptedTermsDate?.isValid}
          onChange={AcceptTermsOfUseOnChangeHandler}
          disabled={!enableAcceptTermsButton}
        />
      }
    >
      <Container>
        <Row>
          <h1 className="my-3">Terms of Use</h1>
          <Col className="position-sticky top-0 bg-light m-0 py-2">
            {acceptedTermsDate?.isValid ? (
              <p className="m-0">
                You have accepted the terms of use:{" "}
                <b>
                  {acceptedTermsDate
                    ?.setLocale("en-GB")
                    .toLocaleString(DateTime.DATETIME_FULL) ?? "N/A"}
                </b>
              </p>
            ) : (
              <p className="m-0">
                You have not accepted the terms of use yet. Please read the{" "}
                <b>entire</b> terms of use document carefully and accept it at
                the bottom to continue.
              </p>
            )}
          </Col>
          <div style={{ minHeight: "100vh" }}>
            <MarkdownSnippet value={content} />
          </div>
          <div ref={bottomRef as React.RefObject<HTMLDivElement>}>bottom</div>
        </Row>
      </Container>
    </Page>
  )
}

export default TermsOfUseModal
