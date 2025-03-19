import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useRegisterWithUser from '@/hooks/useRegisterWithUser';
import useSignInWithUser from '@/hooks/useLoginWithUsername';
import useAuthStore from '@/store/authStore';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.12)',
    },
    '&.Mui-focused': {
      background: 'rgba(255, 255, 255, 0.12)',
    },
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4ECDC4',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '16.5px 14px',
    paddingLeft: theme.spacing(5),
  },
  '& .MuiInputLabel-outlined': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#4ECDC4',
    },
  },
  '& .MuiInputAdornment-root': {
    position: 'absolute',
    left: theme.spacing(2),
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
  borderRadius: '30px',
  padding: '12px 24px',
  color: 'white',
  fontWeight: '600',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
  },
  '&.Mui-disabled': {
    background: 'rgba(255, 255, 255, 0.12)',
    color: 'rgba(255, 255, 255, 0.3)',
  },
}));

const TextButton = styled(Button)(({ theme }) => ({
  color: '#4ECDC4',
  textTransform: 'none',
  '&:hover': {
    background: 'rgba(78, 205, 196, 0.1)',
  },
}));

const LoginLogoutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { register, loading, error } = useRegisterWithUser();
  const { loginUser, loadingUser } = useSignInWithUser();
  const { user, log } = useAuthStore();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isRegister) {
        result = await register(formData.email, formData.password);
      } else {
        result = await loginUser(formData.email, formData.password);
      }
      log(result);
      setIsLoggedIn(true);
      window.location.href = "https://desirable-emotion-production.up.railway.app/api";
    } catch (err) {
      console.error("Error during registration/login:", err);
    }
  };

  const loginHandler = () => {
    setIsLogin(true);
    setIsRegister(false);
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const registerPageHandler = () => {
    setIsRegister(true);
    setIsLogin(false);
  };

  // Login form component
  const loginComp = (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Stack spacing={3}>
        <StyledTextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 1,
                }}
              >
                <EmailIcon />
              </Box>
            ),
          }}
        />
        <StyledTextField
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 1,
                }}
              >
                <LockIcon />
              </Box>
            ),
          }}
        />
        <StyledButton 
          type="submit" 
          size="large" 
          disabled={loading || loadingUser}
          startIcon={<LoginIcon />}
        >
          {loading || loadingUser ? 'Processing...' : 'Login'}
        </StyledButton>
      </Stack>
    </Box>
  );

  // Register form component
  const registerComp = (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Stack spacing={3}>
        <StyledTextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 1,
                }}
              >
                <EmailIcon />
              </Box>
            ),
          }}
        />
        <StyledTextField
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <Box 
                sx={{ 
                  position: 'absolute',
                  left: 2,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none',
                  color: 'rgba(255, 255, 255, 0.7)',
                  zIndex: 1,
                }}
              >
                <LockIcon />
              </Box>
            ),
          }}
        />
        <StyledButton 
          type="submit" 
          size="large" 
          disabled={loading}
          startIcon={<PersonAddIcon />}
        >
          {loading ? 'Registering...' : 'Register'}
        </StyledButton>
      </Stack>
      {error && (
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 2,
            color: '#FF6B6B',
            textAlign: 'center',
            background: 'rgba(255, 107, 107, 0.1)',
            borderRadius: 2,
            p: 1,
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#121212',
        backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Stack spacing={4} alignItems="center">
          <Box
            sx={{
              textAlign: 'center',
              mb: 2,
            }}
          >
            <Typography 
              variant="h3" 
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
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                fontWeight: '500',
              }}
            >
              Your Music, Your Way
            </Typography>
          </Box>

          <StyledPaper sx={{ width: '100%' }}>
            <Stack spacing={3}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'white',
                    mb: 1,
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    mb: 2,
                  }}
                >
                  Please{' '}
                  <TextButton onClick={loginHandler} size="small">
                    login
                  </TextButton>{' '}
                  or{' '}
                  <TextButton onClick={registerPageHandler} size="small">
                    register
                  </TextButton>
                </Typography>
              </Box>
              {isLogin ? loginComp : registerComp}
            </Stack>
          </StyledPaper>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginLogoutPage;