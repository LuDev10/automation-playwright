import { test, expect, request } from '../fixtures/encriptedPassword';
import { JsonPlaceholder } from '../api/jsonPlaceholder';
import { testData } from '../config/testData';

test.describe('Pruebas de JsonPlaceholder API', () => {
  testData.forEach((data, index) => {
    test(`Prueba de creación de post ${index + 1}`, async ({ EncryptedPassword, playwright }) => {
      expect( EncryptedPassword);

      const requestContext = await playwright.request.newContext();
      const jsonPlaceholderPage = new JsonPlaceholder(requestContext);

      const response = await jsonPlaceholderPage.createPost(data);

      expect(response.status()).toBe(201);
      const responseData = await response.json();
      expect(responseData).toHaveProperty('id');
      expect(responseData).toMatchObject(data);

      console.log('Fecha y hora de finalización del test:', new Date().toLocaleString());
    });
  });
});