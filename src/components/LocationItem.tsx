import React from 'react';
import { Location } from '@/schemas/location.schema';
import { YStack, XStack, Text, Card, Circle } from 'tamagui';
import { MapPin } from 'lucide-react-native';

interface LocationItemProps {
    item: Location;
}

export const LocationItem: React.FC<LocationItemProps> = ({ item }) => {
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
            borderColor="$portalGreen"
            borderWidth={2}
        >
            <Card.Header padded>
                <YStack space="$3">
                    <XStack alignItems="center" space="$3">
                        <Circle size={50} backgroundColor="$portalBlue" justifyContent="center" alignItems="center">
                            <MapPin size={24} color="#1A1A2E" />
                        </Circle>
                        <YStack flex={1} space="$1">
                            <Text
                                fontSize="$6"
                                fontWeight="800"
                                color="$portalGreen"
                                numberOfLines={1}
                            >
                                {item.name}
                            </Text>
                            <Text fontSize="$3" color="$portalBlue" fontWeight="600">
                                {item.type}
                            </Text>
                        </YStack>
                    </XStack>
                    <YStack space="$1">
                        <Text fontSize="$3" color="$alienGreen" fontWeight="500">
                            Dimension: {item.dimension}
                        </Text>
                        <Text fontSize="$2" color="$gray10">
                            Residents: {item.residents.length}
                        </Text>
                    </YStack>
                </YStack>
            </Card.Header>
        </Card>
    );
};
