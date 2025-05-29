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
    <section className="AcceptTermsOfUse border-top mx-3 py-4 mt-0 w-100 d-flex justify-content-center">
      <Form.Check className="d-flex w-auto align-items-center">
        <Form.Check.Input
          type="checkbox"
          id="terms-of-use"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <Form.Check.Label htmlFor="terms-of-use" className="font-weight-bold">
          I HAVE READ and I AGREE to the Impresso Terms of Use.
        </Form.Check.Label>
      </Form.Check>
    </section>
  )
}

export default AcceptTermsOfUse
