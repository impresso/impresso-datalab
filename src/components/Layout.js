import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Background from "./Background"
import Wall from "./Wall"

const Layout = ({ children }) => {
  console.log("[Layout] render")

  return (
    <>
      <Header />
      <Wall />
      <main className="position-fixed">{children}</main>
      <Footer />
      <Background />
    </>
  )
}

export default Layout
