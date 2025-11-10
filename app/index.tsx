import { YStack, Button, Input } from 'tamagui';
import { PostList } from '@/components/ui/PostList';
import { Stack, Link } from 'expo-router';
import { usePostStore } from '@/store/postStore';
import debounce from 'lodash.debounce';
import { useMemo } from 'react';

export default function HomeScreen() {
  const { searchFilter, setSearchFilter } = usePostStore();

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearchFilter(value), 300),
    [setSearchFilter]
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Posts',
          headerRight: () => (
            <Link href="/posts/create" asChild>
              <Button>Create Post</Button>
            </Link>
          ),
        }}
      />
      <YStack flex={1} p="$4" space="$4">
        <Input
          placeholder="Search posts..."
          defaultValue={searchFilter}
          onChangeText={debouncedSetSearch}
        />
        <PostList />
      </YStack>
    </>
  );
}