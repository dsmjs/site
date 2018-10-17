const {createFilePath} = require('gatsby-source-filesystem');

module.exports = ({node, getNode, actions}) => {
  const {createNodeField} = actions;

  const fileNode = getNode(node.parent);

  if ('MarkdownRemark' !== node.internal.type) {
    return;
  }

  createNodeField({
    node,
    name: 'type',
    value: fileNode.sourceInstanceName
  });

  if ('meeting' === fileNode.sourceInstanceName) {
    const slug = createFilePath({node, getNode, basePath: 'meetings'});

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};
