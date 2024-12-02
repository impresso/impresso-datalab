import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react"
import AcceptTermsOfUse from "./AcceptTermsOfUse"
import Page from "./Page"
import Alert from "./Alert"
import { Col, Container, Row } from "react-bootstrap"
import { useBrowserStore, usePersistentStore } from "../store"
import { termsOfUseService } from "../services"
import { DateTime } from "luxon"
import MarkdownSnippet from "./MarkdownSnippet"
import { BrowserViewTermsOfUse } from "../constants"

const TermsOfUseModal: React.FC<{
  content: string
  autoOpenAfterDelay?: boolean
}> = ({ content, autoOpenAfterDelay = true }) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)
  const [isBottomRefUnavailable, setIsBottomRefUnavailable] =
    useState<boolean>(false)
  const [wsStatus, view] = useBrowserStore((state) => [
    state.wsStatus,
    state.view,
  ])
  const setView = useBrowserStore((state) => state.setView)

  const [token, acceptedTermsDate] = usePersistentStore((state) => [
    state.token,
    state.acceptTermsDate,
  ])
  const [setAcceptedTermsDate] = usePersistentStore((state) => [
    state.setAcceptedTermsDate,
  ])

  const [isBusy, setIsBusy] = useState<boolean>(false)
  const [enableAcceptTermsButton, setEnableAcceptTermsButton] =
    useState<boolean>(false)

  const isAcceptedTermsDateValid = acceptedTermsDate
    ? DateTime.fromISO(acceptedTermsDate).isValid
    : false

  const onShowHandler = useCallback(() => {
    if (!bottomRef.current) {
      console.warn(
        "[TermsOfUseModal] onShowHandler - bottomRef.current is null!",
      )
      setIsBottomRefUnavailable(true)
      return
    }
    console.debug("[TermsOfUseModal] onShowHandler create BottomRef")
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )
    observer.observe(bottomRef.current)
    return () => {
      observer.disconnect()
    }
  }, [])

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

      termsOfUseService
        .find()
        .then((data) => {
          console.debug(
            "[TermsOfUseModal] @useEffect accountDetails.find() success:",
            data,
          )
          setAcceptedTermsDate(data.dateAcceptedTerms)
          setIsBusy(false)
        })
        .catch((err) => {
          setIsBusy(false)

          if (err.code === 404) {
            // we assume that there is not yet an accepted terms date...
            console.debug(
              "[TermsOfUseModal] @useEffect - 404, no accepted terms date",
            )
            return
          }
          console.error("[TermsOfUseModal] @useEffect - error", err)
        })
    },
    // eslint-disable-next-line
    [wsStatus, token],
  )

  useEffect(() => {
    // if this is just a login, just close it.
    if (acceptedTermsDate && view === BrowserViewTermsOfUse) {
      setView(null)
    }
  }, [acceptedTermsDate])

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
    if (process.env.NODE_ENV == "development" && !event.target.checked) {
      setAcceptedTermsDate(null)
      return
    }
    setAcceptedTermsDate(DateTime.now().toISOTime())
    setIsBusy(true)

    termsOfUseService
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
      modalBodyClassName="py-0 px-2"
      modalFooterClassName="p-0"
      autoOpenAfterDelay={autoOpenAfterDelay}
      manualOpen={view === BrowserViewTermsOfUse}
      onHide={() => {
        setView(null)
      }}
      onShow={onShowHandler}
      footer={
        isBottomRefUnavailable ? (
          <div className="py-3 text-center w-100 border-top">
            Please read carefully our Terms of Use
          </div>
        ) : (
          <AcceptTermsOfUse
            checked={isAcceptedTermsDateValid}
            onChange={AcceptTermsOfUseOnChangeHandler}
            disabled={!enableAcceptTermsButton}
          />
        )
      }
    >
      <Container>
        <Row>
          <h1 className="my-3">Terms of Use</h1>
          <Col className="position-sticky top-0 bg-light m-0 py-2">
            {isAcceptedTermsDateValid ? (
              <Alert>
                <p className="m-0">
                  You have accepted the terms of use:{" "}
                  <b>
                    {acceptedTermsDate
                      ? DateTime.fromISO(acceptedTermsDate)
                          .setLocale("en-GB")
                          .toLocaleString(DateTime.DATETIME_FULL)
                      : "N/A"}
                  </b>
                </p>
              </Alert>
            ) : (
              <Alert>
                <p className="m-0">
                  To continue, please review our Terms of Use. Scroll to the
                  bottom of the document and click the checkbox to accept them.
                </p>
              </Alert>
            )}
          </Col>
          <div style={{ minHeight: "100vh" }}>
            <MarkdownSnippet
              value={content}
              onClick={() => setEnableAcceptTermsButton(true)}
            />
            {isBottomRefUnavailable ? (
              <AcceptTermsOfUse
                checked={isAcceptedTermsDateValid}
                onChange={AcceptTermsOfUseOnChangeHandler}
              />
            ) : null}
          </div>
          <div ref={bottomRef}>&nbsp;</div>
        </Row>
      </Container>
    </Page>
  )
}

export default TermsOfUseModal
