import { EpisodeActionTypes } from './action.types';
import { Episode } from '../services/BreakingBadApiService.types';


interface EpisodeAction {
  type: EpisodeActionTypes;
  payload?: Episode[];
}

interface EpisodesState {
  status: string;
  data: Episode[];
}

const initialState: EpisodesState = {
  status: 'loading',
  data: [],
};

const episodeReducer = (
  state: EpisodesState = initialState,
  action: EpisodeAction,
  ): EpisodesState => {
  switch (action.type) {
    case EpisodeActionTypes.EPISODE_LOADING_SUCCESS:
      return {
        status: 'success',
        data: action.payload!,
      }
    case EpisodeActionTypes.EPISODE_LOADING_ERROR:
      return { status: 'error', data: [] };
    default:
      return state;
  }
}

export type { EpisodeAction };
export default episodeReducer;