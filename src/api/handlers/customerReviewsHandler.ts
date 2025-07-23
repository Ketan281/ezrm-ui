/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query"
import { customerReviewsService } from "../services/customerReviews"
import { useUIStore } from "@/store/uiStore"
import type { GetCustomerReviewsParams, UpdateReviewRequest } from "../services/customerReviews"

export const useCustomerReviews = ({
  page = 1,
  pageSize = 10,
  status = "",
  search = "",
  sortBy = "createdAt",
  sortOrder = "desc" as "asc" | "desc",
}: GetCustomerReviewsParams = {}) => {
  return useQuery({
    queryKey: ["customerReviews", { page, pageSize, status, search, sortBy, sortOrder }] as const,
    queryFn: customerReviewsService.getCustomerReviews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: keepPreviousData,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// export const useCustomerReviewById = (id: string) => {
//   return useQuery({
//     queryKey: ["customerReview", id] as const,
//     queryFn: () => customerReviewsService.getReviewById(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000,
//     retry: 3,
//     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//   })
// }

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient()
  const { addNotification } = useUIStore()

  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: UpdateReviewRequest }) =>
      customerReviewsService.updateReviewStatus({ reviewId, data }),
    onSuccess: (updatedReview) => {
      // Invalidate and refetch reviews
      queryClient.invalidateQueries({ queryKey: ["customerReviews"] })

      // Show success notification
      addNotification({
        type: "success",
        message: `Review ${updatedReview.status === "approved" ? "approved" : updatedReview.status} successfully!`,
      })
    },
    onError: (error: any) => {
      console.error("Update review status error:", error)

      // Show error notification
      addNotification({
        type: "error",
        message: error?.message || "Failed to update review status",
      })
    },
  })
}

export const useDeleteReview = () => {
  const queryClient = useQueryClient()
  const { addNotification } = useUIStore()

  return useMutation({
    mutationFn: (reviewId: string) => customerReviewsService.deleteReview(reviewId),
    onSuccess: () => {
      // Invalidate and refetch reviews
      queryClient.invalidateQueries({ queryKey: ["customerReviews"] })

      // Show success notification
      addNotification({
        type: "success",
        message: "Review deleted successfully!",
      })
    },
    onError: (error: any) => {
      console.error("Delete review error:", error)

      // Show error notification
      addNotification({
        type: "error",
        message: error?.message || "Failed to delete review",
      })
    },
  })
}
