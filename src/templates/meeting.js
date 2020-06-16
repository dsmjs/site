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
        meeting={frontmatter}
        host={frontmatter.host.frontmatter}
        talks={frontmatter.talks}
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
        talks {
          talk {
            html
            frontmatter {
              title
              speaker {
                frontmatter {
                  name
                  github
                  twitter
                }
              }
            }
          }
        }
      }
    }
  }
`;
