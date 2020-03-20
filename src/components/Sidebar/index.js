import React from 'react';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Github from '../../images/github.png';
import './index.scss';

export default ({ falters, path }) => {
  const saved = new Set();
  const links = [];
  falters.forEach((falter) => {
    const { family, familyName } = falter;
    if (!saved.has(family)) {
      saved.add(family);
      links.push({ path: `/${family}`, title: familyName });
    }
  });
  return (
    <div>
      <div id="sidebar-wrapper-inner">
        <div id="sidebar">
          <h1>Familien</h1>
          <ul>
            {links.map(link => (
              <li key={link.path} className={path.indexOf(link.path) !== -1 ? 'active' : ''}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
            {path !== '/' ? (
              <li id="search-link">
                <Link to="/" state={{ search: true }}>
                  <FontAwesomeIcon icon={faSearch} />
                  Falter durchsuchen
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
        <footer>
          <a id="github-link" href="https://github.com/georgdonner/falter" target="_blank" rel="noopener noreferrer">
            <span>Zum Code auf </span>
            <img style={{ height: '1.5rem', width: '1.5rem', marginLeft: '.5rem' }} src={Github} alt="Github Logo" />
          </a>
        </footer>
      </div>
    </div>
  );
};
