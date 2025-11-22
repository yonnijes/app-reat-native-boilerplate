import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Episode } from '@/schemas/episode.schema';
import { YStack } from 'tamagui';
import { EpisodeItem } from './EpisodeItem';

interface EpisodeListProps {
    episodes: Episode[];
    onEndReached?: () => void;
    isLoadingMore?: boolean;
}

export const EpisodeList: React.FC<EpisodeListProps> = ({
    episodes,
    onEndReached,
    isLoadingMore,
}) => {
    const renderItem = ({ item }: { item: Episode }) => (
        <EpisodeItem item={item} />
    );

    return (
        <FlatList
            data={episodes}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isLoadingMore ? (
                    <YStack padding="$4" alignItems="center">
                        <ActivityIndicator size="small" color="#F5E800" />
                    </YStack>
                ) : null
            }
        />
    );
};
