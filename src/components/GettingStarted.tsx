import Link from "./Link"

const GettingStarted = ({ className = "" }) => {
  return (
    <div>
      <ol
        className={`GettingStarted ${className} my-3 d-flex flex-wrap gap-2 align-items-center`}
      >
        <li>
          <Link
            to="/token"
            className="btn btn-primary-outline bg-primary btn-lg pe-4"
          >
            Get your API key
          </Link>
        </li>
      </ol>
    </div>
  )
}

export default GettingStarted
