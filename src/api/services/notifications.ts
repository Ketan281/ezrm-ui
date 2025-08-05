import { api } from '../config';

export interface RelatedEntity {
  type: string;
  id: string;
  reference?: string;
}

export interface ActionRequired {
  type: string;
  description: string;
  actionUrl?: string;
}

export interface NotificationMetadata {
  stock?: number;
  warehouse?: string;
  retryAttempts?: number;
  gateway?: string;
  assignedBy?: string;
  dueDate?: string;
  [key: string]: any;
}

export interface Notification {
  _id: string;
  uniqueId: string;
  recipientId: string;
  recipientType: 'customer_employee' | 'admin' | 'supplier';
  title: string;
  message: string;
  type: 'refund' | 'inventory' | 'payment' | 'order' | 'system';
  category: 'success' | 'warning' | 'error' | 'info';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'read' | 'unread';
  relatedEntity?: RelatedEntity;
  actionRequired?: ActionRequired;
  metadata?: NotificationMetadata;
  readAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationRequest {
  recipientId: string;
  recipientType: string;
  title: string;
  message: string;
  type: string;
  category: string;
  priority: string;
  relatedEntity?: RelatedEntity;
  actionRequired?: ActionRequired;
  metadata?: NotificationMetadata;
  expiresAt?: string;
}

export interface NotificationResponse {
  success: boolean;
  data?: Notification;
  message?: string;
  error?: string;
}

export interface NotificationsListResponse {
  success: boolean;
  data: {
    notifications: Notification[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class NotificationService {
  private baseUrl = '/private/notifications';

  // Get all notifications
  async getNotifications(params?: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    category?: string;
    priority?: string;
  }): Promise<NotificationsListResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }
      if (params?.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params?.status) {
        queryParams.append('status', params.status);
      }
      if (params?.type) {
        queryParams.append('type', params.type);
      }
      if (params?.category) {
        queryParams.append('category', params.category);
      }
      if (params?.priority) {
        queryParams.append('priority', params.priority);
      }
      const url = queryParams.toString()
        ? `${this.baseUrl}?${queryParams.toString()}`
        : this.baseUrl;
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch notifications'
      );
    }
  }

  // Get notification by ID
  async getNotificationById(id: string): Promise<NotificationResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch notification'
      );
    }
  }

  // Mark notification as read
  async markAsRead(id: string): Promise<NotificationResponse> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}/read`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to mark notification as read'
      );
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<NotificationResponse> {
    try {
      const response = await api.put(`${this.baseUrl}/read-all`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message ||
          'Failed to mark all notifications as read'
      );
    }
  }

  // Create notification
  async createNotification(
    data: CreateNotificationRequest
  ): Promise<NotificationResponse> {
    try {
      const response = await api.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create notification'
      );
    }
  }

  // Update notification
  async updateNotification(
    id: string,
    data: Partial<CreateNotificationRequest>
  ): Promise<NotificationResponse> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update notification'
      );
    }
  }

  // Delete notification
  async deleteNotification(id: string): Promise<NotificationResponse> {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete notification'
      );
    }
  }

  // Get unread count
  async getUnreadCount(): Promise<{ count: number }> {
    try {
      const response = await api.get(`${this.baseUrl}/unread-count`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to get unread count'
      );
    }
  }
}

export const notificationService = new NotificationService();
