import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Text, 
  HStack, 
  Center, 
  Image, 
  VStack, 
  SimpleGrid, 
  Grid,
  Box,
  Spinner,
  Flex,
  Input,
  Icon
} from '@chakra-ui/react';
import { keyframes as emotionKeyframes } from '@emotion/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton
} from '@chakra-ui/modal';
import { FaPlay } from 'react-icons/fa';
import useGetPlaylists from '../hooks/useGetPlaylists';
import useModal from '../hooks/useModal'; // Use the custom hook


const Playlists = () => {
  const [data, setData] = useState([{}]);
  const [playlist, setPlaylist] = useState("");
  const [songs, setSongs] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { getPlaylists, error, loading } = useGetPlaylists();
  const { isOpen, onOpen, onClose } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaylists();
      if (data) {
        setData(data);
      }
      console.log(data)
    };
    fetchData();
  }, []);

  async function handleCleanPlaylist(playlistName) {
    try {
      const response = await fetch('/api/CleanPlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: playlistName })
      });
      
      const data = await response.json();
      setPlaylist(data.Playlist[0]);
      setSongs(data.Playlist[1]);
      setIsPlaylist(false);
      onClose(); // close modal after cleaning
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handlePlaylistClick = (playlistItem) => {
    console.log("Playlist clicked:", playlistItem);
    setSelectedPlaylist(playlistItem);
    onOpen();
  };

  const handleBackToPlaylists = () => {
    setIsPlaylist(true);
  };

  const fadeIn = emotionKeyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const playlistScreen = (
  <Box 
    minH="100vh" 
    bgGradient="linear(to-br, #1A1A1A, #0D0D0D)" 
    py={10} 
    px={6}
  >
    <Center mb={10}>
  <Text
    fontSize="6xl"
    fontWeight="extrabold"
    color="white"
    textShadow="0 0 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.7)"
  >
    Your Music Collections
  </Text>
</Center>

    <SimpleGrid columns={[1, 2, 3, 4]} spacing={8}>
      {(data?.Playlists || []).map((playlist, i) => (
        <Box
          key={i}
          p={4}
          bg="rgba(255,255,255,0.1)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="transparent"
          backdropFilter="blur(8px)"
          transition="transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
          _hover={{
            zIndex: 2, // Bring the hovered card to the front
            transform: "translateY(-5px) scale(1.03)",
            boxShadow: "2xl",
            borderColor: "black.400"
          }}
          cursor="pointer"
          position="relative"
          onClick={() => handlePlaylistClick(playlist)}
          animation={`${fadeIn} 0.5s ease-out`}
        >
          <Box 
            position="relative" 
            overflow="hidden" 
            borderRadius="2xl"
          >
            <Image
              src={playlist['image']}
              alt={`${playlist['name']} cover`}
              w="100%"
              h="220px"
              objectFit="cover"
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.1)" }}
            />
            <Icon
              as={FaPlay}
              position="absolute"
              bottom="4"
              right="4"
              boxSize="10"
              color="whiteAlpha.900"
              opacity={0}
              transition="opacity 0.3s ease"
              _hover={{ opacity: 1 }}
            />
          </Box>
          <Text
            mt={4}
            fontWeight="bold"
            fontSize="2xl"
            textAlign="center"
            color="white"
          >
            {playlist['name']}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);
  
  

  const songScreen = (
    <>
      <HStack spacing={4} mb={6} px={4}>
        <Button onClick={handleBackToPlaylists} colorScheme="purple" size="sm">
          Back to Playlists
        </Button>
        <Text fontSize="2xl" fontWeight="bold" color="purple.500">
          {playlist}
        </Text>
      </HStack>
      
      <VStack 
        spacing={2} 
        align="stretch" 
        bg="white" 
        borderRadius="md" 
        boxShadow="sm"
        p={4}
        mx={4}
      >
        <HStack bg="purple.500" p={2} borderRadius="md" color="white">
          <Text fontWeight="bold" w="10%">#</Text>
          <Text fontWeight="bold" w="80%">Song</Text>
          <Text fontWeight="bold" w="10%" textAlign="right">❤</Text>
        </HStack>
        
        {Array.isArray(songs) ? (
          songs.map((song, index) => (
            <HStack 
              key={index}
              p={2}
              _hover={{ bg: "gray.50" }}
              borderBottomWidth={1}
              borderBottomColor="gray.100"
            >
              <Text color="gray.500" w="10%">{index + 1}</Text>
              <Text w="80%">{song}</Text>
              <Text w="10%" textAlign="right" color="gray.400">♪</Text>
            </HStack>
          ))
        ) : (
          <Center p={4}>
            <Text color="gray.500">No songs available</Text>
          </Center>
        )}
      </VStack>
    </>
  );

  return (
    <>
      <Center mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Playlists
        </Text>
      </Center>
      {isPlaylist ? playlistScreen : songScreen}

      {/* Test button to directly open modal */}


      {/* Modal for Playlist Options */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
  <ModalOverlay bg="rgba(0, 0, 0, 0.8)" backdropFilter="blur(10px)" />
  <ModalContent 
    bg="white" 
    borderRadius="2xl" 
    maxW="800px" 
    p={8} 
    boxShadow="xl"
    mx="auto"
    my="auto"
  >
    <ModalCloseButton color="black" />
    <ModalHeader textAlign="center" fontSize="2xl" mb={4} color="black">
      {selectedPlaylist ? selectedPlaylist['name'] : 'Playlist Options'}
    </ModalHeader>
    <ModalBody>
      <Grid templateColumns={["1fr", "1fr 1fr"]} gap={6}>
        {/* Left Section: Song List */}
        <Box 
          bg="gray.50" 
          p={4} 
          borderRadius="lg" 
          boxShadow="inner" 
          maxH="400px" 
          overflowY="auto"
        >
          {selectedPlaylist && selectedPlaylist['songs'] && selectedPlaylist['songs'].map((song, i) => (
            <HStack 
              key={i} 
              spacing={3} 
              mb={3} 
              borderBottom="1px" 
              borderColor="gray.200" 
              pb={2}
            >
              {song['image'] && (
                <Image 
                  src={song['image']} 
                  alt={song['name']} 
                  boxSize="50px" 
                  borderRadius="md" 
                  objectFit="cover"
                />
              )}
              <Text fontWeight="medium" color="black">
                {song['name']}
              </Text>
            </HStack>
          ))}
        </Box>
        
        {/* Right Section: Playlist Options */}
        <VStack spacing={6} align="stretch">
          <Button 
            colorScheme="teal" 
            size="lg" 
            onClick={() => handleCleanPlaylist(selectedPlaylist ? selectedPlaylist['name'] : '')}
          >
            Clean Playlist
          </Button>
          <Button 
            colorScheme="blue" 
            size="lg" 
            onClick={() => {
              alert("Custom Cover Images feature coming soon!");
              onClose();
            }}
          >
            Custom Cover Image
          </Button>
          <Button 
            colorScheme="purple" 
            size="lg" 
            onClick={() => {
              alert("Reorder Songs feature coming soon!");
              onClose();
            }}
          >
            Reorder Songs
          </Button>
          <Button 
            colorScheme="orange" 
            size="lg" 
            onClick={() => {
              alert("Share Playlist feature coming soon!");
              onClose();
            }}
          >
            Share Playlist
          </Button>
        </VStack>
      </Grid>
    </ModalBody>
    <ModalFooter justifyContent="center">
      <Button onClick={onClose} variant="outline" colorScheme="gray">
        <Text color='black'>Cancel</Text>
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

    </>
  );
};

export default Playlists;
