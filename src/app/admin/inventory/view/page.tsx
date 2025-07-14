'use client';

// Import React and useState for managing state
import React, { useState } from 'react';

// Import Material-UI components for layout, typography, buttons, and grid
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';

// Import Next.js Image component for rendering images
import Image from 'next/image';

// Import useRouter from Next.js for navigation
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/api/services/products';

// Sample product data (replace with actual data source)
const products = [
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
  { id: '123456', description: 'Vitamin E-Capsuel-100mg', isHighlighted: true }, // Highlighted product
  {
    id: '123456',
    description: 'Vitamin E-Capsuel-100mg',
    isHighlighted: false,
  },
];

// Define the ViewProductPage component
export default function ViewProductPage() {
  // Initialize router for navigation
  const router = useRouter();

  const { data, isFetching } = useQuery({
    queryKey: ['products', { page: 1, limit: 10, search: '' }],
    queryFn: productsService.getProducts,
  });

  console.log(data, 'View All Products');

  // State for filter dropdown
  const [filter, setFilter] = useState('');
  const handleProductClick = (productId: string) => {
    router.push(`view/detail/${productId}`);
  };
  // Main container for the page
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: '#F9FAFB',
        minHeight: '85vh',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Header Section with Back button and title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => router.back()}
        >
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography
            sx={{
              ml: 1,
              color: '#737791',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Back
          </Typography>
        </Box>
      </Box>
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1F2A44',
          mb: 2,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        View All Products
      </Typography>

      {/* Filter Section - Modified to use true placeholder */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 150 }}>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span
                    style={{
                      color: '#737791',
                      fontSize: '14px',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    FILTER
                  </span>
                );
              }
              return selected;
            }}
            sx={{
              height: '40px',
              fontSize: '14px',
              color: '#737791',
              fontFamily: 'Poppins, sans-serif',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
            }}
          >
            <MenuItem
              value="Product ID"
              sx={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Product ID
            </MenuItem>
            <MenuItem
              value="Product Name"
              sx={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Product Name
            </MenuItem>
            <MenuItem
              value="Category"
              sx={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Category
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={5} width={'100%'}>
        {products.map((product, index) => (
          <Grid key={index}>
            <Paper
              elevation={1}
              onClick={() => handleProductClick(product.id)}
              sx={{
                borderRadius: '10px',
                overflow: 'hidden',
                border: product.isHighlighted ? '2px solid #3B82F6' : 'none',
                p: 2,
              }}
            >
              {/* Product Image */}
              <Box sx={{ width: '100%', height: '150px', overflow: 'hidden' }}>
                <Image
                  src="/firstImage.png"
                  alt={product.description}
                  width={300}
                  height={150}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Box>
              {/* Product Details */}
            </Paper>
            <Box
              sx={{
                p: 1,
                background: index === 0 ? '#F5A623' : 'transparent',
                mt: 1,
                borderRadius: '10px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#737791',
                  fontFamily: 'Poppins, sans-serif',
                  backgroundColor: index === 0 ? '#F5A623' : 'transparent',
                  //   display: 'inline-block',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                Product Id: {product.id}
              </Typography>
              <Typography
                sx={{
                  fontSize: '12px',
                  color: '#737791',
                  fontFamily: 'Poppins, sans-serif',
                  mt: 1,
                }}
              >
                {product.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
