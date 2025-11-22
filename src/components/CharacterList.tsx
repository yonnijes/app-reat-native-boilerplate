import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Character } from '@/schemas/character.schema';
import { YStack } from 'tamagui';
import { CharacterItem } from './CharacterItem';

interface CharacterListProps {
    characters: Character[];
    onEdit: (character: Character) => void;
    onDelete: (id: number) => void;
    onEndReached?: () => void;
    isLoadingMore?: boolean;
}

export const CharacterList: React.FC<CharacterListProps> = ({
    characters,
    onEdit,
    onDelete,
    onEndReached,
    isLoadingMore,
}) => {
    const renderItem = ({ item }: { item: Character }) => (
        <CharacterItem item={item} onEdit={onEdit} onDelete={onDelete} />
    );

    return (
        <FlatList
            data={characters}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isLoadingMore ? (
                    <YStack padding="$4" alignItems="center">
                        <ActivityIndicator size="small" color="#97CE4C" />
                    </YStack>
                ) : null
            }
        />
    );
};
