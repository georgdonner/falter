import React from 'react';
import Github from '../images/github.png';
import HeroImage from '../images/schwalbenschwanz.jpg';
import './index.scss';

const IndexPage = () => (
  <main id="main">
    <h1>Tagfalter Deutschlands</h1>
    <img src={HeroImage} alt="Tagfalter" />
    <p>Willkommen auf der Tagfalter-Galerie der zwei Donner-Fotografen!</p>
    <p>
      Wir beide (Karsten und Georg) jagen seit Mai 2016 gemeinsam den örtlichen Schmetterlingem
      hinterher, natürlich vor allem in Berlin und Brandenburg, aber wir haben auch an anderen Orten
      bereits Fotos geschossen. In unserer Sammlung kannst du die überraschende Vielfalt der
      Tagfalter entdecken, die sich auch für uns mit jedem Ausflug erweitert.
    </p>
    <p>Also viel Spaß mit den Fotos! <span role="img" aria-label="Smile">🙂</span></p>
    <footer>
      <a id="github-link" href="https://github.com/georgdonner/falter" target="_blank" rel="noopener noreferrer" >
        <span>Zum Code auf </span>
        <img style={{ height: '1.5rem', width: '1.5rem', marginLeft: '.5rem' }} src={Github} alt="Github Logo" />
      </a>
    </footer>
  </main>
);

export default IndexPage;
