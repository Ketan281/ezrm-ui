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
  Avatar,
  Divider,
  Stack,
  Paper,
  Fade,
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
  Phone as PhoneIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { Customer } from '@/api/services/customers';
import {
  CustomerAddress,
  customerAddressService,
  CustomerAddressData,
} from '@/api/services/customerAddresses';
import AddressModal from '@/components/modals/AddressModal';

interface AddressTabProps {
  customer?: Customer;
}

export default function AddressTab({ customer }: AddressTabProps) {
  const [addressData, setAddressData] = useState<CustomerAddressData | null>(
    null
  );
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
      setAddressData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch addresses');
      setAddressData(null);
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
      // Refresh addresses after deletion
      fetchAddresses();
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
      // Refresh addresses after setting default
      fetchAddresses();
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  const addresses = addressData?.addresses || [];
  const customerInfo = addressData?.customer;

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Customer Info Card */}
      {customerInfo && (
        <Fade in={true}>
          <Paper
            elevation={2}
            sx={{
              mb: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    fontSize: '2rem',
                  }}
                >
                  {customerInfo.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {customerInfo.name}
                  </Typography>
                  <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="body1">
                        {customerInfo.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body1">
                        {customerInfo.phone}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <BadgeIcon fontSize="small" />
                      <Typography variant="body1">
                        {customerInfo.uniqueId}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    label={customerInfo.membershipTier.toUpperCase()}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {addressData?.totalAddresses || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Total Addresses
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Paper>
        </Fade>
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
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: 'text.primary' }}
        >
          <LocationIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Address Management ({addresses.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAddress}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.5,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
          }}
        >
          Add New Address
        </Button>
      </Box>

      {/* Address Cards */}
      {addresses.length === 0 ? (
        <Fade in={true}>
          <Paper
            elevation={1}
            sx={{
              textAlign: 'center',
              py: 8,
              px: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            }}
          >
            <LocationIcon
              sx={{ fontSize: 80, color: 'text.secondary', mb: 3 }}
            />
            <Typography
              variant="h5"
              color="text.secondary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              No Addresses Found
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              paragraph
              sx={{ mb: 4 }}
            >
              This customer hasn't added any addresses yet. Get started by
              adding their first address.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleAddAddress}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              }}
            >
              Add First Address
            </Button>
          </Paper>
        </Fade>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {addresses.map((address, index) => (
            <Box key={address._id}>
              <Fade in={true} timeout={500 + index * 100}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    borderRadius: 3,
                    border: address.isDefault ? '3px solid' : '1px solid',
                    borderColor: address.isDefault ? 'primary.main' : 'divider',
                    position: 'relative',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    background: address.isDefault
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'white',
                    color: address.isDefault ? 'white' : 'inherit',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header with Type and Actions */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <Chip
                          icon={getAddressTypeIcon(address.type)}
                          label={
                            address.type.charAt(0).toUpperCase() +
                            address.type.slice(1)
                          }
                          color={
                            address.isDefault
                              ? 'secondary'
                              : (getAddressTypeColor(address.type) as any)
                          }
                          sx={{
                            fontWeight: 600,
                            bgcolor: address.isDefault
                              ? 'rgba(255,255,255,0.2)'
                              : undefined,
                            color: address.isDefault ? 'white' : undefined,
                          }}
                        />
                        {address.isDefault && (
                          <Chip
                            icon={<StarIcon />}
                            label="Default"
                            sx={{
                              bgcolor: 'rgba(255,215,0,0.9)',
                              color: 'black',
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, address._id!)}
                        sx={{
                          color: address.isDefault ? 'white' : 'text.secondary',
                          '&:hover': {
                            bgcolor: address.isDefault
                              ? 'rgba(255,255,255,0.1)'
                              : 'rgba(0,0,0,0.04)',
                          },
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    {/* Address Details */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.8,
                          color: address.isDefault
                            ? 'rgba(255,255,255,0.9)'
                            : 'text.primary',
                          fontWeight: 500,
                        }}
                      >
                        {formatAddress(address)}
                      </Typography>
                    </Box>

                    <Divider
                      sx={{
                        mb: 2,
                        bgcolor: address.isDefault
                          ? 'rgba(255,255,255,0.2)'
                          : undefined,
                      }}
                    />

                    {/* Address Meta Info */}
                    <Stack spacing={1}>
                      {address.uniqueId && (
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <BadgeIcon
                            fontSize="small"
                            sx={{
                              color: address.isDefault
                                ? 'rgba(255,255,255,0.7)'
                                : 'text.secondary',
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: address.isDefault
                                ? 'rgba(255,255,255,0.7)'
                                : 'text.secondary',
                              fontWeight: 500,
                            }}
                          >
                            ID: {address.uniqueId}
                          </Typography>
                        </Box>
                      )}
                      {address.createdAt && (
                        <Box
                          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                        >
                          <CalendarIcon
                            fontSize="small"
                            sx={{
                              color: address.isDefault
                                ? 'rgba(255,255,255,0.7)'
                                : 'text.secondary',
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: address.isDefault
                                ? 'rgba(255,255,255,0.7)'
                                : 'text.secondary',
                              fontWeight: 500,
                            }}
                          >
                            Added: {formatDate(address.createdAt)}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Box>
          ))}
        </Box>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 180,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            const address = addresses.find(
              (addr) => addr._id === menuAddressId
            );
            if (address) handleEditAddress(address);
          }}
          sx={{ py: 1.5, px: 2 }}
        >
          <EditIcon sx={{ mr: 2 }} fontSize="small" />
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
          sx={{ py: 1.5, px: 2 }}
        >
          <StarIcon sx={{ mr: 2 }} fontSize="small" />
          Set as Default
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            const address = addresses.find(
              (addr) => addr._id === menuAddressId
            );
            if (address) handleDeleteAddress(address);
          }}
          sx={{ py: 1.5, px: 2, color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 2 }} fontSize="small" />
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
        PaperProps={{
          sx: {
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Delete Address
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this address? This action cannot be
            undone.
          </Typography>
          {addressToDelete && (
            <Paper
              sx={{
                p: 2,
                bgcolor: 'error.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'error.200',
              }}
            >
              <Typography
                variant="body2"
                color="error.main"
                sx={{ fontWeight: 500 }}
              >
                {formatAddress(addressToDelete)}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDeleteAddress}
            color="error"
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
