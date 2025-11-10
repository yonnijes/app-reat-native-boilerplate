import { create } from 'zustand';
import { Post } from '@/schemas/post.schema';

interface PostState {
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
  searchFilter: string;
  setSearchFilter: (filter: string) => void;
}

export const usePostStore = create<PostState>((set) => ({
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
  searchFilter: '',
  setSearchFilter: (filter) => set({ searchFilter: filter }),
}));
