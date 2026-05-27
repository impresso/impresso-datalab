import { PageDown } from "iconoir-react"
import { forwardRef } from "react"

const DropdownCustomToggle = forwardRef(
  (
    props: {
      children?: React.ReactNode
      className?: string
      onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}
    },
    ref: React.Ref<HTMLAnchorElement>,
  ) => (
    <a
      href=""
      className={`CustomToggle text-decoration-none d-flex align-items-center ${props.className || ""}`}
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        props.onClick(e)
      }}
    >
      {props.children}
      <PageDown className="ms-2" />
    </a>
  ),
)

export default DropdownCustomToggle
