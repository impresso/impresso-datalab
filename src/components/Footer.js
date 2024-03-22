import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useSiteMetadata } from "../hooks"
import LogoFnr from "./_svg/LogoFnr"
import LogoSnsf from "./_svg/LogoSnsf"
import LogoUni from "./_svg/LogoUni"
import LogoUnil from "./_svg/LogoUnil"
import LogoEpfl from "./_svg/LogoEpfl"
import LogoDofcl from "./_svg/LogoDofcl"
import "./Footer.css"
import LogoGitHub from "./_svg/LogoGitHub"

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
        <Row className="border-top">
          <Col>
            <h3 className="mt-2">Partners</h3>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-4">
            <LogoEpfl width={180} />
            <span>
              Digital Humanities Laboratory (DHLAB) Ecole Polytechnique Federale
              de Lausanne, Switzerland
            </span>
          </Col>
          <Col className="footer-logo py-4">
            <LogoDofcl width={200} />
            <span>
              Institute of Computational Linguistics Zurich University,
              Switzerland
            </span>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-4">
            <LogoUni width={200} />
            <span>
              Center for Contemporary and Digital History (C²DH) University of
              Luxembourg, Luxembourg
            </span>
          </Col>
          <Col className="footer-logo py-4">
            <LogoUnil width={200} />
            <span>History department, University of Lausanne, Switzerland</span>
          </Col>
        </Row>
        <Row className="border-top">
          <Col>
            <h3 className="mt-2">Associated Partners</h3>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-3">
            <a
              href="https://www.nb.admin.ch/snl/en/home.html"
              target="_blank"
              title="National Library of Switzerland (Bibliothèque Nationale Suisse, BN)"
              rel="noreferrer"
            >
              National Library of Switzerland (Bibliothèque Nationale Suisse,
              BN)
            </a>
          </Col>
          <Col className="footer-logo py-3">
            <a
              href="https://bnl.public.lu/en.html"
              target="_blank"
              title="National Library of Luxembourg (Bibliothèque Nationale du Luxembourg, BNL)"
              rel="noreferrer"
            >
              National Library of Luxembourg (Bibliothèque Nationale du
              Luxembourg, BNL)
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-3">
            <a
              href="https://www.onb.ac.at/en/"
              target="_blank"
              title="Austrian National Library (Österreichische Nationalbibliothek, ONB)"
              rel="noreferrer"
            >
              Austrian National Library (Österreichische Nationalbibliothek,
              ONB)
            </a>
          </Col>
          <Col className="footer-logo py-3">
            <a
              href="https://staatsbibliothek-berlin.de/en/"
              target="_blank"
              title="Berlin State Library (Staatsbibliothek zu Berlin, SBB)"
              rel="noreferrer"
            >
              Berlin State Library (Staatsbibliothek zu Berlin, SBB)
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-3">
            <a
              href="https://www.bl.uk/"
              target="_blank"
              title="The British Library (BL)"
              rel="noreferrer"
            >
              The British Library (BL)
            </a>
          </Col>
          <Col className="footer-logo py-3">
            <a
              href="https://www.bnf.fr/en"
              target="_blank"
              title="French National Library (Bibliothèque nationale de France, BnF)"
              rel="noreferrer"
            >
              French National Library (Bibliothèque nationale de France, BnF)
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-3">
            <a
              href="https://www.bl.uk/"
              target="_blank"
              title="The British Library (BL)"
              rel="noreferrer"
            >
              The British Library (BL)
            </a>
          </Col>
          <Col className="footer-logo py-3">
            <a
              href="https://www.bnf.fr/en"
              target="_blank"
              title="French National Library (Bibliothèque nationale de France, BnF)"
              rel="noreferrer"
            >
              French National Library (Bibliothèque nationale de France, BnF)
            </a>
          </Col>
        </Row>
        <Row className="border-top">
          <Col>
            <h3 className="mt-2">Funding agencies</h3>
          </Col>
        </Row>
        <Row>
          <Col className="footer-logo py-4">
            <LogoSnsf width={200} />
            <span>
              The Swiss National Science Foundation (SNSF) funds excellent
              research at universities and other institutions – from chemistry
              to medicine to sociology
            </span>
          </Col>
          <Col className="footer-logo py-4">
            <LogoFnr width={200} />
            <span>
              The Luxembourg National Research Fund (FNR) is the main funder of
              research activities in Luxembourg
            </span>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="git-hub">
          <span className="pe-2">Current version:</span>
          <a
            href={gitRepoUrl}
            target="_blank"
            rel="noreferrer"
            title="check github repo"
            aria-label="GitHub logo"
          >
            <LogoGitHub width={24} />
            <p className="ps-2">
              {site.gitBuildTag} / {site.gitRevision}
            </p>
          </a>
        </Row>
      </Container>
    </footer>
  )
}
// render only once.
export default React.memo(Footer, true)
