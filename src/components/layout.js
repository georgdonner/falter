import React, { Component, Fragment } from 'react';
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

export default class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebar: false };
    this.setSidebar = (sidebar = true) => this.setState({ sidebar });
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    if (location.pathname !== nextProps.location.pathname) {
      this.setState({ sidebar: false });
    }
  }

  render() {
    const { children, location } = this.props;
    const { sidebar } = this.state;
    const pageContent = (data) => {
      const { edges } = data.allMarkdownRemark;
      return (
        <Fragment>
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
                  if (sidebar) this.setSidebar(false);
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
                  if (sidebar) this.setSidebar(false);
                }}
              >
                <div
                  role="menu"
                  tabIndex="0"
                  id="sidebar-toggle"
                  onClick={() => this.setSidebar(!sidebar)}
                  onKeyPress={(event) => {
                    if (event.key.toLowerCase() === 'enter') {
                      this.setSidebar(!sidebar);
                    }
                  }}
                  onMouseDown={(e) => { e.preventDefault(); }}
                >
                  <FontAwesomeIcon icon={faBars} />
                </div>
                <LayoutContext.Provider value={{ sidebar, setSidebar: this.setSidebar }}>
                  {children}
                </LayoutContext.Provider>
              </div>
          </div>
        </Fragment>
      );
    };
    return (
      <StaticQuery
        query={pageQuery}
        render={pageContent}
      />
    );
  }
}
