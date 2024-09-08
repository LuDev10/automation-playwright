
import { Page } from '@playwright/test';

export default class WikipediaLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  title = (pokemonName: string) => this.page.getByRole('heading', { name: pokemonName }).locator('span');
  artistRow = () => this.page.locator('.infobox-caption');
  imageElement = (pokemonName: string) => this.page.locator(`src="//upload.wikimedia.org/wikipedia/en/thumb/2/28/Pok%C3%A9mon_${pokemonName}_art.png/150px-Pok%C3%A9mon_${pokemonName}_art.png"`);
}
