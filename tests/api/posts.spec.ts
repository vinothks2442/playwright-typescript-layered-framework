import { test, expect } from '../../src/fixtures/test.fixture';
import {
  Post,
  CreatePostRequest
} from '../../src/models/post.model';

test.describe('Posts API', () => {

  test('should retrieve the posts collection successfully', async ({ apiService }) => {
    const posts = await apiService.getJson<Post[]>('/posts');

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toMatchObject({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String),
    });
  });

  test('should return a successful status when creating a post', async ({ apiService }) => {
    const response = await apiService.post('/posts', {
      userId: 2,
      title: 'Status validation',
      body: 'Validate the create response status.',
    });

    expect(response.status()).toBe(201);
  });

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