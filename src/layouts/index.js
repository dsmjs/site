import React from 'react';
import {node, shape, string} from 'prop-types';
import Helmet from 'react-helmet';
import {Layout} from '@dsmjs/components';

export default function SiteLayout({children, data}) {
  return (
    <Layout sponsor="foo" location="bar">
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
  }
`;
