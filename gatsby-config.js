const dotenv = require("dotenv");

if (process.env.ENVIRONMENT !== "production") {
  dotenv.config();
}

const { spaceId, accessToken } = process.env;

const myQuery = `
  {
    allContentfulBlogs {
      edges {
        node {
          title
          date
          description {
            description
          }
        }
      }
    }
  }
`

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => data.allContentfulBlogs.edges.map(({ node }) => node)
  }
];

module.exports = {
  siteMetadata: {
    title: `Blake Green`,
    description: `Cloud Architect`,
    siteUrl: `https://blakegreen.dev`,
    author: `@tsgt_green`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-162743629-1",
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: `6TEH88KU64`,
        apiKey: `9f3467851631d4d68449c20748a1e1fe`,
        indexName: `blakegreendev`, // for all queries
        queries,
        chunkSize: 1000, // default: 1000
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: `chprka9u25r7`,
        accessToken: `akTLSr8UelkrDBxn4yz-vQle53VwzriQ4fLQFr4BPSo`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Blake Green`,
        short_name: `Blake Green`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#333`,
        icon: `src/images/mylogo2.png` // This path is relative to the root of the site.
      }
    }, // To learn more, visit: https://gatsby.dev/offline // this (optional) plugin enables Progressive Web App + Offline functionality
    `gatsby-plugin-offline`
  ]
};
