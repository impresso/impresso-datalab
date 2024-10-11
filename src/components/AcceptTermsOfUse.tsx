import { useState } from "react"
import { Form } from "react-bootstrap"

const AcceptTermsOfUse = () => {
  const [accepted, setAccepted] = useState(false)

  const handleAccept = () => {
    setAccepted((accepted) => !accepted)
  }

  return (
    <Form.Check>
      <Form.Check.Input
        type="checkbox"
        id="terms-of-use"
        checked={accepted}
        onChange={handleAccept}
      />
      <Form.Check.Label htmlFor="terms-of-use">
        I accept the terms of use
      </Form.Check.Label>
    </Form.Check>
  )
}
export default AcceptTermsOfUse
