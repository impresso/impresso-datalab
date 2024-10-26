import React from "react"
import { InfoCircle, WarningTriangle } from "iconoir-react"
import "./Alert.css"

export interface AlertProps {
  value?: string
  className?: string
  children?: React.ReactNode
  type?: "info" | "warning" | "error"
}

const Alert: React.FC<AlertProps> = ({
  value = "",
  className = "",
  children,
  type = "info",
}) => {
  const Icon = type === "info" ? InfoCircle : WarningTriangle

  return (
    <div className={`Alert ${className} ${type}`}>
      <Icon strokeWidth={2} className="me-2" />
      <span>{value}</span>
      {children}
    </div>
  )
}

export default Alert
