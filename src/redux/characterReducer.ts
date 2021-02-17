import { Character } from '../services/BreakingBadApiService.types';

interface CharacterAction {
  type: string;
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
    case 'success':
      return {
        status: 'success',
        data: action.payload!,
      }
    case 'error':
      return { status: 'error', data: [] };
    default:
      return state;
  }
}

export type { CharacterAction };
export default characterReducer;