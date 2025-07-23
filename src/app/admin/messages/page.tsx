/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Button,
  Paper,
  Pagination,
  PaginationItem,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import StarIcon from "@mui/icons-material/Star"
import { styled } from "@mui/material/styles"
import { useRouter } from "next/navigation"
import { useCustomerReviews, useUpdateReviewStatus, useDeleteReview } from "@/api/handlers"
import { useUIStore } from "@/store/uiStore"

// Custom styled components
const StyledTab = styled(Tab)(({}) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "14px",
  minWidth: "auto",
  padding: "12px 16px",
  marginRight: "8px",
  color: "#000",
  "&.Mui-selected": {
    color: "#000",
  },
}))

const StyledTabs = styled(Tabs)(({}) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1976d2",
    height: "3px",
  },
  marginBottom: "0px",
}))

const PublishButton = styled(Button)(({}) => ({
  backgroundColor: "#e6f7f1",
  color: "#00a76f",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#d4f0e8",
  },
  borderRadius: "4px",
  padding: "6px 12px",
  fontSize: "13px",
  fontWeight: 600,
  minWidth: "80px",
}))

const DeleteButton = styled(Button)(({}) => ({
  backgroundColor: "#ffe4de",
  color: "#ff5630",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#ffd5cc",
  },
  borderRadius: "4px",
  padding: "6px 12px",
  fontSize: "13px",
  fontWeight: 600,
  minWidth: "80px",
}))

const StyledTableCell = styled(TableCell)(({}) => ({
  borderBottom: "1px solid #f0f0f0",
  padding: "16px 8px",
}))

const StyledTableHeadCell = styled(TableCell)(({}) => ({
  borderBottom: "1px solid #f0f0f0",
  padding: "16px 8px",
  color: "#637381",
  fontWeight: 600,
  fontSize: "13px",
  whiteSpace: "nowrap",
}))

// Custom star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          sx={{
            color: index < rating ? "#FFC107" : "#E0E0E0",
            fontSize: "16px",
          }}
        />
      ))}
    </Box>
  )
}

