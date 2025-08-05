'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '@/api/services/employees';
import {
  TableComponent,
  TableRowData,
} from '../../../../components/TableComponent';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

interface EmployeeRowData extends TableRowData {
  id: string;
  name: string;
  uniqueId: string;
  contact: React.ReactNode;
  role: string;
  status: string;
  lastLogin: string;
  actions: React.ReactNode;
}

export default function EmployeesListing() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch employees
  const {
    data: employeesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      'employees',
      {
        page,
        search: debouncedSearchTerm,
        status: statusFilter,
        role: roleFilter,
      },
    ],
    queryFn: () =>
      employeeService.getEmployees({
        page,
        search: debouncedSearchTerm,
        status: statusFilter,
        role: roleFilter,
      }),
  });

  // Delete employee mutation
  const deleteEmployeeMutation = useMutation({
    mutationFn: async (employeeId: string) => {
      return employeeService.deleteEmployee(employeeId);
    },
    onSuccess: () => {
      toast.success('Employee deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete employee');
    },
  });

  const employees = employeesData?.data || [];
  const totalResults = employeesData?.total || 0;

  const formatLastLogin = (lastLogin: string) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderContact = (employee: any) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <EmailIcon sx={{ fontSize: 12, color: '#666' }} />
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', color: '#666' }}
          >
            {employee?.email || 'N/A'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PersonIcon sx={{ fontSize: 12, color: '#666' }} />
          <Typography
            variant="caption"
            sx={{ fontSize: '10px', color: '#666' }}
          >
            {employee?.firstName} {employee?.lastName}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderActions = (employeeId: string) => (
    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleViewEmployee(employeeId);
        }}
        sx={{ color: '#1976d2' }}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleEditEmployee(employeeId);
        }}
        sx={{ color: '#ff9800' }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteEmployee(employeeId);
        }}
        sx={{ color: '#f44336' }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const employeeData: EmployeeRowData[] = employees.map((employee: any) => ({
    id: employee._id,
    name: `${employee.firstName} ${employee.lastName}`,
    uniqueId: employee.uniqueId,
    contact: renderContact(employee),
    role: employee.role,
    status: employee.status,
    lastLogin: formatLastLogin(employee.lastLogin),
    actions: renderActions(employee._id),
  }));

  const columns = [
    { id: 'name', label: 'Employee Name', width: '15%' },
    { id: 'uniqueId', label: 'Unique ID', width: '12%' },
    { id: 'contact', label: 'Contact', width: '20%' },
    {
      id: 'role',
      label: 'Role',
      width: '12%',
      align: 'center' as const,
    },
    {
      id: 'status',
      label: 'Status',
      width: '10%',
      type: 'status' as const,
      align: 'center' as const,
    },
    {
      id: 'lastLogin',
      label: 'Last Login',
      width: '15%',
      align: 'center' as const,
    },
    { id: 'actions', label: 'Actions', width: '16%', align: 'center' as const },
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleAddEmployee = () => {
    router.push('/admin/data-management/employees/add');
  };

  const handleEditEmployee = (employeeId: string) => {
    router.push(`/admin/data-management/employees/${employeeId}/edit`);
  };

  const handleViewEmployee = (employeeId: string) => {
    router.push(`/admin/data-management/employees/${employeeId}`);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    setEmployeeToDelete(employeeId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployeeMutation.mutate(employeeToDelete);
    }
  };

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'ADMIN', label: 'Admin' },
    { value: 'USER', label: 'User' },
    { value: 'MANAGER', label: 'Manager' },
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
          Employees Listing ({totalResults})
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          Add Employee
        </Button>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load employees. Please try again.
        </Alert>
      )}

      {/* Filters */}
      {!isLoading && !error && (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiSelect-select': { fontFamily: 'Poppins, sans-serif' },
              }}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <Select
              value={roleFilter}
              onChange={(e: any) => setRoleFilter(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiSelect-select': { fontFamily: 'Poppins, sans-serif' },
              }}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      {!isLoading && !error && (
        <TableComponent
          columns={columns}
          data={employeeData}
          totalResults={totalResults}
          currentPage={page}
          onPageChange={handlePageChange}
          showCheckboxes={false}
          showHeader={true}
          rowsPerPage={10}
          searchOptions={{
            value: searchTerm,
            onChange: setSearchTerm,
            placeholder: 'Search employees...',
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={deleteEmployeeMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleteEmployeeMutation.isPending}
            startIcon={
              deleteEmployeeMutation.isPending ? (
                <CircularProgress size={16} />
              ) : null
            }
          >
            {deleteEmployeeMutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
