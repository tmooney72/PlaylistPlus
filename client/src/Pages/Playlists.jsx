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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaPlay } from 'react-icons/fa';
import useGetPlaylists from '../hooks/useGetPlaylists';

// Styled component for the playlist card
const PlaylistCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: theme.spacing(2),
  border: '1px solid transparent',
  backdropFilter: 'blur(8px)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
  cursor: 'pointer',
  position: 'relative',
  '&:hover': {
    zIndex: 2,
    transform: 'translateY(-5px) scale(1.03)',
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.grey[500],
  },
}));

const Playlists = () => {
  const [data, setData] = useState([]);
  const [playlist, setPlaylist] = useState("");
  const [songs, setSongs] = useState([]);
  const [isPlaylist, setIsPlaylist] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const { getPlaylists, error, loading } = useGetPlaylists();
  
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
      const response = await fetch('/api/CleanPlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: playlistName }),
      });
      const result = await response.json();
      setPlaylist(result.Playlist[0]);
      setSongs(result.Playlist[1]);
      setIsPlaylist(false);
      handleClose(); // Close the dialog after cleaning
    } catch (err) {
      console.error('Error:', err);
    }
  }

  const handlePlaylistClick = (playlistItem) => {
    console.log("Playlist clicked:", playlistItem);
    setSelectedPlaylist(playlistItem);
    handleOpen();
  };

  // Main page displaying playlists in a vertical stack (each as its own row)
  const playlistScreen = (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1A1A1A', py: 10, px: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'white' }}>
          Your Music Collections
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Stack spacing={4}>
          {(data || []).map((playlistItem, i) => (
            <PlaylistCard key={i} onClick={() => handlePlaylistClick(playlistItem)}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component="img"
                  src={playlistItem.image}
                  alt={`${playlistItem.name} cover`}
                  sx={{
                    width: 120,
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ color: 'white' }}>
                    {playlistItem.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    {playlistItem.description}
                  </Typography>
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <FaPlay size={32} style={{ color: 'white', opacity: 0.6 }} />
                </Box>
              </Stack>
            </PlaylistCard>
          ))}
        </Stack>
      )}
    </Box>
  );

  // Dialog showing selected playlist details and options
  const songScreenDialog = (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ textAlign: 'center', color: 'black' }}>
        {selectedPlaylist ? selectedPlaylist.name : 'Playlist Options'}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            {/* Left Section: Song List */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: '#F5F5F5',
                  p: 2,
                  borderRadius: 2,
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {selectedPlaylist &&
                  selectedPlaylist.songs &&
                  selectedPlaylist.songs.map((song, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        borderBottom: '1px solid #E0E0E0',
                        pb: 1,
                      }}
                    >
                      {song.image && (
                        <Box
                          component="img"
                          src={song.image}
                          alt={song.name}
                          sx={{ width: 50, height: 50, borderRadius: 1, mr: 1 }}
                        />
                      )}
                      <Typography variant="body1" sx={{ fontWeight: 500, color: 'black' }}>
                        {song.name}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Grid>
            {/* Right Section: Playlist Options */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() =>
                    handleCleanPlaylist(selectedPlaylist ? selectedPlaylist.name : '')
                  }
                >
                  Clean Playlist
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    alert("Custom Cover Images feature coming soon!");
                    handleClose();
                  }}
                >
                  Custom Cover Image
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  size="large"
                  onClick={() => {
                    alert("Reorder Songs feature coming soon!");
                    handleClose();
                  }}
                >
                  Reorder Songs
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="large"
                  onClick={() => {
                    alert("Share Playlist feature coming soon!");
                    handleClose();
                  }}
                >
                  Share Playlist
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {playlistScreen}
      {songScreenDialog}
    </>
  );
};

export default Playlists;
