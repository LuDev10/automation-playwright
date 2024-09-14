import { test, expect } from '../fixtures/encriptedPassword';
import { readExcelFile } from '../utils/fileReading';
import { PokeApi } from '../api/pokeApi';

test.describe('@ApiTest - PokeAPI', async () => {
  const data = readExcelFile('../data/Datos-pruebas.xlsx');

  if (Array.isArray(data)) {
    data.forEach((row) => {
      const [id, name] = row;

      test(`Get pokemon data by ID: ${id}`, async ({ playwright }) => {
        
        const requestContext = await playwright.request.newContext();
        const pokeApi = new PokeApi(requestContext);

        const startTime = Date.now();
        const response = await pokeApi.getPokemonData(id);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        await test.step('Results of the request', async () => {
          const { id: responseId, name: responseName, abilities } = await response.json();
          const abilityNames = abilities.map((ability: any) => ability.ability.name);
          console.log('Response data:', { id: responseId, name: responseName, abilities: abilityNames });
        });

        await test.step('Data and status validation', async () => {
          expect(response.status()).toBe(200);
          const responseData = await response.json();
          expect(responseData.id).toBe(id);
          expect(responseData.name).toBe(name);
          expect(Array.isArray(responseData.abilities)).toBe(true);
          responseData.abilities.forEach((ability: any) => {
            expect(typeof ability.ability.name).toBe('string');
          });
          console.log('Response time:', responseTime, 'ms');
        });
      });

      test(`Get pokemon data by Name: ${name}`, async ({ playwright }) => {        
        const requestContext = await playwright.request.newContext();
        const pokeApi = new PokeApi(requestContext);

        const startTime = Date.now();
        const response = await pokeApi.getPokemonData(name);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        await test.step('Results of the request', async () => {
          const { id: responseId, name: responseName, abilities } = await response.json();
          const abilityNames = abilities.map((ability: any) => ability.ability.name);
          console.log('Datos de la respuesta:', { id: responseId, name: responseName, abilities: abilityNames });
        });

        await test.step('Data and status validation', async () => {
          expect(response.status()).toBe(200);
          const responseData = await response.json();
          expect(responseData.id).toBe(id);
          expect(responseData.name).toBe(name);
          expect(Array.isArray(responseData.abilities)).toBe(true);
          responseData.abilities.forEach((ability: any) => {
            expect(typeof ability.ability.name).toBe('string');
          });
          console.log('Response time:', responseTime, 'ms');
        });
      });
    });
  } else {
    throw new Error('The data format is not valid.');
  }
});
