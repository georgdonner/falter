/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { graphql, Link, navigate } from 'gatsby';
import { useFlexSearch } from 'react-use-flexsearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Github from '../images/github.png';
import HeroImage from '../images/schwalbenschwanz.jpg';
import Layout, { LayoutContext } from '../components/layout';
import './index.scss';

const SearchResult = ({ result }) => (
  <Link to={result.path} className="result">
    <p>{result.name}</p>
    <p className="latin">{result.nameLatin}</p>
  </Link>
);

const IndexPage = ({ data, location }) => {
  const { index, store } = data.localSearchFalter;
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q') || '');
  const [hideArticle, setHideArticle] = useState(Boolean(query) || Boolean(window.sessionStorage.getItem('hideArticle')));
  const results = useFlexSearch(query, index, JSON.parse(store));

  useEffect(() => {
    const newPath = query ? `/?q=${encodeURIComponent(query)}` : '/';
    navigate(newPath, { replace: true });
  }, [query]);

  useEffect(() => {
    window.sessionStorage.setItem('hideArticle', hideArticle);
  }, [hideArticle]);

  return (
    <Layout location={location}>
      <LayoutContext.Consumer>
        {({ setSidebar }) => (
          <main id="main">
            <h1 id="index-topbar">Falter</h1>
            <article className={hideArticle ? 'hidden' : ''}>
              <h1 id="index-title">Eine Sammlung der Tagfalter Europas</h1>
              <img src={HeroImage} alt="Tagfalter" />
              <div className="body-text">
                <p>Willkommen auf der Tagfalter-Galerie der zwei Donner-Fotografen!</p>
                <p>
                  Wir beide (Karsten und Georg) jagen seit Mai 2016 gemeinsam den örtlichen
                  Schmetterlingen hinterher, natürlich vor allem in Berlin und Brandenburg,
                  aber wir haben auch an anderen Orten bereits Fotos geschossen. In unserer
                  Sammlung kannst Du die überraschende Vielfalt der Tagfalter entdecken,
                  die sich auch für uns mit jedem Ausflug erweitert.
                </p>
                <p>
                  Also viel Spaß mit den Fotos!
                  {' '}
                  <span role="img" aria-label="Smile">🙂</span>
                </p>
                <p id="mobile-cta">
                  <button className="primary-button" type="button" onClick={setSidebar}>Zu den Familien</button>
                </p>
                <p>Du kannst auch hier nach Faltern suchen!</p>
              </div>
            </article>
            <div id="search-container">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="search" value={query}
                placeholder="Suche nach Faltern..."
                onChange={({ target }) => {
                  setQuery(target.value);
                }}
                onFocus={() => {
                  setHideArticle(true);
                }}
              />
            </div>
            {(query && results) ? (
              <div id="search-results">
                {results.length > 0
                  ? results.map(result => <SearchResult result={result} key={result.id} />)
                  : <p>Keine Ergebnisse für &quot;{query}&quot; gefunden</p>
                }
              </div>
            ) : null}
            <footer>
              <a id="github-link" href="https://github.com/georgdonner/falter" target="_blank" rel="noopener noreferrer">
                <span>Zum Code auf </span>
                <img style={{ height: '1.5rem', width: '1.5rem', marginLeft: '.5rem' }} src={Github} alt="Github Logo" />
              </a>
            </footer>
          </main>
        )}
      </LayoutContext.Consumer>
    </Layout>
  );
};

export default IndexPage;

export const searchQuery = graphql`
  {
    localSearchFalter {
      index
      store
    }
  }
`;
