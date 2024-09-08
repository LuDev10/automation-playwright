import { test, expect } from '../fixtures/encriptedPassword';
import { JsonPlaceholder } from '../api/jsonPlaceholder';
import { testData } from '../config/testData';

test.describe('Pruebas API - JsonPlaceholder', () => {
  testData.forEach((data, index) => {
    test(`JsonPlaceholder post ${index + 1}`, async ({ EncryptedPassword, playwright }) => {
      expect( EncryptedPassword);

      const requestContext = await playwright.request.newContext();
      const jsonPlaceholderPage = new JsonPlaceholder(requestContext);
      const response = await jsonPlaceholderPage.createPost(data);

      await test.step('resultados de la peticon', async () => {
        console.log('Datos de la respuesta:', await response.json());
      })
      
      await test.step('Validacion de data y estatus', async () => {
        expect(response.status()).toBe(201);
        const responseData = await response.json();
        expect(responseData).toHaveProperty('id');
        expect(responseData).toMatchObject(data);

        console.log('Fecha y hora de finalización del test:', new Date().toLocaleString());
      })
    });
  });
});