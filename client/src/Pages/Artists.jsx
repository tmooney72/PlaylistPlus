import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Stack, 
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
  Fade,
  Grow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaSearch, FaHeart } from 'react-icons/fa';
import useSearchForArtist from '@/hooks/useSearchForArtist';
import useGetNotifications from '@/hooks/useGetNotifications';
import useAddArtistToNotifications from '@/hooks/useAddArtistToNotifications';
import useAuthStore from '@/store/authStore';

// Styled components
const ArtistCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    '&:before': {
      opacity: 1,
    },
  },
}));

const ArtistImage = styled('img')({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const PopularityBadge = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  borderRadius: '12px',
  padding: '4px 12px',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: theme.spacing(2),
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputAdornment-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
}));

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
    <Box sx={{ 
      p: { xs: 2, sm: 4, md: 6 }, 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      overflow: 'hidden'
    }}>
      {/* Header & Search */}
      <Fade in timeout={1000}>
        <Stack spacing={4} alignItems="center" sx={{ mb: 8 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: '800',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '-0.5px'
            }}
          >
            Discover Artists
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              textAlign: 'center',
              maxWidth: '600px',
              mb: 4
            }}
          >
            Search and follow your favorite artists to get notifications about their new releases
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            width: { xs: '100%', sm: '80%', md: '60%' },
            gap: 2
          }}>
            <SearchTextField
              fullWidth
              placeholder="Enter artist name..."
              value={searchFor}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleClick();
                }
              }}
            />
            <Button 
              variant="contained" 
              onClick={handleClick}
              sx={{
                bgcolor: 'white',
                color: '#1a1a1a',
                px: 4,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              Search
            </Button>
          </Box>
        </Stack>
      </Fade>

      {/* Results */}
      {searching ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '200px' 
        }}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      ) : error ? (
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'red.500', 
            textAlign: 'center',
            mt: 4 
          }}
        >
          {error}
        </Typography>
      ) : (
        <Stack spacing={3}>
          {data?.map((artist, index) => (
            <Grow 
              in 
              timeout={500 + index * 100}
              key={artist.id}
            >
              <ArtistCard>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={4} 
                  alignItems="center"
                >
                  {/* Artist Image */}
                  <ArtistImage
                    src={artist.images?.[0]?.url || '/default-artist.jpg'}
                    alt={artist.name}
                  />
                  
                  {/* Artist Info */}
                  <Stack spacing={2} sx={{ flex: 1 }}>
                    <Stack 
                      direction="row" 
                      spacing={2} 
                      alignItems="center" 
                      justifyContent="space-between"
                      sx={{ width: '100%' }}
                    >
                      <Stack spacing={1}>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: 'white',
                            fontWeight: '600',
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        >
                          {artist.name}
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <PopularityBadge>
                            <span>Popularity: {artist.popularity}</span>
                          </PopularityBadge>
                          {artist.genres?.slice(0, 2).map((genre, i) => (
                            <Typography 
                              key={i}
                              variant="body2" 
                              sx={{ 
                                color: 'rgba(255,255,255,0.6)',
                                bgcolor: 'rgba(255,255,255,0.1)',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.75rem',
                              }}
                            >
                              {genre}
                            </Typography>
                          ))}
                        </Stack>
                      </Stack>
                      <Button
                        variant="outlined"
                        onClick={() => handleLike(artist.id, artist.name)}
                        startIcon={<FaHeart />}
                        sx={{
                          color: 'white',
                          borderColor: 'rgba(255,255,255,0.3)',
                          '&:hover': {
                            borderColor: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                          },
                          minWidth: '120px',
                        }}
                      >
                        Follow
                      </Button>
                    </Stack>
                    
                    {/* Additional Info */}
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        {artist.followers?.total.toLocaleString()} followers
                      </Typography>
                      {artist.external_urls?.spotify && (
                        <Button
                          variant="text"
                          size="small"
                          href={artist.external_urls.spotify}
                          target="_blank"
                          sx={{
                            color: '#1DB954',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: 'rgba(29, 185, 84, 0.1)',
                            },
                          }}
                        >
                          View on Spotify
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </ArtistCard>
            </Grow>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Artists;