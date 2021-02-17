type Episode = {
  episode_id: number;
  title: string;
  season: number;
  episode: number;
  air_date: string;
  characters: string[];
}

interface EpisodeAction {
  type: string;
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

export default episodeReducer;