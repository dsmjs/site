module.exports = {
  siteMetadata: {
    title: 'dsmJS  - Des Moines JavaScript User Group'
  },
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-remark-prismjs',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'quicksand:400,500,700'
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'meetings',
        path: `${__dirname}/src/meetings`
      }
    }
  ]
};
