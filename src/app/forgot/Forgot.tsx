/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
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
  Alert,
  CircularProgress,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ForgotPassword = () => {
  const router = useRouter();
  
  // State for step management
  const [currentStep, setCurrentStep] = useState<'forgot' | 'set'>('forgot');
  const [userEmail, setUserEmail] = useState('');
  
  // Forgot password states
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  
  // Set password states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Form validation states for set password
  const [passwordErrors, setPasswordErrors] = useState({
    password: '',
    confirmPassword: '',
    otp: '',
  });
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Password form validation
  const validatePasswordForm = (): boolean => {
    const newErrors = {
      password: '',
      confirmPassword: '',
      otp: '',
    };

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!otp) {
      newErrors.otp = 'OTP is required';
    } else if (otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = 'OTP must contain only numbers';
    }

    setPasswordErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword && !newErrors.otp;
  };

  // API call function for reset request
  const requestPasswordReset = async (email: string) => {
    try {
      const response = await fetch('http://localhost:5007/api/v1/auth/password/reset-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset request');
      }

      return response.json();
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.error || 
        'Failed to send reset request'
      );
    }
  };

  // API call function for password reset verification
  const verifyPasswordReset = async (email: string, otp: string, newPassword: string) => {
    try {
      const response = await axios.post('http://localhost:5007/api/v1/auth/password/reset-verify', {
        email: email,
        otp: otp,
        newPassword: newPassword,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 
        error.response?.data?.error || 
        'Failed to verify password reset'
      );
    }
  };

  // Handle forgot password form submission
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    try {
      await requestPasswordReset(email.trim());
      
      setSuccess('Password reset OTP has been sent to your email address.');
      setUserEmail(email.trim());
      
      // Switch to set password step after short delay
      setTimeout(() => {
        setCurrentStep('set');
        setSuccess(''); // Clear success message when switching
      }, 2000);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle set password form submission
  const handleSetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePasswordForm()) return;
    
    if (!userEmail) {
      setError('Email not found. Please restart the password reset process.');
      return;
    }

    setIsLoading(true);

    try {
      await verifyPasswordReset(userEmail, otp, password);
      
      setSuccess('Password has been reset successfully! Redirecting to login...');
      
      // Clear form
      setPassword('');
      setConfirmPassword('');
      setOtp('');
      
      // Redirect to login
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
    if (error) {
      setError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordErrors.password) {
      setPasswordErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (passwordErrors.confirmPassword) {
      setPasswordErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
    if (passwordErrors.otp) {
      setPasswordErrors(prev => ({ ...prev, otp: '' }));
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  // Handle back navigation
  const handleBackToForgot = () => {
    setCurrentStep('forgot');
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
    setOtp('');
    setPasswordErrors({ password: '', confirmPassword: '', otp: '' });
  };

  // Calculate disabled states
  const isForgotButtonDisabled = isLoading || !email.trim() || !!success;
  const isSetButtonDisabled = isLoading || !userEmail;

  if (!isClient) {
    return null;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
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
            {/* Conditional Rendering Based on Current Step */}
            {currentStep === 'forgot' ? (
              // FORGOT PASSWORD FORM
              <>
                <Box display={'flex'} alignItems={'center'} mb={2}>
                  <Image src="/back.png" alt="Back Icon" width={30} height={20} />
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
                  Dont worry, happens to all of us. Enter your email below to
                  recover your password
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                  </Alert>
                )}

                <form onSubmit={handleForgotSubmit}>
                  <TextField
                    fullWidth
                    placeholder="Email Address"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    disabled={isLoading}
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
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: emailError ? '#f44336' : '#e0e0e0',
                          borderRadius: '30px',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: emailError ? '#f44336' : '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: emailError ? '#f44336' : '#e0e0e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: emailError ? '#f44336' : '#1976d2',
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
                      disabled={isForgotButtonDisabled}
                      sx={{
                        mt: 2,
                        mb: 2,
                        p: 2,
                        backgroundColor: '#F9A922',
                        '&:hover': { backgroundColor: '#E6951D' },
                        '&:disabled': { 
                          backgroundColor: '#cccccc',
                          color: '#666666'
                        },
                        borderRadius: '30px',
                        fontWeight: 700,
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'none',
                        position: 'relative',
                      }}
                    >
                      {isLoading && (
                        <CircularProgress
                          size={20}
                          sx={{
                            color: '#fff',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginLeft: '-10px',
                            marginTop: '-10px',
                          }}
                        />
                      )}
                      {isLoading ? 'Sending...' : success ? 'Redirecting...' : 'Submit'}
                    </Button>
                  </Box>
                </form>

                {success && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ 
                      display: 'block', 
                      textAlign: 'center', 
                      mt: 1,
                      fontSize: '12px'
                    }}
                  >
                    Please wait while we prepare the password reset form...
                  </Typography>
                )}

                {!success && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ 
                      display: 'block', 
                      textAlign: 'center', 
                      mt: 1,
                      fontSize: '12px'
                    }}
                  >
                    After submitting, you will receive an OTP to reset your password.
                  </Typography>
                )}
              </>
            ) : (
              // SET PASSWORD FORM
              <>
                <Box display={'flex'} alignItems={'center'} mb={2}>
                  <Image src="/back.png" alt="Back Icon" width={30} height={20} />
                  <Button
                    onClick={handleBackToForgot}
                    sx={{ 
                      color: "#333",
                      textDecoration: 'none',
                      ml: 0.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      minWidth: 'auto',
                      padding: 0,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Back to email entry
                  </Button>
                </Box>

                <Typography
                  variant="h5"
                  gutterBottom
                  color="#333333"
                  fontWeight="700"
                >
                  Set a password
                </Typography>
                
                <Typography
                  variant="subtitle1"
                  color="#333333"
                  gutterBottom
                  fontWeight="400"
                  fontSize="14px"
                  width="100%"
                >
                  Enter the OTP sent to your email and set a new password for your account.
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                  </Alert>
                )}

                <form onSubmit={handleSetPasswordSubmit}>
                  {/* Email Field - Pre-filled and Disabled */}
                  <TextField
                    fullWidth
                    placeholder="Email Address"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={userEmail}
                    disabled={true}
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
                        backgroundColor: '#f5f5f5',
                        '& fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#e0e0e0',
                        },
                        '&.Mui-disabled': {
                          backgroundColor: '#f5f5f5',
                          '& .MuiInputBase-input': {
                            color: '#666666',
                            '-webkit-text-fill-color': '#666666',
                          },
                        },
                      },
                    }}
                  />

                  {/* OTP Field */}
                  <TextField
                    fullWidth
                    placeholder="Enter OTP (6 digits)"
                    type="text"
                    variant="outlined"
                    margin="normal"
                    value={otp}
                    onChange={handleOtpChange}
                    error={!!passwordErrors.otp}
                    helperText={passwordErrors.otp}
                    disabled={isLoading}
                    inputProps={{ maxLength: 6 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Image
                            src="/lockIcon.png"
                            alt="OTP Icon"
                            width={20}
                            height={20}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: passwordErrors.otp ? '#f44336' : '#e0e0e0',
                          borderRadius: '30px',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: passwordErrors.otp ? '#f44336' : '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: passwordErrors.otp ? '#f44336' : '#e0e0e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: passwordErrors.otp ? '#f44336' : '#1976d2',
                        },
                      },
                    }}
                  />

                  {/* Create Password Field */}
                  <TextField
                    fullWidth
                    placeholder="Create Password"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!passwordErrors.password}
                    helperText={passwordErrors.password}
                    disabled={isLoading}
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
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                            onClick={handleTogglePasswordVisibility}
                            edge="end"
                            disabled={isLoading}
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
                          borderColor: passwordErrors.password ? '#f44336' : '#e0e0e0',
                          borderRadius: '30px',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: passwordErrors.password ? '#f44336' : '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: passwordErrors.password ? '#f44336' : '#e0e0e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: passwordErrors.password ? '#f44336' : '#1976d2',
                        },
                      },
                    }}
                  />

                  {/* Confirm Password Field */}
                  <TextField
                    fullWidth
                    placeholder="Re-enter Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    variant="outlined"
                    margin="normal"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!passwordErrors.confirmPassword}
                    helperText={passwordErrors.confirmPassword}
                    disabled={isLoading}
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
                            aria-label={
                              showConfirmPassword ? 'Hide password' : 'Show password'
                            }
                            onClick={handleToggleConfirmPasswordVisibility}
                            edge="end"
                            disabled={isLoading}
                          >
                            <Image
                              src="/eye.png"
                              alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                              width={20}
                              height={20}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: passwordErrors.confirmPassword ? '#f44336' : '#e0e0e0',
                          borderRadius: '30px',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '30px',
                        '& fieldset': {
                          borderColor: passwordErrors.confirmPassword ? '#f44336' : '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: passwordErrors.confirmPassword ? '#f44336' : '#e0e0e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: passwordErrors.confirmPassword ? '#f44336' : '#1976d2',
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
                      disabled={isSetButtonDisabled}
                      sx={{
                        mt: 2,
                        mb: 2,
                        p: 2,
                        backgroundColor: '#F9A922',
                        '&:hover': { backgroundColor: '#E6951D' },
                        '&:disabled': { backgroundColor: '#cccccc' },
                        borderRadius: '30px',
                        fontWeight: 700,
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'none',
                        position: 'relative',
                      }}
                    >
                      {isLoading && (
                        <CircularProgress
                          size={20}
                          sx={{
                            color: '#fff',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            marginLeft: '-10px',
                            marginTop: '-10px',
                          }}
                        />
                      )}
                      {isLoading ? 'Setting Password...' : 'Set Password'}
                    </Button>
                  </Box>
                </form>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ 
                    display: 'block', 
                    textAlign: 'center', 
                    mt: 1,
                    fontSize: '12px'
                  }}
                >
                  Enter the 6-digit OTP sent to: {userEmail}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
