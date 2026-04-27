import { Key } from "iconoir-react"
import Link from "./Link"

const GettingStarted = ({ className = "" }) => {
  return (
    <Link
      to="/token"
      className={`btn btn-secondary bg-dark rounded-md btn-lg mx-auto px-5 ${className}`}
    >
      <span className="text-paper">
        <Key /> <span className="ms-2" />
        Get your API token
      </span>
    </Link>
  )
}

export default GettingStarted
