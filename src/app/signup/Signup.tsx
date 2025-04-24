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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import Image from 'next/image';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(''); // State for dropdown
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempted with:', { name, email, selectedOption, password });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container spacing={2} alignItems="center" justifyContent="space-around" width="100%">
        <Grid>
          <Box sx={{ textAlign: 'center' }}>
            <Image
              src="/Logo.png"
              alt="ERMM Logo"
              width={429}
              height={229}
            />
          </Box>
        </Grid>
        <Grid>
          <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 3 }}>
            <Typography variant="h5" gutterBottom color="#333333" fontWeight="700">
              Hello!
            </Typography>
            <Typography variant="subtitle1" color="#333333" gutterBottom fontWeight="400">
              Sign Up to Get Started
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Full Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image
                        src="/user.png"
                        alt="User Icon"
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
              
              {/* New Dropdown Field */}
              <FormControl fullWidth margin="normal">
                <Select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  displayEmpty
                  inputProps={{
                  
                  }}
                  sx={{
                    borderRadius: '30px',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                      borderRadius: '30px',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '1px solid #e0e0e0',
                      },
                      '&:hover fieldset': {
                        border: '1px solid #e0e0e0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid #e0e0e0',
                      },
                    },
                  }}
                //   startAdornment={
                //     <InputAdornment position="start">
                //       <Image
                //         src="/dropdownIcon.png"
                //         alt="Dropdown Icon"
                //         width={20}
                //         height={20}
                //       />
                //     </InputAdornment>
                //   }
                >
                  <MenuItem value="" disabled>
                    Select Role
                  </MenuItem>
                  <MenuItem value="aa">AA</MenuItem>
                  <MenuItem value="bb">BB</MenuItem>
                  <MenuItem value="cc">CC</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
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
                          src="/eye.png"
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
                        border: '1px solid #e0e0e0',
                      },
                      '&:hover fieldset': {
                        border: '1px solid #e0e0e0',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid #e0e0e0',
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
                  Sign Up
                </Button>
                <Link href="/login" color="error" sx={{ textDecoration: 'none', mt: 1 }}>
                  Already have an account? Login
                </Link>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;