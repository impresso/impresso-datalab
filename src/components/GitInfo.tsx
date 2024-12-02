import { GithubCircle } from "iconoir-react"
import { DateTime } from "luxon"
import type React from "react"

export interface GitInfoProps {
  version: string
  gitCommitSha: string
  gitTag: string
  gitBranch: string
  gitBuildDate: string
  gitRemoteOriginUrl: string
  children?: React.ReactNode
}
const GitInfo: React.FC<GitInfoProps> = ({
  version = "latest",
  gitTag = "latest",
  gitBranch = "branch",
  gitCommitSha = "0000000",
  gitBuildDate = new Date().toISOString(),
  gitRemoteOriginUrl = "https://github.com/impresso/impresso-datalab.git",
  children,
}) => {
  const buildDate = DateTime.fromISO(gitBuildDate).toLocaleString(
    DateTime.DATE_MED_WITH_WEEKDAY,
  )
  // extract github username and github repository name from gitRemoteOriginUrl
  const gitOwner = gitRemoteOriginUrl.match(
    /github.com\/([^/]+)\/([^/]+)\.git$/,
  )
  const gitRepo = gitOwner?.[2] ?? "impresso-datalab"
  const gitUsername = gitOwner?.[1] ?? "impresso"
  // generate the commit url
  const commitUrl = `https://github.com/${gitUsername}/${gitRepo}/commit/${gitCommitSha}`
  const gitHubUrl = `https://github.com/${gitUsername}/${gitRepo}`

  const versionName = version === gitTag ? version : gitTag

  return (
    <div className="GitInfo">
      <div className="d-flex flex-wrap gap-2">
        <a className="text-decoration-none" href={gitHubUrl}>
          <GithubCircle />
        </a>
        <a href={commitUrl} title={`${gitBranch}/${gitCommitSha.slice(0, 7)}`}>
          <b>{versionName.length > 0 ? versionName : "latest"}</b>
        </a>
        <p>{buildDate}</p>
      </div>
      <div> {children}</div>
    </div>
  )
}

export default GitInfo
