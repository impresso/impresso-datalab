import {
  BadRequest,
  NotAuthenticated,
  type FeathersError,
} from "@feathersjs/errors"

type ErrorManagerProps = {
  error?: FeathersError | Error | null
}
export type BadRequestData = { key?: string; message: string; label?: string }

const ErrorManager: React.FC<ErrorManagerProps> = ({ error }) => {
  let errorMessages: BadRequestData[] = []

  if (error instanceof BadRequest && error.data) {
    errorMessages = Object.keys(error.data).map((key) => {
      return {
        key,
        message: error.data[key].message,
        label: error.data[key].label,
      }
    })
  } else if (error instanceof NotAuthenticated) {
    errorMessages = [{ key: "Error", message: error.message }]
  } else if (error instanceof Error) {
    errorMessages = [{ key: "Error", message: error.message }]
  }
  return errorMessages.length > 0 ? (
    <div className="alert alert-danger" role="alert">
      <ul className="list-unstyled m-0">
        {errorMessages.map((d, _i) => (
          <li key={_i}>
            <b>{d.label ?? d.key}</b>:&nbsp;
            {d.message}
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

export default ErrorManager
