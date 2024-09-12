import React from "react"
import { graphql, PageProps } from "gatsby"
import LoginForm from "../components/LoginForm"

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const LoginRoute = ({ data: { site } }: PageProps<DataProps>) => {
  const onSubmitHandler = (payload: { email: string; password: string }) => {
    console.log("payload", payload)
  }
  return (
    <>
      <h1>{site.siteMetadata.title}</h1>
      <LoginForm onSubmit={onSubmitHandler} />
    </>
  )
}

export default LoginRoute

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
