module.exports = {
  siteMetadata: {
    title: 'dsmJS  - Des Moines JavaScript User Group'
  },
  mapping: {
    'MarkdownRemark.frontmatter.talk': 'MarkdownRemark.frontmatter.title',
    'MarkdownRemark.frontmatter.speaker': 'MarkdownRemark.frontmatter.name',
    'MarkdownRemark.frontmatter.sponsor': 'MarkdownRemark.frontmatter.name',
    'MarkdownRemark.frontmatter.host': 'MarkdownRemark.frontmatter.location'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'dsmJS',
        short_name: 'dsmJS',
        description: 'Des Moines JavaScript User Group',
        lang: 'en',
        start_url: '/',
        background_color: '#EFDA4F',
        theme_color: '#039998',
        display: 'standalone',
        icon: './static/dsmJS.svg'
      }
    },
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
        name: 'meeting',
        path: `${__dirname}/content/meetings`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'talk',
        path: `${__dirname}/content/talks`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'sponsor',
        path: `${__dirname}/content/sponsors`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'host',
        path: `${__dirname}/content/hosts`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'speaker',
        path: `${__dirname}/content/speakers`
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': [
            'Referrer-Policy: same-origin,strict-origin-when-cross-origin'
          ]
        }
      }
    }
  ]
};
