import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';

import Sidebar from '../components/Sidebar';
import './index.scss';

const TemplateWrapper = ({ children, data, location }) => {
  console.log(location);
  const { edges } = data.allMarkdownRemark;
  return (
    <div>
      <Helmet
        title="Falter"
        meta={[
          { name: 'description', content: 'Tagfalter Deutschlands' },
          { name: 'keywords', content: 'falter, schmetterlinge, tagfalter' },
        ]}
      />
      <div
        style={{
          margin: '0 auto',
          maxWidth: 1200,
          paddingTop: 0,
          display: 'grid',
          'grid-template-columns': '300px 1fr',
        }}
      >
        <Sidebar falters={edges.map(edge => edge.node.frontmatter)} />
        <div style={{ padding: '2rem 5rem' }}>{children()}</div>
      </div>
    </div>
  );
};

export default TemplateWrapper;

export const pageQuery = graphql`
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
