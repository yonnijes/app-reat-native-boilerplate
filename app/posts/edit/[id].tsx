import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { PostForm } from '@/components/ui/PostForm';
import { useUpdatePost, useGetPost } from '@/hooks/queries/usePosts';
import { Post } from '@/schemas/post.schema';
import { YStack, Spinner, Text } from 'tamagui';
import Toast from 'react-native-toast-message';

export default function EditPostScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: post, isLoading: isLoadingPost } = useGetPost(Number(id));
  const { mutate: updatePost, isPending: isSubmitting } = useUpdatePost();

  const handleSubmit = (data: Omit<Post, 'id'>) => {
    updatePost(
      { id: Number(id), data },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: 'Post updated successfully!',
          });
          router.back();
        },
        onError: (error) => {
          Toast.show({
            type: 'error',
            text1: 'Error updating post',
            text2: error.message,
          });
        },
      }
    );
  };

  if (isLoadingPost) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner />
      </YStack>
    );
  }

  if (!post) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Text>Post not found.</Text>
      </YStack>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Edit Post' }} />
      <PostForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        defaultValues={post}
      />
    </>
  );
}
