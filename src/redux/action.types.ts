enum CharacterActionTypes {
  CHARACTER_LOADING_SUCCESS = 'CHARACTER_LOADING_SUCCESS',
  CHARACTER_LOADING_ERROR = 'CHARACTER_LOADING_ERROR',
}

enum EpisodeActionTypes {
  EPISODE_LOADING_SUCCESS = 'EPISODE_LOADING_SUCCESS',
  EPISODE_LOADING_ERROR = 'EPISODE_LOADING_ERROR',
}

interface Action<TPayload> {
  type: EpisodeActionTypes | CharacterActionTypes;
  payload?: TPayload;
}
export {
  CharacterActionTypes,
  EpisodeActionTypes,
};
export default Action;
