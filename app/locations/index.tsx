import React from 'react';
import { useLocations } from '@/hooks/useLocations';
import { LocationList } from '@/components/LocationList';
import { YStack, Spinner, Text } from 'tamagui';
import { Stack } from 'expo-router';

export default function LocationsScreen() {
    const { isLoading, isError, loadMore, isLoadingMore, data: locations } = useLocations();

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
                <Text color="$portalPink">Failed to load locations</Text>
            </YStack>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Locations' }} />
            <YStack flex={1} backgroundColor="$spaceDark">
                <LocationList
                    locations={locations || []}
                    onEndReached={loadMore}
                    isLoadingMore={isLoadingMore}
                />
            </YStack>
        </>
    );
}
