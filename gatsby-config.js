/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: [`.env.${process.env.NODE_ENV}`, ".env"],
})
console.log("gatsby-config")
console.log("NODE_ENV", process.env.NODE_ENV)
console.log("PATH_PREFIX", process.env.PATH_PREFIX)
console.log("GATSBY_PATH_PREFIX", process.env.GATSBY_PATH_PREFIX)

module.exports = {
  siteMetadata: {
    title: `impresso-datalab`,
    siteUrl: `https://impresso-project.ch/datalab`,
  },
  pathPrefix: process.env.PATH_PREFIX || "/",
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
      resolve: "gatsby-plugin-matomo",
      options: {
        siteId: "7",
        matomoUrl: "https://journalofdigitalhistory.matomo.cloud",
        siteUrl: "https://impresso-project.ch/datalab",
      },
    },
  ],
}
