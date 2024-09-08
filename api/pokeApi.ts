import { APIRequestContext } from '@playwright/test';

export class PokeApi {
  constructor(private request: APIRequestContext) {}

  public async getPokemonData(idOrName: string) {
    const response = await this.request.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    return response;
  }
}
