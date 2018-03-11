const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const falterTemplate = path.resolve('src/templates/falter.js');

  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___name] }
      limit: 1000
    ) {
      edges {
        node {
          html
          frontmatter {
            path
            name
          }
        }
      }
    }
  }`)
    .then((result) => {
      if (result.errors) {
        return Promise.reject(result.errors);
      }

      return result.data.allMarkdownRemark.edges
        .forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: falterTemplate,
            context: {}, // additional data can be passed via context
          });
        });
    });
};

