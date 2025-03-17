// import React, { useState } from 'react';
// import useSearchForArtist from '@/hooks/useSearchForArtist';
// import { Button, Input, Box, VStack, Text, Flex, Spinner } from '@chakra-ui/react';
// import useGetNotifications from '@/hooks/useGetNotifications';
// import useAddArtistToNotifications from '@/hooks/useAddArtistToNotifications';
// import useAuthStore from '@/store/authStore';

// const Artists = () => {
//   const { searchResults, searching, error, SearchForArtist } = useSearchForArtist();
//   const { getNotifications, getting, error2 } = useGetNotifications();
//   const [data, setData] = useState(null);
//   const [searchFor, setSearchFor] = useState("");
//   const user = useAuthStore((state) => state.user);

//   const handleClick = async () => {
//     const q = await SearchForArtist(searchFor);
//     console.log(q);
//     setData(q['Results'].artists.items);
//   };

//   const handleChange = (event) => { 
//     setSearchFor(event.target.value);
//   };

//   const handleLike = async (id, name) => {
//     console.log(id);
//     const q1 = await getNotifications(id);
//     await useAddArtistToNotifications(name, id, user);
//     console.log(q1);
//   };

//   return (
//     <Box p={6} minH="100vh" bg="white">
//       {/* Header & Search */}
//       <Flex direction="column" align="center" mb={8}>
//         <Text fontSize="3xl" fontWeight="bold" color="black">
//           Search Artists
//         </Text>
//         <Flex width={["100%", "80%", "60%"]} mb={4}>
//           <Input
//             placeholder="Enter artist name..."
//             value={searchFor}
//             onChange={handleChange}
//             mr={2}
//             size="lg"
//             variant="outline"
//             borderColor="gray.300"
//           />
//           <Button onClick={handleClick} size="lg" colorScheme="gray">
//             Search
//           </Button>
//         </Flex>
//       </Flex>

//       {/* Results */}
//       <Box>
//         {searching ? (
//           <Flex justify="center" align="center" minH="200px">
//             <Spinner size="xl" color="black" />
//           </Flex>
//         ) : error ? (
//           <Text color="red.500" textAlign="center">
//             {error}
//           </Text>
//         ) : (
//           <VStack spacing={4} align="stretch">
//             {data?.map((artist, index) => (
//               <Box
//                 key={index}
//                 p={4}
//                 bg="white"
//                 borderWidth="1px"
//                 borderColor="gray.200"
//                 borderRadius="md"
//                 boxShadow="sm"
//                 transition="transform 0.2s ease, box-shadow 0.2s ease"
//                 _hover={{
//                   transform: "scale(1.02)",
//                   boxShadow: "md",
//                 }}
//                 cursor="pointer"
//               >
//                 <VStack spacing={3} align="start">
//                   <Text fontSize="lg" fontWeight="bold" color="black">
//                     {artist.name}
//                   </Text>
//                   <Text fontSize="sm" color="gray.500">
//                     ID: {artist.id}
//                   </Text>
//                   <Button
//                     onClick={() => handleLike(artist.id, artist.name)}
//                     colorScheme="blackAlpha"
//                     size="sm"
//                   >
//                     Like
//                   </Button>
//                 </VStack>
//               </Box>
//             ))}
//           </VStack>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Artists;
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack, CircularProgress } from '@mui/material';
import useSearchForArtist from '@/hooks/useSearchForArtist';
import useGetNotifications from '@/hooks/useGetNotifications';
import useAddArtistToNotifications from '@/hooks/useAddArtistToNotifications';
import useAuthStore from '@/store/authStore';

const Artists = () => {
  const { searchResults, searching, error, SearchForArtist } = useSearchForArtist();
  const { getNotifications, getting, error2 } = useGetNotifications();
  const [data, setData] = useState(null);
  const [searchFor, setSearchFor] = useState("");
  const user = useAuthStore((state) => state.user);

  const handleClick = async () => {
    const q = await SearchForArtist(searchFor);
    console.log(q);
    setData(q['Results'].artists.items);
  };

  const handleChange = (event) => { 
    setSearchFor(event.target.value);
  };

  const handleLike = async (id, name) => {
    console.log(id);
    const q1 = await getNotifications(id);
    await useAddArtistToNotifications(name, id, user);
    console.log(q1);
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'white' }}>
      {/* Header & Search */}
      <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'black' }}>
          Search Artists
        </Typography>
        <Box sx={{ display: 'flex', width: { xs: '100%', sm: '80%', md: '60%' }, mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter artist name..."
            value={searchFor}
            onChange={handleChange}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" onClick={handleClick}>
            Search
          </Button>
        </Box>
      </Stack>

      {/* Results */}
      {searching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : error ? (
        <Typography variant="body1" sx={{ color: 'red', textAlign: 'center' }}>
          {error}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {data?.map((artist, index) => (
            <Box
              key={index}
              sx={{
                p: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                boxShadow: 1,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3,
                },
                cursor: 'pointer',
              }}
            >
              <Stack spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black' }}>
                  {artist.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'grey.600' }}>
                  ID: {artist.id}
                </Typography>
                <Button variant="outlined" onClick={() => handleLike(artist.id, artist.name)}>
                  Like
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Artists;