import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '../api/services/categories';
import { toast } from 'react-hot-toast';

// Simple category queries
export const useCategories = (params = {}) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => categoryService.getCategories(),
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getCategoryById(id),
    enabled: !!id,
  });
};

// Simple category mutations
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => categoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => categoryService.updateCategory(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', id] });
      toast.success('Category updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => categoryService.deleteCategory(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.removeQueries({ queryKey: ['category', id] });
      toast.success('Category deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete category');
    },
  });
};
