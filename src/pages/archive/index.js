import React from 'react';
import {arrayOf, shape, string} from 'prop-types';
import {graphql} from 'gatsby';
import {Archive as ArchivePage} from '@dsmjs/components';
import Layout from '../../components/layout';

export default function Archive({data}) {
  const meetings = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <ArchivePage meetings={meetings} />
    </Layout>
  );
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
      filter:{fields:{type:{eq:"meeting"}}},
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            # date
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
