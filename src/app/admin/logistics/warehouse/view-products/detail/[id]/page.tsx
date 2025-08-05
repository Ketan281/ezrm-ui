'use client';

import type React from 'react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Button,
  TextField,
  Rating,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { warehouseStockService } from '@/api/services/warehouseStock';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const stockId = params.id as string;

  const [quantity, setQuantity] = useState(100);
  const [selectedWeight, setSelectedWeight] = useState('1.5 kg');

  // Fetch warehouse stock details
  const {
    data: stockData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['warehouse-stock-detail', stockId],
    queryFn: () => warehouseStockService.getWarehouseStockById(stockId),
    enabled: !!stockId,
  });

  const stockItem = stockData?.data;
  const product = stockItem?.productId;
  const warehouse = stockItem?.warehouseId;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 2 }}>
        <Box
          sx={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 2 }}>
        <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load stock details. Please try again.
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 2 }}>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <Box sx={{ mb: 2, p: 2 }}>
          {/* Back Button Row */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <IconButton sx={{ p: 0, mr: 1 }} onClick={() => router.back()}>
              <ArrowBackIcon sx={{ fontSize: '20px', color: '#666' }} />
            </IconButton>
            <Typography sx={{ fontSize: '16px', color: '#666' }}>
              Back
            </Typography>
          </Box>

          {/* View Product and Transfer Button Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1976d2',
              }}
            >
              View Stock/
              <Typography
                component="span"
                sx={{ color: '#666', fontWeight: 'normal' }}
              >
                {product?.name || 'Product Name'}
              </Typography>
            </Typography>

            <Button
              sx={{
                backgroundColor: '#ff9800',
                color: 'white',
                textTransform: 'none',
                borderRadius: '20px',
                px: 3,
                py: 1,
                fontSize: '14px',
                '&:hover': {
                  backgroundColor: '#f57c00',
                },
              }}
            >
              Transfer To Inventory
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Paper
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            {/* Left Column - Image */}
            <Box sx={{ width: '320px' }}>
              <Image
                src="/productDetail.png"
                alt="Product Image"
                width={320}
                height={500}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </Box>

            {/* Right Column - Product Details */}
            <Box sx={{ flex: 1, p: 3 }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: '600',
                  mb: 1,
                  color: '#333',
                }}
              >
                {product?.name || 'Product Name'}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={product?.category || 'Category'}
                  sx={{
                    fontSize: '12px',
                    color: '#4caf50',
                    mr: 2,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    backgroundColor: '#e8f5e8',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Chip
                    label={stockItem?.qcPassed ? 'QC Passed' : 'QC Pending'}
                    size="small"
                    color={stockItem?.qcPassed ? 'success' : 'warning'}
                    sx={{ mr: 1 }}
                  />
                  <Typography sx={{ fontSize: '14px', color: '#666' }}>
                    Slot: {stockItem?.slotName || 'N/A'}
                  </Typography>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  mb: 1,
                  color: '#333',
                }}
              >
                Description:
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: '14px', mb: 1, color: '#666' }}>
                  {product?.description || 'No description available.'}
                </Typography>
              </Box>

              {/* Thumbnail Images */}
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                {[1, 2, 3].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      backgroundColor: item === 1 ? '#333' : '#ccc',
                    }}
                  >
                    <Image
                      src="/productDetail.png"
                      alt={`Thumbnail ${item}`}
                      width={50}
                      height={50}
                      style={{
                        objectFit: 'cover',
                        opacity: item === 1 ? 1 : item === 2 ? 0.5 : 0.2,
                      }}
                    />
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#333',
                  }}
                >
                  Stock Information:
                </Typography>
                <IconButton sx={{ p: 0 }}>
                  <CloseIcon sx={{ fontSize: '20px', color: '#666' }} />
                </IconButton>
              </Box>

              {/* Stock Details Row */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  mb: 3,
                }}
              >
                <Typography
                  sx={{ fontSize: '14px', color: '#333', minWidth: '30px' }}
                >
                  Total:
                </Typography>

                <TextField
                  value={stockItem?.quantityTotal || 0}
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      height: '32px',
                      '& input': {
                        textAlign: 'center',
                        padding: '6px',
                      },
                    },
                  }}
                />

                <Typography
                  sx={{ fontSize: '14px', color: '#333', minWidth: '40px' }}
                >
                  Available:
                </Typography>

                <TextField
                  value={stockItem?.quantityAvailable || 0}
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      height: '32px',
                      '& input': {
                        textAlign: 'center',
                        padding: '6px',
                      },
                    },
                  }}
                />

                <Typography
                  sx={{ fontSize: '14px', color: '#333', minWidth: '40px' }}
                >
                  Reserved:
                </Typography>

                <TextField
                  value={stockItem?.quantityReserved || 0}
                  variant="outlined"
                  size="small"
                  InputProps={{ readOnly: true }}
                  sx={{
                    width: '80px',
                    '& .MuiOutlinedInput-root': {
                      height: '32px',
                      '& input': {
                        textAlign: 'center',
                        padding: '6px',
                      },
                    },
                  }}
                />

                <Button
                  sx={{
                    backgroundColor: '#ff9800',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: '20px',
                    px: 1.5,
                    py: 1,
                    fontSize: '10px',
                    '&:hover': {
                      backgroundColor: '#f57c00',
                    },
                  }}
                >
                  Transfer To Inventory
                </Button>
              </Box>

              {/* Warehouse Information */}
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  mb: 2,
                  color: '#333',
                }}
              >
                Warehouse Information
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label={`Warehouse: ${warehouse?.name || 'N/A'}`}
                  sx={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    fontWeight: '500',
                  }}
                />
                <Chip
                  label={`Slot: ${stockItem?.slotName || 'N/A'}`}
                  sx={{
                    backgroundColor: '#fff3e0',
                    color: '#f57c00',
                    fontWeight: '500',
                  }}
                />
                <Chip
                  label={`Price: $${product?.price || 0}`}
                  sx={{
                    backgroundColor: '#e8f5e8',
                    color: '#4caf50',
                    fontWeight: '500',
                  }}
                />
                <Chip
                  label={`Status: ${product?.status || 'N/A'}`}
                  sx={{
                    backgroundColor:
                      product?.status === 'active' ? '#e8f5e8' : '#ffebee',
                    color: product?.status === 'active' ? '#4caf50' : '#f44336',
                    fontWeight: '500',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
