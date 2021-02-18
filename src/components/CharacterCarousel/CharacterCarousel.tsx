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
  const [swipe, setSwipe] = useState(0);
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

  const handleCarouselMouseDown = (e: React.MouseEvent) => {
    const elem = (e.currentTarget as Element);
    const bounds = elem.getBoundingClientRect()
    const startPosition = swipe;

    const clickStartCoord = e.clientX - bounds.x;

    const handleDocumentMouseMove = (event: MouseEvent) => {
      const clickMoveCoord = event.clientX - bounds.x;
      const swipe = startPosition + clickMoveCoord - clickStartCoord;

      setSwipe(swipe);
    }

    document.addEventListener('mousemove', handleDocumentMouseMove);


    document.onmouseup = () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.onmouseup = null;
    }
  };

  const mobileStyles = {
    transform: `translateX(${swipe}px)`,
  }

  const renderCarousel = (status: string, data: Character[]) => {
    switch (status) {
      case 'success':
        return (
          <>
            <button className={styles.btnPrev} onClick={handlePrevClick} />
            <ul
              className={styles.carouselCards}
            >
              <div
                className={styles.cardContainer}
                style ={isMobile ? mobileStyles : {}}
                onMouseDown={(e) => isMobile && handleCarouselMouseDown(e)}
                onDragStart={() => false}
              >
                {data.map(character => <CharacterCard key={character.char_id} data={character} />)}
              </div>
            </ul>
            <button className={styles.btnNext} onClick={handleNextClick} />
          </>
        );
      case 'error':
        return  <div className="errorText">Characters not found!</div>;
      default: return <div>Loading data...</div>
    }
  }

  const actualCards = selectActualCards(data);

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
