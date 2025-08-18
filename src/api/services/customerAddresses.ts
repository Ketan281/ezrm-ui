import { api } from '../config';

export interface CustomerAddress {
  _id?: string;
  customerId?: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
  isActive?: boolean;
  uniqueId?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface AddAddressRequest {
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest extends AddAddressRequest {
  _id: string;
}

export interface AddressResponse {
  success: boolean;
  data?: CustomerAddress;
  message?: string;
  error?: string;
}

export interface CustomerAddressData {
  customer: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    addresses: any[];
    membershipTier: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    uniqueId: string;
    __v: number;
    loginApproval: boolean;
    signupOtp: string | null;
    signupOtpExpiry: string | null;
    signupStep: string;
    annualRevenue?: string;
    businessType?: string;
    companyName?: string;
    contactPerson?: string;
    contactPersonEmail?: string;
    contactPersonPhone?: string;
    employeeCount?: string;
    industry?: string;
    notes?: string;
    registrationNumber?: string;
    taxId?: string;
    website?: string;
  };
  addresses: CustomerAddress[];
  totalAddresses: number;
}

export interface AddressesListResponse {
  success: boolean;
  data: CustomerAddressData;
  message: string;
}

class CustomerAddressService {
  private baseUrl = '/private/customer-addresses';

  // Get all addresses for a customer
  async getCustomerAddresses(
    customerId: string
  ): Promise<AddressesListResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/customer/${customerId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch customer addresses'
      );
    }
  }

  // Get address detail
  async getAddressDetail(
    customerId: string,
    addressId: string
  ): Promise<AddressResponse> {
    try {
      const response = await api.get(
        `${this.baseUrl}/${customerId}/${addressId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch address detail'
      );
    }
  }

  // Add new address
  async addAddress(
    customerId: string,
    data: AddAddressRequest
  ): Promise<AddressResponse> {
    try {
      const response = await api.post(`${this.baseUrl}/${customerId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add address');
    }
  }

  // Update address
  async updateAddress(
    customerId: string,
    addressId: string,
    data: Partial<AddAddressRequest>
  ): Promise<AddressResponse> {
    try {
      const response = await api.put(
        `${this.baseUrl}/${customerId}/${addressId}`,
        data
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update address'
      );
    }
  }

  // Delete address
  async deleteAddress(
    customerId: string,
    addressId: string
  ): Promise<AddressResponse> {
    try {
      const response = await api.delete(
        `${this.baseUrl}/${customerId}/${addressId}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete address'
      );
    }
  }

  // Set default address
  async setDefaultAddress(
    customerId: string,
    addressId: string
  ): Promise<AddressResponse> {
    try {
      const response = await api.patch(
        `${this.baseUrl}/${customerId}/${addressId}/default`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to set default address'
      );
    }
  }
}

export const customerAddressService = new CustomerAddressService();
