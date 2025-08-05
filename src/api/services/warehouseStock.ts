import { api } from '../config';

export interface WarehouseStock {
  _id: string;
  warehouseId: {
    _id: string;
    name: string;
  };
  productId: {
    _id: string;
    name: string;
  };
  slotName: string;
  quantityTotal: number;
  quantityReserved: number;
  quantityAvailable: number;
  qcPassed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseStockResponse {
  success: boolean;
  data: WarehouseStock[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

class WarehouseStockService {
  private baseUrl = '/private/warehouse-stock';

  // Get warehouse stock with optional warehouse filter
  async getWarehouseStock(params?: {
    warehouseId?: string;
    page?: number;
    limit?: number;
  }): Promise<WarehouseStockResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.warehouseId) {
        queryParams.append('warehouseId', params.warehouseId);
      }
      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }
      if (params?.limit) {
        queryParams.append('limit', params.limit.toString());
      }

      const url = queryParams.toString()
        ? `${this.baseUrl}?${queryParams.toString()}`
        : this.baseUrl;

      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch warehouse stock'
      );
    }
  }

  // Create warehouse stock
  async createWarehouseStock(data: {
    warehouseId: string;
    productId: string;
    slotName: string;
    quantityTotal: number;
    quantityReserved: number;
    quantityAvailable: number;
    qcPassed: boolean;
  }): Promise<any> {
    try {
      const response = await api.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create warehouse stock'
      );
    }
  }

  // Get warehouse stock by ID
  async getWarehouseStockById(id: string): Promise<any> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to fetch warehouse stock details'
      );
    }
  }
}

export const warehouseStockService = new WarehouseStockService();
