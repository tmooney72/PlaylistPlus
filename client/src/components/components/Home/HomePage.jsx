import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Heading, 
  Text, 
  VStack, 
  SimpleGrid 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this mock data with your actual API calls
  useEffect(() => {
    setTimeout(() => {
      setPlaylists([
        { id: 1, name: "Chill Vibes", description: "Relax with these smooth tracks" },
        { id: 2, name: "Workout Boost", description: "High energy beats to keep you moving" }
      ]);

      setNotifications([
        { id: 1, artist: "Artist A", song: "Fresh Drop", time: "2 hours ago" },
        { id: 2, artist: "Artist B", song: "New Single", time: "1 day ago" }
      ]);

      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    console.log("BOB");
  }, [])

  return (
    <Box p={4} minH="100vh" bg="gray.50">
      {/* Hero Section */}
      <VStack spacing={8} textAlign="center" mb={12}>
        <Heading as="h1" size="2xl">
          Your Music Hub
        </Heading>
        <Text fontSize="lg">
          Create clean, personalized playlists and get notified when your favorite artists drop new tracks.
        </Text>
        <Button colorScheme="teal" size="lg" as={Link} to="/create-playlist">
          Create Playlist
        </Button>
      </VStack>

      {/* Main Content */}
      {loading ? (
        <Text textAlign="center">Loading...</Text>
      ) : (
        <SimpleGrid columns={[1, null, 2]} spacing={10}>
          {/* Playlists Section */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Your Playlists
            </Heading>
            {playlists.length === 0 ? (
              <Text>No playlists found. Create one now!</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {playlists.map((playlist) => (
                  <Box
                    key={playlist.id}
                    p={4}
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                  >
                    <Heading as="h3" size="md">
                      {playlist.name}
                    </Heading>
                    <Text mt={2}>{playlist.description}</Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>

          {/* Notifications Section */}
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Notifications
            </Heading>
            {notifications.length === 0 ? (
              <Text>No notifications yet.</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    p={4}
                    bg="white"
                    shadow="sm"
                    borderRadius="md"
                  >
                    <Text fontWeight="bold">{notification.artist}</Text>
                    <Text>
                      {notification.song} — <Text as="span" color="gray.500">{notification.time}</Text>
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default HomePage;