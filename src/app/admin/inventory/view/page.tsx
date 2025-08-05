'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Pagination,
  Chip,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { inventoryService } from '../../../../api/services/inventory';
import {
  TableComponent,
  TableRowData,
} from '../../../../components/TableComponent';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface InventoryRowData extends TableRowData {
  id: string;
  productName: string;
  category: string;
  price: string;
  quantity: string;
  location: string;
  status: string;
  batchNumber: string;
}

export default function ViewProductPage() {
  const router = useRouter();

  // State for filtering and pagination
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

  // Debounce search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  // Fetch inventory data
  const { data, isLoading, error } = useQuery({
    queryKey: ['inventory', { page, search: debouncedSearchValue, filter }],
    queryFn: () =>
      inventoryService.getInventory({
        page,
        search: debouncedSearchValue,
        status: filter === 'Status' ? searchValue : undefined,
      }),
  });

  const inventoryItems = data?.inventory || [];
  const totalResults = data?.pagination?.total || 0;

  // Transform inventory data for table
  const inventoryTableData: InventoryRowData[] = inventoryItems.map(
    (item: any) => ({
      id: item._id,
      productName: item.product?.name || 'No Product',
      category: item.product?.category || 'N/A',
      price: `$${item.product?.price || 0}`,
      quantity: item.quantity?.toString() || '0',
      location: `${item.location?.aisle || 'N/A'}-${item.location?.rack || 'N/A'}-${item.location?.shelf || 'N/A'}`,
      status: item.status || 'unknown',
      batchNumber: item.batchNumber || 'N/A',
    })
  );

  const columns = [
    { id: 'productName', label: 'Product Name', width: '20%' },
    { id: 'category', label: 'Category', width: '15%' },
    { id: 'price', label: 'Price', width: '10%', align: 'center' as const },
    {
      id: 'quantity',
      label: 'Quantity',
      width: '10%',
      align: 'center' as const,
    },
    { id: 'location', label: 'Location', width: '15%' },
    {
      id: 'status',
      label: 'Status',
      width: '12%',
      type: 'status' as const,
      align: 'center' as const,
    },
    { id: 'batchNumber', label: 'Batch Number', width: '18%' },
  ];

  const handleInventoryClick = (row: TableRowData) => {
    router.push(`/admin/inventory/view/detail/${row.id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handleSearchClear = () => {
    setSearchValue('');
    setPage(1);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setSearchValue(''); // Clear search when changing filter type
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        p: 1,
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
          <Image
            src="/back.png?height=13&width=13"
            alt="Back"
            width={13}
            height={13}
          />
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
          fontWeight: 600,
          color: '#1A1A1A',
          mb: 3,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Inventory Management ({totalResults})
      </Typography>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load products. Please try again.
        </Alert>
      )}

      {/* Inventory Table */}
      {!isLoading && !error && (
        <TableComponent
          columns={columns}
          data={inventoryTableData}
          totalResults={totalResults}
          currentPage={page}
          onPageChange={handlePageChange}
          onRowClick={handleInventoryClick}
          showCheckboxes={false}
          showHeader={true}
          rowsPerPage={10}
          searchOptions={{
            value: searchValue,
            onChange: setSearchValue,
            placeholder: 'Search inventory...',
          }}
          filterOptions={{
            value: filter,
            onChange: handleFilterChange,
            options: [
              { value: '', label: 'All' },
              { value: 'Product Name', label: 'Product Name' },
              { value: 'Category', label: 'Category' },
              { value: 'Status', label: 'Status' },
            ],
          }}
        />
      )}

      {/* Empty State */}
      {!isLoading && !error && inventoryItems.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ fontFamily: 'Poppins, sans-serif' }}
          >
            No inventory items found
          </Typography>
        </Box>
      )}
    </Box>
  );
}
