import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CharacterCarousel from '../CharacterCarousel/CharacterCarousel';
import { Character } from '../../services/BreakingBadApiService.types';
import { State } from '../../redux/reducer';
import BreakingBadApiService from '../../services/BreakingBadApiService';
import { CharacterAction } from '../../redux/characterReducer';

const App: React.FC = () => {
  const store = useSelector((store: State) => store);
  const dispatch = useDispatch();
  const { characters, episodes} = store;

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
  
  return (
    <div className="app">
      <h1>The Breacking Bad</h1>
      <CharacterCarousel />
    </div>
  );
}

export default App;