import React from 'react';
import {shape} from 'prop-types';
import {graphql} from 'gatsby';
import {CurrentMeeting} from '@dsmjs/components';
import Layout from '../components/layout';

export default function SiteIndex({data}) {
  const {frontmatter} = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout>
      <CurrentMeeting
        sponsor={frontmatter.sponsor.frontmatter}
        meeting={frontmatter}
        host={frontmatter.host.frontmatter}
        talks={frontmatter.talks}
      />
    </Layout>
  );
}

SiteIndex.propTypes = {
  data: shape()
};

export const query = graphql`
  query CurrentMeetingQuery {
    allMarkdownRemark(
      filter:{fields:{type:{eq:"meeting"}}},
      sort: { fields: [frontmatter___date], order: DESC },
      limit: 1
    ) {
      edges {
        node {
          html
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
              frontmatter {
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
    }
  }
`;
