import React from 'react';
import { Character } from '@/schemas/character.schema';
import { YStack, XStack, Text, Image, Card, Button, Circle } from 'tamagui';
import { Edit, Trash } from 'lucide-react-native';

interface CharacterItemProps {
    item: Character;
    onEdit: (character: Character) => void;
    onDelete: (id: number) => void;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'alive':
            return '$alienGreen';
        case 'dead':
            return '$portalPink';
        default:
            return '$gray10';
    }
};

export const CharacterItem: React.FC<CharacterItemProps> = ({
    item,
    onEdit,
    onDelete,
}) => {
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
                <XStack space="$4" alignItems="center">
                    <Image
                        source={{ uri: item.image }}
                        width={80}
                        height={80}
                        borderRadius={10}
                        borderWidth={2}
                        borderColor="$portalBlue"
                    />
                    <YStack flex={1} space="$1">
                        <Text
                            fontSize="$6"
                            fontWeight="800"
                            color="$portalGreen"
                            numberOfLines={1}
                        >
                            {item.name}
                        </Text>
                        <XStack alignItems="center" space="$2">
                            <Circle size={10} backgroundColor={getStatusColor(item.status)} />
                            <Text fontSize="$3" color="$portalBlue" fontWeight="600">
                                {item.status} - {item.species}
                            </Text>
                        </XStack>
                        <Text fontSize="$3" color="$rickBlue" numberOfLines={1}>
                            Last known location:
                        </Text>
                        <Text fontSize="$3" color="$mortyYellow" fontWeight="500" numberOfLines={1}>
                            Unknown Location
                        </Text>
                    </YStack>
                </XStack>
            </Card.Header>
            <Card.Footer padded paddingTop={0}>
                <XStack space="$3" justifyContent="flex-end" width="100%">
                    <Button
                        size="$3"
                        icon={Edit}
                        onPress={() => onEdit(item)}
                        backgroundColor="$portalBlue"
                        color="$spaceDark"
                        borderRadius="$10"
                    >
                        Edit
                    </Button>
                    <Button
                        size="$3"
                        icon={Trash}
                        onPress={() => onDelete(item.id)}
                        backgroundColor="$portalPink"
                        color="$spaceDark"
                        borderRadius="$10"
                    >
                        Delete
                    </Button>
                </XStack>
            </Card.Footer>
        </Card>
    );
};
