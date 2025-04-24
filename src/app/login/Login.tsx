'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Container,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container
    maxWidth="lg"
    sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    suppressHydrationWarning
  >
      <Grid container spacing={2} alignItems="center" justifyContent="space-around" width="100%">
        <Grid>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/Logo.png"
              alt="ERMM Logo"
              width={429}
              height={229}
            />
            {/* <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Raw Materials Simplified!
            </Typography> */}
          </Box>
        </Grid>
        <Grid>
          <Box
            sx={{
              maxWidth: 400,
              margin: '0 auto',
              padding: 3,
            }}
          >
            <Typography variant="h5" gutterBottom color="#333333" fontWeight="700">
              Hello Again!
            </Typography>
            <Typography variant="subtitle1" color="#333333" gutterBottom fontWeight="400">
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/mailIcon.png"
                        alt="Mail Icon"
                        width={20}
                        height={20}
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderRadius: '30px',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/lockIcon.png"
                        alt="Lock Icon"
                        width={20}
                        height={20}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        <Image
                          src="/eye.png" // Use the single eye icon
                          alt={showPassword ? 'Hide password' : 'Show password'}
                          width={20}
                          height={20}
                        /> 
                      </IconButton>
                    </InputAdornment> 
                  ),
                  sx: {
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderRadius: '30px',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '1px solid #FFFFFF',
                      },
                      '&:hover fieldset': {
                        border: '1px solid #FFFFFF',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid #FFFFFF',
                      },
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 2,
                    p: 2,
                    backgroundColor: '#F9A922',
                    '&:hover': { backgroundColor: '#F9A922' },
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'none',
                  }}
                >
                  Login
                </Button>
                <Link href="/forgot-password" color="error" sx={{ textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
                <Link href="/signup" color="primary" sx={{ textDecoration: 'none' }} mt={2}>
                  Dont have an account, Register
                </Link>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;