import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useRegisterWithUser from '@/hooks/useRegisterWithUser';
import useSignInWithUser from '@/hooks/useLoginWithUsername';
import useAuthStore from '@/store/authStore';

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
      window.location.href = "http://127.0.0.1:5200/api";
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
      <Stack spacing={2}>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          variant="filled"
          fullWidth
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          variant="filled"
          fullWidth
          sx={{ backgroundColor: 'white' }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large" 
          disabled={loading || loadingUser}
        >
          {loading || loadingUser ? 'Processing...' : 'Login'}
        </Button>
      </Stack>
    </Box>
  );

  // Register form component
  const registerComp = (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <TextField
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          variant="filled"
          fullWidth
          sx={{ backgroundColor: 'white' }}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          variant="filled"
          fullWidth
          sx={{ backgroundColor: 'white' }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large" 
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Stack>
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '400px' },
        p: 2,
      }}
    >
      <Stack spacing={4} alignItems="center">
        <Box
          component="img"
          src="../../logo.jpg"
          alt="Logo"
          sx={{
            width: 200,
            height: 200,
            borderRadius: '50%',
            objectFit: 'cover',
            mb: 2,
          }}
        />
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center">
              Please{' '}
              <Button onClick={loginHandler} variant="text" size="small">
                login
              </Button>{' '}
              or{' '}
              <Button onClick={registerPageHandler} variant="text" size="small">
                register
              </Button>
            </Typography>
            {isLogin ? loginComp : registerComp}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
};

export default LoginLogoutPage;