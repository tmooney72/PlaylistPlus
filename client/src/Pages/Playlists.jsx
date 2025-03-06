// import React, { useEffect, useState } from 'react';
// import { 
//   Button, 
//   Text, 
//   HStack, 
//   Center, 
//   Image, 
//   VStack, 
//   SimpleGrid 
// } from '@chakra-ui/react';
// import useGetPlaylists from '../hooks/useGetPlaylists';

// const Playlists = () => {
//   const [data, setData] = useState([{}]);
//   const [playlist, setPlaylist] = useState("");
//   const [songs, setSongs] = useState([]);
//   const [isPlaylist, setIsPlaylist] = useState(true);
//   const { getPlaylists, playlists, error, loading } = useGetPlaylists();

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getPlaylists();
//       if (data) {
//         setData(data);
//       }
//     };
//     fetchData();
//   }, []);

//   async function postPlaylist(playlist) {
//     try {
//       const response = await fetch('/api/CleanPlaylist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           data: playlist
//         })
//       });
      
//       const data = await response.json();
//       setPlaylist(data.Playlist[0]);
//       setSongs(data.Playlist[1]);
//       setIsPlaylist(false);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }

//   const handleBackToPlaylists = () => {
//     setIsPlaylist(true);
//   };

//   const playlistScreen = (
//     <>
//       <Center mb={8}>
//         <Text fontSize="3xl" fontWeight="bold" color="purple.500">
//           Your Music Collections
//         </Text>
//       </Center>
      
//       {loading ? (
//         <Center h="200px">
//           <Text>Loading your playlists...</Text>
//         </Center>
//       ) : (
//         <SimpleGrid columns={[1, 2, 3]} spacing={6} px={4}>
//           {(data?.Playlists || []).map((playlist, i) => (
//             <VStack 
//               key={i}
//               p={4}
//               bg="white" 
//               borderRadius="md"
//               boxShadow="sm"
//               _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
//               transition="all 0.2s"
//               spacing={3}
//               align="center"
//               onClick={() => postPlaylist(playlist[0])}
//               cursor="pointer"
//             >
//               <Image 
//                 src={playlist[2]} 
//                 alt={`${playlist[0]} cover`}
//                 borderRadius="md"
//                 boxSize="150px"
//                 objectFit="cover"
//               />
//               <Text 
//                 fontWeight="bold" 
//                 fontSize="lg" 
//                 textAlign="center"
//                 noOfLines={2}
//               >
//                 {playlist[0]}
//               </Text>
//             </VStack>
//           ))}
//         </SimpleGrid>
//       )}
//     </>
//   );

//   const songScreen = (
//     <>
//       <HStack spacing={4} mb={6} px={4}>
//         <Button 
//           onClick={handleBackToPlaylists}
//           colorScheme="purple"
//           size="sm"
//         >
//           Back to Playlists
//         </Button>
//         <Text fontSize="2xl" fontWeight="bold" color="purple.500">
//           {playlist}
//         </Text>
//       </HStack>
      
//       <VStack 
//         spacing={2} 
//         align="stretch" 
//         bg="white" 
//         borderRadius="md" 
//         boxShadow="sm"
//         p={4}
//         mx={4}
//       >
//         <HStack bg="purple.500" p={2} borderRadius="md" color="white">
//           <Text fontWeight="bold" w="10%">#</Text>
//           <Text fontWeight="bold" w="80%">Song</Text>
//           <Text fontWeight="bold" w="10%" textAlign="right">❤</Text>
//         </HStack>
        
//         {Array.isArray(songs) ? (
//           songs.map((song, index) => (
//             <HStack 
//               key={index}
//               p={2}
//               _hover={{ bg: "gray.50" }}
//               borderBottomWidth={1}
//               borderBottomColor="gray.100"
//             >
//               <Text color="gray.500" w="10%">{index + 1}</Text>
//               <Text w="80%">{song}</Text>
//               <Text w="10%" textAlign="right" color="gray.400">♪</Text>
//             </HStack>
//           ))
//         ) : (
//           <Center p={4}>
//             <Text color="gray.500">No songs available</Text>
//           </Center>
//         )}
//       </VStack>
//     </>
//   );

//   return (
//     <>
//       <Center mb={6}>
//         <Text fontSize="2xl" fontWeight="bold">
//           Playlists
//         </Text>
//       </Center>
//       {isPlaylist ? playlistScreen : songScreen}
//     </>
//   );
// };

// export default Playlists;
import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Text, 
  HStack, 
  Center, 
  Image, 
  VStack, 
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import useGetPlaylists from '../hooks/useGetPlaylists';

const Playlists = () => {
  const [data, setData] = useState([{}]);
  const [playlist, setPlaylist] = useState("");
  const [songs, setSongs] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { getPlaylists, error, loading } = useGetPlaylists();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlaylists();
      if (data) {
        setData(data);
      }
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
        body: JSON.stringify({
          data: playlistName
        })
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
    setSelectedPlaylist(playlistItem);
    onOpen();
  };

  const handleBackToPlaylists = () => {
    setIsPlaylist(true);
  };

  const playlistScreen = (
    <>
      <Center mb={8}>
        <Text fontSize="3xl" fontWeight="bold" color="purple.500">
          Your Music Collections
        </Text>
      </Center>
      
      {loading ? (
        <Center h="200px">
          <Text>Loading your playlists...</Text>
        </Center>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6} px={4}>
          {(data?.Playlists || []).map((playlist, i) => (
            <VStack 
              key={i}
              p={4}
              bg="white" 
              borderRadius="md"
              boxShadow="sm"
              _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
              spacing={3}
              align="center"
              onClick={() => handlePlaylistClick(playlist)}
              cursor="pointer"
            >
              <Image 
                src={playlist[2]} 
                alt={`${playlist[0]} cover`}
                borderRadius="md"
                boxSize="150px"
                objectFit="cover"
              />
              <Text 
                fontWeight="bold" 
                fontSize="lg" 
                textAlign="center"
                noOfLines={2}
              >
                {playlist[0]}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      )}
    </>
  );

  const songScreen = (
    <>
      <HStack spacing={4} mb={6} px={4}>
        <Button 
          onClick={handleBackToPlaylists}
          colorScheme="purple"
          size="sm"
        >
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

      {/* Modal for Playlist Options */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedPlaylist ? selectedPlaylist[0] : 'Playlist Options'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Button 
                width="100%" 
                colorScheme="teal" 
                onClick={() => handleCleanPlaylist(selectedPlaylist[0])}
              >
                Clean Playlist
              </Button>
              <Button 
                width="100%" 
                colorScheme="blue" 
                onClick={() => {
                  alert("Custom Cover Images feature coming soon!");
                  onClose();
                }}
              >
                Custom Cover Image
              </Button>
              <Button 
                width="100%" 
                colorScheme="purple" 
                onClick={() => {
                  alert("Reorder Songs feature coming soon!");
                  onClose();
                }}
              >
                Reorder Songs
              </Button>
              <Button 
                width="100%" 
                colorScheme="orange" 
                onClick={() => {
                  alert("Share Playlist feature coming soon!");
                  onClose();
                }}
              >
                Share Playlist
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Playlists;