// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Paper,
//   Stack,
//   Grid,
//   Typography,
//   Divider,
//   Container,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { FaPlay, FaMusic } from 'react-icons/fa';
// import useGetPlaylists from '../hooks/useGetPlaylists';

// // Styled component for the playlist card
// const PlaylistCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   background: 'rgba(255, 255, 255, 0.05)',
//   borderRadius: theme.spacing(2),
//   border: '1px solid rgba(255, 255, 255, 0.1)',
//   backdropFilter: 'blur(10px)',
//   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//   cursor: 'pointer',
//   position: 'relative',
//   overflow: 'hidden',
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
//     background: 'rgba(255, 255, 255, 0.08)',
//     '& .play-icon': {
//       opacity: 1,
//       transform: 'translateY(0) scale(1)',
//     },
//     '& img': {
//       transform: 'scale(1.05)',
//     },
//   },
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '100%',
//     background: 'linear-gradient(45deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))',
//     opacity: 0,
//     transition: 'opacity 0.3s ease',
//   },
//   '&:hover::before': {
//     opacity: 1,
//   },
// }));

// // Styled component for the modal
// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialog-paper': {
//     background: '#1A1A1A',
//     borderRadius: theme.spacing(3),
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     backdropFilter: 'blur(10px)',
//   },
//   '& .MuiDialogTitle-root': {
//     background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: theme.spacing(3),
//   },
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(4),
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   borderRadius: '30px',
//   padding: '12px 24px',
//   background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
//   color: 'white',
//   fontWeight: '600',
//   textTransform: 'none',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     transform: 'translateY(-2px)',
//     boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
//   },
// }));

// const Playlists = () => {
//   const [data, setData] = useState([]);
//   const [playlist, setPlaylist] = useState("");
//   const [songs, setSongs] = useState([]);
//   const [isPlaylist, setIsPlaylist] = useState(true);
//   const [selectedPlaylist, setSelectedPlaylist] = useState(null);
//   const { getPlaylists, error, loading } = useGetPlaylists();
  
//   // State for controlling the Dialog (modal)
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await getPlaylists();
//       if (result) {
//         setData(result.Playlists);
//       }
//       console.log(result);
//     };
//     fetchData();
//   }, []);

//   async function handleCleanPlaylist(playlistName) {
//     try {
//       const response = await fetch('https://desirable-emotion-production.up.railway.app/api/CleanPlaylist', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ data: playlistName }),
//         credentials: "include",
//       });
//       const result = await response.json();
//       setPlaylist(result.Playlist[0]);
//       setSongs(result.Playlist[1]);
//       setIsPlaylist(false);
//       handleClose(); // Close the dialog after cleaning
//     } catch (err) {
//       console.error('Error:', err);
//     }
//   }

//   const handlePlaylistClick = (playlistItem) => {
//     console.log("Playlist clicked:", playlistItem);
//     setSelectedPlaylist(playlistItem);
//     handleOpen();
//   };

//   // Main page displaying playlists in a vertical stack
//   const playlistScreen = (
//     <Box sx={{ 
//       minHeight: '100vh', 
//       bgcolor: '#121212',
//       backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
//       py: 10, 
//       px: { xs: 2, md: 6 } 
//     }}>
//       <Container maxWidth="lg">
//         <Box sx={{ textAlign: 'center', mb: 8 }}>
//           <Typography 
//             variant="h2" 
//             sx={{ 
//               fontWeight: 'bold',
//               background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               mb: 2,
//             }}
//           >
//             Your Music Collections
//           </Typography>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               color: 'rgba(255,255,255,0.7)',
//               maxWidth: '600px',
//               mx: 'auto',
//             }}
//           >
//             Discover and manage your personalized playlists
//           </Typography>
//         </Box>

//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//             <CircularProgress sx={{ color: '#4ECDC4' }} />
//           </Box>
//         ) : data?.length === 0 ? (
//           <Box 
//             sx={{ 
//               textAlign: 'center',
//               py: 8,
//               background: 'rgba(255,255,255,0.05)',
//               borderRadius: 4,
//               backdropFilter: 'blur(10px)',
//             }}
//           >
//             <FaMusic size={48} style={{ color: '#4ECDC4', marginBottom: '16px' }} />
//             <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
//               No playlists yet
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
//               Start creating your music collections
//             </Typography>
//             <StyledButton>
//               Create Playlist
//             </StyledButton>
//           </Box>
//         ) : (
//           <Stack spacing={4}>
//             {(data || []).map((playlistItem, i) => (
//               <PlaylistCard key={i} onClick={() => handlePlaylistClick(playlistItem)}>
//                 <Stack direction="row" spacing={3} alignItems="center">
//                   <Box
//                     component="img"
//                     src={playlistItem.image}
//                     alt={`${playlistItem.name} cover`}
//                     sx={{
//                       width: 140,
//                       height: 140,
//                       objectFit: 'cover',
//                       borderRadius: 2,
//                       transition: 'transform 0.3s ease',
//                       boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
//                     }}
//                   />
//                   <Box sx={{ flexGrow: 1 }}>
//                     <Typography 
//                       variant="h5" 
//                       sx={{ 
//                         color: 'white',
//                         fontWeight: '600',
//                         mb: 1,
//                       }}
//                     >
//                       {playlistItem.name}
//                     </Typography>
//                     <Typography 
//                       variant="body1" 
//                       sx={{ 
//                         color: 'rgba(255,255,255,0.7)',
//                         mb: 2,
//                       }}
//                     >
//                       {playlistItem.description}
//                     </Typography>
//                     <Typography 
//                       variant="body2" 
//                       sx={{ 
//                         color: 'rgba(255,255,255,0.5)',
//                       }}
//                     >
//                       {playlistItem.songs?.length || 0} songs
//                     </Typography>
//                   </Box>
//                   <Box 
//                     className="play-icon"
//                     sx={{ 
//                       opacity: 0.6,
//                       transform: 'translateY(10px) scale(0.9)',
//                       transition: 'all 0.3s ease',
//                     }}
//                   >
//                     <FaPlay size={32} style={{ color: '#4ECDC4' }} />
//                   </Box>
//                 </Stack>
//               </PlaylistCard>
//             ))}
//           </Stack>
//         )}
//       </Container>
//     </Box>
//   );

