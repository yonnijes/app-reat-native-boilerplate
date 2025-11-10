import { queryKeys } from '@/config/queryClient';
import { Post } from '@/schemas/post.schema';
import { createPost, deletePost, getPost, getPosts, updatePost } from '@/services/api/posts.service';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchPaginatedPosts = async ({ pageParam = 1 }) => {
  const allPosts = await getPosts();
  const pageSize = 10;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const paginatedPosts = allPosts.slice(start, end);
  return {
    posts: paginatedPosts,
    nextPage: end < allPosts.length ? pageParam + 1 : undefined,
  };
};

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.posts.lists(),
    queryFn: fetchPaginatedPosts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });
};

export const useGetPost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.posts.detail(id),
    queryFn: () => getPost(id),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.lists() });
      const previousPosts = queryClient.getQueryData<Post[]>(queryKeys.posts.lists());
      queryClient.setQueryData<Post[]>(queryKeys.posts.lists(), (old) => [
        { ...newPost, id: Date.now(), userId: 1 },
        ...(old || []),
      ]);
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(queryKeys.posts.lists(), context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Post> }) => updatePost(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.detail(id) });
      const previousPost = queryClient.getQueryData<Post>(queryKeys.posts.detail(id));
      queryClient.setQueryData<Post>(queryKeys.posts.detail(id), (old) =>
        old ? { ...old, ...data } : undefined
      );
      return { previousPost, id };
    },
    onError: (err, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(queryKeys.posts.detail(context.id), context.previousPost);
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.lists() });
      const previousPosts = queryClient.getQueryData<Post[]>(queryKeys.posts.lists());
      queryClient.setQueryData<Post[]>(queryKeys.posts.lists(), (old) =>
        old?.filter((post) => post.id !== id) || []
      );
      return { previousPosts };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(queryKeys.posts.lists(), context?.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.lists() });
    },
  });
};

