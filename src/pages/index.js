import React from 'react';
import {shape} from 'prop-types';
import {CurrentMeeting} from '@dsmjs/components';

export default function SiteIndex({data}) {
  const {frontmatter} = data.allMarkdownRemark.edges[0].node;

  return (
    <CurrentMeeting
      sponsor={frontmatter.sponsor.frontmatter}
      meeting={frontmatter.meeting}
      host={frontmatter.host.frontmatter}
      talk={frontmatter.talk.frontmatter}
      content={frontmatter.talk.html}
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
    }
  }
`;
