import { api } from '../config';

export interface DashboardOverview {
  totalCustomers: number;
  totalOrders: number;
  totalRFQs: number;
  totalReviews: number;
  totalPurchaseOrders: number;
  totalShipments: number;
  totalProducts: number;
  totalSuppliers: number;
  totalTransactions: number;
  totalNotifications: number;
  totalRevenue: number;
  totalInventoryValue: number;
}

export interface GrowthData {
  _id: string;
  count?: number;
  revenue?: number;
}

export interface RecentOrder {
  _id: string;
  customer: string;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  uniqueId: string;
}

export interface TopProduct {
  _id: string;
  totalSold: number;
}

export interface DashboardTrends {
  customerGrowth: GrowthData[];
  revenueGrowth: GrowthData[];
}

export interface DashboardRecent {
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
}

export interface DashboardData {
  overview: DashboardOverview;
  trends: DashboardTrends;
  recent: DashboardRecent;
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardData;
}

export interface RFQData {
  totalRFQs: number;
  rfqsByStatus: Array<{ _id: string; count: number }>;
  rfqsByMonth: GrowthData[];
  rfqGrowth: GrowthData[];
}

export interface CustomerData {
  totalCustomers: number;
  newCustomers: number;
  activeCustomers: number;
  customerByStatus: Array<{ _id: string; count: number }>;
  customerByLocation: Array<{ _id: string | null; count: number }>;
  customerGrowth: GrowthData[];
}

export interface OrderData {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Array<{ _id: string | null; count: number; revenue: number }>;
  ordersByMonth: GrowthData[];
  orderGrowth: GrowthData[];
}

export interface ReviewData {
  totalReviews: number;
  averageRating: number;
  reviewsByRating: Array<{ _id: number; count: number }>;
  reviewsByMonth: GrowthData[];
  reviewGrowth: GrowthData[];
}

export interface PurchaseOrderData {
  totalPurchaseOrders: number;
  totalValue: number;
  purchaseOrdersByStatus: Array<{ _id: string; count: number; value: number }>;
  purchaseOrdersBySupplier: Array<{ _id: string | null; count: number; value: number }>;
  purchaseOrderGrowth: GrowthData[];
}

export interface ShipmentData {
  totalShipments: number;
  shipmentsByStatus: Array<{ _id: string; count: number }>;
  shipmentsByMonth: GrowthData[];
  shipmentGrowth: GrowthData[];
}

export interface RevenueData {
  totalRevenue: number;
  revenueByMonth: Array<{ _id: string; revenue: number }>;
  revenueBySource: Array<{ _id: string; revenue: number }>;
  revenueGrowth: Array<{ _id: string; revenue: number }>;
}

class DashboardService {
  // Get main dashboard data
  async getDashboardData(): Promise<DashboardResponse> {
    try {
      const response = await api.get('/private/reports/dashboard');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch dashboard data'
      );
    }
  }

  // Get RFQ data
  async getRFQData(): Promise<{ success: boolean; data: RFQData }> {
    try {
      const response = await api.get('/private/reports/rfqs');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch RFQ data'
      );
    }
  }

  // Get customer data
  async getCustomerData(): Promise<{ success: boolean; data: CustomerData }> {
    try {
      const response = await api.get('/private/reports/customers');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch customer data'
      );
    }
  }

  // Get order data
  async getOrderData(): Promise<{ success: boolean; data: OrderData }> {
    try {
      const response = await api.get('/private/reports/orders');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch order data'
      );
    }
  }

  // Get review data
  async getReviewData(): Promise<{ success: boolean; data: ReviewData }> {
    try {
      const response = await api.get('/private/reports/reviews');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch review data'
      );
    }
  }

  // Get purchase order data
  async getPurchaseOrderData(): Promise<{ success: boolean; data: PurchaseOrderData }> {
    try {
      const response = await api.get('/private/reports/purchase-orders');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch purchase order data'
      );
    }
  }

  // Get shipment data
  async getShipmentData(): Promise<{ success: boolean; data: ShipmentData }> {
    try {
      const response = await api.get('/private/reports/shipments');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch shipment data'
      );
    }
  }

  // Get revenue data
  async getRevenueData(): Promise<{ success: boolean; data: RevenueData }> {
    try {
      const response = await api.get('/private/reports/revenue');
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch revenue data'
      );
    }
  }
}

export const dashboardService = new DashboardService(); 