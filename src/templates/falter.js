import React, { Component } from 'react';
import graphql from 'graphql';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleLeft from '@fortawesome/fontawesome-free-solid/faAngleLeft';
import faAngleRight from '@fortawesome/fontawesome-free-solid/faAngleRight';
import './falter.scss';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImg: 0,
    };
  }

  render() {
    const falter = this.props.data.markdownRemark;
    const {
      family, familyName, images, name, nameLatin,
    } = falter.frontmatter;
    const getCaption = ({
      location, date, author, gender,
    }) => {
      let genderSymbol = '?';
      if (gender === 'm') genderSymbol = '♂';
      if (gender === 'f') genderSymbol = '♀';
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><span style={{ color: '#333', paddingRight: 10 }}>{genderSymbol}</span>{location}</div>
          <div style={{ textAlign: 'right' }}>{date}<i> (Foto: {author})</i></div>
        </div>
      );
    };
    return (
      <div>
        <Helmet title={`Falter - ${name}`} />
        <div>
          <div id="falter-topbar">
            <Link to={`/${family}`}><FontAwesomeIcon icon={faAngleLeft} />{familyName}</Link>
          </div>
          <h1 id="title">{name}</h1>
          <h2 id="subtitle">{nameLatin}</h2>
          <div id="image-container">
            <div className="icon" onClick={() => this.setState({ currentImg: Math.max(this.state.currentImg - 1, 0) })}>
              {this.state.currentImg > 0 ? <FontAwesomeIcon icon={faAngleLeft} /> : null}
            </div>
            <Img sizes={images[this.state.currentImg].src.childImageSharp.sizes} imgStyle={{ borderRadius: '5px' }} fadeIn />
            <div className="icon" onClick={() => this.setState({ currentImg: Math.min(this.state.currentImg + 1, images.length - 1) })}>
              {this.state.currentImg < images.length - 1 ? <FontAwesomeIcon icon={faAngleRight} /> : null}
            </div>
          </div>
          <div className="image-caption">{getCaption(images[this.state.currentImg])}</div>
          <div id="description" className="body-text" dangerouslySetInnerHTML={{ __html: falter.html }} />
        </div>
      </div>
    );
  }
}

export const falterQuery = graphql`
  query FalterByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        name
        nameLatin
        family
        familyName
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
          date(formatString: "DD.MM.YYYY")
        } 
      }
    }
  }
`;
