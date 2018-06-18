import React from 'react';
import {shape, string} from 'prop-types';
import {Meeting} from '@dsmjs/components';

export default function ArchivedMeeting({data}) {
  const {frontmatter, html} = data.markdownRemark;

  return (
    <Meeting
      sponsor={frontmatter.sponsor}
      meeting={frontmatter.meeting}
      host={frontmatter.host}
      talk={frontmatter.talk}
      content={html}
    />
  );
}

ArchivedMeeting.propTypes = {
  data: shape({
    markdownRemark: shape({
      node: shape({
        frontmatter: shape({
          meeting: shape({date: string}).isRequired,
          talk: shape({title: string}).isRequired
        })
      })
    })
  })
};

export const query = graphql`
  query MeetingQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        meeting {
          date(formatString: "MMMM DD, YYYY")
          time {
            start
            end
          }
        }
        sponsor {
          name
          site
        }
        host {
          location
        }
        talk {
          title
          speaker {
            frontmatter {
              name
            }
          }
        }
      }
    }
  }
`;
