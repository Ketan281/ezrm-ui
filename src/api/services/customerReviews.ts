/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, ENDPOINTS } from "../config"

export interface CustomerInfo {
  _id: string
  name: string
  email: string
  phone: string
}

export interface ProductInfo {
  _id: string
  name: string
  images: string[]
}

export interface CustomerReview {
  _id: string
  id?: string
  customer: CustomerInfo
  product: ProductInfo
  order: string
  rating: number
  title: string
  review: string
  images: string[]
  status: "approved" | "pending"
  isVerifiedPurchase: boolean
  helpfulVotes: number
  reportCount: number
  createdAt: string
  updatedAt: string
  uniqueId: string
  __v: number
  // Computed fields for display
  customerName?: string
  customerEmail?: string
  productName?: string
  date?: string
  time?: string
}

export interface GetCustomerReviewsParams {
  page?: number
  pageSize?: number
  status?: "pending" | "published" | "deleted" | ""
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface CustomerReviewsResponse {
  reviews: CustomerReview[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Updated API response structure to match your actual response
export interface ApiResponse {
  success: boolean
  data: {
    reviews: CustomerReview[]
    total: number
    page: number
    totalPages: number
    limit: number
  }
}

// Single review response structure
export interface SingleReviewResponse {
  success: boolean
  message: string
  data: {
    review: CustomerReview
  }
}

// Update review request to match API expectations
export interface UpdateReviewRequest {
  status: "approved" | "pending"
}

export const customerReviewsService = {
  getCustomerReviews: async ({
    queryKey,
  }: { queryKey: [string, GetCustomerReviewsParams] }): Promise<CustomerReviewsResponse> => {
    const [, { page = 1, pageSize = 10, status = "", search = "", sortBy = "createdAt", sortOrder = "desc" }] = queryKey

    // Build params object, only include non-empty values
    const params: Record<string, any> = {
      page,
      limit: pageSize, // API uses 'limit' instead of 'pageSize'
      sortBy,
      sortOrder,
    }

    if (status) params.status = status
    if (search) params.q = search

    try {
      const { data } = await api.get(`${ENDPOINTS.CUSTOMER_REVIEWS.GET}`, {
        params,
      })

      console.log("Raw Customer Reviews API Response:", data)

      // Handle the actual API response structure
      const apiResponse = data as ApiResponse

      // Get reviews from the data structure
      const reviews = apiResponse.data?.reviews || []

      // Transform reviews and add computed fields
      const transformedReviews = reviews.map((review) => {
        const createdDate = new Date(review.createdAt)
        return {
          ...review,
          id: review._id, // Map _id to id for frontend consistency
          customerName: review.customer?.name || "Unknown Customer",
          customerEmail: review.customer?.email || "",
          productName: review.product?.name || "Unknown Product",
          date: createdDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          time: createdDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }
      })

      console.log("Transformed Customer Reviews:", transformedReviews)

      return {
        reviews: transformedReviews,
        total: apiResponse.data?.total || reviews.length,
        page: apiResponse.data?.page || page,
        pageSize: pageSize,
        totalPages: apiResponse.data?.totalPages || Math.ceil(reviews.length / pageSize),
      }
    } catch (error) {
      console.error("Error fetching customer reviews:", error)
      throw error
    }
  },

  // Get single review by ID
  getReviewById: async (id: string): Promise<CustomerReview> => {
    try {
      const response = await api.get(`${ENDPOINTS.CUSTOMER_REVIEWS.GET_BY_ID.replace(":id", id)}`)
      console.log("Single Review API Response:", response.data)

      const apiResponse = response.data as SingleReviewResponse

      if (apiResponse.success && apiResponse.data?.review) {
        const review = apiResponse.data.review
        const createdDate = new Date(review.createdAt)

        return {
          ...review,
          id: review.id || review._id,
          date: createdDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          time: createdDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        }
      }

      throw new Error(apiResponse.message || "Failed to fetch review")
    } catch (error) {
      console.error("Error fetching single review:", error)
      throw error
    }
  },

  // Update other methods similarly...
  updateReviewStatus: async ({
    reviewId,
    data,
  }: { reviewId: string; data: UpdateReviewRequest }): Promise<CustomerReview> => {
    try {
      const response = await api.put(`${ENDPOINTS.CUSTOMER_REVIEWS.UPDATE.replace(":id", reviewId)}`, data)
      console.log("Update Review API Response:", response.data)

      const review = response.data.data?.review || response.data
      return {
        ...review,
        id: review._id,
        customerName: review.customer?.name || "Unknown Customer",
        productName: review.product?.name || "Unknown Product",
      }
    } catch (error) {
      console.error("Error updating review:", error)
      throw error
    }
  },

  // Delete review permanently
  deleteReview: async (reviewId: string): Promise<{ message: string }> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.delete(`${ENDPOINTS.CUSTOMER_REVIEWS.DELETE.replace(":id", reviewId)}`)
      return { message: "Review deleted successfully" }
    } catch (error) {
      console.error("Error deleting review:", error)
      throw error
    }
  },
}
