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
          <Link to="/wer-fliegt">Wer fliegt gerade?</Link>
        </footer>
      </div>
    </div>
  );
};
