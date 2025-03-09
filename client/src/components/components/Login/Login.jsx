import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  AbsoluteCenter,
  Heading,
  Image,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import useRegisterWithUser from '@/hooks/useRegisterWithUser';
import useSignInWithUser from '@/hooks/useLoginWithUsername';
import HomePage from '../Home/HomePage';

const LoginLogoutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { register, loading, error } = useRegisterWithUser();
  const { loginUser, loadingUser, errorUser } = useSignInWithUser();

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Check authentication status from the backend
  // useEffect(() => {
  //   fetch("/api/authed")
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       data.Authed
  //         ? setIsAuthed(true)
  //         : window.location.href = "http://127.0.0.1:5200/api";
  //     });
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const user = await register(formData.email, formData.password);
        console.log(user);
        setIsLoggedIn(true);
      } else {
        const user = await loginUser(formData.email, formData.password);
        console.log(user);
        setIsLoggedIn(true);
      }
      window.location.href = "http://127.0.0.1:5200/api";
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const login = () => {
    setIsLogin(true);
    setIsRegister(false);
  };

  // Check local storage for an existing user
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const registerPage = () => {
    setIsRegister(true);
    setIsLogin(false);
  };

  const loginComp = (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          size="lg"
          variant="filled"
          bg="gray"
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          size="lg"
          variant="filled"
          bg="gray"
        />
        <Button
          type="submit"
          isLoading={loading || loadingUser}
          colorScheme="teal"
          size="lg"
        >
          {loading || loadingUser ? 'Processing...' : 'Login'}
        </Button>
      </Stack>
    </Box>
  );

  const registerComp = (
    <Box as="form" onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          size="lg"
          variant="filled"
          bg="white"
        />
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          size="lg"
          variant="filled"
          bg="white"
        />
        <Button
          type="submit"
          isLoading={loading}
          colorScheme="teal"
          size="lg"
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Stack>
      {error && <Text color="red.500" mt={2}>{error}</Text>}
    </Box>
  );

  return (
    <AbsoluteCenter>
      <Stack spacing={8} align="center">
        <Image
          src='../../logo.jpg'
          boxSize="200px"
          borderRadius="full"
          objectFit="cover"
          alt="Logo"
          mb={4}
        />
        <Box maxW="sm" borderWidth="1px" bg="gray.100" p={6} rounded="md" boxShadow="md">
          <Stack spacing={4}>
            <Heading as="h1" size="lg" textAlign="center">
              Please <Button variant="link" onClick={login}>login</Button> or <Button variant="link" onClick={registerPage}>register</Button>
            </Heading>
            {isLogin ? loginComp : registerComp}
          </Stack>
        </Box>
      </Stack>
    </AbsoluteCenter>
  );
};

export default LoginLogoutPage;