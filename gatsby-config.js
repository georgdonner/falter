module.exports = {
  siteMetadata: {
    title: 'Falter',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/falter/`,
        name: 'falter',
      },
    },
    'gatsby-transformer-remark',
  ],
};
