import { test, expect } from '../../src/fixtures/test.fixture';
import {
  Post,
  CreatePostRequest
} from '../../src/models/post.model';

test.describe('Posts API', () => {

  test('should retrieve a post successfully', async ({ apiService }) => {
    const post = await apiService.getJson<Post>('/posts/1');

    expect(post).toMatchObject({
      userId: 1,
      id: 1,
    });

    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test('should create a new post successfully', async ({ apiService }) => {
    const requestBody: CreatePostRequest = {
      userId: 1,
      title: 'Playwright API Automation',
      body: 'This post was created as part of an API automation test.',
    };

    const createdPost = await apiService.postJson<Post>(
      '/posts',
      requestBody
    );

    expect(createdPost).toMatchObject({
      userId: requestBody.userId,
      title: requestBody.title,
      body: requestBody.body,
    });

    expect(createdPost.id).toBeDefined();
  });

  test('should return 404 for a non-existent post', async ({ apiService }) => {
    const response = await apiService.get('/posts/999999');

    expect(response.status()).toBe(404);
  });

});