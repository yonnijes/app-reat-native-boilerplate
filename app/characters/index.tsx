import React, { useState } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
// import { useCharacterStore } from '@/store/characterStore';
import { CharacterList } from '@/components/CharacterList';
import { CharacterForm } from '@/components/CharacterForm';
import { Character } from '@/schemas/character.schema';
import { YStack, Button, Spinner, Text } from 'tamagui';
import { Plus } from 'lucide-react-native';
import { Stack } from 'expo-router';

export default function CharactersScreen() {
    const {
        data: characters,
        isLoading,
        isError,
        loadMore,
        isLoadingMore,
        addCharacter,
        updateCharacter,
        deleteCharacter,
    } = useCharacters();
    // const { characters, addCharacter, updateCharacter, deleteCharacter } =
    //     useCharacterStore();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<
        Character | undefined
    >(undefined);

    const handleAdd = () => {
        setSelectedCharacter(undefined);
        setIsEditing(true);
    };

    const handleEdit = (character: Character) => {
        setSelectedCharacter(character);
        setIsEditing(true);
    };

    const handleDelete = (id: number) => {
        deleteCharacter(id);
    };

    const handleSubmit = (data: Character) => {
        if (selectedCharacter) {
            updateCharacter(selectedCharacter.id, data);
        } else {
            const newCharacter = {
                ...data,
                id: Math.floor(Math.random() * 10000) + 1000,
            };
            addCharacter(newCharacter);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setSelectedCharacter(undefined);
    };

    if (isLoading) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$spaceDark">
                <Spinner size="large" color="$portalGreen" />
            </YStack>
        );
    }

    if (isError) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$spaceDark">
                <Text color="$portalPink">Failed to load characters</Text>
            </YStack>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Characters' }} />
            <YStack flex={1} backgroundColor="$spaceDark">
                {isEditing ? (
                    <YStack padding="$4" flex={1} justifyContent="center">
                        <CharacterForm
                            initialValues={selectedCharacter}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    </YStack>
                ) : (
                    <>
                        <CharacterList
                            characters={characters}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onEndReached={loadMore}
                            isLoadingMore={isLoadingMore}
                        />
                        <Button
                            icon={Plus}
                            onPress={handleAdd}
                            backgroundColor="$portalGreen"
                            color="$spaceDark"
                            size="$6"
                            circular
                            position="absolute"
                            bottom="$6"
                            right="$6"
                            elevate
                        />
                    </>
                )}
            </YStack >
        </>
    );
}
