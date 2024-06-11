import React from "react"
import { InfoCircle } from "iconoir-react"
import "./Alert.css"

const Alert = ({ value = "", className = "" }) => {
  return (
    <div className={`Alert ${className}`}>
      <InfoCircle strokeWidth={2} className="me-2" />
      <span>{value}</span>
    </div>
  )
}

export default Alert
