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

export default class TemplateWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { sidebar: false };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ sidebar: false });
    }
  }

  setSidebar(sidebar = true) {
    this.setState({ sidebar });
  }

  render() {
    const { children, location } = this.props;
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
            <div id="sidebar-wrapper-outer" className={this.state.sidebar ? 'active' : ''}>
              <Swipeable
                onSwipedLeft={() => { if (this.state.sidebar) this.setState({ sidebar: false }); }}
              >
                <Sidebar
                  falters={edges.map(edge => edge.node.frontmatter)}
                  path={location.pathname}
                />
              </Swipeable>
            </div>
            {/* eslint-disable-next-line */}
            <div id="main-wrapper" onClick={() => { if (this.state.sidebar) this.setState({ sidebar: false }); }}>
              <div
                role="menu"
                tabIndex="0"
                id="sidebar-toggle"
                onClick={() => this.setState({ sidebar: !this.state.sidebar })}
                onKeyPress={(event) => {
                  if (event.key.toLowerCase() === 'enter') this.setState({ sidebar: !this.state.sidebar });
                }}
                onMouseDown={(e) => { e.preventDefault(); }}
              >
                <FontAwesomeIcon icon={faBars} />
              </div>
              {/* {children({ ...this.props, setSidebar: sidebar => this.setSidebar(sidebar) })} */}
              {children}
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
