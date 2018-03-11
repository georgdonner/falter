import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';

const Family = ({ data }) => {
  const { edges, totalCount } = data.allMarkdownRemark;
  const { familyName } = edges[0].node.frontmatter;
  const familyHeader = `${totalCount} Falter der Familie "${familyName}"`;

  return (
    <div>
      <Helmet title={`Falter - ${familyName}`} />
      <h1>{familyHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, name } = node.frontmatter;
          return (
            <li key={path}>
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Family;

export const pageQuery = graphql`
  query FamilyPage($family: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___name], order: DESC }
      filter: { frontmatter: { family: { eq: $family } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            path
            name
            familyName
          }
        }
      }
    }
  }
`;
