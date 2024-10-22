import axios from "axios"

const AuthenticatedHeaders = process.env.GITHUB_TOKEN
  ? {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  : {}
if (process.env.GITHUB_TOKEN) {
  console.log("Using GITHUB_TOKEN")
} else {
  console.log(
    "No GITHUB_TOKEN found, you can bump into 403 errors in Github API"
  )
}

const handleError = (error) => {
  console.error(
    "\nError fetching data from Github API. Message:",
    error.message,
    error.request.path
  )
  console.error("\nResponse message, if any: ", error.response?.data?.message)
  process.exit(1)
}

export const getLatestCommit = async (owner, repo) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits`

  const data = await axios
    .get(url, {
      ...AuthenticatedHeaders,
    })
    .then((res) => res.data)
    .catch(handleError)
  if (Array.isArray(data) && data.length > 0) {
    return data[0]
  }
  return null
}

export const getLatestCommitOfPath = async (owner, repo, path) => {
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${path}`

  const data = await axios
    .get(url, {
      ...AuthenticatedHeaders,
    })
    .then((res) => res.data)
    .catch(handleError)
  if (Array.isArray(data) && data.length > 0) {
    return data[0]
  }
  return null
}

export const getGithubOwnerRepoFromUrl = (url) => {
  const match = url.match(/github.com\/([^\/]+)\/([^\/]+)/)
  if (match) {
    return { owner: match[1], repo: match[2] }
  }
  return {
    owner: null,
    repo: null,
  }
}

export const getLatestCommitFromUrl = async (url) => {
  if (!url) return null
  const { owner, repo } = getGithubOwnerRepoFromUrl(url)
  if (owner && repo) {
    // extract path from url, without blob and branch info
    const matchPath = url.match(
      /github.com\/[^\/]+\/[^\/]+\/blob\/[^\/]+\/(.*)/
    )

    if (matchPath) {
      const path = matchPath[1]
      return getLatestCommitOfPath(owner, repo, path)
    }
    return getLatestCommit(owner, repo)
  }
  return null
}

export const getIpynbContentsFromUrl = async (ipynbUrl) => {
  const raw = await axios
    .get(ipynbUrl)
    .then((res) => res.data)
    .catch(handleError)
  if (!raw) {
    console.error("No raw content found")
    return null
  }
  const { cells } = raw
  // check if the content is an array of cells
  if (!Array.isArray(cells)) {
    console.error("No cells found in ipynb file")
    return null
  }
  // check they are ipynb cells
  if (!cells.every((cell) => cell.cell_type)) {
    console.error("Not all cells are ipynb cells")
    return null
  }
  return raw
}
