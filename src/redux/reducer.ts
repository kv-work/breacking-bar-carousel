import { combineReducers } from 'redux';

type Character = {
  char_id: number;
  name: string;
  birthday: string;
  occupation: string[];
  img: string;
  status: string;
  appearance: number[];
  nickname: string;
  portrayed: string;
}

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

const testReducer = (
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

const rootReducer = combineReducers({ testReducer });

export type State = ReturnType<typeof rootReducer>;
export default rootReducer;
