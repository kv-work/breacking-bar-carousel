import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CharacterAction } from '../../redux/characterReducer';
import { State } from '../../redux/reducer';
import BreakingBadApiService from '../../services/BreakingBadApiService';
import { Character } from '../../services/BreakingBadApiService.types';

import CharacterCarouselProps from './CharacterCarousel.types';
import CharacterCard from '../CharacterCard/CharacterCard';

import styles from './CharacterCarousel.module.scss';

const CharacterCarousel: React.FC<CharacterCarouselProps> = ({ numberOfCards = 4 }) => {
  const charactersData = useSelector((state: State) => state.characters);
  const { data } = charactersData;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    BreakingBadApiService.getCharacters()
    .then((data: Character[]) => {
      const action: CharacterAction = {
        type: 'success',
        payload: data,
      }

      dispatch(action);
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: 'error' })
    });
  }, []);

  const selectActualCards = (cards: Character[]): Character[] => {
    const firstActualItem = numberOfCards * (currentPage - 1);
    const lastActualItem = firstActualItem + numberOfCards;
    const actualCards = cards?.slice(firstActualItem, lastActualItem);
    return actualCards;
  };

  const actualCards = selectActualCards(data);

  return (
    <div className={styles.charactersCarousel}>
      <header className={styles.carouselHeader}>
        <h2>Characters of The Breaking Bad</h2>
        <div>Total {data.length} characters.</div>
      </header>
      <div className={styles.carousel}>
        <button className={styles.btnPrev} />
        <ul className={styles.carouselCards}>
          {
            actualCards.length !== 0 ?
            actualCards.map(character => {
              return <CharacterCard key={character.char_id} data={character} />
            }) :
            <div className="errorText">Characters not found!</div>
          }
        </ul>
        <button className={styles.btnNext} />
      </div>
    </div>
  )
};

export default CharacterCarousel;
