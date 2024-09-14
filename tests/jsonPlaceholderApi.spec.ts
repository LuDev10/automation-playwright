import { test, expect } from '../fixtures/encriptedPassword';
import { JsonPlaceholder } from '../api/jsonPlaceholder';
import { testData } from '../config/testData';

test.describe('@ApiTest - JsonPlaceholder', () => {
  testData.forEach((data, index) => {
    test(`JsonPlaceholder post ${index + 1}`, async ({ playwright }) => {

      const requestContext = await playwright.request.newContext();
      const jsonPlaceholderPage = new JsonPlaceholder(requestContext);
      const response = await jsonPlaceholderPage.createPost(data);

      await test.step('Results of the request', async () => {
        console.log('Response data:', await response.json());
      });
      
      await test.step('Data and status validation', async () => {
        expect(response.status()).toBe(201);
        const responseData = await response.json();
        expect(responseData).toHaveProperty('id');
        expect(responseData).toMatchObject(data);
      });
    });
  });
});
