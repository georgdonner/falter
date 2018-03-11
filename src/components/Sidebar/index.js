import React from 'react';
import Link from 'gatsby-link';
import './index.scss';

const Sidebar = (props) => {
  const saved = new Set();
  const links = [];
  props.falters.forEach((falter) => {
    const { family, familyName } = falter;
    if (!saved.has(family)) {
      saved.add(family);
      links.push({ path: `/${family}`, title: familyName });
    }
  });
  return (
    <div>
      <div id="sidebar-wrapper">
        <div id="sidebar">
          <h1>Familien</h1>
          <ul>
            {links.map(link => (
              <li key={link.path}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
            <li>Test</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
