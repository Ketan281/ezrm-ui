'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as CartIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { customerService } from '@/api/services/customers';

interface WishlistTabProps {
  customerId: string;
}

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images?: string[];
    sku?: string;
    description?: string;
    category?: string;
    inStock?: boolean;
  };
  addedAt: string;
}

// Interface available for future type checking
// interface WishlistData {
//   success: boolean;
//   data: {
//     items: WishlistItem[];
//     totalItems: number;
//     customerId: string;
//   };
// }

export default function WishlistTab({ customerId }: WishlistTabProps) {
  const {
    data: wishlistData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['customerWishlist', customerId],
    queryFn: () => customerService.getCustomerWishlist(customerId),
    enabled: !!customerId,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : 'Failed to load wishlist data'}
        </Alert>
      </Box>
    );
  }

  const wishlist = wishlistData?.data;
  const wishlistItems = wishlist?.items || [];

  if (!wishlist || wishlistItems.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          Wishlist is Empty
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This customer has no items in their wishlist.
        </Typography>
      </Box>
    );
  }

  const totalValue = wishlistItems.reduce(
    (sum, item) => sum + (item.product.price || 0),
    0
  );

  return (
    <Box sx={{ p: 2 }}>
      {/* Wishlist Summary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="error.main" gutterBottom>
                {wishlist.totalItems}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" gutterBottom>
                {formatCurrency(totalValue)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Value
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="info.main" gutterBottom>
                {wishlistItems.filter((item) => item.product.inStock).length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                In Stock
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Wishlist Items */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <FavoriteIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Wishlist Items
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Category</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Stock Status</TableCell>
                  <TableCell align="center">Added Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {wishlistItems.map((item) => (
                  <TableRow key={item._id} hover>
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Avatar
                          src={item.product.images?.[0]}
                          sx={{ width: 60, height: 60 }}
                          variant="rounded"
                        >
                          {item.product.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" component="div">
                            {item.product.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            SKU: {item.product.sku || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {item.product._id}
                          </Typography>
                          {item.product.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5, maxWidth: 300 }}
                            >
                              {item.product.description.length > 100
                                ? `${item.product.description.substring(0, 100)}...`
                                : item.product.description}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={item.product.category || 'Uncategorized'}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="subtitle2" color="success.main">
                        {formatCurrency(item.product.price || 0)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          item.product.inStock ? 'In Stock' : 'Out of Stock'
                        }
                        size="small"
                        color={item.product.inStock ? 'success' : 'error'}
                        variant={item.product.inStock ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(item.addedAt)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          justifyContent: 'center',
                        }}
                      >
                        <IconButton
                          size="small"
                          title="View Product"
                          sx={{ color: 'primary.main' }}
                        >
                          <ViewIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          title="Add to Cart"
                          sx={{ color: 'success.main' }}
                          disabled={!item.product.inStock}
                        >
                          <CartIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          title="Remove from Wishlist"
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Wishlist Actions */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total {wishlistItems.length} items with estimated value of{' '}
                <Typography
                  component="span"
                  color="success.main"
                  fontWeight="medium"
                >
                  {formatCurrency(totalValue)}
                </Typography>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<CartIcon />}
                size="small"
                disabled={
                  wishlistItems.filter((item) => item.product.inStock)
                    .length === 0
                }
              >
                Add All to Cart
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                size="small"
              >
                Clear Wishlist
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
