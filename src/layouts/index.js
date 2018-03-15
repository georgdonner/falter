import React, { Component, Fragment } from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Swipeable from 'react-swipeable';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import Sidebar from '../components/Sidebar';
import '../global.scss';
import './index.scss';

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
    const { children, data, location } = this.props;
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
            >
              <FontAwesomeIcon icon={faBars} />
            </div>
            {children({ ...this.props, setSidebar: sidebar => this.setSidebar(sidebar) })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export const pageQuery = graphql`
  query Families {
    allMarkdownRemark(
      limit: 2000
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
