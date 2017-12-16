module.exports = {
  siteMetadata: {
    title: 'dsmJS  - Des Moines JavaScript User Group'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'quicksand:400,500,700'
        ]
      }
    }
  ]
};
