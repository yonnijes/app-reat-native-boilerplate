import { Stack, useLocalSearchParams, Link, useRouter } from 'expo-router';
import { YStack, Text, Spinner, ScrollView, Button, XStack, AlertDialog } from 'tamagui';
import { useGetPost, useDeletePost } from '@/hooks/queries/usePosts';
import Toast from 'react-native-toast-message';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: post, isLoading, isError, error } = useGetPost(Number(id));
  const { mutate: deletePost } = useDeletePost();

  const handleDelete = () => {
    deletePost(Number(id), {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Post deleted successfully!',
        });
        router.back();
      },
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Error deleting post',
          text2: error.message,
        });
      },
    });
  };

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" />
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
    <>
      <Stack.Screen
        options={{
          title: post?.title,
          headerRight: () => (
            <XStack space="$2">
              <Link href={`/posts/edit/${id}`} asChild>
                <Button>Edit</Button>
              </Link>
              <AlertDialog>
                <AlertDialog.Trigger asChild>
                  <Button theme="red">Delete</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                  <AlertDialog.Overlay
                    key="overlay"
                    animation="quick"
                    opacity={0.5}
                    enterStyle={{ opacity: 0 }}
                    exitStyle={{ opacity: 0 }}
                  />
                  <AlertDialog.Content
                    bordered
                    elevate
                    key="content"
                    animation={[
                      'quick',
                      {
                        opacity: {
                          overshootClamping: true,
                        },
                      },
                    ]}
                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                    x={0}
                    scale={1}
                    opacity={1}
                    y={0}
                  >
                    <YStack space>
                      <AlertDialog.Title>Delete Post</AlertDialog.Title>
                      <AlertDialog.Description>
                        Are you sure you want to delete this post? This action cannot be undone.
                      </AlertDialog.Description>

                      <XStack space="$3" justifyContent="flex-end">
                        <AlertDialog.Cancel asChild>
                          <Button>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild onPress={handleDelete}>
                          <Button theme="red">Delete</Button>
                        </AlertDialog.Action>
                      </XStack>
                    </YStack>
                  </AlertDialog.Content>
                </AlertDialog.Portal>
              </AlertDialog>
            </XStack>
          ),
        }}
      />
      <ScrollView>
        <YStack p="$4" space="$4">
          <Text fontSize="$8" fontWeight="bold">
            {post?.title}
          </Text>
          <Text fontSize="$6">{post?.body}</Text>
        </YStack>
      </ScrollView>
    </>
  );
}
