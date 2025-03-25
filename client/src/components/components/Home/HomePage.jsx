import React from 'react';
import { Box, Button, Typography, Grid, Stack, Container, Paper, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SpotifyIcon from '@mui/icons-material/Spotify';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const features = [
  {
    icon: <PlaylistPlayIcon fontSize="large" color="primary" />,
    title: "Smart Playlist Management",
    description: "Create, organize, and clean up your playlists with AI-powered tools."
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" color="primary" />,
    title: "Artist Notifications",
    description: "Get instant alerts when your favorite artists release new music."
  },
  {
    icon: <LibraryMusicIcon fontSize="large" color="primary" />,
    title: "Music Discovery",
    description: "Explore new artists and tracks based on your listening history."
  },
  {
    icon: <TrendingUpIcon fontSize="large" color="primary" />,
    title: "Trending Artists",
    description: "Stay updated with the latest trending artists in your favorite genres."
  },
  {
    icon: <AutoAwesomeIcon fontSize="large" color="primary" />,
    title: "AI-Powered Features",
    description: "Let AI help you organize and discover music that matches your taste."
  }
];

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', color: 'white' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%), url(https://source.unsplash.com/random/1920x1080/?music)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '70vh', md: '80vh' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to PlaylistPlus
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              px: 2,
              color: 'rgba(255,255,255,0.9)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Your AI-powered music companion for creating perfect playlists and discovering new artists.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              component={RouterLink}
              to="/playlists"
              startIcon={<PlaylistPlayIcon />}
              sx={{
                fontSize: '1.1rem',
                px: 6,
                py: 2,
                borderRadius: '30px',
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                }
              }}
            >
              Explore Playlists
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/artists"
              startIcon={<SpotifyIcon />}
              sx={{
                fontSize: '1.1rem',
                px: 6,
                py: 2,
                borderRadius: '30px',
                borderColor: '#4ECDC4',
                color: '#4ECDC4',
                '&:hover': {
                  borderColor: '#FF6B6B',
                  color: '#FF6B6B',
                }
              }}
            >
              Find Artists
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            fontWeight: '600',
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Why Choose PlaylistPlus?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 4,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    '& .icon': {
                      transform: 'scale(1.2)',
                    }
                  },
                }}
              >
                <Box 
                  className="icon"
                  sx={{ 
                    mb: 3,
                    transition: 'transform 0.3s ease',
                    '& > svg': {
                      fontSize: '3rem',
                      color: '#4ECDC4'
                    }
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2,
                    fontWeight: '600',
                    color: 'white'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.6
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ py: 8, background: 'rgba(255,255,255,0.02)' }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                  100K+
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Active Users
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                  1M+
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Playlists Created
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ color: '#4ECDC4', fontWeight: 'bold' }}>
                  50K+
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  Artists Tracked
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: '#4ECDC4' }}>
                PlaylistPlus
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                Your AI-powered music companion for creating perfect playlists and discovering new artists.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: '#4ECDC4' }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Button component={RouterLink} to="/playlists" color="inherit">
                  Playlists
                </Button>
                <Button component={RouterLink} to="/artists" color="inherit">
                  Artists
                </Button>
                <Button component={RouterLink} to="/notifications" color="inherit">
                  Notifications
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ mb: 2, color: '#4ECDC4' }}>
                Connect With Us
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton color="inherit">
                  <SpotifyIcon />
                </IconButton>
                <IconButton color="inherit">
                  <SpotifyIcon />
                </IconButton>
                <IconButton color="inherit">
                  <SpotifyIcon />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 4,
              color: 'rgba(255,255,255,0.6)',
              fontWeight: '500'
            }}
          >
            © {new Date().getFullYear()} PlaylistPlus. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;

