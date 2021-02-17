import { BreakingBadApiServiceType, Character, Episode } from './BreakingBadApiService.types';

function bind() {

}

class BreakingBadApiService implements BreakingBadApiServiceType {
  private apiBase;

  constructor() {
    this.apiBase = 'https://www.breakingbadapi.com/api/';

    this.bindMethods();
  }

  async getCharacters(limit?: number, offset?: number): Promise<Character> {
    const queryLimit = limit ? `limit=${limit}` : '';
    const queryOffsset = offset ? `offset=${offset}` : '';
    let query = '';

    const res = await fetch(`${this.apiBase}characters${query}`);

    return await res.json()
  }

  async getEpisodes(number?: number): Promise<Episode> {
    const query = number ? `/${number}` : '';

    const res = await fetch(`${this.apiBase}episodes${query}`)

    return await res.json()
  }

  private bindMethods() {
    this.getCharacters = this.getCharacters.bind(this);
    this.getEpisodes = this.getEpisodes.bind(this);
  }
}

const singleton = new BreakingBadApiService();
export default singleton;
