import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { CharacterAction } from '../../redux/characterReducer';
import { CharacterActionTypes } from '../../redux/action.types';
import { State } from '../../redux/reducer';
import BreakingBadApiService from '../../services/BreakingBadApiService';
import { Character } from '../../services/BreakingBadApiService.types';

import CharacterCarouselProps from './CharacterCarousel.types';
import CharacterCard from '../CharacterCard/CharacterCard';

import styles from './CharacterCarousel.module.scss';

const CharacterCarousel: React.FC<CharacterCarouselProps> = ({ numberOfCards = 4 }) => {
  const charactersData = useSelector((state: State) => state.characters);
  const { data, status } = charactersData;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery({
    query: '(max-width: 1100px)'
  })

  useEffect(() => {
    BreakingBadApiService.getCharacters()
    .then((data: Character[]) => {
      const action: CharacterAction = {
        type: CharacterActionTypes.CHARACTER_LOADING_SUCCESS,
        payload: data,
      }

      dispatch(action);
    })
    .catch(err => {
      console.log(err)
      dispatch({ type: CharacterActionTypes.CHARACTER_LOADING_ERROR })
    });
  }, []);

  const selectActualCards = (cards: Character[]): Character[] => {
    if (isMobile) {
      return cards;
    }
    let firstActualItem = numberOfCards * (currentPage - 1);
    let lastActualItem = firstActualItem + numberOfCards;

    if (lastActualItem >= cards.length) {
      lastActualItem = cards.length;
      firstActualItem = lastActualItem - numberOfCards;
    }
    const actualCards = cards?.slice(firstActualItem, lastActualItem);
    return actualCards;
  };

  const actualCards = selectActualCards(data);

  const handlePrevClick = () => {
    setCurrentPage((prev) => {
      if (currentPage > 1) return prev - 1;
      return prev;
    });
  }

  const handleNextClick = () => {
    setCurrentPage((prev) => {
      const maxPageNumber = Math.floor(data.length / numberOfCards + 1);
      if (currentPage < maxPageNumber) return prev + 1;
      return prev;
    });
  }

  const renderCarousel = (status: string, data: Character[]) => {
    switch (status) {
      case 'success':
        return (
          <>
            <button className={styles.btnPrev} onClick={handlePrevClick} />
            <ul className={styles.carouselCards} >
              {data.map(character => <CharacterCard key={character.char_id} data={character} />)}
            </ul>
            <button className={styles.btnNext} onClick={handleNextClick} />
          </>
        );
      case 'error':
        return  <div className="errorText">Characters not found!</div>;
      default: return <div>Loading data...</div>
    }
  }

  return (
    <div className={styles.charactersCarousel}>
      <header className={styles.carouselHeader}>
        <h2>Characters of The Breaking Bad</h2>
        <div>Total {data.length} characters.</div>
      </header>
      <div className={styles.carousel}>
        {renderCarousel(status, actualCards)}
      </div>
    </div>
  )
};

export default CharacterCarousel;
