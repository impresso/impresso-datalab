import React from "react"

const Page = ({ children, path, pageContext }) => {
  return (
    <div
      className="Page"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        background: "red",
        zIndex: 1000,
        right: 0,
        bottom: 0,
      }}
    >
      daiiii
      {children}
    </div>
  )
}

export default Page
