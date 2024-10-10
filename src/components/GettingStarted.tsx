import { BrowserViewLogin, BrowserViewRegister } from "../constants"
import { useBrowserStore, usePersistentStore } from "../store"
import Link from "./Link"

const GettingStarted = ({ className = "" }) => {
  const user = usePersistentStore((state) => state.user)
  const setView = useBrowserStore((state) => state.setView)
  const needToRegister = !user
  const startNumAfterOptionalSteps = needToRegister ? 2 : 1
  return (
    <div>
      <ol
        className={`GettingStarted ${className} my-3 d-flex flex-wrap gap-2 align-items-center`}
      >
        {needToRegister ? (
          <li className="d-flex align-items-center gap-2">
            <button
              className="btn btn-primary-outline text-dark btn-lg pe-4"
              onClick={() => setView(BrowserViewRegister)}
            >
              <div className="badge top-0 bg-dark me-2 py-1 px-2 font-weight-extrabold text-primary">
                1
              </div>{" "}
              Register
            </button>
            <div className="small-caps">or</div>
            <button
              className="btn btn-primary-outline text-dark btn-lg pe-4"
              onClick={() => setView(BrowserViewLogin)}
            >
              <div className="badge top-0 bg-dark me-2 py-1 px-2 font-weight-extrabold text-primary">
                1'
              </div>{" "}
              Login
            </button>
            <div className="small-caps">then</div>
          </li>
        ) : null}
        <li>
          <Link to="/terms" className="btn btn-primary-outline btn-lg pe-4">
            <div className="badge bg-dark me-2 py-1 px-2 font-weight-extrabold text-primary">
              {startNumAfterOptionalSteps}
            </div>{" "}
            Consult our terms of use
          </Link>
        </li>
        <li>
          <Link to="/token" className="btn btn-primary-outline  btn-lg pe-4">
            <div className="badge bg-dark me-2 py-1 px-2 font-weight-extrabold text-primary">
              {startNumAfterOptionalSteps + 1}
            </div>{" "}
            Get your API key
          </Link>
        </li>
      </ol>
    </div>
  )
}

export default GettingStarted
