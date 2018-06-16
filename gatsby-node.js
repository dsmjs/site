const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

exports.onCreateNode = ({node, getNode, boundActionCreators}) => {
  const {createNodeField} = boundActionCreators;

  if ('MarkdownRemark' === node.internal.type) {
    const slug = createFilePath({node, getNode, basePath: 'meetings'});
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/meeting.js'),
        context: {slug: node.fields.slug}
      });
    });
  });
};
