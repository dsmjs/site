import React from 'react';
import {node} from 'prop-types';
import Helmet from 'react-helmet';
import {Layout} from '@dsmjs/components';
import {siteMetadata} from '../../gatsby-config';

export default function SiteLayout({children}) {
  return (
    <Layout sponsor="foo" location="bar">
      <Helmet titleTemplate={`%s | ${siteMetadata.title}`} defaultTitle={siteMetadata.title} />
      {children()}
    </Layout>
  );
}

SiteLayout.propTypes = {
  children: node
};
