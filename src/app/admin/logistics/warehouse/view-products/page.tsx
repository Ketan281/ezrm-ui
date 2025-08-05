'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { warehouseService } from '@/api/services/warehouses';
import { warehouseStockService } from '@/api/services/warehouseStock';
import {
  TableComponent,
  TableRowData,
} from '../../../../../components/TableComponent';

interface StockRowData extends TableRowData {
  productName: string;
  warehouseName: string;
  slotName: string;
  quantityTotal: string;
  quantityAvailable: string;
  quantityReserved: string;
  qcStatus: string;
  utilization: string;
}

export default function ViewProductPage() {
  const router = useRouter();
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [page, setPage] = useState(1);

  // Fetch warehouses
  const {
    data: warehousesData,
    isLoading: warehousesLoading,
    error: warehousesError,
  } = useQuery({
    queryKey: ['warehouses'],
    queryFn: () => warehouseService.getWarehouses(),
  });

  // Fetch warehouse stock
  const {
    data: stockData,
    isLoading: stockLoading,
    error: stockError,
  } = useQuery({
    queryKey: ['warehouse-stock', { warehouseId: selectedWarehouse, page }],
    queryFn: () =>
      warehouseStockService.getWarehouseStock({
        warehouseId: selectedWarehouse,
        page,
        limit: 10,
      }),
    enabled: !!selectedWarehouse,
  });

  const warehouses = warehousesData?.warehouses || [];
  const stockItems = stockData?.data || [];

  // Transform stock data to table format
  const stockTableData: StockRowData[] = stockItems.map((item: any) => ({
    id: item._id,
    productName: item.productId?.name || 'N/A',
    warehouseName: item.warehouseId?.name || 'N/A',
    slotName: item.slotName || 'N/A',
    quantityTotal: item.quantityTotal?.toString() || '0',
    quantityAvailable: item.quantityAvailable?.toString() || '0',
    quantityReserved: item.quantityReserved?.toString() || '0',
    qcStatus: item.qcPassed ? 'Passed' : 'Pending',
    utilization: `${Math.round((item.quantityTotal / (item.quantityTotal + item.quantityReserved)) * 100)}%`,
  }));

  const totalResults = stockData?.total || 0;

  const handleRowClick = (row: TableRowData) => {
    router.push(`/admin/logistics/warehouse/view-products/detail/${row.id}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  // Loading state
  if (warehousesLoading) {
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
  if (warehousesError) {
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
          Failed to load warehouses. Please try again.
        </Alert>
      </Box>
    );
  }

  const columns = [
    { id: 'productName', label: 'Product Name', width: '20%' },
    { id: 'warehouseName', label: 'Warehouse', width: '20%' },
    { id: 'slotName', label: 'Slot', width: '10%', align: 'center' as const },
    {
      id: 'quantityTotal',
      label: 'Total Qty',
      width: '12%',
      align: 'center' as const,
    },
    {
      id: 'quantityAvailable',
      label: 'Available',
      width: '12%',
      align: 'center' as const,
    },
    {
      id: 'quantityReserved',
      label: 'Reserved',
      width: '12%',
      align: 'center' as const,
    },
    {
      id: 'qcStatus',
      label: 'QC Status',
      width: '10%',
      align: 'center' as const,
      type: 'status' as const,
    },
    {
      id: 'utilization',
      label: 'Utilization',
      width: '14%',
      align: 'center' as const,
    },
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
      {/* Header Section with Back button and title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => router.back()}
        >
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography
            sx={{
              ml: 1,
              color: '#737791',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Back
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1F2A44',
          mb: 3,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Warehouse Products ({totalResults})
      </Typography>

      {/* Warehouse Filter Section */}
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ minWidth: 300 }}>
          <Select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span
                    style={{
                      color: '#737791',
                      fontSize: '14px',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                  >
                    Select Warehouse
                  </span>
                );
              }
              const warehouse = warehouses.find((w: any) => w._id === selected);
              return warehouse?.name || selected;
            }}
            sx={{
              height: '40px',
              fontSize: '14px',
              color: '#737791',
              fontFamily: 'Poppins, sans-serif',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E7EB',
              },
            }}
          >
            <MenuItem value="" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              All Warehouses
            </MenuItem>
            {warehouses.map((warehouse: any) => (
              <MenuItem
                key={warehouse._id}
                value={warehouse._id}
                sx={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{warehouse.name}</span>
                  <Chip
                    label={warehouse.status}
                    size="small"
                    color={
                      warehouse.status === 'active'
                        ? 'success'
                        : warehouse.status === 'maintenance'
                          ? 'warning'
                          : 'error'
                    }
                  />
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Stock Table */}
      {selectedWarehouse && (
        <>
          {stockLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {stockError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to load warehouse stock. Please try again.
            </Alert>
          )}

          {!stockLoading && !stockError && (
            <TableComponent
              columns={columns}
              data={stockTableData}
              totalResults={totalResults}
              currentPage={page}
              onPageChange={handlePageChange}
              onRowClick={handleRowClick}
              showCheckboxes={false}
              showHeader={true}
              rowsPerPage={10}
            />
          )}
        </>
      )}

      {!selectedWarehouse && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
            color: '#737791',
          }}
        >
          <Typography>Please select a warehouse to view products</Typography>
        </Box>
      )}
    </Box>
  );
}
