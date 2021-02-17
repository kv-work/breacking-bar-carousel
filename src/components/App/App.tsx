import React from 'react';

import CharacterCarousel from '../CharacterCarousel/CharacterCarousel';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>The Breaking Bad</h1>
      <CharacterCarousel />
    </div>
  );
}

export default App;