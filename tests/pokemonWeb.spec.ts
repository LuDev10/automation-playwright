import { test, expect } from '../fixtures/encriptedPassword';
import * as xlsx from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import WikipediaPage from '../pages/wikipedia/index';

const filePath = path.join(__dirname, '../data/Datos-pruebas.xlsx');
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const testData: [any, string][] = data.slice(1) as [any, string][];

test.describe('@WebTest - Search in wikipedia', () => {
  testData.forEach(([_, pokemonName]) => {
    test(`Search for pokemon ${pokemonName} on Wikipedia`, async ({ EncryptedPassword, page }) => {
      await(EncryptedPassword);
      const wikipediaPage = new WikipediaPage(page);
      const capitalizedPokemonName = capitalizeFirstLetter(pokemonName as string);

      await test.step('Goto wikipedia page', async () => {
        await wikipediaPage.navigateToPokemonPage(capitalizedPokemonName);
      });
      
      await test.step('Validate title', async () => {
        await wikipediaPage.getTitle(capitalizedPokemonName);
      });

      await test.step('Validate artist', async () => {
        const artist = await wikipediaPage.getArtist();
        
        console.log(`The author who created the drawing: : ${artist}`);
        expect(artist).toBeTruthy();
      });

      await test.step('Donwload image, save it in the repo and validate', async () => {
        const imagePath = await wikipediaPage.downloadImage(capitalizedPokemonName);
        const isValidExtension = wikipediaPage.validateImageExtension(imagePath);
      
        expect(isValidExtension).toBe(true);

        const isValidSize = wikipediaPage.validateImageSize(imagePath);
        expect(isValidSize).toBe(true);

        const fileExtension = path.extname(imagePath).toLowerCase();
        const stats = fs.statSync(imagePath);
        const fileSize = stats.size;

        console.log(`Validate downloaded image: Format type: ${fileExtension} - File size: ${fileSize} bytes.`);
      })
      await page.close();
    });
  });
});

function capitalizeFirstLetter(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
