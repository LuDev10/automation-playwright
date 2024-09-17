import { expect, Page } from '@playwright/test';
import WikipediaLocators from './locators';
import * as fs from 'fs';
import * as path from 'path';

export default class WikipediaPage {
  private page: Page;
  private locators: WikipediaLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new WikipediaLocators(page);
  }

  public async navigateToPokemonPage(pokemonName: string) {
    const url = `https://en.wikipedia.org/wiki/${pokemonName}`;
    await this.page.goto(url);
  }

  public async getTitle(pokemonName: string) {
    const titleElement = this.locators.title(pokemonName);
    await expect(titleElement).toBeVisible();
  }

  public async getArtist() {
    const artistElement = this.locators.artistRow();
    return await artistElement.innerText();
  }

  public async downloadImage(pokemonName: string) {
    const imageUrl = await this.locators.getImageUrl();
    const imagesFolder = path.join(__dirname, '../../images');
    
    if (!fs.existsSync(imagesFolder)) {
      fs.mkdirSync(imagesFolder);
    }
  
    const imageFileName = `${pokemonName}${path.extname(imageUrl)}`;
    const imagePath = path.join(imagesFolder, imageFileName);
    const response = await this.page.request.fetch(imageUrl);
    const imageBuffer = await response.body();
  
    fs.writeFileSync(imagePath, imageBuffer, 'binary');
  
    console.log(`Image saved in: ${imagePath}`);
    return imagePath;
  }

  public validateImageSize(filePath: string) {
    const stats = fs.statSync(filePath);
    return stats.size < 500000; 
  }
}
