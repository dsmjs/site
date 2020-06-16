const path = require('path');

function createMeetingPages(meetings, createPage) {
  meetings.forEach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/meeting.js'),
      context: {slug: node.fields.slug}
    });
  });
}

function createArchiveListPage(meetings, createPage) {
  const meetingsPerPage = 6;
  const totalPages = Math.ceil(meetings.length / meetingsPerPage);

  Array.from({length: totalPages}).forEach((_, index) => {
    createPage({
      path: 0 === index ? '/archive' : `/archive/page-${index + 1}`,
      component: path.resolve('./src/templates/archive.js'),
      context: {
        limit: meetingsPerPage,
        skip: index * meetingsPerPage,
        totalPages,
        currentPage: index + 1
      }
    });
  });
}

module.exports = async ({graphql, actions}) => {
  const {createPage} = actions;

  const result = await graphql(`
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
  `);

  const meetings = result.data.allMarkdownRemark.edges.filter(edge => edge.node.fields.slug);

  createMeetingPages(meetings, createPage);
  createArchiveListPage(meetings, createPage);
};
