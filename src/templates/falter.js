import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './falter.scss';
import FalterGallery from '../components/FalterGallery';
import FlightSeason from '../components/FlightSeason';
import Layout from '../components/layout';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
  }

  render() {
    const { data, location } = this.props;
    const { currentImg } = this.state;
    const falter = data.markdownRemark;
    const {
      family, familyName, images, name, nameLatin, flightSeason,
    } = falter.frontmatter;

    const getCaption = (imgData) => {
      const { date, author, gender } = imgData;
      let genderSymbol = '';
      if (gender === 'm') genderSymbol = '♂';
      if (gender === 'f') genderSymbol = '♀';
      const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(imgData.location)}`;
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {genderSymbol ? <span style={{ color: '#333', paddingRight: 10 }}>{genderSymbol}</span> : null}
            <a href={mapsLink} target="_blank" rel="noopener noreferrer">{imgData.location}</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            {date}
            <i>
              {` (Foto: ${author})`}
            </i>
          </div>
        </div>
      );
    };

    return (
      <Layout location={location}>
        <Fragment>
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
            <FalterGallery images={images} onSlide={curr => this.setState({ currentImg: curr })} />
            <div className="image-caption">{getCaption(images[currentImg])}</div>
            <FlightSeason season={flightSeason} />
            <div id="description" className="body-text" dangerouslySetInnerHTML={{ __html: falter.html }} />
          </div>
        </Fragment>
      </Layout>
    );
  }
}

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
