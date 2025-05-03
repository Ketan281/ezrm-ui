'use client';

// Import React and useState for managing dialog states
import React, { useState } from 'react';

// Import Material-UI components for layout, typography, inputs, buttons, tables, dialogs, and pagination
import { Box, Typography, TextField, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, MenuItem, Select, FormControl, Pagination, TableFooter } from '@mui/material';

// Import Next.js Image component for rendering images
import Image from 'next/image';

// Import useRouter from Next.js for navigation
import { useRouter } from 'next/navigation';

// Define the UpdateList component
export default function UpdateList() {
  // Initialize router for navigation
  const router = useRouter();

  // State to manage the confirmation dialog's open/close status
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState('');
  // State to manage the success dialog's open/close status
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  // State to manage the current page
  const [page, setPage] = useState(2); // Start on page 2 as per the screenshot

  // Function to open the confirmation dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to close the success dialog
  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
    // Navigate back after closing the success dialog
    router.back();
  };

  // Function to handle the confirmed deletion
  const handleDeleteConfirm = () => {
    // Close the confirmation dialog
    setOpenDialog(false);
    // Open the success dialog
    setOpenSuccessDialog(true);
    // Optionally, add actual delete logic here (e.g., API call)
  };

  // Sample data for 10 rows with varied data, including an id for each product
  const tableData = [
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

  // Total number of pages and results (as per the screenshot)
  const totalPages = 24;
  const totalResults = 146;

  // Handle page change
  const handlePageChange = (event: any, value: any) => {
    console.log(event);
    setPage(value);
    // Optionally, fetch new data for the selected page
  };

  // Handle row click to navigate to the detail page with query parameters
  const handleRowClick = (product: typeof tableData[0]) => {
    // Encode product details as query parameters
    const query = new URLSearchParams({
      id: product.id,
      name: product.name,
      description: product.description,
      inventory: product.inventory,
      loreal: product.loreal,
      price: product.price,
      rating: product.rating,
    }).toString();

    // Navigate to the detail page with query parameters
    router.push(`/admin/inventory/update/detail?${query}`);
  };

  // Main container for the page, matching the layout's content area
  return (
    <Box sx={{ p: 1, backgroundColor: '#F9FAFB', minHeight: '85vh', fontFamily: 'Poppins, sans-serif' }}>
      {/* Header Section with Back button and title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {/* Back button with arrow icon and text */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.back()}>
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography sx={{ ml: 1, color: '#737791', fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Back
          </Typography>
        </Box>
      </Box>
      {/* Page title */}
      <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2A44', mb: 2, fontFamily: 'Poppins, sans-serif' }}>
        Update Product
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Table>
          {/* Table Header */}
          <TableHead sx={{ borderBottom: "2px solid rgba(215, 219, 236, 1)" }}>
            <Box mt={3} ml={3} mb={2}>
              <FormControl sx={{ minWidth: 150 }}>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span style={{ color: '#737791', fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>FILTER</span>;
                    }
                    return selected;
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
                  <MenuItem value="Product ID" sx={{ fontFamily: 'Poppins, sans-serif' }}>Product ID</MenuItem>
                  <MenuItem value="Product Name" sx={{ fontFamily: 'Poppins, sans-serif' }}>Product Name</MenuItem>
                  <MenuItem value="Category" sx={{ fontFamily: 'Poppins, sans-serif' }}>Category</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TableRow>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '5%', fontFamily: 'Poppins, sans-serif' }}>
                <Checkbox size="small" />
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '25%', fontFamily: 'Poppins, sans-serif' }}>
                Product
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '20%', fontFamily: 'Poppins, sans-serif' }}>
                Inventory
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '20%', fontFamily: 'Poppins, sans-serif' }}>
                Loreal
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '15%', fontFamily: 'Poppins, sans-serif' }}>
                Price
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '15%', fontFamily: 'Poppins, sans-serif' }}>
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ backgroundColor: '#FFFFFF', cursor: 'pointer', '&:hover': { backgroundColor: '#F5F5F5' } }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                  <Checkbox size="small" checked={index === 0} />
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Placeholder for product image */}
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
                </TableCell>
                <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', fontFamily: 'Poppins, sans-serif' }}>
                  {row.inventory}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', fontFamily: 'Poppins, sans-serif' }}>
                  {row.loreal}
                </TableCell>
                <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', fontFamily: 'Poppins, sans-serif' }}>
                  {row.price}
                </TableCell>
                <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ fontSize: '14px', borderRadius: '20px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
                      {row.rating}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* Table Footer with Pagination */}
          <TableFooter sx={{ backgroundColor: '#FFFFFF' }}>
            <TableRow>
              <TableCell colSpan={5} sx={{ borderBottom: 'none', py: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  siblingCount={1} // Show 1 sibling on each side of the current page
                  boundaryCount={2} // Show 2 pages at the start and end
                  showFirstButton
                  showLastButton
                  sx={{
                    width: '90%', // Set the width of the entire Pagination component to 90%
                    '& .MuiPaginationItem-root': {
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px', // Smaller font size for compact look
                      color: '#737791',
                      minWidth: '24px', // Smaller width for each item
                      height: '24px', // Smaller height for each item
                      margin: '0 2px', // Reduced spacing between items
                      padding: '0', // Remove default padding
                    },
                    '& .Mui-selected': {
                      backgroundColor: '#3B82F6',
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: '#2563EB',
                      },
                    },
                    '& .MuiPaginationItem-ellipsis': {
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '12px',
                      color: '#737791',
                      margin: '0 2px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                    },
                    '& .MuiPaginationItem-previousNext': {
                      fontSize: '14px', // Slightly larger arrows
                      minWidth: '24px',
                      height: '24px',
                      margin: '0 2px',
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none', py: 2, textAlign: 'right' }}>
                <Typography sx={{ fontSize: '14px', color: '#737791', fontFamily: 'Poppins, sans-serif' }}>
                  {totalResults} Results
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}