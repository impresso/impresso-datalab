import React from "react"
import "./Badge.css"

const Badge = ({ value = "", color = "" }) => {
  return (
    <div className="Badge" style={{ border: `2px solid ${color}` }}>
      <span style={{ color: color }}>{value}</span>
    </div>
  )
}

export default Badge
