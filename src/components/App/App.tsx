import React from 'react';

import CharacterCarousel from '../CharacterCarousel/CharacterCarousel';
import EpisodeCarousel from '../EpisodeCarousel/EpisodeCarousel';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <h1>The Breaking Bad</h1>
      <CharacterCarousel />
      <EpisodeCarousel />
    </div>
  );
}

export default App;