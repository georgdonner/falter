import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowRight from '@fortawesome/fontawesome-free-solid/faArrowRight';
import './family.scss';

const Family = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  const { familyName } = edges[0].node.frontmatter;

  return (
    <div>
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
                <Img sizes={images[0].src.childImageSharp.sizes} imgStyle={{ borderRadius: '2px 2px 0 0' }} />
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
    </div>
  );
};

export default Family;

export const pageQuery = graphql`
  query FamilyPage($family: String!) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___name], order: ASC }
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
                  sizes(maxWidth: 600) {
                    ...GatsbyImageSharpSizes
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
