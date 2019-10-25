import React from 'react';
import Link from 'gatsby-link';
import Layout from '../components/layout';

export default function SiteError() {
  return (
    <Layout>
      <h1>404</h1>
      <p>
        Oops, look like there&rsquo;s nothing to see here!
        <br />
        This page has either been removed or never existed.
      </p>
      <p>
        <Link to="/">Go back home</Link>
      </p>
    </Layout>
  );
}
