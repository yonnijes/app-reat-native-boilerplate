import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YStack, Input, Button, Text, Label } from 'tamagui';
import { Post, PostSchema } from '@/schemas/post.schema';

interface PostFormProps {
  onSubmit: (data: Omit<Post, 'id'>) => void;
  defaultValues?: Partial<Post>;
  isSubmitting: boolean;
}

const FormSchema = PostSchema.omit({ id: true, userId: true });
type FormValues = Omit<Post, 'id' | 'userId'>;

export const PostForm = ({ onSubmit, defaultValues, isSubmitting }: PostFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({ ...data, userId: 1 }); // Default userId to 1 as per JSONPlaceholder
  };

  return (
    <YStack space="$4" p="$4">
      <YStack>
        <Label htmlFor="title">Title</Label>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Post title"
            />
          )}
        />
        {errors.title && <Text color="red">{errors.title.message}</Text>}
      </YStack>

      <YStack>
        <Label htmlFor="body">Body</Label>
        <Controller
          control={control}
          name="body"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              id="body"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Post content"
              multiline
              numberOfLines={4}
            />
          )}
        />
        {errors.body && <Text color="red">{errors.body.message}</Text>}
      </YStack>

      <Button onPress={handleSubmit(handleFormSubmit)} disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </YStack>
  );
};
