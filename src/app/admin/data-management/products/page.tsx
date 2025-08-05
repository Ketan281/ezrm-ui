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

interface ProductRowData extends TableRowData {
  id: string;
  name: string;
  category: string;
  price: string;
  status: string;
  inStock: string;
  actions: string;
}

export default function ProductsListing() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

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
    queryKey: ['products', { page, search: debouncedSearchTerm }],
    queryFn: () =>
      productService.getProducts({ page, search: debouncedSearchTerm }),
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
  const totalResults = productsData?.total || 0;

  const productData: ProductRowData[] = products.map((product: any) => ({
    id: product._id,
    name: product.name,
    category: product.category || 'N/A',
    price: `$${product.price || 0}`,
    status: product.status || 'inactive',
    inStock: product.inStock ? 'Yes' : 'No',
    actions: product._id,
  }));

  const columns = [
    { id: 'name', label: 'Product Name', width: '25%' },
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
    { id: 'actions', label: 'Actions', width: '24%', align: 'center' as const },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (row: ProductRowData) => {
    router.push(`/admin/data-management/products/${row.id}`);
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

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProductMutation.mutate(productToDelete);
    }
  };

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

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
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
          filterOptions={{
            value: '',
            onChange: () => {},
            options: statusOptions,
          }}
          renderCustomCell={(column, value, row) => {
            if (column.id === 'actions') {
              return renderActions(value);
            }
            if (column.id === 'status') {
              return (
                <Chip
                  label={value}
                  size="small"
                  color={value === 'active' ? 'success' : 'default'}
                />
              );
            }
            return value;
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
    </Box>
  );
}
