import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Container, IconButton, Chip, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AlbumIcon from '@mui/icons-material/Album';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { subscribeToNotifications, markAllNotificationsAsRead, markNotificationAsRead, createTestNotification, deleteNotification, deleteAllNotifications } from '../services/notifications';
import { auth } from '../Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(17, 25, 40, 0.75)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(2),
  transition: 'all 0.3s ease',
  background: 'rgba(26, 32, 44, 0.4)',
  '&:hover': {
    background: 'rgba(45, 55, 72, 0.4)',
    transform: 'translateX(8px)',
  },
}));

const NotificationIcon = styled(Box)(({ theme, color }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(2),
  background: `rgba(${color}, 0.15)`,
  color: `rgb(${color})`,
}));

const StatusChip = styled(Chip)(({ theme, color }) => ({
  background: `rgba(${color}, 0.15)`,
  color: `rgb(${color})`,
  height: 24,
  fontSize: '0.75rem',
  marginLeft: theme.spacing(1),
}));

const getNotificationIcon = (type) => {
  switch (type) {
    case 'new_release':
      return <AlbumIcon />;
    case 'playlist_update':
      return <MusicNoteIcon />;
    case 'artist_follow':
      return <PersonAddIcon />;
    default:
      return <NotificationsActiveIcon />;
  }
};

const getNotificationColor = (type) => {
  switch (type) {
    case 'new_release':
      return '77, 171, 247'; // blue
    case 'playlist_update':
      return '78, 205, 196'; // teal
    case 'artist_follow':
      return '236, 72, 153'; // pink
    default:
      return '34, 197, 94'; // green
  }
};

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  
  const now = new Date();
  const date = timestamp.toDate();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    let unsubscribe;

    const initializeNotifications = async () => {
      try {
        if (!user) {
          setError('Please log in to view notifications');
          return;
        }

        unsubscribe = subscribeToNotifications(user.uid, (newNotifications) => {
          setNotifications(newNotifications);
          setError(null);
        });
      } catch (err) {
        console.error('Error initializing notifications:', err);
        setError('Failed to load notifications');
      }
    };

    if (!loading) {
      initializeNotifications();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, loading]);

  const handleMarkAllAsRead = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await markAllNotificationsAsRead(user.uid);
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleNotificationClick = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleCreateTestNotification = async () => {
    try {
      if (user) {
        await createTestNotification(user.uid);
      }
    } catch (error) {
      console.error('Error creating test notification:', error);
    }
  };

  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation(); // Prevent triggering the mark as read action
    try {
      await deleteNotification(notificationId);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      if (user) {
        await deleteAllNotifications(user.uid);
      }
    } catch (error) {
      console.error('Error deleting all notifications:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 4, md: 6 }, 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
      overflow: 'hidden'
    }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              background: 'linear-gradient(45deg, #4ECDC4, #556270)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold',
              flex: 1,
            }}
          >
            Notifications
          </Typography>
          <IconButton 
            onClick={handleCreateTestNotification}
            sx={{ 
              color: '#4ECDC4',
              mr: 1,
              '&:hover': {
                background: 'rgba(78, 205, 196, 0.1)',
              },
            }}
          >
            <NotificationsActiveIcon />
          </IconButton>
          <IconButton 
            onClick={handleMarkAllAsRead}
            sx={{ 
              color: '#4ECDC4',
              mr: 1,
              '&:hover': {
                background: 'rgba(78, 205, 196, 0.1)',
              },
            }}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton 
            onClick={handleDeleteAllNotifications}
            sx={{ 
              color: '#ff4444',
              '&:hover': {
                background: 'rgba(255, 68, 68, 0.1)',
              },
            }}
          >
            <DeleteSweepIcon />
          </IconButton>
        </Box>
        <StyledPaper elevation={0}>
          {notifications.length === 0 ? (
            <Typography color="text.secondary" align="center">
              No notifications yet
            </Typography>
          ) : (
            <List>
              {notifications.map((notification) => (
                <StyledListItem 
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{
                    opacity: notification.read ? 0.8 : 1,
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <NotificationIcon color={getNotificationColor(notification.type)}>
                    {getNotificationIcon(notification.type)}
                  </NotificationIcon>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemText
                        primary={notification.message}
                        secondary={notification.details}
                        primaryTypographyProps={{
                          color: 'white',
                          fontWeight: notification.read ? 'normal' : 'bold',
                          gutterBottom: true,
                        }}
                        secondaryTypographyProps={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          sx: { display: 'block' },
                        }}
                      />
                      <IconButton
                        onClick={(e) => handleDeleteNotification(e, notification.id)}
                        sx={{
                          color: '#ff4444',
                          opacity: 0.7,
                          '&:hover': {
                            opacity: 1,
                            background: 'rgba(255, 68, 68, 0.1)',
                          },
                          ml: 1,
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <StatusChip 
                        label={notification.status} 
                        color={getNotificationColor(notification.type)}
                        size="small"
                      />
                    </Box>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        display: 'block',
                        mt: 0.5,
                      }}
                    >
                      {formatRelativeTime(notification.timestamp)}
                    </Typography>
                  </Box>
                </StyledListItem>
              ))}
            </List>
          )}
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Notifications;