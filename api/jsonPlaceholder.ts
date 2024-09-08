import { APIRequestContext } from '@playwright/test';

export class JsonPlaceholder {
  constructor(private request: APIRequestContext) {}

  public async createPost(data: { title: string; body: string; userId: number }) {
    const response = await this.request.post('https://jsonplaceholder.typicode.com/posts', {
      data,
    });
    return response;
  }
}
