'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Menu,
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Star as StarIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { Customer } from '@/api/services/customers';
import {
  CustomerAddress,
  customerAddressService,
} from '@/api/services/customerAddresses';
import AddressModal from '@/components/modals/AddressModal';

interface AddressTabProps {
  customer?: Customer;
}

export default function AddressTab({ customer }: AddressTabProps) {
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedAddress, setSelectedAddress] =
    useState<CustomerAddress | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] =
    useState<CustomerAddress | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAddressId, setMenuAddressId] = useState<string | null>(null);

  useEffect(() => {
    if (customer?._id) {
      fetchAddresses();
    }
  }, [customer?._id]);

  const fetchAddresses = async () => {
    if (!customer?._id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await customerAddressService.getCustomerAddresses(
        customer._id
      );
      setAddresses(response.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch addresses');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = () => {
    setSelectedAddress(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const handleEditAddress = (address: CustomerAddress) => {
    setSelectedAddress(address);
    setModalMode('edit');
    setModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteAddress = (address: CustomerAddress) => {
    setAddressToDelete(address);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const confirmDeleteAddress = async () => {
    if (!addressToDelete?._id || !customer?._id) return;

    try {
      await customerAddressService.deleteAddress(
        customer._id,
        addressToDelete._id
      );
      setAddresses((prev) =>
        prev.filter((addr) => addr._id !== addressToDelete._id)
      );
      setDeleteDialogOpen(false);
      setAddressToDelete(null);
    } catch (err: any) {
      setError(err.message || 'Failed to delete address');
    }
  };

  const handleSetDefaultAddress = async (address: CustomerAddress) => {
    if (!address._id || !customer?._id) return;

    try {
      await customerAddressService.setDefaultAddress(customer._id, address._id);
      // Update local state to reflect the change
      setAddresses((prev) =>
        prev.map((addr) => ({
          ...addr,
          isDefault: addr._id === address._id,
        }))
      );
      handleMenuClose();
    } catch (err: any) {
      setError(err.message || 'Failed to set default address');
    }
  };

  const handleModalSuccess = () => {
    fetchAddresses();
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    addressId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuAddressId(addressId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuAddressId(null);
  };

  const getAddressTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'home':
        return 'primary';
      case 'work':
        return 'success';
      case 'other':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'home':
        return <HomeIcon />;
      case 'work':
        return <WorkIcon />;
      case 'other':
        return <BusinessIcon />;
      default:
        return <LocationIcon />;
    }
  };

  const formatAddress = (address: CustomerAddress) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
  };

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="text.secondary">
          No customer data available
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Header with Add Button */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">
          Customer Addresses ({addresses.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAddress}
          size="small"
        >
          Add New Address
        </Button>
      </Box>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <LocationIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Addresses Found
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            This customer has not added any addresses yet.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddAddress}
          >
            Add First Address
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {addresses.map((address) => (
            <Grid item xs={12} md={6} lg={4} key={address._id}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  border: address.isDefault ? '2px solid' : 'none',
                  borderColor: address.isDefault
                    ? 'primary.main'
                    : 'transparent',
                  position: 'relative',
                }}
              >
                <CardContent>
                  {/* Address Type and Default Badge */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Chip
                      icon={getAddressTypeIcon(address.type)}
                      label={
                        address.type.charAt(0).toUpperCase() +
                        address.type.slice(1)
                      }
                      color={getAddressTypeColor(address.type) as any}
                      size="small"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {address.isDefault && (
                        <Chip
                          icon={<StarIcon />}
                          label="Default"
                          color="warning"
                          size="small"
                          variant="outlined"
                        />
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, address._id!)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Address Details */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {formatAddress(address)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const address = addresses.find(
              (addr) => addr._id === menuAddressId
            );
            if (address) handleEditAddress(address);
          }}
        >
          <EditIcon sx={{ mr: 1 }} fontSize="small" />
          Edit Address
        </MenuItem>
        <MenuItem
          onClick={() => {
            const address = addresses.find(
              (addr) => addr._id === menuAddressId
            );
            if (address && !address.isDefault) handleSetDefaultAddress(address);
          }}
          disabled={
            addresses.find((addr) => addr._id === menuAddressId)?.isDefault
          }
        >
          <StarIcon sx={{ mr: 1 }} fontSize="small" />
          Set as Default
        </MenuItem>
        <MenuItem
          onClick={() => {
            const address = addresses.find(
              (addr) => addr._id === menuAddressId
            );
            if (address) handleDeleteAddress(address);
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} fontSize="small" />
          Delete Address
        </MenuItem>
      </Menu>

      {/* Add/Edit Address Modal */}
      <AddressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleModalSuccess}
        customerId={customer._id}
        address={selectedAddress}
        mode={modalMode}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Address</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Typography>
          {addressToDelete && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatAddress(addressToDelete)}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmDeleteAddress}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
