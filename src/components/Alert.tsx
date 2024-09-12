import React from "react"
import { InfoCircle } from "iconoir-react"
import "./Alert.css"

export interface AlertProps {
  value?: string
  className?: string
  children?: React.ReactNode
}

const Alert: React.FC<AlertProps> = ({
  value = "",
  className = "",
  children,
}) => {
  return (
    <div className={`Alert ${className}`}>
      <InfoCircle strokeWidth={2} className="me-2" />
      <span>{value}</span>
      {children}
    </div>
  )
}

export default Alert
