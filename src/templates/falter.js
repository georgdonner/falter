import React from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

export default function Template({
  data,
}) {
  const falter = data.markdownRemark;
  const images = falter.frontmatter.images.map((image) => {
    const { sizes } = image.src.childImageSharp;
    return <Img key={sizes.src} sizes={sizes} />;
  });
  return (
    <div>
      <Helmet title={`Falter - ${falter.frontmatter.name}`} />
      <div>
        <h1>{falter.frontmatter.name}</h1>
        {images}
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
        images {
          src {
            childImageSharp {
              sizes(maxWidth: 1240 ) {
                ...GatsbyImageSharpSizes
              }
            }
          }
          gender
          location
          author
          date
        } 
      }
    }
  }
`;
