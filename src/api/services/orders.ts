import { api, ENDPOINTS } from "../config"

export interface ProductInfo {
  images: string[]
  status: string
  _id: string
  name: string
  description: string
  price: number
  category: string
  inStock: boolean
  createdAt: string
  updatedAt: string
  uniqueId: string
  __v: number
}

export interface LocationInfo {
  aisle: string
  rack: string
  shelf: string
}

export interface OrderItem {
  location: LocationInfo
  _id: string
  id?: string
  product: ProductInfo | null
  quantity: number
  minThreshold: number
  maxThreshold: number
  status: string
  lastRestocked: string
  lastChecked: string
  batchNumber: string
  createdAt: string
  updatedAt: string
  uniqueId: string
  __v: number
}

export interface GetOrdersParams {
  page?: number
  limit?: number
  search?: string
  status?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface OrdersResponse {
  orders: OrderItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Updated API response structure to match your actual response
export interface ApiResponse {
  success: boolean
  inventory: OrderItem[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Single order response structure
export interface SingleOrderResponse {
  success: boolean
  message?: string
  data: {
    order: OrderItem
  }
}

export const ordersService = {
  // Get orders with proper typing and filtering
  getOrders: async ({ queryKey }: { queryKey: [string, GetOrdersParams] }): Promise<OrdersResponse> => {
    const [, { page = 1, limit = 10, search = "", status = "", sortBy = "createdAt", sortOrder = "desc" }] = queryKey

    // Build params object, only include non-empty values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = {
      page,
      limit,
      sortBy,
      sortOrder,
    }

    if (search) params.q = search
    if (status) params.status = status

    try {
      const { data } = await api.get(`${ENDPOINTS.ORDERS.GET}`, {
        params,
      })

      console.log("Raw Orders API Response:", data)

      // Handle the actual API response structure
      const apiResponse = data as ApiResponse

      // Get orders from the inventory array
      const orders = apiResponse.inventory || []

      // Map _id to id for frontend consistency and handle null products
      const transformedOrders = orders.map((order) => ({
        ...order,
        id: order._id, // Map _id to id for frontend use
        product: order.product || null, // Handle null products gracefully
      }))

      console.log("Transformed Orders:", transformedOrders)

      return {
        orders: transformedOrders,
        total: apiResponse.pagination?.total || orders.length,
        page: apiResponse.pagination?.page || page,
        limit: apiResponse.pagination?.limit || limit,
        totalPages: apiResponse.pagination?.totalPages || Math.ceil(orders.length / limit),
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw error
    }
  },

  // Get single order by ID
  getOrderById: async (id: string): Promise<OrderItem> => {
    try {
      const response = await api.get(`${ENDPOINTS.ORDERS.GET_BY_ID.replace(":id", id)}`)
      console.log("Single Order API Response:", response.data)

      const apiResponse = response.data as SingleOrderResponse

      // Return the order data from the nested structure
      if (apiResponse.success && apiResponse.data?.order) {
        return {
          ...apiResponse.data.order,
          id: apiResponse.data.order._id,
        }
      }

      throw new Error(apiResponse.message || "Failed to fetch order")
    } catch (error) {
      console.error("Error fetching single order:", error)
      throw error
    }
  },
}
