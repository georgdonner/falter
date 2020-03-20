import React, { useState, useEffect, useRef } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Swipeable } from 'react-swipeable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Sidebar from './Sidebar';
import '../global.scss';
import './layout.scss';

const pageQuery = graphql`
  query Families {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___family], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            family
            familyName
          }
        }
      }
    }
  }
`;

export const LayoutContext = React.createContext({
  sidebar: false,
  setSidebar: () => {},
});

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default ({ location, children }) => {
  const [sidebar, setSidebar] = useState(false);

  const prevLocation = usePrevious(location);
  useEffect(() => {
    if (prevLocation && location.pathname !== prevLocation.pathname) {
      setSidebar(false);
    }
  }, [location]);

  const pageContent = (data) => {
    const { edges } = data.allMarkdownRemark;
    return (
      <>
        <Helmet
          title="Falter"
          meta={[
            { name: 'description', content: 'Tagfalter Deutschlands' },
            { name: 'keywords', content: 'falter, schmetterlinge, tagfalter' },
          ]}
        />
        <div id="root">
          <div id="sidebar-wrapper-outer" className={sidebar ? 'active' : ''}>
            <Swipeable
              onSwipedLeft={() => {
                if (sidebar) setSidebar(false);
              }}
            >
              <Sidebar
                falters={edges.map(edge => edge.node.frontmatter)}
                path={location.pathname}
              />
            </Swipeable>
          </div>
          {/* eslint-disable-next-line */}
            <div id="main-wrapper"
              onClick={() => {
                if (sidebar) setSidebar(false);
              }}
            >
              <div
                role="menu"
                tabIndex="0"
                id="sidebar-toggle"
                onClick={() => setSidebar(!sidebar)}
                onKeyPress={(event) => {
                  if (event.key.toLowerCase() === 'enter') {
                    setSidebar(!sidebar);
                  }
                }}
                onMouseDown={(e) => { e.preventDefault(); }}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
              <LayoutContext.Provider value={{ sidebar, setSidebar }}>
                {children}
              </LayoutContext.Provider>
            </div>
        </div>
      </>
    );
  };

  return (
    <StaticQuery
      query={pageQuery}
      render={pageContent}
    />
  );
};
