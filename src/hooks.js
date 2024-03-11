import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteQuery {
      site {
        siteMetadata {
          title
          siteUrl
          gitBuildTag
          gitBranch
          gitRevision
          gitRepo
        }
      }
    }
  `)
  return site.siteMetadata
}
