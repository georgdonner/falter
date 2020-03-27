import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import FalterListing from '../components/FalterListing';
import './family.scss';

const Family = ({ data, location }) => {
  const { edges } = data.allMarkdownRemark;
  const { familyName } = edges[0].node.frontmatter;
  const falters = edges.map(({ node }) => node.frontmatter);

  return (
    <Layout location={location}>
      <Fragment>
        <Helmet title={familyName} />
        <h1 id="family-title">{familyName}</h1>
        <FalterListing falters={falters} />
      </Fragment>
    </Layout>
  );
};

export default Family;

export const pageQuery = graphql`
  query FamilyPage($family: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___nameLatin], order: ASC }
      filter: { frontmatter: { family: { eq: $family } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            name
            nameLatin
            familyName
            images {
              src {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
