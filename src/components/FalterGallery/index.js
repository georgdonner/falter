import React from 'react';
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleRight, faExpand, faCompress,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';

export default ({ images, onSlide }) => {
  const galleryImages = images.map((image) => {
    const { src, srcSet, sizes } = image.src.childImageSharp.fluid;
    const thumbnail = image.src.childImageSharp.fixed.src;
    return {
      original: src,
      thumbnail,
      srcSet,
      sizes,
    };
  });

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
    <div id="image-container">
      <ImageGallery
        items={galleryImages}
        infinite={false}
        disableThumbnailScroll
        showPlayButton={false}
        useBrowserFullscreen={false}
        onSlide={(currentImg) => {
          onSlide(currentImg);
        }
        }
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderFullscreenButton={renderFullscreenButton}
      />
    </div>
  );
};
