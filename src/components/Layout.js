import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Background from "./Background"
import Wall from "./Wall"

const Layout = ({ children, ...props }) => {
  console.log("[Layout] render", props)

  return (
    <>
      <Header />
      <Wall />
      {children}
      <Footer />
      <Background />
    </>
  )
}

export default Layout
