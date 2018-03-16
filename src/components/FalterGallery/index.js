import React from 'react';
import ImageGallery from 'react-image-gallery';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import faExpand from '@fortawesome/fontawesome-free-solid/faExpand';
import faCompress from '@fortawesome/fontawesome-free-solid/faCompress';
import './index.scss';

export default (props) => {
  const galleryImages = props.images.map((image) => {
    const { src, srcSet, sizes } = image.src.childImageSharp.sizes;
    const thumbnail = image.src.childImageSharp.resolutions.src;
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
        onSlide={currentImg => props.onSlide(currentImg)}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderFullscreenButton={renderFullscreenButton}
      />
    </div>
  );
};
