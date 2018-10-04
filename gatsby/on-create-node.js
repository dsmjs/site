const {createFilePath} = require('gatsby-source-filesystem');

module.exports = ({node, getNode, actions}) => {
  const {createNodeField} = actions;

  if ('MarkdownRemark' === node.internal.type && 'File' === getNode(node.parent).internal.type) {
    const fileNode = getNode(node.parent);

    if (fileNode && 'meetings' === fileNode.sourceInstanceName) {
      const slug = createFilePath({node, getNode, basePath: 'meetings'});

      createNodeField({
        node,
        name: 'type',
        value: fileNode.sourceInstanceName
      });

      createNodeField({
        node,
        name: 'slug',
        value: slug
      });
    }
  }
};
