import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft, faAngleRight, faExpand, faCompress,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const Caption = ({ image }) => {
  const {
    date, author, gender, location,
  } = image;
  let genderSymbol = '';
  if (gender === 'm') genderSymbol = '♂';
  if (gender === 'f') genderSymbol = '♀';
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  return (
    <div className="image-caption">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {genderSymbol ? <span style={{ color: '#333', paddingRight: 10 }}>{genderSymbol}</span> : null}
          <a href={mapsLink} target="_blank" rel="noopener noreferrer">{location}</a>
        </div>
        <div style={{ textAlign: 'right' }}>
          {date}
          <i>
            {` (Foto: ${author})`}
          </i>
        </div>
      </div>

    </div>
  );
};

export default ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);

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
    <>
      <div id="image-container">
        <ImageGallery
          items={galleryImages}
          infinite={false}
          disableThumbnailScroll
          showPlayButton={false}
          useBrowserFullscreen={false}
          onSlide={setCurrentImg}
          renderLeftNav={renderLeftNav}
          renderRightNav={renderRightNav}
          renderFullscreenButton={renderFullscreenButton}
        />
      </div>
      <Caption image={images[currentImg]} />
    </>
  );
};
