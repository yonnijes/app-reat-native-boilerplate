import React from 'react';
import { Episode } from '@/schemas/episode.schema';
import { YStack, XStack, Text, Card, Circle } from 'tamagui';
import { Tv } from 'lucide-react-native';

interface EpisodeItemProps {
    item: Episode;
}

export const EpisodeItem: React.FC<EpisodeItemProps> = ({ item }) => {
    return (
        <Card
            elevate
            size="$4"
            bordered
            marginBottom="$4"
            animation="bouncy"
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }}
            backgroundColor="$spaceDark"
            borderColor="$portalPink"
            borderWidth={2}
        >
            <Card.Header padded>
                <YStack space="$3">
                    <XStack alignItems="center" space="$3">
                        <Circle size={50} backgroundColor="$mortyYellow" justifyContent="center" alignItems="center">
                            <Tv size={24} color="#1A1A2E" />
                        </Circle>
                        <YStack flex={1} space="$1">
                            <Text
                                fontSize="$6"
                                fontWeight="800"
                                color="$mortyYellow"
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <Text fontSize="$3" color="$portalPink" fontWeight="600">
                                {item.episode}
                            </Text>
                        </YStack>
                    </XStack>
                    <YStack space="$1">
                        <Text fontSize="$3" color="$rickBlue" fontWeight="500">
                            Air Date: {item.air_date}
                        </Text>
                        <Text fontSize="$2" color="$gray10">
                            Characters: {item.characters.length}
                        </Text>
                    </YStack>
                </YStack>
            </Card.Header>
        </Card>
    );
};
