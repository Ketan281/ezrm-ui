"use client"

import type React from "react"
import { useState } from "react"
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
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import StarIcon from "@mui/icons-material/Star"
import { styled } from "@mui/material/styles"

// Custom styled components
const StyledTab = styled(Tab)(({  }) => ({
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

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#1976d2",
    height: "3px",
  },
  marginBottom: "0px",
}))

const PublishButton = styled(Button)(({ theme }) => ({
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

const DeleteButton = styled(Button)(({ theme }) => ({
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid #f0f0f0",
  padding: "16px 8px",
}))

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid #f0f0f0",
  padding: "16px 8px",
  color: "#637381",
  fontWeight: 600,
  fontSize: "13px",
  whiteSpace: "nowrap",
}))

// Mock data for reviews
const reviewsData = [
  {
    id: 1,
    customerName: "Rajen swizy",
    date: "24 July 2023",
    time: "02:33PM",
    productName: "lOREAL ipsum",
    rating: 5,
    review:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    published: true,
  },
  {
    id: 2,
    customerName: "Rajen swizy",
    date: "24 July 2023",
    time: "02:33PM",
    productName: "lOREAL ipsum",
    rating: 5,
    review:
      "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
    published: false,
  },
]

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
  const [tabValue, setTabValue] = useState(0)
  const [selectedReviews, setSelectedReviews] = useState<number[]>([])
  const [page, setPage] = useState(1)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    setSelectedReviews([])
  }

  const handleCheckboxChange = (id: number) => {
    setSelectedReviews((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // Filter reviews based on selected tab
  const filteredReviews = reviewsData.filter((review) => {
    if (tabValue === 0) return true // All reviews
    if (tabValue === 1) return review.published // Published
    if (tabValue === 2) return !review.published // Deleted
    return false
  })

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", p: 3 }}>
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        {/* Back button */}
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            color: "#637381",
            textTransform: "none",
            fontWeight: 500,
            mb: 2,
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

        {/* Tabs in separate white container */}
        <Paper sx={{ borderRadius: 1, overflow: "hidden", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", mb: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "white" }}>
            <StyledTabs value={tabValue} onChange={handleTabChange} TabIndicatorProps={{ style: { height: 3 } }}>
              <StyledTab label="All Reviews" />
              <StyledTab label="Published" />
              <StyledTab label="Deleted" />
            </StyledTabs>
          </Box>
        </Paper>

        {/* Table in separate white container */}
        <Paper sx={{ borderRadius: 1, overflow: "hidden", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)" }}>
          {/* Action buttons - only show when items are selected */}
          {tabValue === 0 && selectedReviews.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <PublishButton sx={{ mr: 1 }}>Publish</PublishButton>
              <DeleteButton>Delete</DeleteButton>
            </Box>
          )}

          {/* Published tab - only show Delete button */}
          {tabValue === 1 && selectedReviews.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <DeleteButton>Delete</DeleteButton>
            </Box>
          )}

          {/* Deleted tab - only show Delete button */}
          {tabValue === 2 && selectedReviews.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
              <DeleteButton>Delete</DeleteButton>
            </Box>
          )}

          {/* Reviews table */}
          <TableContainer sx={{ boxShadow: "none" }}>
            <Table sx={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell padding="checkbox" sx={{ width: "48px" }}>
                    <Checkbox
                      indeterminate={selectedReviews.length > 0 && selectedReviews.length < filteredReviews.length}
                      checked={filteredReviews.length > 0 && selectedReviews.length === filteredReviews.length}
                      onChange={() => {
                        if (selectedReviews.length === filteredReviews.length) {
                          setSelectedReviews([])
                        } else {
                          setSelectedReviews(filteredReviews.map((r) => r.id))
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
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={selectedReviews.includes(review.id)}
                        onChange={() => handleCheckboxChange(review.id)}
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
                        />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {review.customerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {review.date} · {review.time}
                          </Typography>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography variant="body2">{review.productName}</Typography>
                    </StyledTableCell>
                    <StyledTableCell sx={{ whiteSpace: "normal" }}>
                      <Box>
                        <StarRating rating={review.rating} />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            fontSize: "13px",
                            lineHeight: 1.5,
                            wordBreak: "break-word",
                          }}
                        >
                          {review.review}
                        </Typography>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {/* All Reviews tab */}
                      {tabValue === 0 && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <PublishButton sx={{ mr: 1 }}>Publish</PublishButton>
                          <DeleteButton>Delete</DeleteButton>
                        </Box>
                      )}
                      {/* Published tab */}
                      {tabValue === 1 && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <DeleteButton>Delete</DeleteButton>
                        </Box>
                      )}
                      {/* Deleted tab */}
                      {tabValue === 2 && (
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                          <DeleteButton>Delete</DeleteButton>
                        </Box>
                      )}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Divider before pagination */}
          <Divider />

          {/* Pagination - inside the table container */}
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <Pagination
              count={24}
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
        </Paper>
      </Box>
    </Box>
  )
}
