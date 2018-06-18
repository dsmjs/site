import React from 'react';
import {shape} from 'prop-types';
import {CurrentMeeting} from '@dsmjs/components';

export default function SiteIndex({data}) {
  const {frontmatter, html} = data.allMarkdownRemark.edges[0].node;

  return (
    <CurrentMeeting
      sponsor={frontmatter.sponsor}
      meeting={frontmatter.meeting}
      host={frontmatter.host}
      talk={frontmatter.talk}
      content={html}
    />
  );
}

SiteIndex.propTypes = {
  data: shape()
};

export const query = graphql`
  query CurrentMeetingQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\\/meetings/"} },
      sort: { fields: [frontmatter___meeting___date], order: DESC }
    ) {
      edges {
        node {
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
    }
  }
`;
