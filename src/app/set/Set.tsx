'use client';

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Grid,
    InputAdornment,
    IconButton,
} from '@mui/material';
import Image from 'next/image';

const Set = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    // Ensure this only runs on client side
    const [isClient, setIsClient] = useState(false);
    
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login attempted with:', { password });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    if (!isClient) return null; // Return nothing during SSR

    return (
        <Container
            maxWidth="lg"
            sx={{ 
                height: '100vh', 
                display: 'flex', 
                alignItems: 'center',
            }}
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
                            priority // Add priority for above-the-fold images
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
                      
                        <Typography variant="h5" gutterBottom color="#333333" fontWeight="700">
                            Set a password
                        </Typography>
                        <Typography variant="subtitle1" color="#333333" gutterBottom fontWeight="400" fontSize="14px" width="100%">
                        Your previous password has been reseted. Please set a new password for your account.
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                placeholder="Create Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                        borderRadius: '30px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                            borderRadius: '30px',
                                        },
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '30px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                placeholder="Re-enter Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                        borderRadius: '30px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                            borderRadius: '30px',
                                        },
                                    },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '30px',
                                        '& fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#e0e0e0',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#e0e0e0',
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
                                    Set Password
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Set;