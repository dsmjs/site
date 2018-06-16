import React from 'react';
import {arrayOf, shape, string} from 'prop-types';

export default function Archive({data}) {
  const meetings = data.allMarkdownRemark.edges;

  return (
    <ol>
      {meetings.map(meeting => (
        <li key={meeting.node.fields.slug}>
          <h4>{meeting.node.frontmatter.meeting.date}</h4>
          <h5>{meeting.node.frontmatter.talk.title}</h5>
        </li>
      ))}
    </ol>
  );
}

Archive.propTypes = {
  data: {
    allMarkdownRemark: shape({
      edges: arrayOf(shape({
        node: shape({
          frontmatter: shape({
            meeting: shape({date: string}),
            talk: shape({title: string})
          })
        })
      }))
    })
  }
};

export const meetingsQuery = graphql`
  query MeetingsQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___meeting___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            meeting {
              date(formatString: "MMMM DD, YYYY")
            }
            talk {
              title
            }
          }
        }
      }
    }
  }
`;
