import { CharacterActionTypes } from './action.types';
import { Character } from '../services/BreakingBadApiService.types';

interface CharacterAction {
  type: CharacterActionTypes;
  payload?: Character[];
}

interface CharactersState {
  status: string;
  data: Character[];
}

const initialState: CharactersState = {
  status: 'loading',
  data: [],
};

const characterReducer = (
  state: CharactersState = initialState,
  action: CharacterAction,
  ): CharactersState => {
  switch (action.type) {
    case CharacterActionTypes.CHARACTER_LOADING_SUCCESS:
      return {
        status: 'success',
        data: action.payload!,
      }
    case CharacterActionTypes.CHARACTER_LOADING_ERROR:
      return { status: 'error', data: [] };
    default:
      return state;
  }
}

export type { CharacterAction };
export default characterReducer;