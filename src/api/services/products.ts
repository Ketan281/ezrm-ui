import { api, ENDPOINTS } from "../config"

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
}
export interface UpdateProductRequest {
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
}
export interface Product {
  _id: string // API uses _id instead of id
  id?: string // We'll map _id to id for frontend consistency
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  createdAt?: string
  updatedAt?: string
  images?: string[]
  status?: string
  uniqueId?: string
  __v?: number
}

export interface GetProductsParams {
  page?: number
  limit?: number
  search?: string
  name?: string
  category?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

// Update to match your actual API response structure
export interface ApiResponse<T> {
  success: boolean
  data?: T
  products?: Product[] // For products endpoint
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ProductsResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export const productsService = {
  // Get products with proper typing and filtering
  getProducts: async ({ queryKey }: { queryKey: [string, GetProductsParams] }): Promise<ProductsResponse> => {
    const [
      ,
      { page = 1, limit = 10, search = "", name = "", category = "", sortBy = "createdAt", sortOrder = "desc" },
    ] = queryKey

    // Build params object, only include non-empty values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {
      page,
      limit,
      sortBy,
      sortOrder,
    }

    if (search) params.q = search // Your API uses 'q' for search
    if (name) params.name = name
    if (category) params.category = category

    const { data } = await api.get(`${ENDPOINTS.PRODUCTS.GET}`, {
      params,
    })

    console.log("Raw API Response:", data) // Debug log

    // Handle the actual API response structure
    const apiResponse = data as ApiResponse<Product[]>

    // Map _id to id for frontend consistency
    const products = (apiResponse.products || []).map((product) => ({
      ...product,
      id: product._id, // Map _id to id for frontend use
    }))

    console.log("Transformed products:", products) // Debug log

    return {
      products,
      total: apiResponse.pagination?.total || 0,
      page: apiResponse.pagination?.page || 1,
      limit: apiResponse.pagination?.limit || 10,
      totalPages: apiResponse.pagination?.totalPages || 1,
    }
  },

  // Add product (using private endpoint)
  addProduct: async (data: CreateProductRequest): Promise<Product> => {
    const response = await api.post(ENDPOINTS.PRODUCTS.ADD, data)
    const apiResponse = response.data as ApiResponse<Product>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = apiResponse.data || (apiResponse as any)
    return {
      ...product,
      id: product._id, // Map _id to id
    }
  },

  // Update product
  updateProduct: async ({
    productId,
    data,
  }: {
    productId: string;
    data: Partial<CreateProductRequest>;
  }): Promise<Product> => {
    const response = await api.put(`${ENDPOINTS.PRODUCTS.UPDATE}/${productId}`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add authorization
        'Content-Type': 'application/json'
      }
    });
    const apiResponse = response.data as ApiResponse<Product>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const product = apiResponse.data || (apiResponse as any)
    return {
      ...product,
      id: product._id, // Map _id to id
    }
  },

  // Delete product
  deleteProduct: async ({ productId }: { productId: string }): Promise<{ message: string }> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await api.delete(`${ENDPOINTS.PRODUCTS.DELETE.replace(":id", productId)}`)
    return { message: "Product deleted successfully" }
  },

  // Search products
  searchProducts: async ({
    query,
    page = 1,
    limit = 10,
  }: {
    query: string
    page?: number
    limit?: number
  }): Promise<ProductsResponse> => {
    const { data } = await api.get(`${ENDPOINTS.PRODUCTS.GET}`, {
      params: { q: query, page, limit },
    })

    const apiResponse = data as ApiResponse<Product[]>
    const products = (apiResponse.products || []).map((product) => ({
      ...product,
      id: product._id,
    }))

    return {
      products,
      total: apiResponse.pagination?.total || 0,
      page: apiResponse.pagination?.page || 1,
      limit: apiResponse.pagination?.limit || 10,
      totalPages: apiResponse.pagination?.totalPages || 1,
    }
  },

  // Get products by category
  getProductsByCategory: async ({
    category,
    page = 1,
    limit = 10,
  }: {
    category: string
    page?: number
    limit?: number
  }): Promise<ProductsResponse> => {
    const { data } = await api.get(`${ENDPOINTS.PRODUCTS.GET}`, {
      params: { category, page, limit },
    })

    const apiResponse = data as ApiResponse<Product[]>
    const products = (apiResponse.products || []).map((product) => ({
      ...product,
      id: product._id,
    }))

    return {
      products,
      total: apiResponse.pagination?.total || 0,
      page: apiResponse.pagination?.page || 1,
      limit: apiResponse.pagination?.limit || 10,
      totalPages: apiResponse.pagination?.totalPages || 1,
    }
  },

  // Get products by stock status
  getProductsByStockStatus: async ({
    inStock,
    page = 1,
    limit = 10,
  }: {
    inStock: boolean
    page?: number
    limit?: number
  }): Promise<ProductsResponse> => {
    const { data } = await api.get(`${ENDPOINTS.PRODUCTS.GET}`, {
      params: { inStock, page, limit },
    })

    const apiResponse = data as ApiResponse<Product[]>
    const products = (apiResponse.products || []).map((product) => ({
      ...product,
      id: product._id,
    }))

    return {
      products,
      total: apiResponse.pagination?.total || 0,
      page: apiResponse.pagination?.page || 1,
      limit: apiResponse.pagination?.limit || 10,
      totalPages: apiResponse.pagination?.totalPages || 1,
    }
  },

  // Get products by price range
  getProductsByPriceRange: async ({
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  }: {
    minPrice: number
    maxPrice: number
    page?: number
    limit?: number
  }): Promise<ProductsResponse> => {
    const { data } = await api.get(`${ENDPOINTS.PRODUCTS.GET}`, {
      params: { minPrice, maxPrice, page, limit },
    })

    const apiResponse = data as ApiResponse<Product[]>
    const products = (apiResponse.products || []).map((product) => ({
      ...product,
      id: product._id,
    }))

    return {
      products,
      total: apiResponse.pagination?.total || 0,
      page: apiResponse.pagination?.page || 1,
      limit: apiResponse.pagination?.limit || 10,
      totalPages: apiResponse.pagination?.totalPages || 1,
    }
  },
}
