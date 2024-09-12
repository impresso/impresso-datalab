import React from "react"
import { graphql, PageProps } from "gatsby"
import AccessToApi from "../components/AccessToApi"
import { usePersistentStore } from "../store"
import { navigate } from "gatsby"

type DataProps = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}

const AccessToApiRoute = ({ data: { site } }: PageProps<DataProps>) => {
  const llToken = usePersistentStore((state) => state.token)
  console.info("[pages/access-to-api AccessToApiRoute] llToken:", llToken)
  // double check if the user is authentified
  if (!llToken) {
    console.info(
      "[pages/access-to-api AccessToApiRoute] no token found, redirecting to /login",
    )
    navigate("/login")
    return
  }
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
