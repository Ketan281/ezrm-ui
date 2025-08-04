import { api } from '../config';

export const supplierService = {
  async getSuppliers() {
    try {
      const response = await api.get('/private/suppliers');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch suppliers'
      );
    }
  },

  async getSupplierById(id: string) {
    try {
      const response = await api.get(`/private/suppliers/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch supplier'
      );
    }
  },

  async createSupplier(data: any) {
    try {
      const response = await api.post('/private/suppliers', data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create supplier'
      );
    }
  },

  async updateSupplier(id: string, data: any) {
    try {
      const response = await api.put(`/private/suppliers/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update supplier'
      );
    }
  },

  async deleteSupplier(id: string) {
    try {
      const response = await api.delete(`/private/suppliers/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete supplier'
      );
    }
  }
};


