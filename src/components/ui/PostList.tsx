import { FlatList } from 'react-native';
import { YStack, Text, Spinner } from 'tamagui';
import { useGetPosts } from '@/hooks/queries/usePosts';
import { PostCard } from './PostCard';
import { Post } from '@/schemas/post.schema';
import { useCallback, useMemo } from 'react';
import { usePostStore } from '@/store/postStore';

export const PostList = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetPosts();
  const { searchFilter } = usePostStore();

  const posts = useMemo(() => data?.pages.flatMap((page) => page.posts) || [], [data]);

  const filteredPosts = useMemo(() => {
    if (!searchFilter) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        post.body.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [posts, searchFilter]);

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading && !data) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" testID="spinner" />
      </YStack>
    );
  }

  if (isError) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text color="red">Error: {error.message}</Text>
      </YStack>
    );
  }

  return (
    <FlatList
      data={filteredPosts}
      keyExtractor={(item: Post) => item.id.toString()}
      renderItem={({ item }) => <PostCard post={item} />}
      onRefresh={onRefresh}
      refreshing={isRefetching}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={isFetchingNextPage ? <Spinner my="$4" /> : null}
    />
  );
};
