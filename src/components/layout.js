import React from 'react';
import Helmet from 'react-helmet';
import {graphql, StaticQuery} from 'gatsby';
import {Layout} from '@dsmjs/components';
import {node} from 'prop-types';
import {css} from 'glamor';

import 'prismjs/themes/prism-solarizedlight.css';

export default function SiteLayout({children}) {
  return (
    <StaticQuery
      query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
          }
        }
        allMarkdownRemark(
          filter: { fileAbsolutePath: {regex : "\\/meetings/"} },
          sort: { fields: [frontmatter___date], order: DESC }
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
                  frontmatter {
                    location
                    address
                    city
                    state
                    zip
                  }
                }          
              }
            }
          }
        }
      }
      `}
      render={data => {
        const {host} = data.allMarkdownRemark.edges[0].node.frontmatter;
        const {location, address, city, state, zip} = host.frontmatter;

        return (
          <Layout
            sponsor={data.allMarkdownRemark.edges[0].node.frontmatter.sponsor.frontmatter.name}
            location={`${location}, ${address} ${city}, ${state} ${zip}`}
          >
            <Helmet
              titleTemplate={`%s | ${data.site.siteMetadata.title}`}
              defaultTitle={data.site.siteMetadata.title}
            />
            {children}
          </Layout>
        );
      }}
    />
  );
}

SiteLayout.propTypes = {
  children: node
};

css.insert(`
  body {
    background-color: #f3f3f3;
  }
`);
