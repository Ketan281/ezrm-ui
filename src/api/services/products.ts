import { api } from '../config';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  bannerImage?: File;
  images?: File[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  bannerImage?: File;
  images?: File[];
}

export interface ProductResponse {
  success: boolean;
  data?: Product;
  message?: string;
  error?: string;
}

export interface ProductsListResponse {
  success: boolean;
  data?: Product[];
  message?: string;
  error?: string;
}

class ProductService {
  private baseUrl = '/private/products';

  // Get all products
  async getProducts() {
    try {
      const response = await api.get(this.baseUrl);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch products'
      );
    }
  }

  // Get a specific product by ID
  async getProductById(id: string): Promise<ProductResponse> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch product'
      );
    }
  }

  // Create a new product
  async createProduct(data: CreateProductRequest): Promise<ProductResponse> {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      formData.append('category', data.category);
      formData.append('inStock', data.inStock.toString());

      if (data.bannerImage) {
        formData.append('bannerImage', data.bannerImage);
      }

      if (data.images) {
        data.images.forEach((image, index) => {
          formData.append(`images`, image);
        });
      }

      const response = await api.post(this.baseUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to create product'
      );
    }
  }

  // Update a product
  async updateProduct(
    id: string,
    data: Partial<CreateProductRequest>
  ): Promise<ProductResponse> {
    try {
      const formData = new FormData();

      if (data.name) formData.append('name', data.name);
      if (data.description) formData.append('description', data.description);
      if (data.price) formData.append('price', data.price.toString());
      if (data.category) formData.append('category', data.category);
      if (data.inStock !== undefined)
        formData.append('inStock', data.inStock.toString());

      if (data.bannerImage) {
        formData.append('bannerImage', data.bannerImage);
      }

      if (data.images) {
        data.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await api.put(`${this.baseUrl}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to update product'
      );
    }
  }

  // Delete a product
  async deleteProduct(id: string): Promise<ProductResponse> {
    try {
      const response = await api.delete(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete product'
      );
    }
  }

  // Get products by category
  async getProductsByCategory(category: string) {
    try {
      const response = await api.get(`${this.baseUrl}/category/${category}`);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch products by category'
      );
    }
  }
}

export const productService = new ProductService();
