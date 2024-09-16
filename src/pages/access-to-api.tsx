import React, { useEffect } from "react"
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

  // double check if the user is authentified
  useEffect(() => {
    console.info("[pages/access-to-api AccessToApiRoute] llToken:", llToken)

    if (!llToken) {
      console.info(
        "[pages/access-to-api AccessToApiRoute] no token found, redirecting to /login",
      )
      navigate("/login")
    }
  }, [llToken])
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
