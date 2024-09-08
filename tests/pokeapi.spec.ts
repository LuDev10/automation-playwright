import { test, expect } from '../fixtures/encriptedPassword';
import * as xlsx from 'xlsx';
import * as path from 'path';
import { PokeApi } from '../api/pokeApi';

test.describe('@ApiTest - PokeAPI', async () => {
  const filePath = path.resolve(__dirname, '../data/Datos-pruebas.xlsx');
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: unknown = xlsx.utils.sheet_to_json(sheet, { header: 1 }).slice(1);

  if (Array.isArray(data)) {
    data.forEach((row) => {
      const [id, name] = row;

      test(`Get pokemon data by ID: ${id}`, async ({ EncryptedPassword, playwright }) => {
        expect(EncryptedPassword);
        
        const requestContext = await playwright.request.newContext();
        const pokeApi = new PokeApi(requestContext);

        const response = await pokeApi.getPokemonData(id);

        await test.step('Results of the request', async () => {
          const { id, name, abilities } = await response.json();
          const abilityNames = abilities.map((ability: any) => ability.ability.name);
          console.log('Response data:', { id, name, abilities: abilityNames });
        });

        await test.step('Data and status validation', async () => {
          expect(response.status()).toBe(200);
          const responseData = await response.json();
          expect(responseData).toHaveProperty('id');
          expect(responseData).toHaveProperty('name');
          expect(responseData).toHaveProperty('abilities');

          console.log('Date and time of test completion:', new Date().toLocaleString());
        });
      });

      test(`Get pokemon data by Name: ${name}`, async ({ EncryptedPassword, playwright }) => {
        expect(EncryptedPassword);
        
        const requestContext = await playwright.request.newContext();
        const pokeApi = new PokeApi(requestContext);
        const response = await pokeApi.getPokemonData(name);

        await test.step('Results of the request', async () => {
          const { id, name, abilities } = await response.json();
          const abilityNames = abilities.map((ability: any) => ability.ability.name);
          console.log('Datos de la respuesta:', { id, name, abilities: abilityNames });
        });

        await test.step('Data and status validation', async () => {
          expect(response.status()).toBe(200);
          const responseData = await response.json();
          expect(responseData).toHaveProperty('id');
          expect(responseData).toHaveProperty('name');
          expect(responseData).toHaveProperty('abilities');

          console.log('Date and time of test completion:', new Date().toLocaleString());
        });
      });
    });
  } else {
    throw new Error('The data format is not valid.');
  }
});