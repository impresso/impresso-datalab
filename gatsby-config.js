/**
 * @type {import('gatsby').GatsbyConfig}
 */
const { createProxyMiddleware } = require("http-proxy-middleware")

require("dotenv").config({
  path: [`.env.${process.env.NODE_ENV}`, ".env"],
})
const ApiHost = (
  process.env.GATSBY_IMPRESSO_API_URL || "http://localhost:8000/api"
).replace("/api", "")

console.log("gatsby-config")
console.log("NODE_ENV", process.env.NODE_ENV)
console.log("PATH_PREFIX", process.env.PATH_PREFIX)
console.log("GATSBY_PATH_PREFIX", process.env.GATSBY_PATH_PREFIX)
console.log("GIT_BUILD_TAG", process.env.GIT_BUILD_TAG)
console.log("GIT_BRANCH", process.env.GIT_BRANCH)
console.log("GIT_REVISION", process.env.GIT_REVISION)
console.log("GIT_REPO", process.env.GIT_REPO)
console.log("GATSBY_IMPRESSO_API_URL", process.env.GATSBY_IMPRESSO_API_URL)
console.log("ApiHost", ApiHost)

module.exports = {
  siteMetadata: {
    title: `impresso-datalab`,
    siteUrl: `https://impresso-project.ch/datalab`,
    gitBuildTag: process.env.GIT_BUILD_TAG,
    gitBranch: process.env.GIT_BRANCH,
    gitRevision: process.env.GIT_REVISION,
    gitRepo: process.env.GIT_REPO,
  },
  pathPrefix: process.env.PATH_PREFIX || "/",
  developMiddleware: (app) => {
    app.use(
      "/api/socket.io",
      createProxyMiddleware({
        target: "https://dev.impresso-project.ch",
        ws: true,
        changeOrigin: true,
      })
    )
  },
  plugins: [
    "gatsby-plugin-sitemap",
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "GitHub",
    //     fieldName: "github",
    //     url: "https://api.github.com/graphql",
    //     headers: {
    //       Authorization: `bearer ${process.env.GITHUB_TOKEN}`
    //     },
    //     fetchOptions: {},
    //     variables: {
    //       username: "smakosh"
    //     }
    //   }
    // },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },

    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "notebooks",
        path: "./src/notebooks/",
      },
      __key: "notebooks",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "collections",
        path: "./src/collections/",
      },
      __key: "collections",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: "./src/authors/",
      },
      __key: "authors",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "tutorials",
        path: "./src/tutorials/",
      },
      __key: "tutorials",
    },
    {
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "7",
        matomoUrl: "https://journalofdigitalhistory.matomo.cloud",
        siteUrl: "https://impresso-project.ch/datalab",
      },
    },
  ],
}
