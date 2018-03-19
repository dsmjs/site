import React from 'react';
import {shape} from 'prop-types';
import {CurrentMeeting} from '@dsmjs/components';

export default function SiteIndex({data}) {
  const {frontmatter} = data.allMarkdownRemark.edges[0].node;

  return (
    <CurrentMeeting
      sponsor={frontmatter.sponsor}
      meeting={frontmatter.meeting}
      host={frontmatter.host}
      talk={frontmatter.talk}
    />
  );
}

SiteIndex.propTypes = {
  data: shape()
};

export const query = graphql`
  query CurrentMeetingQuery {
    allMarkdownRemark {
      edges {
        node {
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
              speaker
            }
          }
        }
      }
    }
  }
`;