//   // Dialog showing selected playlist details and options
//   const songScreenDialog = (
//     <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//       <DialogTitle>
//         {selectedPlaylist ? selectedPlaylist.name : 'Playlist Options'}
//       </DialogTitle>
//       <DialogContent dividers>
//         <Stack spacing={4}>
//           <Grid container spacing={4}>
//             {/* Left Section: Song List */}
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   background: 'rgba(255,255,255,0.05)',
//                   borderRadius: 3,
//                   p: 3,
//                   maxHeight: '500px',
//                   overflowY: 'auto',
//                   border: '1px solid rgba(255,255,255,0.1)',
//                   backdropFilter: 'blur(10px)',
//                 }}
//               >
//                 <Typography 
//                   variant="h6" 
//                   sx={{ 
//                     color: 'white',
//                     mb: 3,
//                     fontWeight: '600',
//                   }}
//                 >
//                   Songs
//                 </Typography>
//                 {selectedPlaylist?.songs?.map((song, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       mb: 2,
//                       p: 2,
//                       borderRadius: 2,
//                       background: 'rgba(255,255,255,0.03)',
//                       transition: 'all 0.2s ease',
//                       '&:hover': {
//                         background: 'rgba(255,255,255,0.08)',
//                         transform: 'translateX(4px)',
//                       },
//                     }}
//                   >
//                     {song.image && (
//                       <Box
//                         component="img"
//                         src={song.image}
//                         alt={song.name}
//                         sx={{ 
//                           width: 50, 
//                           height: 50, 
//                           borderRadius: 1,
//                           mr: 2,
//                           boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
//                         }}
//                       />
//                     )}
//                     <Typography variant="body1" sx={{ color: 'white' }}>
//                       {song.name}
//                     </Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Grid>
//             {/* Right Section: Playlist Options */}
//             <Grid item xs={12} md={6}>
//               <Stack spacing={3}>
//                 <StyledButton
//                   onClick={() => handleCleanPlaylist(selectedPlaylist?.name)}
//                   startIcon={<FaMusic />}
//                 >
//                   Clean Playlist
//                 </StyledButton>
//                 <StyledButton
//                   onClick={() => {
//                     alert("Custom Cover Images feature coming soon!");
//                     handleClose();
//                   }}
//                   sx={{
//                     background: 'linear-gradient(45deg, #4ECDC4, #2ECC71)',
//                   }}
//                 >
//                   Custom Cover Image
//                 </StyledButton>
//                 <StyledButton
//                   onClick={() => {
//                     alert("Reorder Songs feature coming soon!");
//                     handleClose();
//                   }}
//                   sx={{
//                     background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
//                   }}
//                 >
//                   Reorder Songs
//                 </StyledButton>
//                 <StyledButton
//                   onClick={() => {
//                     alert("Share Playlist feature coming soon!");
//                     handleClose();
//                   }}
//                   sx={{
//                     background: 'linear-gradient(45deg, #4A90E2, #967ADC)',
//                   }}
//                 >
//                   Share Playlist
//                 </StyledButton>
//               </Stack>
//             </Grid>
//           </Grid>
//         </Stack>
//       </DialogContent>
//       <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
//         <Button 
//           onClick={handleClose}
//           sx={{ 
//             color: 'white',
//             borderRadius: '20px',
//             px: 4,
//             border: '1px solid rgba(255,255,255,0.2)',
//             '&:hover': {
//               border: '1px solid rgba(255,255,255,0.4)',
//               background: 'rgba(255,255,255,0.05)',
//             },
//           }}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </StyledDialog>
//   );

//   return (
//     <>
//       {playlistScreen}
//       {songScreenDialog}
//     </>
//   );
// };

