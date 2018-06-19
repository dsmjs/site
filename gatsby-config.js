module.exports = {
  siteMetadata: {
    title: 'dsmJS  - Des Moines JavaScript User Group'
  },
  mapping: {
    'MarkdownRemark.frontmatter.talk': 'MarkdownRemark.frontmatter.title',
    'MarkdownRemark.frontmatter.speaker': 'MarkdownRemark.frontmatter.name',
    'MarkdownRemark.frontmatter.sponsor': 'MarkdownRemark.frontmatter.name'
  },
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-autolink-headers'
        ]
      }
    },
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
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'talks',
        path: `${__dirname}/src/talks`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'speakers',
        path: `${__dirname}/src/speakers`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'sponsors',
        path: `${__dirname}/src/sponsors`
      }
    }
  ]
};
