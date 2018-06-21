const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
  const {createNodeField} = boundActionCreators;

  if ('MarkdownRemark' === node.internal.type && 'File' === getNode(node.parent).internal.type) {
    const fileNode = getNode(node.parent);

    if (fileNode && 'meetings' === fileNode.sourceInstanceName) {
      const slug = createFilePath({node, getNode, basePath: 'meetings'});

      createNodeField({
        node,
        name: 'slug',
        value: slug
      });
    }
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                date
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      if (!node.fields || !node.fields.slug) return;

      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/meeting.js'),
        context: {slug: node.fields.slug}
      });
    });
  });
};
