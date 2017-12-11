import React from 'react';
import {Layout} from '@dsmjs/components';

export default function ({children}) {
  return <Layout sponsor="foo" location="bar">{children()}</Layout>
};
