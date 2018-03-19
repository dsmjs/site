import React from 'react';
import {shape} from 'prop-types';
import {CurrentMeeting} from '@dsmjs/components';

export default function SiteIndex({data}) {
  return (
    <CurrentMeeting
      sponsor={data.allMarkdownRemark.edges[0].node.frontmatter.sponsor}
      meeting={data.allMarkdownRemark.edges[0].node.frontmatter.meeting}
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
          }
        }
      }
    }
  }
`;
