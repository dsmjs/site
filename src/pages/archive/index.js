import React from 'react';
import {arrayOf, shape, string} from 'prop-types';
import Link from 'gatsby-link';

export default function Archive({data}) {
  const meetings = data.allMarkdownRemark.edges;

  return (
    <ol>
      {meetings.map(meeting => {
        const meetingDetails = meeting.node.frontmatter;

        return (
          <li key={meeting.node.fields.slug}>
            <h4><Link to={meeting.node.fields.slug}>{meetingDetails.date}</Link></h4>
            <h5>{meetingDetails.talk.title}</h5>
          </li>
        );
      })}
    </ol>
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
