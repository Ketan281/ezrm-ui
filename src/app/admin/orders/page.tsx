'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TableComponent } from '../../../components/TableComponent';

interface OrderRowData {
  id: string;
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
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  // Added more data to test pagination
  const orderData: OrderRowData[] = [
    { id: '1', product: 'Vitamins', orderId: '12344', orderNumber: '12457', status: 'New Order', quantity: '200', customerName: 'Robin Rosh', trackOrder: '#' },
    { id: '2', product: 'Vitamins', orderId: '12344', orderNumber: '12457', status: 'Pending', quantity: '200', customerName: 'Robin Rosh', trackOrder: '#' },
    { id: '3', product: 'Vitamins', orderId: '12344', orderNumber: '12457', status: 'In-process', quantity: '200', customerName: 'Robin Rosh', trackOrder: '#' }, 
    { id: '4', product: 'Vitamins', orderId: '12344', orderNumber: '12457', status: 'Completed', quantity: '200', customerName: 'Robin Rosh', trackOrder: '#' },
    { id: '5', product: 'Multivitamins', orderId: '12345', orderNumber: '12458', status: 'New Order', quantity: '150', customerName: 'John Doe', trackOrder: '#' },
    { id: '6', product: 'Protein Powder', orderId: '12346', orderNumber: '12459', status: 'Pending', quantity: '100', customerName: 'Jane Smith', trackOrder: '#' },
    { id: '7', product: 'Fish Oil', orderId: '12347', orderNumber: '12460', status: 'In-process', quantity: '300', customerName: 'Mike Johnson', trackOrder: '#' },
    { id: '8', product: 'Calcium', orderId: '12348', orderNumber: '12461', status: 'Completed', quantity: '250', customerName: 'Sarah Wilson', trackOrder: '#' },
    { id: '9', product: 'Magnesium', orderId: '12349', orderNumber: '12462', status: 'New Order', quantity: '175', customerName: 'Robert Brown', trackOrder: '#' },
    { id: '10', product: 'Zinc', orderId: '12350', orderNumber: '12463', status: 'Pending', quantity: '225', customerName: 'Emma Davis', trackOrder: '#' },
  ];

  const totalResults = orderData.length;

  const statusOptions = [
    { value: '', label: 'Status' },
    { value: 'New Order', label: 'New Order' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In-process', label: 'In-process' },
    { value: 'Completed', label: 'Completed' },
  ];

  interface TableColumnType {
    id: string;
    label: string;
    width?: string;
    align?: 'left' | 'center' | 'right';
    type?: 'status' | 'link' | 'default';
  }
  
  const columns: TableColumnType[] = [
    { id: 'product', label: 'Product', width: '18%' },
    { id: 'orderId', label: 'Order Id', width: '12%' },
    { id: 'orderNumber', label: 'Order Number', width: '16%' },
    { id: 'status', label: 'Status', width: '165', type: 'status' },
    { id: 'quantity', label: 'Quantity', width: '10%' },
    { id: 'customerName', label: 'Customer Name', width: '18%' },
    { id: 'trackOrder', label: 'Track Order', width: '20%', type: 'link' },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#F9FAFB', minHeight: '85vh', fontFamily: 'Poppins, sans-serif' }}>
      <Typography sx={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        color: '#1F2A44', 
        mb: 3, 
        fontFamily: 'Poppins, sans-serif' 
      }}>
        Order ID
      </Typography>

      <TableComponent
        columns={columns}
        data={orderData}
        totalResults={totalResults}
        currentPage={page}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        showCheckboxes={false}
        showHeader={true}
        rowsPerPage={9}
        searchOptions={{
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search Order ID"
        }}
        filterOptions={{
          value: statusFilter,
          onChange: setStatusFilter,
          options: statusOptions
        }}
      />
    </Box>
  );
}