/* eslint-disable react/prop-types */
import React from 'react';

let stylesStr;
if ('production' === process.env.NODE_ENV) {
  try {
    stylesStr = require('!raw-loader!../public/styles.css');    // eslint-disable-line import/no-webpack-loader-syntax,import/no-unresolved,max-len
  } catch (e) {
    console.log(e);                                             // eslint-disable-line no-console
  }
}

module.exports = function HTML({
  headComponents,
  htmlAttributes,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents
}) {
  let css;
  if ('production' === process.env.NODE_ENV) {
    css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{__html: stylesStr}} />;
  }

  return (
    <html {...htmlAttributes} lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {headComponents}
        {css}
      </head>
      <body {...bodyAttributes} style={{margin: 0, backgroundColor: '#f3f3f3'}}>
        {preBodyComponents}
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{__html: body}} />
        {postBodyComponents}
      </body>
    </html>
  );
};
/* eslint-enable react/prop-types */
