import React from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import useLogout from '@/hooks/useLogout';
import useAuthStore from '@/store/authStore';

const Navbar = () => {
  // Get user and logout function from the store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = Boolean(user);

  // Redirect to login page if not logged in
  const login = () => {
    window.location.href = "http://localhost:5173/Login";
  };

  // Single click handler: logs out if logged in, otherwise redirects to login
  const handleClick = () => {
    if (isLoggedIn) {
      logout();
      useLogout();
    } else {
      login();
    }
  };

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  // Drawer content for mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, color: 'black' }}>
        PlaylistPlus
      </Typography>
      <List>
        <ListItemButton component={RouterLink} to="/Home">
          <ListItemText primary="Home" sx={{ color: 'black' }} />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/Playlists">
          <ListItemText primary="Playlists" sx={{ color: 'black' }} />
        </ListItemButton>
        <ListItemButton component={RouterLink} to="/Artists">
          <ListItemText primary="Artists" sx={{ color: 'black' }} />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={isLoggedIn ? 'Logout' : 'Login'} sx={{ color: 'black' }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Toolbar>
          {/* Mobile Hamburger Menu */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo/Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PlaylistPlus
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link
              component={RouterLink}
              to="/Home"
              color="inherit"
              underline="none"
              sx={{ mx: 2 }}
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to="/Playlists"
              color="inherit"
              underline="none"
              sx={{ mx: 2 }}
            >
              Playlists
            </Link>
            <Link
              component={RouterLink}
              to="/Artists"
              color="inherit"
              underline="none"
              sx={{ mx: 2 }}
            >
              Artists
            </Link>
            <Button onClick={handleClick} variant="outlined" color="inherit" sx={{ mx: 2 }}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
