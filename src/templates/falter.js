import React, { Component, Fragment } from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import ImageGallery from 'react-image-gallery';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import faExpand from '@fortawesome/fontawesome-free-solid/faExpand';
import faCompress from '@fortawesome/fontawesome-free-solid/faCompress';
import './falter.scss';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
    this.gallery = null;
  }

  render() {
    const falter = this.props.data.markdownRemark;
    const {
      family, familyName, images, name, nameLatin,
    } = falter.frontmatter;
    console.log(images);
    const galleryImages = images.map((image) => {
      const { src, srcSet, sizes } = image.src.childImageSharp.sizes;
      return {
        original: src,
        srcSet,
        sizes,
      };
    });
    const getCaption = ({
      location, date, author, gender,
    }) => {
      let genderSymbol = '?';
      if (gender === 'm') genderSymbol = '♂';
      if (gender === 'f') genderSymbol = '♀';
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><span style={{ color: '#333', paddingRight: 10 }}>{genderSymbol}</span>{location}</div>
          <div style={{ textAlign: 'right' }}>{date}<i> (Foto: {author})</i></div>
        </div>
      );
    };

    const renderFullscreenButton = (onClick, isFullscreen) => (
      <div
        id="fullscreen-button"
        className="gallery-button"
        role="button"
        tabIndex="0"
        onClick={onClick}
        onKeyPress={onClick}
        onMouseDown={(e) => { e.preventDefault(); }}
      >
        <FontAwesomeIcon
          icon={isFullscreen ? faCompress : faExpand}
        />
      </div>
    );

    const renderLeftNav = (onClick, disabled) => (
      <div className="gallery-button gallery-nav left" style={{ display: disabled ? 'none' : 'flex' }}>
        <div
          role="button"
          onClick={onClick}
          tabIndex="0"
          onKeyPress={onClick}
          onMouseDown={(e) => { e.preventDefault(); }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      </div>
    );

    const renderRightNav = (onClick, disabled) => (
      <div className="gallery-button gallery-nav right" style={{ display: disabled ? 'none' : 'flex' }}>
        <div
          role="button"
          onClick={onClick}
          tabIndex="0"
          onKeyPress={onClick}
          onMouseDown={(e) => { e.preventDefault(); }}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    );

    return (
      <Fragment>
        <Helmet title={`Falter - ${name}`} />
        <div id="falter">
          <div id="falter-topbar">
            <Link to={`/${family}`}><FontAwesomeIcon icon={faAngleLeft} />{familyName}</Link>
          </div>
          <h1 id="title">{name}</h1>
          <h2 id="subtitle">{nameLatin}</h2>
          <div id="image-container">
            <ImageGallery
              ref={(gallery) => { this.gallery = gallery; }}
              items={galleryImages}
              infinite={false}
              showThumbnails={false}
              showPlayButton={false}
              useBrowserFullscreen={false}
              onSlide={currentImg => this.setState({ currentImg })}
              renderLeftNav={renderLeftNav}
              renderRightNav={renderRightNav}
              renderFullscreenButton={renderFullscreenButton}
            />
          </div>
          <div className="image-caption">{getCaption(images[this.state.currentImg])}</div>
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
