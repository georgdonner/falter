import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './family.scss';
import Layout from '../components/layout';

const Family = ({ data, location }) => {
  const { edges } = data.allMarkdownRemark;
  const { familyName } = edges[0].node.frontmatter;

  return (
    <Layout location={location}>
      <Fragment>
        <Helmet title={`Falter - ${familyName}`} />
        <h1 id="family-title">{familyName}</h1>
        <div id="family-container">
          {edges.map(({ node }) => {
            const {
              path, name, nameLatin, images,
            } = node.frontmatter;
            return (
              <div key={path} className="falter-card">
                <Link to={path}>
                  <Img fluid={images[0].src.childImageSharp.fluid} imgStyle={{ borderRadius: '2px 2px 0 0' }} />
                  <h2>{name}</h2>
                  <h3>
                    <i>{nameLatin}</i>
                    <span className="icon-right"><FontAwesomeIcon icon={faArrowRight} /></span>
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
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
