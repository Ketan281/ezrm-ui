'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { customerService } from '@/api/services/customers';
import CustomerDetailsTab from './components/CustomerDetailsTab';
import CartTab from './components/CartTab';
import WishlistTab from './components/WishlistTab';
import AddressTab from './components/AddressTab';
import OrdersTab from './components/OrdersTab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`customer-tabpanel-${index}`}
      aria-labelledby={`customer-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `customer-tab-${index}`,
    'aria-controls': `customer-tabpanel-${index}`,
  };
}

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = params.id as string;
  const [tabValue, setTabValue] = useState(0);

  // Fetch customer details
  const {
    data: customerData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customerService.getCustomerById(customerId),
    enabled: !!customerId,
  });

  const customer = customerData?.data;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBackToList = () => {
    router.push('/admin/data-management/customers');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
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
            : 'Failed to load customer details'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          href="/admin/data-management/customers"
          onClick={(e) => {
            e.preventDefault();
            handleBackToList();
          }}
          sx={{ cursor: 'pointer' }}
        >
          Customers
        </Link>
        <Typography color="text.primary">
          {customer?.name || 'Customer Details'}
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Details
        </Typography>
        {customer && (
          <Typography variant="subtitle1" color="text.secondary">
            {customer.name} (ID: {customer.uniqueId})
          </Typography>
        )}
      </Box>

      {/* Tabs */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="customer details tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Customer Details" {...a11yProps(0)} />
            <Tab label="Cart" {...a11yProps(1)} />
            <Tab label="Wishlist" {...a11yProps(2)} />
            <Tab label="Addresses" {...a11yProps(3)} />
            <Tab label="Orders" {...a11yProps(4)} />
          </Tabs>
        </Box>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <CustomerDetailsTab customer={customer} />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <CartTab customerId={customerId} />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <WishlistTab customerId={customerId} />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <AddressTab customer={customer} />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <OrdersTab customerId={customerId} />
        </TabPanel>
      </Paper>
    </Box>
  );
}