// export default Playlists;
// client/src/Pages/Playlists.jsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Stack,
  Grid,
  Typography,
  Divider,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaPlay, FaMusic } from 'react-icons/fa';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useGetPlaylists from '../hooks/useGetPlaylists';
import useReorderPlaylists from '../hooks/useReorderPlaylists';

// Styled component for the playlist card
const PlaylistCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    background: 'rgba(255, 255, 255, 0.08)',
    '& .play-icon': {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
    },
    '& img': {
      transform: 'scale(1.05)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'linear-gradient(45deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

// Styled component for the drag handle
const DragHandle = styled(DragIndicatorIcon)(({ theme }) => ({
  color: 'rgba(255,255,255,0.3)',
  cursor: 'grab',
  marginRight: theme.spacing(2),
  '&:hover': {
    color: 'rgba(255,255,255,0.5)',
  },
}));

// Styled component for the modal
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: '#1A1A1A',
    borderRadius: theme.spacing(3),
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  '& .MuiDialogTitle-root': {
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: theme.spacing(3),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  padding: '12px 24px',
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  color: 'white',
  fontWeight: '600',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
}));

// Draggable playlist card component
const DraggablePlaylistCard = ({ playlistItem, index, onClick }) => (
  <Draggable draggableId={playlistItem.spotify_url} index={index}>
    {(provided, snapshot) => (
      <PlaylistCard
        ref={provided.innerRef}
        {...provided.draggableProps}
        onClick={onClick}
        sx={{
          ...(snapshot.isDragging && {
            background: 'rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          }),
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Box {...provided.dragHandleProps}>
            <DragHandle />
          </Box>
          <Box
            component="img"
            src={playlistItem.image}
            alt={`${playlistItem.name} cover`}
            sx={{
              width: 140,
              height: 140,
              objectFit: 'cover',
              borderRadius: 2,
              transition: 'transform 0.3s ease',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'white',
                fontWeight: '600',
                mb: 1,
              }}
            >
              {playlistItem.name}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                mb: 2,
              }}
            >
              {playlistItem.description}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.5)',
              }}
            >
              {playlistItem.songs?.length || 0} songs
            </Typography>
          </Box>
        </Stack>
      </PlaylistCard>
    )}
  </Draggable>
);

const Playlists = () => {
  const [data, setData] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [songs, setSongs] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { getPlaylists, error, loading } = useGetPlaylists();
  const { reorderPlaylists, loading: reordering } = useReorderPlaylists();
  
  // State for controlling the Dialog (modal)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPlaylists();
      if (result) {
        setData(result.Playlists);
      }
      console.log(result);
    };
    fetchData();
  }, []);

  async function handleCleanPlaylist(playlistName) {
    try {
      const response = await fetch('https://desirable-emotion-production.up.railway.app/api/CleanPlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: playlistName }),
        credentials: "include",
      });
      const result = await response.json();
      setPlaylist(result.Playlist[0]);
      setSongs(result.Playlist[1]);
      setIsPlaylist(false);
      handleClose();
    } catch (err) {
      console.error('Error:', err);
    }
  }

  const handlePlaylistClick = (playlistItem) => {
    console.log("Playlist clicked:", playlistItem);
    setSelectedPlaylist(playlistItem);
    handleOpen();
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);

    try {
      await reorderPlaylists(items.map(item => item.spotify_url));
    } catch (error) {
      // Revert the order if the API call fails
      setData(data);
      // Show error toast
    }
  };

  // Main page displaying playlists in a vertical stack
  const playlistScreen = (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#121212',
      backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
      py: 10, 
      px: { xs: 2, md: 6 } 
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Your Music Collections
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Discover and manage your personalized playlists
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress sx={{ color: '#4ECDC4' }} />
          </Box>
        ) : data?.length === 0 ? (
          <Box 
            sx={{ 
              textAlign: 'center',
              py: 8,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              backdropFilter: 'blur(10px)',
            }}
          >
            <FaMusic size={48} style={{ color: '#4ECDC4', marginBottom: '16px' }} />
            <Typography variant="h5" sx={{ color: 'white', mb: 2 }}>
              No playlists yet
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
              Start creating your music collections
            </Typography>
            <StyledButton>
              Create Playlist
            </StyledButton>
          </Box>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="playlists">
              {(provided) => (
                <Stack 
                  spacing={4} 
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                  {(data || []).map((playlistItem, index) => (
                    <DraggablePlaylistCard
                      key={playlistItem.spotify_url}
                      playlistItem={playlistItem}
                      index={index}
                      onClick={() => handlePlaylistClick(playlistItem)}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Container>

      <StyledDialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedPlaylist?.name}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {selectedPlaylist?.songs?.map((song, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={song.image}
                  alt={song.name}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    mr: 2,
                  }}
                />
                <Typography sx={{ color: 'white' }}>
                  {song.name}
                </Typography>
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={() => handleCleanPlaylist(selectedPlaylist?.name)}>
            Clean Playlist
          </StyledButton>
        </DialogActions>
      </StyledDialog>
    </Box>
  );

  return playlistScreen;
};

export default Playlists;