import React from "react"
import Header from "./Header"
import Footer from "./Footer"
import Background from "./Background"

const Layout = ({ children }) => {
  console.log("[Layout] render")
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <Background />
    </>
  )
}

export default Layout
