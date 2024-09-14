import { Page } from '@playwright/test';

export default class WikipediaLocators {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title = (pokemonName: string) => this.page.getByRole('heading', { name: pokemonName }).locator('span');
  artistRow = () => this.page.locator('.infobox-caption');
  imageElement = () => this.page.locator('.infobox-image img');

  async getImageUrl(): Promise<string> {
    const imageElement = this.imageElement();
    const src = await imageElement.getAttribute('src');
    if (!src) {
      throw new Error('Image URL not found');
    }
    const absoluteUrl = new URL(src, await this.page.url()).toString();
    return absoluteUrl;
  }
}
