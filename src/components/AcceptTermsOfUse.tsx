import { Form } from "react-bootstrap"
import type { FC, ChangeEvent } from "react"

interface AcceptTermsOfUseProps {
  disabled?: boolean
  checked?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const AcceptTermsOfUse: FC<AcceptTermsOfUseProps> = ({
  disabled = false,
  checked = false,
  onChange = () => {
    console.log("AcceptTermsOfUse.onChange")
  },
}) => {
  return (
    <Form.Check>
      <Form.Check.Input
        type="checkbox"
        id="terms-of-use"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <Form.Check.Label htmlFor="terms-of-use">
        I accept the terms of use {disabled ? "(disabled)" : ""}
      </Form.Check.Label>
    </Form.Check>
  )
}

export default AcceptTermsOfUse
