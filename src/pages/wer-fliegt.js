import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import FlightSeason from '../utils/flightSeason';
import Layout from '../components/layout';
import FalterListing from '../components/FalterListing';
import './wer-fliegt.scss';

const WerFliegtPage = ({ data, location }) => {
  const falters = data.allMarkdownRemark.edges
    .map(({ node }) => node.frontmatter)
    .filter(({ flightSeason }) => flightSeason && (new FlightSeason(flightSeason)).inSeason());

  return (
    <Layout location={location} topbar="Falter">
      <>
        <Helmet title="Wer fliegt gerade?" />
        <h1 id="wer-fliegt-title">Welche Falter fliegen gerade?</h1>
        <FalterListing falters={falters} />
      </>
    </Layout>
  );
};

export default WerFliegtPage;

export const pageQuery = graphql`
  query AllFalters {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___nameLatin], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            path
            name
            nameLatin
            familyName
            flightSeason
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
