import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';

export default function Template({
  data,
}) {
  const falter = data.markdownRemark;
  return (
    <div>
      <Helmet title={`Falter - ${falter.frontmatter.name}`} />
      <div>
        <h1>{falter.frontmatter.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: falter.html }} />
      </div>
    </div>
  );
}

export const falterQuery = graphql`
  query FalterByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        name
      }
    }
  }
`;
