import React from 'react';
import { Box, Button, Typography, Grid, Stack, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

const features = [
  {
    icon: <PlaylistPlayIcon fontSize="large" color="primary" />,
    title: "Create Custom Playlists",
    description: "Effortlessly build, edit, and share playlists tailored to your taste."
  },
  {
    icon: <NotificationsActiveIcon fontSize="large" color="primary" />,
    title: "Stay Informed",
    description: "Receive real-time notifications when your favorite artists drop new tracks."
  },
  {
    icon: <LibraryMusicIcon fontSize="large" color="primary" />,
    title: "Discover New Music",
    description: "Explore curated selections and discover fresh sounds from emerging talents."
  },
];

const HomePage = () => {
  return (
    <Box sx={{ bgcolor: '#121212', minHeight: '100vh', color: 'white' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(/assets/hero-bg.jpg)', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '70vh', md: '80vh' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Welcome to PlaylistPlus
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, px: 2 }}>
          Your ultimate music hub to create personalized playlists, stay informed, and discover new music.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/playlists"
          sx={{ fontSize: '1rem', px: 4, py: 1.5 }}
        >
          Explore Now
        </Button>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          What We Do
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  textAlign: 'center',
                  border: '1px solid #333',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'grey.400' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          borderTop: '1px solid #333',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: 'grey.500' }}>
          © {new Date().getFullYear()} PlaylistPlus. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;

