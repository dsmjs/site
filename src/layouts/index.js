import React from 'react';
import {node, shape, string} from 'prop-types';
import Helmet from 'react-helmet';
import {Layout} from '@dsmjs/components';
import 'prismjs/themes/prism-solarizedlight.css';

export default function SiteLayout({children, data}) {
  const {host} = data.allMarkdownRemark.edges[0].node.frontmatter;

  return (
    <Layout
      sponsor={data.allMarkdownRemark.edges[0].node.frontmatter.sponsor.frontmatter.name}
      location={`${host.location} ${host.city}, ${host.state} ${host.zip}`}
    >
      <Helmet titleTemplate={`%s | ${data.site.siteMetadata.title}`} defaultTitle={data.site.siteMetadata.title} />
      {children()}
    </Layout>
  );
}

SiteLayout.propTypes = {
  children: node,
  data: shape({
    site: shape({
      siteMetadata: shape({
        title: string
      })
    })
  })
};

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: {regex : "\\/meetings/"} },
      sort: { fields: [frontmatter___meeting___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            sponsor {
              frontmatter{
                name
              }
            } 
            host {
              location
              city
              state
              zip
            }
          }
        }
      }
    }
  }
`;
