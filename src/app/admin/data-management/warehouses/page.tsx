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
import { warehouseService } from '@/api/services/warehouses';
import {
  TableComponent,
  TableRowData,
} from '../../../../components/TableComponent';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface WarehouseRowData extends TableRowData {
  id: string;
  name: string;
  uniqueId: string;
  manager: string;
  capacity: string;
  utilization: string;
  status: string;
  actions: string;
}

export default function WarehousesListing() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [warehouseToDelete, setWarehouseToDelete] = useState<string | null>(
    null
  );

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch warehouses
  const {
    data: warehousesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['warehouses', { page, search: debouncedSearchTerm }],
    queryFn: () =>
      warehouseService.getWarehouses({ page, search: debouncedSearchTerm }),
  });

  // Delete warehouse mutation
  const deleteWarehouseMutation = useMutation({
    mutationFn: async (warehouseId: string) => {
      return warehouseService.deleteWarehouse(warehouseId);
    },
    onSuccess: () => {
      toast.success('Warehouse deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['warehouses'] });
      setDeleteDialogOpen(false);
      setWarehouseToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete warehouse');
    },
  });

  const warehouses = warehousesData?.warehouses || [];
  const totalResults = warehousesData?.pagination?.total || 0;

  const warehouseData: WarehouseRowData[] = warehouses.map(
    (warehouse: any) => ({
      id: warehouse._id,
      name: warehouse.name,
      uniqueId: warehouse.uniqueId,
      manager: warehouse.manager,
      capacity: warehouse.capacity?.toLocaleString() || '0',
      utilization: `${warehouse.currentUtilization?.toLocaleString() || 0} / ${warehouse.capacity?.toLocaleString() || 0}`,
      status: warehouse.status,
      actions: warehouse._id,
    })
  );

  const columns = [
    { id: 'name', label: 'Warehouse Name', width: '20%' },
    { id: 'uniqueId', label: 'Unique ID', width: '15%' },
    { id: 'manager', label: 'Manager', width: '15%' },
    {
      id: 'capacity',
      label: 'Capacity',
      width: '12%',
      align: 'center' as const,
    },
    {
      id: 'utilization',
      label: 'Utilization',
      width: '15%',
      align: 'center' as const,
    },
    {
      id: 'status',
      label: 'Status',
      width: '10%',
      type: 'status' as const,
      align: 'center' as const,
    },
    { id: 'actions', label: 'Actions', width: '13%', align: 'center' as const },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowClick = (row: WarehouseRowData) => {
    router.push(`/admin/data-management/warehouses/${row.id}`);
  };

  const handleAddWarehouse = () => {
    router.push('/admin/data-management/warehouses/add');
  };

  const handleEditWarehouse = (warehouseId: string) => {
    router.push(`/admin/data-management/warehouses/${warehouseId}/edit`);
  };

  const handleViewWarehouse = (warehouseId: string) => {
    router.push(`/admin/data-management/warehouses/${warehouseId}`);
  };

  const handleDeleteWarehouse = (warehouseId: string) => {
    setWarehouseToDelete(warehouseId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (warehouseToDelete) {
      deleteWarehouseMutation.mutate(warehouseToDelete);
    }
  };

  const renderActions = (warehouseId: string) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleViewWarehouse(warehouseId);
        }}
        sx={{ color: '#1976d2' }}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleEditWarehouse(warehouseId);
        }}
        sx={{ color: '#ff9800' }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteWarehouse(warehouseId);
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
    { value: 'maintenance', label: 'Maintenance' },
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
          Warehouses Listing ({totalResults})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddWarehouse}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Add Warehouse
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load warehouses. Please try again.
        </Alert>
      )}

      {!isLoading && !error && (
        <TableComponent
          columns={columns}
          data={warehouseData}
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
            placeholder: 'Search warehouses...',
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
                  color={
                    value === 'active'
                      ? 'success'
                      : value === 'maintenance'
                        ? 'warning'
                        : 'default'
                  }
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
            Are you sure you want to delete this warehouse? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleteWarehouseMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleteWarehouseMutation.isPending}
            startIcon={
              deleteWarehouseMutation.isPending ? (
                <CircularProgress size={16} />
              ) : null
            }
          >
            {deleteWarehouseMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
