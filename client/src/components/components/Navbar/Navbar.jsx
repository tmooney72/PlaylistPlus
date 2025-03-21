import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Container,
  useScrollTrigger,
  Slide,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import useLogout from '@/hooks/useLogout';
import useAuthStore from '@/store/authStore';
import { subscribeToNotifications } from '@/services/notifications';

// Hide navbar on scroll
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(18, 18, 18, 0.8)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
}));

const NavLink = styled(Link)(({ theme, active }) => ({
  position: 'relative',
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    width: active ? '100%' : '0%',
    height: '2px',
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    '&::after': {
      width: '100%',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 24px',
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  color: 'white',
  border: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
  },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
  background: '#121212',
  height: '100%',
  color: 'white',
}));

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = Boolean(user);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = subscribeToNotifications(user.uid, (notifications) => {
        const unreadNotifications = notifications.filter(n => !n.read).length;
        setUnreadCount(unreadNotifications);
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  const login = () => {
    window.location.href = "https://playlist-plus.vercel.app/Login";
  };

  const handleClick = () => {
    if (isLoggedIn) {
      logout();
      useLogout();
    } else {
      login();
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const navItems = [
    { text: 'Home', path: '/Home', icon: <HomeIcon /> },
    { text: 'Playlists', path: '/Playlists', icon: <QueueMusicIcon /> },
    { text: 'Artists', path: '/Artists', icon: <PersonIcon /> },
  ];

  const drawer = (
    <DrawerContent sx={{ width: 280, p: 2 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          PlaylistPlus
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={RouterLink}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              '&.Mui-selected': {
                background: 'rgba(255,255,255,0.1)',
              },
              '&:hover': {
                background: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
        <ListItemButton
          onClick={handleClick}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(45deg, rgba(255,107,107,0.2), rgba(78,205,196,0.2))',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(255,107,107,0.3), rgba(78,205,196,0.3))',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
          </ListItemIcon>
          <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} />
        </ListItemButton>
      </List>
    </DrawerContent>
  );

  return (
    <>
      <HideOnScroll>
        <StyledAppBar position="fixed">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Typography 
                variant="h6" 
                component={RouterLink} 
                to="/Home"
                sx={{ 
                  flexGrow: { xs: 1, sm: 0 }, 
                  mr: { sm: 4 },
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PlaylistPlus
              </Typography>

              <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    color="inherit"
                    underline="none"
                    active={location.pathname === item.path ? 1 : 0}
                    sx={{ mx: 1 }}
                  >
                    {item.text}
                  </NavLink>
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {isLoggedIn && (
                  <IconButton
                    color="inherit"
                    onClick={() => navigate('/notifications')}
                    sx={{ 
                      mr: 2,
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <Badge badgeContent={unreadCount} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                )}
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <StyledButton
                    onClick={handleClick}
                    startIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                  >
                    {isLoggedIn ? 'Logout' : 'Login'}
                  </StyledButton>
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer for fixed navbar */}

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            background: '#121212',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
