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
} from '@mui/material';
import Image from 'next/image';
// import Logo from "./Logo.png"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2} alignItems="center" justifyContent={"space-around"} width={"100%"}>
        <Grid>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/Logo.png"
              alt="ERMM Logo"
              width={200}
              height={100}
            />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Raw Materials Simplified!
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box
            sx={{
              maxWidth: 400,
              margin: '0 auto',
              padding: 3,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Hello Again!
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <span role="img" aria-label="email">📧</span>
                    </Box>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1 }}>
                      <span role="img" aria-label="lock">🔒</span>
                    </Box>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  mb: 2,
                  backgroundColor: '#f4a261',
                  '&:hover': { backgroundColor: '#e07a5f' },
                }}
              >
                Login
              </Button>
              <Link href="/forgot-password" color="error" sx={{ textDecoration: 'none' }}>
                Forgot Password?
              </Link>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;