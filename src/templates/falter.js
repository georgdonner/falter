import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleRight, faArrowLeft, faExpand, faCompress,
} from '@fortawesome/free-solid-svg-icons';
import './falter.scss';
import Layout from '../components/layout';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
    this.gallery = null;
  }

  render() {
    const { data, location } = this.props;
    const { currentImg } = this.state;
    const falter = data.markdownRemark;
    const {
      family, familyName, images, name, nameLatin,
    } = falter.frontmatter;
    const galleryImages = images.map((image) => {
      const { src, srcSet, sizes } = image.src.childImageSharp.sizes;
      const thumbnail = image.src.childImageSharp.resolutions.src;
      return {
        original: src,
        thumbnail,
        srcSet,
        sizes,
      };
    });
    const getCaption = (imgData) => {
      const { date, author, gender } = imgData;
      let genderSymbol = '';
      if (gender === 'm') genderSymbol = '♂';
      if (gender === 'f') genderSymbol = '♀';
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {genderSymbol ? <span style={{ color: '#333', paddingRight: 10 }}>{genderSymbol}</span> : null}
            {imgData.location}
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
            <div id="image-container">
              <ImageGallery
                ref={(gallery) => { this.gallery = gallery; }}
                items={galleryImages}
                infinite={false}
                disableThumbnailScroll
                showPlayButton={false}
                useBrowserFullscreen={false}
                onSlide={img => this.setState({ currentImg: img })}
                renderLeftNav={renderLeftNav}
                renderRightNav={renderRightNav}
                renderFullscreenButton={renderFullscreenButton}
              />
            </div>
            <div className="image-caption">{getCaption(images[currentImg])}</div>
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
