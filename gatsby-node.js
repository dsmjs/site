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
