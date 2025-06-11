'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { TableComponent, TableRowData } from '../../../../components/TableComponent';

interface OrderRowData extends TableRowData {
  customerName: string;
  email: string;
  phoneNumber: string;
  quantity: string;
  dateTime: string;
  trackOrder: string;
}

export default function OrderList() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const orderData: OrderRowData[] = [
    { 
      id: '1', 
      customerName: 'Robin Bosh', 
      email: 'Robin@gmail.com', 
      phoneNumber: '9876543210', 
      quantity: '200', 
      dateTime: "12/4/2025 12:45 Pm", 
      trackOrder: '#' 
    },
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
    { id: 'customerName', label: 'Customer Name', width: '18%' },
    { id: 'email', label: 'Email', width: '12%' },
    { id: 'phoneNumber', label: 'Phone Number', width: '16%' },
    { id: 'quantity', label: 'Quantity', width: '10%' },
    { id: 'dateTime', label: 'Date/Time', width: '165', type: 'default' },
    { id: 'trackOrder', label: 'View Details', width: '20%', type: 'link' },
  ];

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRowClick = (row: TableRowData) => {
    router.push(`/admin/order/rfq/detail/${row.id}`);
  };
  const handleLinkClick = (row: TableRowData) => {
    router.push(`/admin/order/rfq/detail/${row.id}`);
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
        RFQ
      </Typography>

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