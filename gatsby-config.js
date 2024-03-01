/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `impresso-datalab`,
    siteUrl: `https://impresso-project.ch/datalab`,
  },
  pathPrefix: process.env.PATH_PREFIX || '/',
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },

    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'notebooks',
        path: './src/notebooks/',
      },
      __key: 'notebooks',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'collections',
        path: './src/collections/',
      },
      __key: 'collections',
    },
    {
      resolve: 'gatsby-plugin-matomo',
      options: {
        siteId: '7',
        matomoUrl: 'https://journalofdigitalhistory.matomo.cloud',
        siteUrl: 'https://impresso-project.ch/datalab',
      },
    },
  ],
}
