import ky from 'ky';
import { PostSchema, Post } from '@/schemas/post.schema';

const api = ky.create({
  prefixUrl: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get('posts').json<Post[]>();
  return response.map((post) => PostSchema.parse(post));
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await api.get(`posts/${id}`).json<Post>();
  return PostSchema.parse(response);
};

export const createPost = async (data: Omit<Post, 'id'>): Promise<Post> => {
  const response = await api
    .post('posts', {
      json: data,
    })
    .json<Post>();
  return PostSchema.parse(response);
};

export const updatePost = async (id: number, data: Partial<Post>): Promise<Post> => {
  const response = await api
    .put(`posts/${id}`, {
      json: data,
    })
    .json<Post>();
  return PostSchema.parse(response);
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`posts/${id}`);
};
