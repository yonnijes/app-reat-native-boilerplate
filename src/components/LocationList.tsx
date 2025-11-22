import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Location } from '@/schemas/location.schema';
import { YStack } from 'tamagui';
import { LocationItem } from './LocationItem';

interface LocationListProps {
    locations: Location[];
    onEndReached?: () => void;
    isLoadingMore?: boolean;
}

export const LocationList: React.FC<LocationListProps> = ({
    locations,
    onEndReached,
    isLoadingMore,
}) => {
    const renderItem = ({ item }: { item: Location }) => (
        <LocationItem item={item} />
    );

    return (
        <FlatList
            data={locations}
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
