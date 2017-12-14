import React from 'react';
import Helmet from 'react-helmet'
import {Layout} from '@dsmjs/components';
import {siteMetadata} from '../../gatsby-config'

export default function ({children}) {
  return (
    <Layout sponsor="foo" location="bar">
      <Helmet titleTemplate={`%s | ${siteMetadata.title}`} defaultTitle={siteMetadata.title} />
      {children()}
    </Layout>
  );
};
