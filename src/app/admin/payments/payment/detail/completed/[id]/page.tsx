'use client';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function CompletedDetails() {
  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        sx={{
          color: '#637381',
          textTransform: 'none',
          fontWeight: 500,
          mb: 1,
          mt: 0,
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#212B36',
          },
        }}
      >
        Back
      </Button>

      {/* Page title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: '#212B36',
          mb: 3,
        }}
      >
        Completed payment
      </Typography>

      <Box sx={{ display: 'flex', gap: 5, maxWidth: '950px', width: '100%' }}>
        {/* Left Section */}
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
            padding: '24px',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              sx={{
                bgcolor: '#1e3a5f',
                width: 56,
                height: 56,
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              R
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', fontSize: '16px' }}
              >
                Robin Bask
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontSize: '14px' }}
              >
                India
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ mt: 3, ml: 8 }}>
            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon
                  sx={{ color: '#666', fontSize: '18px', minWidth: '20px' }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#666', fontSize: '14px' }}
                >
                  +91 8804789784
                </Typography>
              </Box>
            </Grid>

            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon
                  sx={{ color: '#666', fontSize: '18px', minWidth: '20px' }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#666', fontSize: '14px' }}
                >
                  randhrpol@gmail.com
                </Typography>
              </Box>
            </Grid>

            <Grid>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <LocationOnIcon
                  sx={{
                    color: '#666',
                    fontSize: '18px',
                    minWidth: '20px',
                    mt: '2px',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: '#666', fontSize: '14px' }}
                >
                  Lorem ipsum garden, high street, jungi - 678004
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Right Section */}
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            width: '350px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                mb: 1,
                alignItems: 'Center',
              }}
            >
              <Image
                src="/completed.png"
                alt="completed"
                height={50}
                width={50}
              />
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Payment Completed
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                mt: 2,
                ml: -1,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: '#666', fontWeight: 'bold' }}
              >
                Pay Date
              </Typography>
              <Typography variant="body2" sx={{}}>
                April 2 2025
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
      <Typography
        variant="h6"
        fontWeight="600"
        color="#1a365d"
        gutterBottom
        mt={3}
      >
        Track The Order
      </Typography>
      <Paper elevation={0} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        {[1, 2].map((item, index) => (
          <React.Fragment key={index}>
            <Grid container spacing={30} alignItems="center">
              <Grid display="flex" alignItems="center" gap={3}>
                <Avatar
                  variant="rounded"
                  sx={{ width: 50, height: 50, bgcolor: '#f0f0f0' }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight="700">
                    vitamin
                  </Typography>
                  <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                    T-floral ipsum
                  </Typography>
                </Box>
              </Grid>
              <Grid>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Qty: 234
                </Typography>
              </Grid>
              <Grid>
                <Typography variant="subtitle2" fontWeight="700">
                  $1234.89
                </Typography>
              </Grid>
            </Grid>
            {index < 1 && <Divider sx={{ my: 2 }} />}
          </React.Fragment>
        ))}
        <Grid container spacing={18} sx={{ mt: 5 }}>
          <Grid>
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color="#1a365d"
                sx={{ mb: 2 }}
              >
                Payment
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Visa **56
                </Typography>
                <Image src="/visa.png" alt="EZRM Logo" width={30} height={35} />
              </Box>
            </Box>
          </Grid>

          <Grid>
            <Box>
              <Typography
                variant="h6"
                fontWeight="700"
                color="#1a365d"
                sx={{ mb: 2 }}
              >
                Delivery
              </Typography>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                Address
              </Typography>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                847 Jewess Bridge Apt. 174
              </Typography>
              <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                London, UK 474-769-3919
              </Typography>
            </Box>
          </Grid>

          <Grid>
            <Typography
              variant="h6"
              fontWeight="700"
              color="#1a365d"
              sx={{ mb: 2 }}
            >
              Order Summary
            </Typography>
            <Box width={'25vw'}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Subtotal
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  color="rgba(102, 112, 133, 1)"
                >
                  $5554
                </Typography>
              </Box>

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Discount
                </Typography>
                <Typography variant="body2" fontWeight="500" color="#4caf50">
                  (20%) - $1109.40
                </Typography>
              </Box>

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Delivery
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  color="rgba(102, 112, 133, 1)"
                >
                  $0.00
                </Typography>
              </Box>

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography variant="body2" color="rgba(102, 112, 133, 1)">
                  Tax
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  color="rgba(102, 112, 133, 1)"
                >
                  +$221.88
                </Typography>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  color="rgba(102, 112, 133, 1)"
                >
                  Total
                </Typography>
                <Typography
                  variant="subtitle2"
                  fontWeight="700"
                  color="rgba(102, 112, 133, 1)"
                >
                  $4666.48
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
