import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supplierService } from '../api/services/suppliers';
import { toast } from 'react-hot-toast';

// Simple supplier queries
export const useSuppliers = (params = {}) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () => supplierService.getSuppliers(),
  });
};

export const useSupplier = (id: string) => {
  return useQuery({
    queryKey: ['supplier', id],
    queryFn: () => supplierService.getSupplierById(id),
    enabled: !!id,
  });
};

// Simple supplier mutations
export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => supplierService.createSupplier(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success('Supplier created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create supplier');
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => supplierService.updateSupplier(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.invalidateQueries({ queryKey: ['supplier', id] });
      toast.success('Supplier updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update supplier');
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => supplierService.deleteSupplier(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      queryClient.removeQueries({ queryKey: ['supplier', id] });
      toast.success('Supplier deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete supplier');
    },
  });
};
