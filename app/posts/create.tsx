import { Stack, useRouter } from 'expo-router';
import { PostForm } from '@/components/ui/PostForm';
import { useCreatePost } from '@/hooks/queries/usePosts';
import { Post } from '@/schemas/post.schema';
import Toast from 'react-native-toast-message';

export default function CreatePostScreen() {
  const router = useRouter();
  const { mutate: createPost, isPending: isSubmitting } = useCreatePost();

  const handleSubmit = (data: Omit<Post, 'id'>) => {
    createPost(data, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Post created successfully!',
        });
        router.back();
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error creating post',
          text2: error.message,
        });
      },
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Create Post' }} />
      <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </>
  );
}
