import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { PostList } from './PostList';
import { useGetPosts } from '@/hooks/queries/usePosts';

jest.mock('@/hooks/queries/usePosts');

const mockUseGetPosts = useGetPosts as jest.Mock;

describe('PostList', () => {
  it('renders a list of posts', () => {
    mockUseGetPosts.mockReturnValue({
      data: {
        pages: [
          {
            posts: [
              { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
              { id: 2, title: 'Post 2', body: 'Body 2', userId: 1 },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
    });

    render(<PostList />);

    expect(screen.getByText('Post 1')).toBeTruthy();
    expect(screen.getByText('Post 2')).toBeTruthy();
  });

  it('renders a loading spinner', () => {
    mockUseGetPosts.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<PostList />);

    expect(screen.getByTestId('spinner')).toBeTruthy();
  });

  it('renders an error message', () => {
    mockUseGetPosts.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: 'Test Error' },
    });

    render(<PostList />);

    expect(screen.getByText('Error: Test Error')).toBeTruthy();
  });
});
