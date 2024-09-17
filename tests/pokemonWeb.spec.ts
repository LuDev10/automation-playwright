import { test, expect } from '../fixtures/encriptedPassword';
import { readExcelFile } from '../utils/fileReading';
import * as path from 'path';
import * as fs from 'fs';
import WikipediaPage from '../pages/wikipedia/index';

const testData: [any, string][] = readExcelFile('../data/Datos-pruebas.xlsx');

test.describe('@WebTest - Search in wikipedia', () => {
  testData.forEach(([_, pokemonName]) => {
    test(`Search for pokemon ${pokemonName} on Wikipedia`, async ({ page }) => {
      const wikipediaPage = new WikipediaPage(page);
      const capitalizedPokemonName = capitalizeFirstLetter(pokemonName as string);

      await test.step('Goto wikipedia page', async () => {
        await wikipediaPage.navigateToPokemonPage(pokemonName);
      });
      
      await test.step('Assert title', async () => {
        await wikipediaPage.getTitle(capitalizedPokemonName);
      });

      await test.step('Assert artist', async () => {
        const artist = await wikipediaPage.getArtist();
        
        console.log(`The author who created the drawing: : ${artist}`);
        expect(artist).toBeTruthy();
      });

      await test.step('Download image, save it in the repo and validate', async () => {
        const imagePath = await wikipediaPage.downloadImage(capitalizedPokemonName);
        const isValidSize = wikipediaPage.validateImageSize(imagePath);
        expect(isValidSize).toBe(true);

        const fileExtension = path.extname(imagePath).toLowerCase();
        const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
        expect(validExtensions).toContain(fileExtension);

        const stats = fs.statSync(imagePath);
        const fileSize = stats.size;

        console.log(`Assert downloaded image: Format type: ${fileExtension} - File size: ${fileSize} bytes.`);
      });
      await page.close();
    });
  });
});

function capitalizeFirstLetter(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
