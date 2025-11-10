import { YStack, Text, Card } from 'tamagui';
import { Post } from '@/schemas/post.schema';
import { Link } from 'expo-router';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`} asChild>
      <Card padded my="$2" pressTheme>
        <YStack>
          <Text fontSize="$6" fontWeight="bold">
            {post.title}
          </Text>
          <Text numberOfLines={2}>{post.body}</Text>
        </YStack>
      </Card>
    </Link>
  );
};
