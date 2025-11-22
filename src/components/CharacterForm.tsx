import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CharacterSchema, Character } from '@/schemas/character.schema';
import { YStack, Input, Button, Text, XStack, Label } from 'tamagui';

interface CharacterFormProps {
    initialValues?: Partial<Character>;
    onSubmit: (data: Character) => void;
    onCancel: () => void;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Character>({
        resolver: zodResolver(CharacterSchema as any),
        defaultValues: {
            name: '',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Unknown',
            image: 'https://rickandmortyapi.com/api/character/avatar/19.jpeg',
            ...initialValues,
        },
    });

    return (
        <YStack space="$5" padding="$5" backgroundColor="$spaceDeep" borderRadius="$4" borderWidth={2} borderColor="$portalGreen">
            <Text fontSize="$6" fontWeight="bold" marginBottom="$2" color="$portalGreen">
                {initialValues ? 'Edit Character' : 'New Character'}
            </Text>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                    <YStack space="$2">
                        <Label fontSize="$3" fontWeight="600" color="$portalBlue">Name</Label>
                        <Input
                            placeholder="Enter character name"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            size="$4"
                            borderWidth={1}
                            focusStyle={{ borderColor: '$portalGreen', borderWidth: 2 }}
                            borderColor="$portalBlue"
                        />
                        {errors.name && <Text color="$portalPink" fontSize="$2">{errors.name.message}</Text>}
                    </YStack>
                )}
            />

            <Controller
                control={control}
                name="status"
                render={({ field: { onChange, onBlur, value } }) => (
                    <YStack space="$2">
                        <Label fontSize="$3" fontWeight="600" color="$portalBlue">Status</Label>
                        <Input
                            placeholder="Alive, Dead, or Unknown"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            size="$4"
                            borderWidth={1}
                            focusStyle={{ borderColor: '$blue10', borderWidth: 2 }}
                        />
                    </YStack>
                )}
            />

            <Controller
                control={control}
                name="species"
                render={({ field: { onChange, onBlur, value } }) => (
                    <YStack space="$2">
                        <Label fontSize="$3" fontWeight="600" color="$portalBlue">Species</Label>
                        <Input
                            placeholder="Human, Alien, etc."
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            size="$4"
                            borderWidth={1}
                            focusStyle={{ borderColor: '$blue10', borderWidth: 2 }}
                        />
                    </YStack>
                )}
            />

            <XStack space="$3" justifyContent="flex-end" marginTop="$4">
                <Button onPress={onCancel} variant="outlined" size="$4" borderRadius="$10" borderColor="$portalPink" color="$portalPink">
                    Cancel
                </Button>
                <Button onPress={handleSubmit(onSubmit)} backgroundColor="$portalGreen" color="$spaceDark" size="$4" borderRadius="$10">
                    Save Character
                </Button>
            </XStack>
        </YStack>
    );
};
