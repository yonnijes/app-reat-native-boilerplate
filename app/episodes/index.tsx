import React from 'react';
import { useEpisodes } from '@/hooks/useEpisodes';
import { EpisodeList } from '@/components/EpisodeList';
import { YStack, Spinner, Text } from 'tamagui';
import { Stack } from 'expo-router';

export default function EpisodesScreen() {
    const { isLoading, isError, loadMore, isLoadingMore, data: episodes } = useEpisodes();

    if (isLoading) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$spaceDark">
                <Spinner size="large" color="$mortyYellow" />
            </YStack>
        );
    }

    if (isError) {
        return (
            <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$spaceDark">
                <Text color="$portalPink">Failed to load episodes</Text>
            </YStack>
        );
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Episodes' }} />
            <YStack flex={1} backgroundColor="$spaceDark">
                <EpisodeList
                    episodes={episodes || []}
                    onEndReached={loadMore}
                    isLoadingMore={isLoadingMore}
                />
            </YStack>
        </>
    );
}
