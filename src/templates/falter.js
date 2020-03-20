import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './falter.scss';
import FalterGallery from '../components/FalterGallery';
import FlightSeason from '../components/FlightSeason';
import Layout from '../components/layout';

export default ({ data, location }) => {
  const falter = data.markdownRemark;
  const {
    family, familyName, images, name, nameLatin, flightSeason,
  } = falter.frontmatter;

  return (
    <Layout location={location}>
      <>
        <Helmet title={`Falter - ${name}`} />
        <div id="falter">
          <Link to={`/${family}`} id="back-button-falter">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div id="falter-topbar">
            <Link to={`/${family}`}>
              <FontAwesomeIcon icon={faAngleLeft} />
              {familyName}
            </Link>
          </div>
          <h1 id="title">{name}</h1>
          <h2 id="subtitle">{nameLatin}</h2>
          <FalterGallery images={images} />
          <FlightSeason season={flightSeason} />
          <div id="description" className="body-text" dangerouslySetInnerHTML={{ __html: falter.html }} />
        </div>
      </>
    </Layout>
  );
};

export const falterQuery = graphql`
  query FalterByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        name
        nameLatin
        family
        familyName
        flightSeason
        images {
          src {
            childImageSharp {
              fluid(maxWidth: 4000) {
                ...GatsbyImageSharpFluid
              }
              fixed(width: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          gender
          location
          author
          date(formatString: "DD.MM.YYYY")
        } 
      }
    }
  }
`;
