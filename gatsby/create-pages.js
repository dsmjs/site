const path = require('path');

module.exports = ({graphql, actions}) => {
  const {createPage} = actions;

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
      if (!node.fields || !node.fields.slug) return;

      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/meeting.js'),
        context: {slug: node.fields.slug}
      });
    });
  });
};
