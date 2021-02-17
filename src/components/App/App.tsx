import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Character } from '../../services/BreackingBadApiService';
import { CharacterAction } from '../../redux/characterReducer';

const App: React.FC = () => {
  const store = useSelector(store => store);
  const dispatch = useDispatch();
  console.log(store)

  useEffect(() => {
    fetch('https://www.breakingbadapi.com/api/characters/1')
    .then((res) => res.json())
    .then((data: Character[]) => {
      const action: CharacterAction = {
        type: 'success',
        payload: data,
      }

      dispatch(action);
    })
    .catch(err => console.log(err));
  }, []);
  
  return (<div className="app">The Breacking Bad</div>);
}

export default App;