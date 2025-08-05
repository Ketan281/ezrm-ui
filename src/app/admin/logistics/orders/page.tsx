'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  TableComponent,
  TableRowData,
} from '../../../../components/TableComponent';
import { purchaseOrderService } from '@/api/services/purchaseOrders';
import { Button } from '@mui/material';

interface OrderRowData extends TableRowData {
  product: string;
  orderId: string;
  orderNumber: string;
  status: string;
  quantity: string;
  customerName: string;
  trackOrder: string;
}

export default function OrderList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch purchase orders from API with server-side search and filtering
  const {
    data: purchaseOrdersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'purchase-orders',
      { page, search: debouncedSearchTerm, status: statusFilter },
    ],
    queryFn: () =>
      purchaseOrderService.getPurchaseOrders({
        page,
        search: debouncedSearchTerm,
        status: statusFilter,
      }),
  });

  const purchaseOrders = purchaseOrdersData?.data || [];

  // Transform API data to table format
  const orderData: OrderRowData[] = purchaseOrders.map((order: any) => {
    // Handle multiple products
    const products = order.items || order.orderItems || [];
    const productNames = products
      .map((item: any) => item.product_name)
      .filter(Boolean);
    const displayProduct =
      productNames.length > 0
        ? productNames.length === 1
          ? productNames[0]
          : `${productNames[0]} +${productNames.length - 1} more`
        : 'N/A';

    return {
      id: order._id || order.id,
      orderId: order.id || order._id,
      orderNumber: order.id || order._id?.slice(-8) || 'N/A',
      product: displayProduct,
      status: order.status || 'pending',
      quantity:
        products
          .reduce((sum: number, item: any) => sum + (item.quantity || 0), 0)
          .toString() || '0',
      customerName: order.supplier_id?.name || 'N/A',
      trackOrder: '#',
    };
  });

  const totalResults = purchaseOrders.length;

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'received', label: 'Received' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  interface TableColumnType {
    id: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    type?: 'status' | 'link' | 'default';
  }

  const columns: TableColumnType[] = [
    { id: 'orderId', label: 'Order ID', width: '12%', align: 'center' },
    { id: 'orderNumber', label: 'Order Number', width: '15%', align: 'center' },
    {
      id: 'customerName',
      label: 'Supplier',
      width: '18%',
      align: 'center',
    },
    { id: 'product', label: 'Products', width: '15%' },
    { id: 'quantity', label: 'Quantity', width: '10%', align: 'center' },
    {
      id: 'status',
      label: 'Status',
      width: '12%',
      type: 'status',
      align: 'center',
    },
    {
      id: 'trackOrder',
      label: 'Track Order',
      width: '18%',
      type: 'link',
      align: 'center',
    },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowClick = (row: TableRowData) => {
    router.push(`/admin/logistics/orders/detail/${row.id}`);
  };

  const handleLinkClick = (row: TableRowData) => {
    router.push(`/admin/logistics/orders/detail/${row.id}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: '#F9FAFB',
          minHeight: '85vh',
          fontFamily: 'Poppins, sans-serif',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: '#F9FAFB',
          minHeight: '85vh',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load purchase orders. Please try again.
        </Alert>
      </Box>
    );
  }

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
          Purchase Orders ({totalResults})
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/admin/logistics/warehouse/add-product')}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Create Purchase Order
        </Button>
      </Box>

      <TableComponent
        columns={columns}
        data={orderData}
        totalResults={totalResults}
        currentPage={page}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        onLinkClick={handleLinkClick}
        showCheckboxes={false}
        showHeader={true}
        rowsPerPage={9}
        searchOptions={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: 'Search Order ID',
        }}
        filterOptions={{
          value: statusFilter,
          onChange: setStatusFilter,
          options: statusOptions,
        }}
      />
    </Box>
  );
}
