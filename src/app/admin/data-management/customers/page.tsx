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
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerService } from '@/api/services/customers';
import {
  TableComponent,
  TableRowData,
} from '../../../../components/TableComponent';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

interface CustomerRowData extends TableRowData {
  id: string;
  name: string;
  uniqueId: string;
  contact: React.ReactNode;
  company: React.ReactNode;
  membershipTier: string;
  status: string;
  actions: React.ReactNode;
}

export default function CustomersListing() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [membershipFilter, setMembershipFilter] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch customers
  const {
    data: customersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'customers',
      {
        page,
        search: debouncedSearchTerm,
        status: statusFilter,
        membershipTier: membershipFilter,
      },
    ],
    queryFn: () =>
      customerService.getCustomers({
        page,
        search: debouncedSearchTerm,
        status: statusFilter,
        membershipTier: membershipFilter,
      }),
  });

  // Delete customer mutation
  const deleteCustomerMutation = useMutation({
    mutationFn: async (customerId: string) => {
      return customerService.deleteCustomer(customerId);
    },
    onSuccess: () => {
      toast.success('Customer deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete customer');
    },
  });

  const customers = customersData?.data || [];
  const totalResults = customersData?.total || 0;

  const renderContact = (customer: any) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <EmailIcon sx={{ fontSize: 12, color: '#666' }} />
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', color: '#666' }}
          >
            {customer?.email || 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PhoneIcon sx={{ fontSize: 12, color: '#666' }} />
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', color: '#666' }}
          >
            {customer?.phone || 'N/A'}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderCompany = (customer: any) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <BusinessIcon sx={{ fontSize: 12, color: '#666' }} />
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', color: '#666' }}
          >
            {customer?.companyName || customer?.name || 'N/A'}
          </Typography>
        </Box>
        {customer?.industry && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PersonIcon sx={{ fontSize: 12, color: '#666' }} />
            <Typography
              variant="caption"
              sx={{ fontSize: '10px', color: '#666' }}
            >
              {customer.industry}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  const renderActions = (customerId: string) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleViewCustomer(customerId);
        }}
        sx={{ color: '#1976d2' }}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleEditCustomer(customerId);
        }}
        sx={{ color: '#ff9800' }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteCustomer(customerId);
        }}
        sx={{ color: '#f44336' }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const customerData: CustomerRowData[] = customers.map((customer: any) => ({
    id: customer._id,
    name: customer.name,
    uniqueId: customer.uniqueId,
    contact: renderContact(customer),
    company: renderCompany(customer),
    membershipTier: customer.membershipTier,
    status: customer.status,
    actions: renderActions(customer._id),
  }));

  const columns = [
    { id: 'name', label: 'Customer Name', width: '15%' },
    { id: 'uniqueId', label: 'Unique ID', width: '12%' },
    { id: 'contact', label: 'Contact', width: '20%' },
    { id: 'company', label: 'Company', width: '20%' },
    {
      id: 'membershipTier',
      label: 'Membership',
      width: '12%',
      align: 'center' as const,
    },
    {
      id: 'status',
      label: 'Status',
      width: '10%',
      type: 'status' as const,
      align: 'center' as const,
    },
    { id: 'actions', label: 'Actions', width: '11%', align: 'center' as const },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleAddCustomer = () => {
    router.push('/admin/data-management/customers/add');
  };

  const handleEditCustomer = (customerId: string) => {
    router.push(`/admin/data-management/customers/${customerId}/edit`);
  };

  const handleViewCustomer = (customerId: string) => {
    router.push(`/admin/data-management/customers/${customerId}`);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomerToDelete(customerId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (customerToDelete) {
      deleteCustomerMutation.mutate(customerToDelete);
    }
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const membershipOptions = [
    { value: '', label: 'All Memberships' },
    { value: 'bronze', label: 'Bronze' },
    { value: 'silver', label: 'Silver' },
    { value: 'gold', label: 'Gold' },
    { value: 'platinum', label: 'Platinum' },
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
          Customers Listing ({totalResults})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCustomer}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Add Customer
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load customers. Please try again.
        </Alert>
      )}

      {/* Filters */}
      {!isLoading && !error && (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
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
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              value={membershipFilter}
              onChange={(e: any) => setMembershipFilter(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiSelect-select': { fontFamily: 'Poppins, sans-serif' },
              }}
            >
              {membershipOptions.map((option) => (
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
          data={customerData}
          totalResults={totalResults}
          currentPage={page}
          onPageChange={handlePageChange}
          showCheckboxes={false}
          showHeader={true}
          rowsPerPage={10}
          searchOptions={{
            value: searchTerm,
            onChange: setSearchTerm,
            placeholder: 'Search customers...',
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
            Are you sure you want to delete this customer? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleteCustomerMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleteCustomerMutation.isPending}
            startIcon={
              deleteCustomerMutation.isPending ? (
                <CircularProgress size={16} />
              ) : null
            }
          >
            {deleteCustomerMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
