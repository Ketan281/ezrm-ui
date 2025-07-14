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
} from '@mui/material';
import Image from 'next/image';

const Forgot = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', { email });
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
      suppressHydrationWarning
    >
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-around"
        width="100%"
      >
        <Grid>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/Logo.png"
              alt="EZRM Logo"
              width={429}
              height={229}
              priority={true}
              style={{ objectFit: 'contain' }}
            />
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
            <Box display={'flex'} alignItems={'center'} mb={2}>
              <Image src="/back.png" alt="EZRM Logo" width={30} height={20} />
              <Link
                href="/login"
                color="#333"
                sx={{ textDecoration: 'none' }}
                ml={0.5}
                fontWeight={600}
              >
                Back to login
              </Link>
            </Box>
            <Typography
              variant="h5"
              gutterBottom
              color="#333333"
              fontWeight="700"
            >
              Forgot your Password?
            </Typography>
            <Typography
              variant="subtitle1"
              color="#333333"
              gutterBottom
              fontWeight="400"
              fontSize={'14px'}
              width={'100%'}
            >
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
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
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Forgot;
