const debug = require('debug')('gatsby-node')
console.log('gatsby-node.js')
exports.createPages = async function ({ actions, graphql }) {
  const { data: notebooks } = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "notebooks" } }) {
        totalCount
        nodes {
          name
          childMdx {
            frontmatter {
              title
              binderUrl
            }
          }
        }
      }
    }
  `)
  console.log('createPages: n. notebooks: ', notebooks.allFile.nodes.length)
  notebooks.allFile.nodes.forEach((node) => {
    actions.createPage({
      path: `/notebook/${node.name}`,
      component: require.resolve(`./src/templates/Notebook.js`),
      context: { node },
    })
  })
  const { data: collections } = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "collections" } }) {
        totalCount
        nodes {
          name
          childMdx {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  console.log('createPages: n. collections: ', collections.allFile.nodes.length)
  collections.allFile.nodes.forEach((node) => {
    actions.createPage({
      path: `/notebook/${node.name}`,
      component: require.resolve(`./src/templates/Collection.js`),
      context: { node },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const authorName = node.frontmatter.author

    // Assuming author nodes are sourced and exist
    // Find the author node that matches the name in the frontmatter
    const authorNode = getNode(authorName)

    if (authorNode) {
      createNodeField({
        node,
        name: `author`,
        value: authorNode.id,
      })
    }
  }
}
