import { api } from '../config';

export interface InventoryLocation {
  aisle: string;
  rack: string;
  shelf: string;
}

export interface InventoryProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  inStock: boolean;
  uniqueId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  _id: string;
  location: InventoryLocation;
  product: InventoryProduct | null;
  quantity: number;
  minThreshold: number;
  maxThreshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestocked: string;
  lastChecked: string;
  batchNumber: string;
  uniqueId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryResponse {
  success: boolean;
  inventory: InventoryItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

class InventoryService {
  private baseUrl = '/private/inventory';

  // Get all inventory items
  async getInventory(params?: {
    page?: number;
    search?: string;
    status?: string;
  }): Promise<InventoryResponse> {
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
        error.response?.data?.message || 'Failed to fetch inventory'
      );
    }
  }

  // Get inventory item by ID
  async getInventoryById(id: string): Promise<any> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch inventory item'
      );
    }
  }

  // Create inventory item
  async createInventoryItem(data: any): Promise<any> {
    try {
      const response = await api.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create inventory item'
      );
    }
  }

  // Update inventory item
  async updateInventoryItem(id: string, data: any): Promise<any> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update inventory item'
      );
    }
  }

  // Delete inventory item
  async deleteInventoryItem(id: string): Promise<any> {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete inventory item'
      );
    }
  }
}

export const inventoryService = new InventoryService();
