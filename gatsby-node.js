const debug = require('debug')('datalab:gatsby-node')
const fs = require('fs')

debug('gatsby-node.js')
const NotebooksJsonFilepath = __dirname + '/static/data/notebooks.json'
const AuthorsJsonFilepath = __dirname + '/static/data/authors.json'
const CollectionsJsonFilepath = __dirname + '/static/data/collections.json'

exports.createPages = async function ({ actions, graphql }) {
  const authorsMap = {}
  const notebooksMap = {}
  const collectionsMap = {}
  if (!fs.existsSync(__dirname + '/static/data/notebooks')) {
    fs.mkdirSync(__dirname + '/static/data/notebooks')
  }

  const { data: authors } = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "authors" } }) {
        totalCount
        nodes {
          name
          childMdx {
            excerpt
            frontmatter {
              fullName
            }
          }
        }
      }
    }
  `)

  debug('createPages: n. authors: ', authors.allFile.nodes.length)
  authors.allFile.nodes.forEach((node) => {
    authorsMap[node.name] = {
      name: node.name,
      fullName: node.childMdx.frontmatter.fullName,
      collections: [],
      notebooks: [],
    }
  })

  const { data: notebooks } = await graphql(`
    query {
      allFile(filter: { sourceInstanceName: { eq: "notebooks" } }) {
        totalCount
        nodes {
          name
          birthTime
          accessTime
          childMdx {
            excerpt
            body
            tableOfContents
            frontmatter {
              title
              binderUrl
              authors
              tags
            }
          }
        }
      }
    }
  `)
  console.log('createPages: n. notebooks: ', notebooks.allFile.nodes.length)
  notebooks.allFile.nodes.forEach((node) => {
    notebooksMap[node.name] = {
      name: node.name,
      path: `/notebook/${node.name}`,
      birthTime: node.birthTime,
      accessTime: node.accessTime,
      title: node.childMdx.frontmatter.title,
      tags: node.childMdx.frontmatter.tags || [],
      excerpt: node.childMdx.excerpt,
      binderUrl: node.childMdx.frontmatter.binderUrl,
      authors: node.childMdx.frontmatter.authors || [],
      collections: [],
    }

    notebooksMap[node.name].authors.forEach((author) => {
      if (authorsMap[author]) {
        authorsMap[author].notebooks.push(node.name)
      } else {
        console.error(
          `Author ${author} not found in authorsMap, skipping notebook ${node.name}`
        )
      }
    })

    fs.writeFileSync(
      `${__dirname}/static/data/notebooks/${node.name}.json`,
      JSON.stringify(
        {
          ...notebooksMap[node.name],
          body: node.childMdx.body,
          tableOfContents: node.childMdx.tableOfContents,
        },
        null,
        2
      )
    )

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
          birthTime
          accessTime
          name
          childMdx {
            excerpt
            frontmatter {
              title
              notebooks
              tags
            }
          }
        }
      }
    }
  `)

  debug('createPages: n. collections: ', collections.allFile.nodes.length)
  collections.allFile.nodes.forEach((node) => {
    collectionsMap[node.name] = {
      name: node.name,
      path: `/collection/${node.name}`,
      title: node.childMdx.frontmatter.title,
      excerpt: node.childMdx.excerpt,
      notebooks: node.childMdx.frontmatter.notebooks,
      tags: node.childMdx.frontmatter.tags || [],
      contributors: [],
    }
    node.childMdx.frontmatter.notebooks.forEach((notebook) => {
      if (notebooksMap[notebook]) {
        notebooksMap[notebook].collections.push(node.name)
        notebooksMap[notebook].authors.forEach((author) => {
          if (authorsMap[author]) {
            collectionsMap[node.name].contributors.push(authorsMap[author])
          } else {
            console.error(
              `Author ${author} not found in authorsMap, skipping collection ${node.name}`
            )
          }
        })
      } else {
        console.error(
          `Notebook ${notebook} not found in notebooksMap, skipping collection ${node.name}`
        )
      }
    })

    // flatten contributors to array of unique contributors and count
    collectionsMap[node.name].contributors = Object.entries(
      collectionsMap[node.name].contributors.reduce((acc, contributor) => {
        if (acc[contributor.name]) {
          acc[contributor.name].count++
        } else {
          acc[contributor.name] = { name: contributor.name, count: 1 }
        }
        return acc
      }, {})
    )
    collectionsMap[node.name].contributors.forEach(([k, contributor]) => {
      if (authorsMap[contributor.name]) {
        authorsMap[contributor.name].collections.push(node.name)
      } else {
        console.error(
          `Contributor ${contributor.name} not found in authorsMap, skipping collection ${node.name}`,
          collectionsMap[node.name].contributors
        )
      }
    })

    actions.createPage({
      path: `/notebook/${node.name}`,
      component: require.resolve(`./src/templates/Collection.js`),
      context: { node },
    })
  })

  //
  // Write to JSON files
  //
  fs.writeFileSync(AuthorsJsonFilepath, JSON.stringify(authorsMap, null, 2))
  fs.writeFileSync(NotebooksJsonFilepath, JSON.stringify(notebooksMap, null, 2))
  fs.writeFileSync(
    CollectionsJsonFilepath,
    JSON.stringify(collectionsMap, null, 2)
  )
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