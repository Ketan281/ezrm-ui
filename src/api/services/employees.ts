import { api } from '../config';

export interface Employee {
  _id: string;
  uniqueId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'MANAGER';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
}

export interface CreateEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  password?: string;
}

export interface EmployeeResponse {
  success: boolean;
  data?: Employee;
  message?: string;
  error?: string;
}

export interface EmployeesListResponse {
  success: boolean;
  data: Employee[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

class EmployeeService {
  private baseUrl = '/private/users';

  // Get all employees
  async getEmployees(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    role?: string;
  }): Promise<EmployeesListResponse> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }
      if (params?.limit) {
        queryParams.append('limit', params.limit.toString());
      }
      if (params?.search) {
        queryParams.append('search', params.search);
      }
      if (params?.status) {
        queryParams.append('status', params.status);
      }
      if (params?.role) {
        queryParams.append('role', params.role);
      }
      const url = queryParams.toString()
        ? `${this.baseUrl}?${queryParams.toString()}`
        : this.baseUrl;
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch employees'
      );
    }
  }

  // Get employee by ID
  async getEmployeeById(id: string): Promise<EmployeeResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch employee'
      );
    }
  }

  // Create employee
  async createEmployee(data: CreateEmployeeRequest): Promise<EmployeeResponse> {
    try {
      const response = await api.post(this.baseUrl, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create employee'
      );
    }
  }

  // Update employee
  async updateEmployee(
    id: string,
    data: Partial<CreateEmployeeRequest>
  ): Promise<EmployeeResponse> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update employee'
      );
    }
  }

  // Delete employee
  async deleteEmployee(id: string): Promise<EmployeeResponse> {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete employee'
      );
    }
  }
}

export const employeeService = new EmployeeService();
