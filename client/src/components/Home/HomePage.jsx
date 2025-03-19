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
            Your ultimate music hub to create personalized playlists, stay informed, and discover new music.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/playlists"
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
            Explore Now
          </Button>
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
          What We Do
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Box
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 4,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
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
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          background: 'rgba(0,0,0,0.3)',
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            color: 'rgba(255,255,255,0.6)',
            fontWeight: '500'
          }}
        >
          © {new Date().getFullYear()} PlaylistPlus. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage; 