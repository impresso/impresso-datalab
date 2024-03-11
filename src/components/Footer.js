import React from "react"
import { Link } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { useSiteMetadata } from "../hooks"
import { Github } from "iconoir-react"
import LogoFnr from "./_svg/LogoFnr"
import LogoSnsf from "./_svg/LogoSnsf"

const getGithubRepoUrl = (gitRepo, gitRevision) => {
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
          <Col>{site.title}</Col>
          <Col>
            <ul>
              <li>
                <Link to="/">impresso-datalab</Link>
              </li>
              <li>
                <Link to="/about">about!</Link>
              </li>
            </ul>
          </Col>
          <Col>
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
        <Row className="mt-5">
          <Col>
            <LogoSnsf width={200} />
          </Col>
          <Col>
            <LogoFnr width={200} />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
