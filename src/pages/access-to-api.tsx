import React from "react"
import { graphql, PageProps } from "gatsby"
import AccessToApi from "../components/AccessToApi"

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const AccessToApiRoute = ({ data: { site } }: PageProps<DataProps>) => {
  const llToken = ""
  return <AccessToApi llToken={llToken} />
}

export default AccessToApiRoute

export const query = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
