const path = require('path');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const falterTemplate = path.resolve('src/templates/falter.js');
  const familyTemplate = path.resolve('src/templates/family.js');

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
            family
          }
        }
      }
    }
  }`)
    .then((result) => {
      if (result.errors) {
        Promise.reject(result.errors);
      } else {
        const falter = result.data.allMarkdownRemark.edges;
        // create falter pages
        falter.forEach(({ node }) => {
          createPage({
            path: node.frontmatter.path,
            component: falterTemplate,
            context: {},
          });
        });

        // create page for each family
        const families = new Set(falter.map(edge => edge.node.frontmatter.family));
        families.forEach((family) => {
          createPage({
            path: `/${family}/`,
            component: familyTemplate,
            context: { family },
          });
        });
      }
    });
};

