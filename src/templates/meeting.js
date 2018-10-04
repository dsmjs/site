import React from 'react';
import {shape, string} from 'prop-types';
import {graphql} from 'gatsby';
import {Meeting} from '@dsmjs/components';
import Layout from '../components/layout';

export default function ArchivedMeeting({data}) {
  const {frontmatter} = data.markdownRemark;

  return (
    <Layout>
      <Meeting
        sponsor={frontmatter.sponsor.frontmatter}
        meeting={frontmatter}
        host={frontmatter.host.frontmatter}
        talk={frontmatter.talk.frontmatter}
        content={frontmatter.talk.html}
      />
    </Layout>
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
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        time {
          start
          end
        }
        sponsor {
          frontmatter {
            name
            site
          }
        }
        host {
          frontmatter{
            location
            address
          }
        }
        talk {
          html
          frontmatter {
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
  }
`;
