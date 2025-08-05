'use client';
import type React from 'react';
import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Pagination,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function ViewProductPage() {
  const router = useRouter();

  // State for filtering and pagination
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Use the simplified hook directly
  const { data, isLoading, error } = useProducts({
    page,
    limit: 12,
    search: filter === '' && searchValue ? searchValue : '',
    name: filter === 'Product Name' && searchValue ? searchValue : '',
    category: filter === 'Category' && searchValue ? searchValue : '',
  });

  const products = data?.data || [];

  const handleProductClick = (productId: string) => {
    router.push(`/products/view/detail/${productId}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleSearchClear = () => {
    setSearchValue('');
    setPage(1);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchValue(''); // Clear search when changing filter type
    setPage(1);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

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
          <Image
            src="/back.png?height=13&width=13"
            alt="Back"
            width={13}
            height={13}
          />
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
          fontWeight: 600,
          color: '#1A1A1A',
          mb: 3,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        View Products
      </Typography>

      {/* Search and Filter Section */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <Select
                value={filter}
                onChange={(e) => handleFilterChange(e.target.value)}
                displayEmpty
                sx={{
                  '& .MuiSelect-select': {
                    fontFamily: 'Poppins, sans-serif',
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Product Name">Product Name</MenuItem>
                <MenuItem value="Category">Category</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchValue && (
                  <InputAdornment position="end">
                    <Box
                      component="span"
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onClick={handleSearchClear}
                    >
                      <ClearIcon />
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Poppins, sans-serif',
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load products. Please try again.
        </Alert>
      )}

      {/* Products Grid */}
      {!isLoading && !error && (
        <>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Paper
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 3,
                    },
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  onClick={() => handleProductClick(product.id)}
                >
                  <Box sx={{ mb: 2, textAlign: 'center' }}>
                    {product.bannerImage ? (
                      <Image
                        src={product.bannerImage}
                        alt={product.name}
                        width={200}
                        height={150}
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 200,
                          height: 150,
                          bgcolor: '#f5f5f5',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                        }}
                      >
                        <Typography color="textSecondary">No Image</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      mb: 1,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    ${product.price}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: product.inStock ? '#4caf50' : '#f44336',
                        fontWeight: 600,
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {product.category}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {products.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(products.length / 12)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !error && products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontFamily: 'Poppins, sans-serif' }}
          >
            No products found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
