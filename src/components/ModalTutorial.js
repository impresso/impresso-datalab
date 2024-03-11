import React from "react"
import ModalView from "./ModalView"
import { ModalTutorialView, useBrowserStore, useDataStore } from "../store"
import { Badge, Col, Modal, Row } from "react-bootstrap"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Markdown from "./Markdown"
import "./ModalTutorial.css"
const ModalTutorial = ({ onClose, ...props }) => {
  const getTutorialByName = useDataStore((state) => state.getTutorialByName)
  const name = useBrowserStore((state) => state.viewId)
  const tutorial = getTutorialByName(name)
  const url = `${
    process.env.GATSBY_PATH_PREFIX || ""
  }/data/tutorials/${name}.json`
  const ratio = tutorial
    ? tutorial.video.thumbnail_height / tutorial.video.thumbnail_width
    : 1.0

  const { status, data } = useQuery({
    queryKey: ["notebooks-", name],
    queryFn: () =>
      axios.get(url).then((res) => {
        return res.data
      }),
  })

  console.info(`[ModalTutorial] ${name} ${url} ${status}`)

  return (
    <ModalView
      className="ModalTutorial"
      viewName={ModalTutorialView}
      onClose={onClose}
      {...props}
    >
      <Modal.Header
        className="align-items-baseline bg-light"
        closeButton
        style={{ position: "sticky", top: 0, zIndex: 1 }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <Badge>Tutorial</Badge>
          <br />
          {tutorial?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <Row>
          <Col>
            <figure
              className="m-0 w-100 position-relative"
              style={{
                paddingTop: `${ratio * 100}%`,
              }}
            >
              {status === "success" && (
                <div
                  className="position-absolute top-0 w-100 h-100"
                  dangerouslySetInnerHTML={{ __html: data?.video?.html }}
                />
              )}
            </figure>
            <p>In this tutorial:</p>
            <ol>
              {tutorial?.tableOfContents.items.map((d, i) => (
                <li key={i}>{d.title}</li>
              ))}
            </ol>
          </Col>
          <Col>
            {status === "error" && <div>Error fetching data</div>}
            {status === "loading" && <div>Loading...</div>}
            {status === "success" && <Markdown>{data.body}</Markdown>}
          </Col>
        </Row>
      </Modal.Body>
    </ModalView>
  )
}
export default ModalTutorial
