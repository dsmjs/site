import React from 'react';
import {arrayOf, shape, string} from 'prop-types';
import {Archive as ArchivePage} from '@dsmjs/components';

export default function Archive({data}) {
  const meetings = data.allMarkdownRemark.edges;

  return <ArchivePage meetings={meetings} />;
}

Archive.propTypes = {
  data: {
    allMarkdownRemark: shape({
      edges: arrayOf(shape({
        node: shape({
          frontmatter: shape({
            meeting: shape({date: string}).isRequired,
            talk: shape({title: string}).isRequired
          })
        })
      }))
    })
  }
};

export const meetingsQuery = graphql`
  query MeetingsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\\/meetings/"} },
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            talk {
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  }
`;
