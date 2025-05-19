"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Pagination,
  TableFooter,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import Image from 'next/image';

export interface TableColumn {
  id: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  type?: 'status' | 'link' | 'default';
}

export interface TableRowData {
  id: string;
  [key: string]: string | number | boolean | null | undefined | React.ReactNode;
}

interface TableComponentProps {
  columns: TableColumn[];
  data: TableRowData[];
  totalResults: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (row: TableRowData) => void;
  filterOptions?: {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
  };
  searchOptions?: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  };
  actionButtons?: React.ReactNode;
  showCheckboxes?: boolean;
  showHeader?: boolean;
  rowsPerPage?: number;
}

export const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  data,
  totalResults,
  currentPage = 1,
  onPageChange,
  onRowClick,
  filterOptions,
  searchOptions,
  actionButtons,
  showCheckboxes = true,
  showHeader = true,
  rowsPerPage = 9,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [internalPage, setInternalPage] = useState(1);
  const [filteredData, setFilteredData] = useState<TableRowData[]>(data);
  
  // Calculate the total pages based on the total results, not just the data array length
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const showPagination = totalResults > rowsPerPage;

  // Use the provided currentPage if onPageChange is defined, otherwise use internal state
  const page = onPageChange ? currentPage : internalPage;
  const handlePageChange = onPageChange || setInternalPage;

  // Reset selection when data changes
  useEffect(() => {
    setSelected([]);
  }, [data]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  const renderStatusCell = (value: unknown) => {
    if (value === null || value === undefined) return null;
    
    const stringValue = String(value);
    let bgColor = '#E5E7EB';
    let textColor = '#737791';
    
    switch(stringValue.toLowerCase()) {
      case 'completed':
        bgColor = 'rgba(6, 165, 97, 0.09)';
        textColor = 'rgba(6, 165, 97, 1)';
        break;
      case 'pending':
        bgColor = 'rgba(255, 244, 240, 1)';
        textColor = 'rgba(255, 143, 107, 1)';
        break;
      case 'in-process':
        bgColor = 'rgba(255, 247, 225, 1)';
        textColor = 'rgba(255, 195, 39, 1)';
        break;
      case 'new order':
        bgColor = 'rgba(239, 239, 255, 1)';
        textColor = 'rgba(96, 91, 255, 1)';
        break;
    }
    
    return (
      <Box 
        sx={{
          backgroundColor: bgColor,
          borderRadius: '6px',
          padding: '7px 10px',
          minWidth: '100px',
          height: '32px',
          display: 'inline-block',
          fontSize: '12px',
          fontWeight: '500',
          color: textColor,
          textAlign: 'center',
          maxWidth: 'fit-content'
        }}
      >
        {stringValue}
      </Box>
    );
  };

  const renderLinkCell = (value: unknown) => {
    if (typeof value !== 'string') return "View";
    
    return (
      <Typography 
        sx={{ 
          color: '#7C3AED',
          fontWeight: '500',
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(value !== '#' ? value : '#', '_blank');
        }}
      >
        View
      </Typography>
    );
  };

  // Debug info
  console.log('Total Results:', totalResults);
  console.log('Total Pages:', totalPages);
  console.log('Current Page:', page);
  console.log('Rows Per Page:', rowsPerPage);
  console.log('Data Length:', data.length);
  console.log('Showing Pagination:', showPagination);

  return (
    <Box sx={{ p: 1, backgroundColor: '#F9FAFB', minHeight: '85vh', fontFamily: 'Poppins, sans-serif' }}>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <Table>
          {showHeader && (
            <TableHead sx={{ borderBottom: "2px solid rgba(215, 219, 236, 1)" }}>
              <TableRow>
                <TableCell colSpan={columns.length + (showCheckboxes ? 1 : 0)} sx={{ borderBottom: 'none', py: 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={2}>
                      {searchOptions && (
                        <TextField
                          placeholder={searchOptions.placeholder || "Search"}
                          value={searchOptions.value}
                          onChange={(e) => searchOptions.onChange(e.target.value)}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Image src="/magnifier.svg" alt="Search" width={16} height={16} />
                              </InputAdornment>
                            ),
                            sx: {
                              height: '40px',
                              width: '200px',
                              fontSize: '14px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E5E7EB',
                              },
                            }
                          }}
                        />
                      )}
                      {filterOptions && (
                        <FormControl sx={{ minWidth: 150 }}>
                          <Select
                            value={filterOptions.value}
                            onChange={(e) => filterOptions.onChange(e.target.value as string)}
                            displayEmpty
                            renderValue={(selected) => {
                              if (!selected) {
                                return <span style={{ color: '#737791', fontSize: '14px' }}>
                                  {filterOptions.placeholder || "Status"}
                                </span>;
                              }
                              return selected;
                            }}
                            sx={{
                              height: '40px',
                              fontSize: '14px',
                              color: '#737791',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E5E7EB',
                              },
                            }}
                          >
                            {filterOptions.options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                {showCheckboxes && (
                  <TableCell sx={{ fontSize: '14px', color: '#737791', borderBottom: '1px solid #E5E7EB', width: '5%' }}>
                    <Checkbox
                      size="small"
                      indeterminate={selected.length > 0 && selected.length < data.length}
                      checked={data.length > 0 && selected.length === data.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{
                      fontSize: '14px',
                      color: '#737791',
                      borderBottom: '1px solid #E5E7EB',
                      width: column.width || 'auto',
                      textAlign: column.align || 'left',
                      textTransform: 'capitalize'
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}

          <TableBody>
            {data.length > 0 ? (
              data.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{
                      backgroundColor: '#FFFFFF',
                      cursor: onRowClick ? 'pointer' : 'default',
                      '&:hover': { backgroundColor: '#F5F5F5' }
                    }}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {showCheckboxes && (
                      <TableCell sx={{ borderBottom: '1px solid #E5E7EB' }}>
                        <Checkbox
                          size="small"
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                    )}
                    {columns.map((column) => {
                      const cellValue = row[column.id];
                      let content: React.ReactNode = null;

                      if (column.type === 'status' || column.id === 'status') {
                        content = renderStatusCell(cellValue);
                      } else if (column.type === 'link') {
                        content = renderLinkCell(cellValue);
                      } else {
                        content = cellValue !== null && cellValue !== undefined ? String(cellValue) : null;
                      }

                      return (
                        <TableCell
                          key={column.id}
                          sx={{
                            fontSize: '14px',
                            color: column.id === 'name' ? '#1F2A44' : '#737791',
                            borderBottom: '1px solid #E5E7EB',
                            fontWeight: column.id === 'name' ? 'bold' : 'normal',
                            textAlign: column.align || 'left',
                          }}
                        >
                          {content}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + (showCheckboxes ? 1 : 0)} align="center" sx={{ py: 3 }}>
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter sx={{ backgroundColor: '#FFFFFF' }}>
            <TableRow>
              <TableCell colSpan={columns.length + (showCheckboxes ? 1 : 0)} sx={{ borderBottom: 'none', py: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  {showPagination && (
                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={(event, newPage) => {
                        console.log("Page changed to:", newPage);
                        handlePageChange(newPage);
                      }}
                      siblingCount={1}
                      boundaryCount={1}
                      sx={{
                        '& .MuiPaginationItem-root': {
                          fontSize: '12px',
                          color: '#737791',
                          minWidth: '24px',
                          height: '24px',
                          margin: '0 2px',
                          padding: '0',
                        },
                        '& .Mui-selected': {
                          backgroundColor: '#3B82F6',
                          color: '#FFFFFF',
                          '&:hover': {
                            backgroundColor: '#2563EB',
                          },
                        },
                      }}
                    />
                  )}
                  <Typography sx={{ fontSize: '14px', color: '#737791' }}>
                    {totalResults} Results
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {actionButtons}
    </Box>
  );
};

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
  confirmButtonText = 'Delete',
  cancelButtonText = 'Cancel',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 0, pb: 1, fontFamily: 'Poppins, sans-serif' }}>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2A44', fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </Typography>
        <IconButton onClick={onClose} sx={{ p: 0 }} aria-label="Close dialog">
          <Image src="/Close.png" alt="Close" width={16} height={16} style={{ color: '#737791' }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0, py: 2 }}>
        <Typography sx={{ fontSize: '16px', color: 'rgba(19, 21, 35, 1)', fontFamily: 'Poppins, sans-serif' }}>
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 0, justifyContent: 'flex-end', gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{
            fontSize: '16px',
            color: 'rgba(19, 21, 35, 1)',
            textTransform: 'none',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {cancelButtonText}
        </Button>
        <Button
          onClick={onConfirm}
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
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  title,
  icon = '/deleteSuc.png',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={onClose} sx={{ p: 0 }} aria-label="Close success dialog">
          <Image src="/Close.png" alt="Close" width={16} height={16} style={{ color: '#737791' }} />
        </IconButton>
      </Box>
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
          <Image src={icon} alt="Success" width={24} height={24} />
        </Box>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2A44', fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </Typography>
      </Box>
    </Dialog>
  );
};