import { api } from '../config';

export interface WarehouseAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface WarehouseContactInfo {
  email: string;
  phone: string;
  alternatePhone?: string;
}

export interface Warehouse {
  _id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  capacity: number;
  currentUtilization: number;
  manager: string;
  address: WarehouseAddress;
  contactInfo: WarehouseContactInfo;
  uniqueId: string;
  createdAt: string;
  updatedAt: string;
}

export interface WarehousesResponse {
  success: boolean;
  warehouses: Warehouse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class WarehouseService {
  private baseUrl = '/private/warehouses';

  // Get all warehouses
  async getWarehouses(params?: {
    page?: number;
    search?: string;
    status?: string;
  }): Promise<WarehousesResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }
      if (params?.search) {
        queryParams.append('search', params.search);
      }
      if (params?.status) {
        queryParams.append('status', params.status);
      }
      const url = queryParams.toString()
        ? `${this.baseUrl}?${queryParams.toString()}`
        : this.baseUrl;
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch warehouses'
      );
    }
  }

  // Get warehouse by ID
  async getWarehouseById(id: string): Promise<any> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch warehouse'
      );
    }
  }

  // Create warehouse
  async createWarehouse(data: any): Promise<any> {
    try {
      const response = await api.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create warehouse'
      );
    }
  }

  // Update warehouse
  async updateWarehouse(id: string, data: any): Promise<any> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update warehouse'
      );
    }
  }

  // Delete warehouse
  async deleteWarehouse(id: string): Promise<any> {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete warehouse'
      );
    }
  }
}

export const warehouseService = new WarehouseService();
