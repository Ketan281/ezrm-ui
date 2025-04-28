'use client';

// Import React and useState for managing dialog states
import React, { useState } from 'react';

// Import Material-UI components for layout, typography, inputs, buttons, tables, and dialogs
import { Box, Typography, TextField, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';

// Import Next.js Image component for rendering images
import Image from 'next/image';

// Import useRouter from Next.js for navigation
import { useRouter } from 'next/navigation';

// Define the DeleteProductPage component
export default function DeleteProductPage() {
  // Initialize router for navigation
  const router = useRouter();

  // State to manage the confirmation dialog's open/close status
  const [openDialog, setOpenDialog] = useState(false);

  // State to manage the success dialog's open/close status
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

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

  // Main container for the page, matching the layout's content area
  return (
    <Box sx={{ p: 3, backgroundColor: '#F9FAFB', minHeight: '85vh' }}>
      {/* Header Section with Back button and title */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        {/* Back button with arrow icon and text */}
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => router.back()}>
          <Image src="/backArrow.png" alt="Back" width={13} height={13} />
          <Typography sx={{ ml: 1, color: '#737791', fontSize: '14px' }}>
            Back
          </Typography>
        </Box>
      </Box>
      {/* Page title */}
      <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2A44', mb: 2 }}>
        Delete Product
      </Typography>

      {/* Search Bar Section */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search the Product you want to delete"
          variant="outlined"
          InputProps={{
            // Magnifying glass icon on the left
            startAdornment: (
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                <Image src="/magnifier.svg" alt="Search" width={16} height={16} />
              </Box>
            ),
            // Clear icon on the right
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image src="/Delete.png" alt="Clear" width={16} height={16} />
              </Box>
            ),
            // Styling for the search bar
            sx: {
              backgroundColor: '#F9FAFB',
              borderRadius: '10px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#E5E7EB' },
                '&.Mui-focused fieldset': { borderColor: '#E5E7EB' },
              },
              '& .MuiInputBase-input': {
                fontSize: '14px',
                color: '#737791',
              },
            },
          }}
        />
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '5%' }}>
                <Checkbox size="small" />
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '25%' }}>
                Product
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '20%' }}>
                Inventory
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '20%' }}>
                Loreal
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '15%' }}>
                Price
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '15%' }}>
                Rating
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            <TableRow sx={{ backgroundColor: '#FFFFFF' }}>
              <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                <Checkbox size="small" checked />
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* Placeholder for product image */}
                  <Box width={40} height={40} style={{ borderRadius: '5px', backgroundColor: "rgba(217, 217, 217, 1)" }} />
                  <Box sx={{ ml: 2 }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#1F2A44' }}>
                      vitamin
                    </Typography>
                    <Typography sx={{ fontSize: '14px', color: '#737791' }}>
                      loreal ipsum
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB' }}>
                96 in stock
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB' }}>
                Black
              </TableCell>
              <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB' }}>
                $49.90
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{
                    fontSize: '14px',
                    borderRadius: '20px',
                    textAlign: 'center',
                  }}>
                    5.0 (32 Votes)
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer Section with Cancel and Delete buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3, gap: 10 }}>
        <Button
          sx={{
            fontSize: '14px',
            color: 'rgba(21, 27, 38, 1)',
            fontWeight: 600,
            textTransform: 'none',
          }}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          onClick={handleOpenDialog}
          sx={{
            backgroundColor: 'rgba(246, 57, 24, 1)',
            color: '#FFFFFF',
            fontSize: '14px',
            px: 3,
            py: 1,
            borderRadius: '16px',
            textTransform: 'none',
            width: "20%",
            '&:hover': {
              backgroundColor: '#E55050',
            },
          }}
        >
          Delete
        </Button>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            width: '400px',
            borderRadius: '10px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            p: 3,
            minWidth: "35%",
          },
        }}
      >
        {/* Dialog Title with Close Icon */}
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, pb: 1 }}>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2A44' }}>
            Delete Items
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ p: 0 }} aria-label="Close dialog">
            <Image src="/Close.png" alt="Close" width={16} height={16} style={{ color: '#737791' }} />
          </IconButton>
        </DialogTitle>
        {/* Dialog Content */}
        <DialogContent sx={{ p: 0, py: 2 }}>
          <Typography sx={{ fontSize: '16px', color: 'rgba(19, 21, 35, 1)' }}>
            Are you sure you want to delete selected items?
          </Typography>
        </DialogContent>
        {/* Dialog Actions (Buttons) */}
        <DialogActions sx={{ p: 0, justifyContent: 'flex-end', gap: 1 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              fontSize: '16px',
              color: 'rgba(19, 21, 35, 1)',
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: '#F63918',
              color: '#FFFFFF',
              fontSize: '14px',
              px: 3,
              py: 1,
              borderRadius: '16px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#E55050',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccessDialog}
        PaperProps={{
          sx: {
            width: '400px',
            borderRadius: '10px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            p: 3,
            minWidth: "35%",
          },
        }}
      >
        {/* Close Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={handleCloseSuccessDialog} sx={{ p: 0 }} aria-label="Close success dialog">
            <Image src="/Close.png" alt="Close" width={16} height={16} style={{ color: '#737791' }} />
          </IconButton>
        </Box>
        {/* Success Icon and Message */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: '48px',
              height: '48px',
              backgroundColor: '#FFEBEB',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src="/deleteSuc.png" alt="Checkmark" width={24} height={24}  />
          </Box>
          <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2A44' }}>
            Deleted Successfully
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
}