export default function CustomerReviews() {
  const router = useRouter()
  const [tabValue, setTabValue] = useState(0)
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [mounted, setMounted] = useState(false)

  const { notifications } = useUIStore()

  // Fix hydration issue - only render after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Map tab values to status filters
  const getStatusFilter = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return "" // All reviews
      case 1:
        return "published" // Changed from "approved" to "published"
      case 2:
        return "pending" // Pending
      default:
        return ""
    }
  }

  // Only fetch data after component is mounted
  const {
    data: reviewsData,
    isLoading,
    error,
    isFetching,
  } = useCustomerReviews({
    page,
    pageSize: 10,
    status: getStatusFilter(tabValue) as "pending" | "published" | "deleted" | "",
  })

  // Mutations for updating review status
  const updateReviewStatusMutation = useUpdateReviewStatus()
  const deleteReviewMutation = useDeleteReview()

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1 }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    )
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSelectedReviews([])
    setPage(1)
  }

  const handleCheckboxChange = (id: string) => {
    setSelectedReviews((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // Handle publish action
  const handlePublish = async (reviewIds: string[]) => {
    try {
      for (const reviewId of reviewIds) {
        await updateReviewStatusMutation.mutateAsync({
          reviewId,
          data: { status: "approved" }, // Changed from "published" to "approved"
        })
      }
      setSelectedReviews([])
    } catch (error) {
      console.error("Error approving reviews:", error)
    }
  }

  // Handle delete action
  const handleDelete = async (reviewIds: string[]) => {
    try {
      for (const reviewId of reviewIds) {
        if (tabValue === 2) {
          // Permanently delete if in "deleted" tab
          await deleteReviewMutation.mutateAsync(reviewId)
        } else {
          // Move to pending/deleted status
          await updateReviewStatusMutation.mutateAsync({
            reviewId,
            data: { status: "pending" },
          })
        }
      }
      setSelectedReviews([])
    } catch (error) {
      console.error("Error deleting reviews:", error)
    }
  }

  // Get the latest notification for display
  const latestNotification = notifications[notifications.length - 1]

  // Error message formatting
  const getErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) {
      return error.response.data.message
    }
    if (error?.message) {
      return error.message
    }
    return "Failed to load customer reviews. Please try again."
  }

  // Get all reviews and filter out ones without valid IDs
  const allReviews = reviewsData?.reviews || []
  const validReviews = allReviews.filter(review => review.id && typeof review.id === 'string')
  const validReviewIds = validReviews.map(review => review.id as string)

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 1 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{
            color: "#637381",
            textTransform: "none",
            fontWeight: 500,
            mb: 1,
            mt: -2,
            "&:hover": {
              backgroundColor: "transparent",
              color: "#212B36",
            },
          }}
        >
          Back
        </Button>

        {/* Page title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "#212B36",
            mb: 3,
          }}
        >
          Customer Reviews
        </Typography>

        {/* Show latest notification */}
        {latestNotification && (
          <Alert severity={latestNotification.type} sx={{ mb: 2 }}>
            {latestNotification.message}
          </Alert>
        )}

        {/* Error State */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {getErrorMessage(error)}
          </Alert>
        )}

        {/* Tabs in separate white container */}
        <Paper sx={{ borderRadius: 1, overflow: "hidden", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", mb: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
            <StyledTabs value={tabValue} onChange={handleTabChange} TabIndicatorProps={{ style: { height: 3 } }}>
              <StyledTab label="All Reviews" />
              <StyledTab label="Published" />
              <StyledTab label="Pending" />
            </StyledTabs>
          </Box>
        </Paper>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Table in separate white container */}
        {!isLoading && (
          <Paper sx={{ borderRadius: 1, overflow: "hidden", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)" }}>
            {/* Action buttons - only show when items are selected */}
            {tabValue === 0 && selectedReviews.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <PublishButton
                  sx={{ mr: 1 }}
                  onClick={() => handlePublish(selectedReviews)}
                  disabled={updateReviewStatusMutation.isPending}
                >
                  {updateReviewStatusMutation.isPending ? "Publishing..." : "Publish"}
                </PublishButton>
                <DeleteButton
                  onClick={() => handleDelete(selectedReviews)}
                  disabled={updateReviewStatusMutation.isPending || deleteReviewMutation.isPending}
                >
                  {updateReviewStatusMutation.isPending || deleteReviewMutation.isPending ? "Deleting..." : "Delete"}
                </DeleteButton>
              </Box>
            )}

            {/* Published tab - only show Delete button */}
            {tabValue === 1 && selectedReviews.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <DeleteButton
                  onClick={() => handleDelete(selectedReviews)}
                  disabled={updateReviewStatusMutation.isPending || deleteReviewMutation.isPending}
                >
                  {updateReviewStatusMutation.isPending || deleteReviewMutation.isPending ? "Deleting..." : "Delete"}
                </DeleteButton>
              </Box>
            )}

            {/* Pending tab - only show Delete button */}
            {tabValue === 2 && selectedReviews.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
                <DeleteButton onClick={() => handleDelete(selectedReviews)} disabled={deleteReviewMutation.isPending}>
                  {deleteReviewMutation.isPending ? "Deleting..." : "Delete"}
                </DeleteButton>
              </Box>
            )}

            {/* Reviews table */}
            <TableContainer sx={{ boxShadow: "none" }}>
              <Table sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <StyledTableHeadCell padding="checkbox" sx={{ width: "48px" }}>
                      <Checkbox
                        indeterminate={selectedReviews.length > 0 && selectedReviews.length < validReviews.length}
                        checked={validReviews.length > 0 && selectedReviews.length === validReviews.length}
                        onChange={() => {
                          if (selectedReviews.length === validReviews.length) {
                            setSelectedReviews([])
                          } else {
                            setSelectedReviews(validReviewIds)
                          }
                        }}
                        sx={{
                          color: "#919EAB",
                          "&.Mui-checked": {
                            color: "#2065D1",
                          },
                        }}
                      />
                    </StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ width: "220px" }}>Customer Review</StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ width: "150px" }}>Product Name</StyledTableHeadCell>
                    <StyledTableHeadCell sx={{ width: "300px" }}>Star Review</StyledTableHeadCell>
                    <StyledTableHeadCell align="right" sx={{ width: "180px" }}>
                      Action
                    </StyledTableHeadCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {validReviews.length > 0 ? (
                    validReviews.map((review) => {
                      // Skip if no ID (extra safety check)
                      if (!review.id) return null;
                      
                      return (
                        <TableRow key={review.id}>
                          <StyledTableCell padding="checkbox">
                            <Checkbox
                              checked={selectedReviews.includes(review.id)}
                              onChange={() => handleCheckboxChange(review.id as string)}
                              sx={{
                                color: "#919EAB",
                                "&.Mui-checked": {
                                  color: "#2065D1",
                                },
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: "#F4F6F8",
                                  mr: 2,
                                }}
                              >
                                {review.customerName?.charAt(0).toUpperCase() || "?"}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                  {review.customerName}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {review.date} · {review.time}
                                </Typography>
                                {review.isVerifiedPurchase && (
                                  <Typography variant="caption" sx={{ color: "#00a76f", display: "block" }}>
                                    ✓ Verified Purchase
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Typography variant="body2">{review.productName}</Typography>
                          </StyledTableCell>
                          <StyledTableCell sx={{ whiteSpace: "normal" }}>
                            <Box>
                              <StarRating rating={review.rating || 0} />
                              <Typography variant="body2" sx={{ fontWeight: 600, mt: 1, mb: 0.5 }}>
                                {review.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontSize: "13px",
                                  lineHeight: 1.5,
                                  wordBreak: "break-word",
                                }}
                              >
                                {review.review}
                              </Typography>
                              {review.helpfulVotes && review.helpfulVotes > 0 && (
                                <Typography variant="caption" sx={{ color: "#637381", mt: 0.5, display: "block" }}>
                                  {review.helpfulVotes} people found this helpful
                                </Typography>
                              )}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {/* All Reviews tab */}
                            {tabValue === 0 && (
                              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <PublishButton
                                  sx={{ mr: 1 }}
                                  onClick={() => handlePublish([review.id as string])}
                                  disabled={updateReviewStatusMutation.isPending}
                                >
                                  Publish
                                </PublishButton>
                                <DeleteButton
                                  onClick={() => handleDelete([review.id as string])}
                                  disabled={updateReviewStatusMutation.isPending || deleteReviewMutation.isPending}
                                >
                                  Delete
                                </DeleteButton>
                              </Box>
                            )}
                            {/* Published tab */}
                            {tabValue === 1 && (
                              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <DeleteButton
                                  onClick={() => handleDelete([review.id as string])}
                                  disabled={updateReviewStatusMutation.isPending || deleteReviewMutation.isPending}
                                >
                                  Delete
                                </DeleteButton>
                              </Box>
                            )}
                            {/* Pending tab */}
                            {tabValue === 2 && (
                              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <DeleteButton
                                  onClick={() => handleDelete([review.id as string])}
                                  disabled={deleteReviewMutation.isPending}
                                >
                                  Delete
                                </DeleteButton>
                              </Box>
                            )}
                          </StyledTableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <StyledTableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          {isFetching ? "Loading reviews..." : "No reviews found"}
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Divider before pagination */}
            <Divider />

            {/* Pagination - inside the table container */}
            {reviewsData && reviewsData.totalPages > 1 && (
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <Pagination
                  count={reviewsData.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIosNewIcon, next: ArrowForwardIosIcon }}
                      {...item}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "#1976d2",
                          color: "white",
                        },
                      }}
                    />
                  )}
                />
              </Box>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  )
}
