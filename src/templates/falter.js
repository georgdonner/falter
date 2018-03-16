import React, { Component, Fragment } from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';

import FalterGallery from '../components/FalterGallery';
import './falter.scss';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
  }

  render() {
    const falter = this.props.data.markdownRemark;
    const {
      family, familyName, images, name, nameLatin,
    } = falter.frontmatter;
    const getCaption = ({
      location, date, author, gender,
    }) => {
      let genderSymbol = '';
      if (gender === 'm') genderSymbol = '♂';
      if (gender === 'f') genderSymbol = '♀';
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {genderSymbol ? <span style={{ color: '#333', paddingRight: 10 }}>{genderSymbol}</span> : null}
            {location}
          </div>
          <div style={{ textAlign: 'right' }}>{date}<i> (Foto: {author})</i></div>
        </div>
      );
    };

    return (
      <Fragment>
        <Helmet title={`Falter - ${name}`} />
        <div id="falter">
          <Link to={`/${family}`} id="back-button-falter">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <div id="falter-topbar">
            <Link to={`/${family}`}><FontAwesomeIcon icon={faAngleLeft} />{familyName}</Link>
          </div>
          <h1 id="title">{name}</h1>
          <h2 id="subtitle">{nameLatin}</h2>
          <FalterGallery images={images} onSlide={currentImg => this.setState({ currentImg })} />
          <div className="image-caption">{getCaption(images[this.state.currentImg])}</div>
          {/* eslint-disable-next-line react/no-danger */}
          <div id="description" className="body-text" dangerouslySetInnerHTML={{ __html: falter.html }} />
        </div>
      </Fragment>
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
        images {
          src {
            childImageSharp {
              sizes(maxWidth: 4000) {
                ...GatsbyImageSharpSizes
              }
              resolutions(width: 200) {
                ...GatsbyImageSharpResolutions
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
