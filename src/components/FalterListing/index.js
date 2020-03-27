import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

export default ({ falters }) => (
  <div className="falter-listing">
    {falters.map(({
      path, name, nameLatin, images,
    }) => (
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
    ))}
  </div>
);
