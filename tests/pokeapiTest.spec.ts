import { test, expect } from '../fixtures/encriptedPassword';
import * as xlsx from 'xlsx';
import * as path from 'path';
import { PokeApi } from '../api/pokeApi';

test.describe('Pruebas API - PokeAPI', () => {
  const filePath = path.resolve(__dirname, '../data/Datos-pruebas.xlsx');
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data: unknown = xlsx.utils.sheet_to_json(sheet, { header: 1 }).slice(1);

  if (Array.isArray(data)) {
    data.forEach((row) => {
      const [idOrName] = row;

      test(`Prueba para ${idOrName}`, async ({ EncryptedPassword, playwright }) => {
        expect( EncryptedPassword);

        const requestContext = await playwright.request.newContext();
        const pokeApi = new PokeApi(requestContext);
        const response = await pokeApi.getPokemonData(idOrName);

        await test.step('resultados de la peticon', async () => {
          const { id, name, abilities } = await response.json();
          const abilityNames = abilities.map((ability: any) => ability.ability.name);
          console.log('Datos de la respuesta:', { id, name, abilities: abilityNames });
        })

        await test.step('Validacion de data y estatus', async () => {
          expect(response.status()).toBe(200);
          const responseData = await response.json();
          expect(responseData).toHaveProperty('id');
          expect(responseData).toHaveProperty('name');
          expect(responseData).toHaveProperty('abilities');

          console.log('Fecha y hora de finalización del test:', new Date().toLocaleString());
        });
      });
    });
  } else {
    throw new Error('El formato de los datos no es válido.');
  }
});