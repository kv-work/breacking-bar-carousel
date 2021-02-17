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

type Episode = {
  episode_id: number;
  title: string;
  season: number;
  episode: number;
  air_date: string;
  characters: string[];
}

interface BreakingBadApiServiceType {
  getCharacters(limit?: number, offset?: number): Promise<Character>;
  getEpisodes(number?: number): Promise<Episode>;
}

export type {
  Character,
  Episode,
  BreakingBadApiServiceType,
};
