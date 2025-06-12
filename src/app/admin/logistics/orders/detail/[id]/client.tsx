"use client"

import React from "react"
import Image from "next/image"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Grid,
  Divider,
  Stack,
  Chip,
  Avatar
} from '@mui/material'
import {
  LocalShipping,
  Receipt,
  CreditCard
} from '@mui/icons-material'

interface StatusDotProps {
  isActive?: boolean
  isCompleted?: boolean
}

const StatusDot = ({ isActive, isCompleted }: StatusDotProps) => (
  <Box
    sx={{
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: isActive ? '#f59e0b' : isCompleted ? '#6b7280' : '#e5e7eb',
      border: !isActive && !isCompleted ? '2px solid #e5e7eb' : 'none'
    }}
  />
)

interface OrderTrackingClientProps {
  id: string
}

export function OrderTrackingClient({ id }: OrderTrackingClientProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 3, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 3 }}>
        Track The Order
      </Typography>

      {/* Order Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                Order ID: {id}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Order date:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Feb 16, 2022 |
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <LocalShipping sx={{ fontSize: 16, color: '#10b981' }} />
                  <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 500 }}>
                    Estimated delivery: May 16, 2022
                  </Typography>
                </Stack>
              </Stack>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<Receipt />}
                sx={{ textTransform: 'none' }}
              >
                Invoice
              </Button>
              <Button
                variant="contained"
                sx={{ 
                  backgroundColor: '#f59e0b',
                  '&:hover': { backgroundColor: '#d97706' },
                  textTransform: 'none'
                }}
              >
                Track order
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Progress Tracker */}
      <Card sx={{ mb: 3, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ position: 'relative', px: 4, mb: 4 }}>
            {/* Progress Line */}
            <Box
              sx={{
                position: 'absolute',
                top: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '75%',
                height: '1px'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  width: '16.67%',
                  height: '1px',
                  backgroundColor: '#6b7280'
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  left: '16.67%',
                  right: 0,
                  height: '1px',
                  backgroundColor: '#e5e7eb'
                }}
              />
            </Box>

            {/* Status Steps */}
            <Stack direction="row" justifyContent="space-between" sx={{ position: 'relative', zIndex: 10 }}>
              <Stack alignItems="center" sx={{ width: '25%' }}>
                <StatusDot isActive={true} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                    color: '#f59e0b',
                    textAlign: 'center'
                  }}
                >
                  Order Confirmed
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Wed, 11th Jan
                </Typography>
              </Stack>

              <Stack alignItems="center" sx={{ width: '25%' }}>
                <StatusDot />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                    color: '#6b7280',
                    textAlign: 'center'
                  }}
                >
                  Shipped
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Wed, 11th Jan
                </Typography>
              </Stack>

              <Stack alignItems="center" sx={{ width: '25%' }}>
                <StatusDot />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                    color: '#6b7280',
                    textAlign: 'center'
                  }}
                >
                  Out For Delivery
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Wed, 11th Jan
                </Typography>
              </Stack>

              <Stack alignItems="center" sx={{ width: '25%' }}>
                <StatusDot />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                    color: '#6b7280',
                    textAlign: 'center'
                  }}
                >
                  Delivered
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Expected by, Mon 16th
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      {/* Map Section */}
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
        Items Ordered
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 320,
          mb: 3,
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#f3f4f6'
        }}
      >
        <Image
          src="/map.png"
          alt="Delivery route map"
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      </Box>

      {/* Order Details */}
      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Items List */}
          <Stack spacing={2} sx={{ mb: 4 }}>
            {[1, 2].map((item, index) => (
              <React.Fragment key={index}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundColor: '#f3f4f6'
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: '#d1d5db',
                          borderRadius: 0.5
                        }}
                      />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Vitamin
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        T-floral ipsum
                      </Typography>
                    </Box>
                  </Stack>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" color="text.secondary">
                      Qty: 234
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      $1234.89
                    </Typography>
                  </Box>
                </Stack>
                {index < 1 && <Divider />}
              </React.Fragment>
            ))}
          </Stack>

          {/* Bottom Section */}
          <Grid container spacing={16}>
            {/* Payment */}
            <Grid>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Payment
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Visa **56
                </Typography>
                <CreditCard sx={{ color: '#2563eb' }} />
              </Stack>
            </Grid>

            {/* Delivery */}
            <Grid>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Delivery
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  847 Jewess Bridge Apt. 174
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  London, UK 474-769-3919
                </Typography>
              </Stack>
            </Grid>

            {/* Order Summary */}
            <Grid width={330}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e293b', mb: 2 }}>
                Order Summary
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between" >
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    $5554
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#10b981' }}>
                    (20%) - $1109.40
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Delivery
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    $0.00
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Tax
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    +$221.88
                  </Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Total
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    $4666.48
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}