import React from 'react';
import {arrayOf, number, shape, string} from 'prop-types';
import {graphql} from 'gatsby';
import {Archive as ArchivePage} from '@dsmjs/components';
import Layout from '../components/layout';

export default function Archive({data, pageContext: {totalPages, currentPage}}) {
  const meetings = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <ArchivePage meetings={meetings} totalPages={totalPages} currentPage={currentPage} />
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
  },
  pageContext: shape({
    totalPages: number.isRequired,
    currentPage: number.isRequired
  }).isRequired
};

export const meetingsQuery = graphql`
  query MeetingsQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter:{fields:{type:{eq:"meeting"}}},
      sort: { fields: [frontmatter___date], order: DESC },
      limit: $limit,
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            talks {
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
  }
`;
