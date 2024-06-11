import React from "react"
import Alert from "../components/Alert"
import { Button } from "react-bootstrap"
import { RefreshDouble, PlusCircle } from "iconoir-react"
import Token from "../components/Token"

const AccessToApi = () => {
  return (
    <div>
      <h1>User Access Token</h1>
      <Alert
        className={"mb-3"}
        value="This content is accessible to researchers who have a valid affiliation. More info in the documentation section."
      />
      <p>
        Access tokens programmatically authenticate your identity to the
        Impresso Datalab, allowing applications to provide you specific data
        based on your request. Visit the documentation to discover how to use
        them.
      </p>
      <Token className={"mt-4 mb-3"} />
      <div className="button-group d-flex justify-content-end mb-5">
        <Button className="me-2" variant="secodary" size="sm">
          <RefreshDouble className="me-1" strokeWidth={2} />
          <span>Generate Token</span>
        </Button>
        <Button variant="secodary" size="sm">
          <PlusCircle className="me-1" strokeWidth={2} />
          <span>New Token</span>
        </Button>
      </div>
      <div className="button-group d-flex justify-content-end">
        <Button className="me-2" variant="secodary" size="lg">
          <span>DOCUMENTATION</span>
        </Button>
        <Button variant="primary" size="lg">
          <span>OPEN TERMINAL</span>
        </Button>
      </div>
    </div>
  )
}

export default AccessToApi
