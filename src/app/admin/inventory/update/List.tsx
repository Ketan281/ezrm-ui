'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TableComponent } from '../../../../components/TableComponent'; // Adjust the import path as needed

// Define the specific row data type for UpdateList
interface ProductRowData {
  id: string;
  name: string;
  description: string;
  inventory: string;
  loreal: string;
  price: string;
  rating: string;
}

export default function UpdateList() {
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(2);

  // Sample data
  const tableData: ProductRowData[] = [
    { id: '1', name: 'vitamin', description: 'loreal ipsum', inventory: '96 in stock', loreal: 'Black', price: '$49.90', rating: '5.0 (32 Votes)' },
    { id: '2', name: 'vitamin', description: 'loreal ipsum', inventory: '56 in stock', loreal: 'White', price: '$34.90', rating: '4.8 (24 Votes)' },
    { id: '3', name: 'vitamin', description: 'loreal ipsum', inventory: '78 in stock', loreal: 'White', price: '$40.90', rating: '5.0 (54 Votes)' },
    { id: '4', name: 'vitamin', description: 'loreal ipsum', inventory: '32 in stock', loreal: 'White', price: '$49.90', rating: '4.5 (31 Votes)' },
    { id: '5', name: 'vitamin', description: 'loreal ipsum', inventory: '32 in stock', loreal: 'White', price: '$34.90', rating: '4.9 (22 Votes)' },
    { id: '6', name: 'vitamin', description: 'loreal ipsum', inventory: '96 in stock', loreal: 'Black', price: '$49.90', rating: '5.0 (32 Votes)' },
    { id: '7', name: 'vitamin', description: 'loreal ipsum', inventory: '56 in stock', loreal: 'White', price: '$34.90', rating: '4.8 (24 Votes)' },
    { id: '8', name: 'vitamin', description: 'loreal ipsum', inventory: 'Out of Stock', loreal: 'White', price: '$40.90', rating: '5.0 (54 Votes)' },
    { id: '9', name: 'vitamin', description: 'loreal ipsum', inventory: 'Out of Stock', loreal: 'White', price: '$49.90', rating: '4.5 (31 Votes)' },
    { id: '10', name: 'vitamin', description: 'loreal ipsum', inventory: 'Out of Stock', loreal: 'White', price: '$34.90', rating: '4.9 (22 Votes)' },
  ];

  const totalResults = 146;

  // Define table columns
  const columns = [
    { id: 'name', label: 'Product', width: '25%' },
    { id: 'inventory', label: 'Inventory', width: '20%' },
    { id: 'loreal', label: 'Loreal', width: '20%' },
    { id: 'price', label: 'Price', width: '15%' },
    { id: 'rating', label: 'Rating', width: '15%' },
  ];

  // Filter options
  const filterOptions = {
    value: filter,
    onChange: setFilter,
    options: [
      { value: 'Product ID', label: 'Product ID' },
      { value: 'Product Name', label: 'Product Name' },
      { value: 'Category', label: 'Category' },
    ],
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  // Handle row click
  const handleRowClick = (row: any) => {
    // Ensure row has the expected properties
    const product: ProductRowData = {
      id: row.id,
      name: typeof row.name === 'string' ? row.name : row.name?.props?.children[1]?.props?.children[0] || 'Unknown',
      description: row.description || 'Unknown',
      inventory: row.inventory || 'Unknown',
      loreal: row.loreal || 'Unknown',
      price: row.price || 'Unknown',
      rating: typeof row.rating === 'string' ? row.rating : row.rating?.props?.children[0]?.props?.children || 'Unknown',
    };

    const query = new URLSearchParams({
      id: product.id,
      name: product.name,
      description: product.description,
      inventory: product.inventory,
      loreal: product.loreal,
      price: product.price,
      rating: product.rating,
    }).toString();
    router.push(`/admin/inventory/update/detail?${query}`);
  };

  return (
    <Box sx={{ p: 1, backgroundColor: '#F9FAFB', minHeight: '85vh', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.back()}>
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography sx={{ ml: 1, color: '#737791', fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Back
          </Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2A44', mb: 2, fontFamily: 'Poppins, sans-serif' }}>
        Update Product
      </Typography>

      {/* TableComponent */}
      <TableComponent
        columns={columns}
        data={tableData.map(row => ({
          ...row,
          name: (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box width={40} height={40} style={{ borderRadius: '5px', backgroundColor: "rgba(217, 217, 217, 1)" }} />
              <Box sx={{ ml: 2 }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2A44', fontFamily: 'Poppins, sans-serif' }}>
                  {row.name}
                </Typography>
                <Typography sx={{ fontSize: '14px', color: '#737791', fontFamily: 'Poppins, sans-serif' }}>
                  {row.description}
                </Typography>
              </Box>
            </Box>
          ),
          rating: (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ fontSize: '14px', borderRadius: '20px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
                {row.rating}
              </Box>
            </Box>
          ),
        }))}
        totalResults={totalResults}
        currentPage={page}
        onPageChange={handlePageChange}
        onRowClick={handleRowClick}
        filterOptions={filterOptions}
        showCheckboxes={true}
        showHeader={true}
        rowsPerPage={9}
      />
    </Box>
  );
}