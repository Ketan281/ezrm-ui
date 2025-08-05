'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  Avatar,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/api/services/products';
import {
  TableComponent,
  TableRowData,
} from '../../../../components/TableComponent';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

interface ProductRowData extends TableRowData {
  id: string;
  name: string;
  image: React.ReactNode;
  category: string;
  price: string;
  status: string;
  inStock: string;
  actions: React.ReactNode;
}

export default function ProductsListing() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const renderImage = (imageUrl: string) => {
    if (!imageUrl) {
      return (
        <Avatar sx={{ width: 40, height: 40, bgcolor: '#f0f0f0' }}>
          <ImageIcon sx={{ color: '#999' }} />
        </Avatar>
      );
    }

    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 1,
          overflow: 'hidden',
          cursor: 'pointer',
          border: '1px solid #e0e0e0',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
          },
        }}
        onClick={(e) => handleImageClick(imageUrl, e)}
      >
        <Image
          src={imageUrl}
          alt="Product"
          width={40}
          height={40}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.setAttribute('style', 'display: block');
          }}
        />
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#f0f0f0',
            display: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <ImageIcon sx={{ color: '#999' }} />
        </Avatar>
      </Box>
    );
  };

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'products',
      {
        page,
        search: debouncedSearchTerm,
        category: categoryFilter,
        status: statusFilter,
      },
    ],
    queryFn: () =>
      productService.getProducts({
        page,
        search: debouncedSearchTerm,
        category: categoryFilter,
        status: statusFilter,
      }),
  });

  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      return productService.deleteProduct(productId);
    },
    onSuccess: () => {
      toast.success('Product deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });

  const products = productsData?.products || [];
  const totalResults = productsData?.pagination?.total || 0;

  const renderActions = (productId: string) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleViewProduct(productId);
        }}
        sx={{ color: '#1976d2' }}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleEditProduct(productId);
        }}
        sx={{ color: '#ff9800' }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteProduct(productId);
        }}
        sx={{ color: '#f44336' }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const productData: ProductRowData[] = products.map((product: any) => ({
    id: product._id,
    name: product.name,
    image: renderImage(product.bannerImage || product.images?.[0] || ''),
    category: product?.category?.name || 'N/A',
    price: `$${product.price || 0}`,
    status: product.status || 'inactive',
    inStock: product.inStock ? 'Yes' : 'No',
    actions: renderActions(product?._id),
  }));

  const columns = [
    { id: 'image', label: 'Image', width: '10%', align: 'center' as const },
    { id: 'name', label: 'Product Name', width: '20%' },
    { id: 'category', label: 'Category', width: '15%' },
    { id: 'price', label: 'Price', width: '12%', align: 'center' as const },
    {
      id: 'status',
      label: 'Status',
      width: '12%',
      type: 'status' as const,
      align: 'center' as const,
    },
    {
      id: 'inStock',
      label: 'In Stock',
      width: '12%',
      align: 'center' as const,
    },
    { id: 'actions', label: 'Actions', width: '19%', align: 'center' as const },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (row: TableRowData) => {
    const productRow = row as ProductRowData;
    router.push(`/admin/data-management/products/${productRow.id}`);
  };

  const handleAddProduct = () => {
    router.push('/admin/data-management/products/add');
  };

  const handleEditProduct = (productId: string) => {
    router.push(`/admin/data-management/products/${productId}/edit`);
  };

  const handleViewProduct = (productId: string) => {
    router.push(`/admin/data-management/products/${productId}`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const handleImageClick = (imageUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setImageModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete);
    }
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Sports Nutrition', label: 'Sports Nutrition' },
    { value: 'Bioactives', label: 'Bioactives' },
    { value: 'Nootropics', label: 'Nootropics' },
    { value: 'Amino Acids', label: 'Amino Acids' },
    { value: 'Vitamins', label: 'Vitamins' },
    { value: 'Minerals', label: 'Minerals' },
  ];

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: '#F9FAFB',
        minHeight: '85vh',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1F2A44',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          Products Listing ({totalResults})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddProduct}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Add Product
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load products. Please try again.
        </Alert>
      )}

      {/* Filters */}
      {!isLoading && !error && (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              value={categoryFilter}
              onChange={(e: any) => setCategoryFilter(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiSelect-select': { fontFamily: 'Poppins, sans-serif' },
              }}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiSelect-select': { fontFamily: 'Poppins, sans-serif' },
              }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {!isLoading && !error && (
        <TableComponent
          columns={columns}
          data={productData}
          totalResults={totalResults}
          currentPage={page}
          onPageChange={handlePageChange}
          onRowClick={handleRowClick}
          showCheckboxes={false}
          showHeader={true}
          rowsPerPage={10}
          searchOptions={{
            value: searchTerm,
            onChange: setSearchTerm,
            placeholder: 'Search products...',
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleteProductMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleteProductMutation.isPending}
            startIcon={
              deleteProductMutation.isPending ? (
                <CircularProgress size={16} />
              ) : null
            }
          >
            {deleteProductMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Modal */}
      <Dialog
        open={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
          },
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <Typography variant="h6">Product Image</Typography>
          <IconButton onClick={() => setImageModalOpen(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 400,
              backgroundColor: '#f5f5f5',
            }}
          >
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Product"
                width={600}
                height={400}
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: '#999',
                }}
              >
                <ImageIcon sx={{ fontSize: 64, mb: 2 }} />
                <Typography>No image available</Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
