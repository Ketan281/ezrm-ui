import { api } from '../config';

export enum PurchaseOrderStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  SHIPPED = 'shipped',
  RECEIVED = 'received',
  CANCELLED = 'cancelled',
}

export interface PurchaseOrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  amount: number;
  status: PurchaseOrderStatus;
}

export interface PurchaseOrder {
  _id?: string;
  id?: string;
  supplier_id: string;
  status: PurchaseOrderStatus;
  total_amount: number;
  currency: string;
  expected_date: string;
  items: PurchaseOrderItem[];
  shipping_address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
  shipping_method?: string;
  shipping_cost: number;
  tracking_number?: string;
  shipping_date?: string;
  delivery_date?: string;
  shipping_notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePurchaseOrderRequest {
  order: Omit<PurchaseOrder, 'id' | 'createdAt' | 'updatedAt' | 'items'>;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderResponse {
  success: boolean;
  data?: PurchaseOrder;
  message?: string;
  error?: string;
}

export interface PurchaseOrdersListResponse {
  success: boolean;
  data?: PurchaseOrder[];
  message?: string;
  error?: string;
}

class PurchaseOrderService {
  private baseUrl = '/private/purchase-orders';

  // Create a new purchase order
  async createPurchaseOrder(data: CreatePurchaseOrderRequest) {
    const response = await api.post(this.baseUrl, data);
    return response?.data;
  }

  // Get all purchase orders with optional filtering
  async getPurchaseOrders(params?: {
    page?: number;
    search?: string;
    status?: string;
  }): Promise<PurchaseOrdersListResponse> {
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
        error.response?.data?.message || 'Failed to fetch purchase orders'
      );
    }
  }

  // Get a specific purchase order by ID
  async getPurchaseOrderById(id: string): Promise<PurchaseOrderResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch purchase order'
      );
    }
  }

  // Update a purchase order
  async updatePurchaseOrder(
    id: string,
    data: Partial<PurchaseOrder>
  ): Promise<PurchaseOrderResponse> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update purchase order'
      );
    }
  }

  // Delete a purchase order
  async deletePurchaseOrder(id: string): Promise<PurchaseOrderResponse> {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete purchase order'
      );
    }
  }

  // Update purchase order status
  async updatePurchaseOrderStatus(
    id: string,
    status: PurchaseOrderStatus
  ): Promise<PurchaseOrderResponse> {
    try {
      const response = await api.patch(`${this.baseUrl}/${id}/status`, {
        status,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to update purchase order status'
      );
    }
  }

  // Get purchase orders by status
  async getPurchaseOrdersByStatus(
    status: PurchaseOrderStatus
  ): Promise<PurchaseOrdersListResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/status/${status}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to fetch purchase orders by status'
      );
    }
  }
}

export const purchaseOrderService = new PurchaseOrderService();
