'use client';

import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';
import { TableComponent, ConfirmationDialog, SuccessDialog } from '../../../../../components/TableComponent';
import { useRouter } from 'next/navigation';

export default function DeleteProductPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();
  
  const columns = [
    { id: 'product', label: 'Product', width: '25%' },
    { id: 'inventory', label: 'Inventory', width: '20%' },
    { id: 'loreal', label: 'Loreal', width: '20%' },
    { id: 'price', label: 'Price', width: '15%' },
    { id: 'rating', label: 'Rating', width: '15%' },
  ];

  const data = [
    { 
      id: '1',
      product: 'vitamin - loreal ipsum', // Changed from JSX to string
      inventory: '96 in stock',
      loreal: 'Black',
      price: '$49.90',
      rating: '5.0 (32 Votes)',
    }
  ];

  const handleDeleteConfirm = () => {
    setOpenDialog(false);
    setOpenSuccessDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, mt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.back()}>
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography sx={{ ml: 1, color: '#737791', fontSize: '14px', fontFamily: 'Poppins, sans-serif' }}>
            Back
          </Typography>
        </Box>
      </Box>
      
      {/* Page title */}
      <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2A44', mb: 2, fontFamily: 'Poppins, sans-serif' }}>
        Delete Product
      </Typography>
      <Box sx={{ mb: 3, backgroundColor: '#fff' }} width="100%" height="8vh" display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Image src="/magnifier.svg" alt="Search" width={16} height={16} />
        <Typography color='rgba(16, 63, 90, 1)' fontWeight="500" sx={{ fontFamily: 'Poppins, sans-serif' }}>
          Search the Product you want to delete
        </Typography>
        <Image src="/Delete.png" alt="Clear" width={16} height={16} />
      </Box>
      <TableComponent
        columns={columns}
        data={data}
        totalResults={1}
        currentPage={page}
        onPageChange={setPage}
        actionButtons={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 4, width: "100%" }}>
            <Button
              sx={{
                fontSize: '14px',
                color: 'rgba(21, 27, 38, 1)',
                fontWeight: 600,
                textTransform: 'none',
                fontFamily: 'Poppins, sans-serif',
                width: "15vw"
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setOpenDialog(true)}
              sx={{
                backgroundColor: 'rgba(246, 57, 24, 1)',
                color: '#FFFFFF',
                fontSize: '14px',
                px: 3,
                py: 1,
                borderRadius: '16px',
                textTransform: 'none',
                width: "15vw",
                '&:hover': {
                  backgroundColor: '#E55050',
                },
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Delete
            </Button>
          </Box>
        }
      />

      <ConfirmationDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Items"
        content="Are you sure you want to delete selected items?"
      />

      <SuccessDialog
        open={openSuccessDialog}
        onClose={() => setOpenSuccessDialog(false)}
        title="Deleted Successfully"
      />
    </Box>
  );
}