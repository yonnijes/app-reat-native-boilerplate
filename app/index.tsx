import { YStack, XStack, Button, Text, Card } from 'tamagui';
import { Stack, Link } from 'expo-router';
import { Users, MapPin, Tv } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Rick and Morty Explorer',
        }}
      />
      <YStack flex={1} padding="$6" space="$5" backgroundColor="$spaceDark">
        <YStack space="$3" alignItems="center" marginBottom="$4">
          <Text fontSize="$9" fontWeight="900" color="$portalGreen">
            Rick and Morty
          </Text>
          <Text fontSize="$5" color="$portalBlue" textAlign="center">
            Explore the multiverse
          </Text>
        </YStack>

        <Link href="/characters" asChild>
          <Card
            elevate
            size="$5"
            bordered
            borderColor="$portalGreen"
            borderWidth={2}
            backgroundColor="$spaceDeep"
            pressStyle={{ scale: 0.95 }}
            animation="bouncy"
          >
            <Card.Header padded>
              <XStack space="$4" alignItems="center">
                <Users size={40} color="#97CE4C" />
                <YStack flex={1}>
                  <Text fontSize="$6" fontWeight="bold" color="$portalGreen">
                    Characters
                  </Text>
                  <Text fontSize="$3" color="$portalBlue">
                    Browse all characters from the show
                  </Text>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
        </Link>

        <Link href="/locations" asChild>
          <Card
            elevate
            size="$5"
            bordered
            borderColor="$portalBlue"
            borderWidth={2}
            backgroundColor="$spaceDeep"
            pressStyle={{ scale: 0.95 }}
            animation="bouncy"
          >
            <Card.Header padded>
              <XStack space="$4" alignItems="center">
                <MapPin size={40} color="#00D9FF" />
                <YStack flex={1}>
                  <Text fontSize="$6" fontWeight="bold" color="$portalBlue">
                    Locations
                  </Text>
                  <Text fontSize="$3" color="$alienGreen">
                    Discover dimensions and locations
                  </Text>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
        </Link>

        <Link href="/episodes" asChild>
          <Card
            elevate
            size="$5"
            bordered
            borderColor="$mortyYellow"
            borderWidth={2}
            backgroundColor="$spaceDeep"
            pressStyle={{ scale: 0.95 }}
            animation="bouncy"
          >
            <Card.Header padded>
              <XStack space="$4" alignItems="center">
                <Tv size={40} color="#F5E800" />
                <YStack flex={1}>
                  <Text fontSize="$6" fontWeight="bold" color="$mortyYellow">
                    Episodes
                  </Text>
                  <Text fontSize="$3" color="$rickBlue">
                    Watch all episodes information
                  </Text>
                </YStack>
              </XStack>
            </Card.Header>
          </Card>
        </Link>
      </YStack>
    </>
  );
}