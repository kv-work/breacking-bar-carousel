import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reducer';
import { Character } from '../../services/BreakingBadApiService.types';

// import CharacterCarouselProps from './CharacterCarousel.types';
import CharacterCard from '../CharacterCard/CharacterCard';

const CharacterCarousel: React.FC = () => {
  const charactersData = useSelector((state: State) => state.characters);
  const { data } = charactersData;

  return (
    <div className="charactersCarousel">
      <header className="carouselHeader">
        <h2>Characters of The Breaking Bad</h2>
        <div>Total {data.length} characters.</div>
      </header>
      <div className="carousel">
        {
          data.length !== 0 ?
          data.map(character => {
            return <CharacterCard key={character.char_id} data={character} />
          }) :
          <div className="errorText">Characters not found!</div>
        }
      </div>
    </div>
  )
};

export default CharacterCarousel;
