import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { useSiteMetadata } from "../hooks"
import { Github } from "iconoir-react"
import LogoFnr from "./_svg/LogoFnr"
import LogoSnsf from "./_svg/LogoSnsf"

const getGithubRepoUrl = (gitRepo, gitRevision) => {
  if (gitRepo.startsWith("https")) {
    return `${gitRepo}/commit/${gitRevision}`
  }
  // Regular expression to extract the repository path from the gitRepo string
  const repoRegex = /github\.com[:/](.*)\.git/
  const repoMatches = gitRepo.match(repoRegex)

  if (repoMatches && repoMatches.length > 1) {
    const repoPath = repoMatches[1]
    return `https://github.com/${repoPath}/commit/${gitRevision}`
  } else {
    console.error("Invalid gitRepo format.")
    return null
  }
}

const Footer = () => {
  const site = useSiteMetadata()
  const gitRepoUrl = getGithubRepoUrl(site.gitRepo, site.gitRevision)

  console.log("[Footer] render site:", site)
  return (
    <footer className="mt-5">
      <Container>
        <Row>
          <Col className=" py-4">{site.title}</Col>
          <Col className=" py-4">
            <ul>
              <li>
                <Link to="/">impresso-datalab</Link>
              </li>
              <li>
                <Link to="/about">about!</Link>
              </li>
            </ul>
          </Col>
          <Col className="py-4">
            Current version:
            <br />
            <a
              href={gitRepoUrl}
              target="_blank"
              rel="noreferrer"
              title="check github repo"
            >
              <Github />
              <span className="ms-2">
                {site.gitBuildTag} / {site.gitRevision}
              </span>
            </a>
          </Col>
        </Row>
        <Row className="border-top border-dark">
          <Col className=" py-4">
            <LogoSnsf width={200} className="mx-auto" />
          </Col>
          <Col className="py-4">
            <LogoFnr width={200} className="mx-auto" />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
// render only once.
export default React.memo(Footer, true)
