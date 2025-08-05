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
  async getWarehouses(): Promise<WarehousesResponse> {
    try {
      const response = await api.get(this.baseUrl);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch warehouses'
      );
    }
  }
}

export const warehouseService = new WarehouseService();
