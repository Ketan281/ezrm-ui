"use client"
import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Pagination,
} from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useProducts } from "@/api/handlers"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"

export default function ViewProductPage() {
  const router = useRouter()

  // State for filtering and pagination
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")
  const [searchValue, setSearchValue] = useState("")

  // Build query parameters based on filter type
  const queryParams = {
    page,
    limit: 12, // Show 12 products per page for grid layout
    search: filter === "" && searchValue ? searchValue : "", // General search when no filter selected
    name: filter === "Product Name" && searchValue ? searchValue : "",
    category: filter === "Category" && searchValue ? searchValue : "",
  }

  // Fetch products with current filters
  const { data, isLoading, error, isFetching } = useProducts(queryParams)

  console.log("Hook data:", data) // Debug log
  console.log("Products array:", data?.products) // Debug log
  console.log("Products length:", data?.products?.length) // Debug log

  const handleProductClick = (productId: string) => {
    router.push(`/products/view/detail/${productId}`)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setPage(1) // Reset to first page when searching
  }

  const handleSearchClear = () => {
    setSearchValue("")
    setPage(1)
  }

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
    setSearchValue("") // Clear search when changing filter type
    setPage(1)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  }

  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "#F9FAFB",
        minHeight: "85vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header Section with Back button and title */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => router.back()}>
          <Image src="/back.png?height=13&width=13" alt="Back" width={13} height={13} />
          <Typography
            sx={{
              ml: 1,
              color: "#737791",
              fontSize: "14px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Back
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1F2A44",
          mb: 2,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        View All Products
      </Typography>

      {/* Filter and Search Section */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
        {/* Filter Dropdown */}
        <FormControl sx={{ minWidth: 150, flexShrink: 0 }}>
          <Select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <span
                    style={{
                      color: "#737791",
                      fontSize: "14px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    FILTER
                  </span>
                )
              }
              return selected
            }}
            sx={{
              height: "40px",
              fontSize: "14px",
              color: "#737791",
              fontFamily: "Poppins, sans-serif",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },
            }}
          >
            <MenuItem value="" sx={{ fontFamily: "Poppins, sans-serif" }}>
              All Products
            </MenuItem>
            <MenuItem value="Product Name" sx={{ fontFamily: "Poppins, sans-serif" }}>
              Product Name
            </MenuItem>
            <MenuItem value="Category" sx={{ fontFamily: "Poppins, sans-serif" }}>
              Category
            </MenuItem>
          </Select>
        </FormControl>

        {/* Search Field */}
        <TextField
          placeholder={
            filter === "Product Name"
              ? "Search by product name..."
              : filter === "Category"
                ? "Search by category..."
                : "Search products..."
          }
          value={searchValue}
          onChange={handleSearchChange}
          size="small"
          sx={{ minWidth: 300, flexShrink: 0 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#737791" }} />
              </InputAdornment>
            ),
            endAdornment: searchValue && (
              <InputAdornment position="end">
                <ClearIcon sx={{ color: "#737791", cursor: "pointer" }} onClick={handleSearchClear} />
              </InputAdornment>
            ),
          }}
        />

        {/* Loading indicator */}
        {isFetching && <CircularProgress size={20} />}
      </Box>

      {/* Results Summary */}
      {data && data.products && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: "14px", color: "#737791", fontFamily: "Poppins, sans-serif" }}>
            Showing {data.products.length} of {data.total} products
            {searchValue && ` for "${searchValue}"`}
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load products. Please try again.
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!isLoading && data?.products && data.products.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography sx={{ fontSize: "16px", color: "#737791", fontFamily: "Poppins, sans-serif" }}>
            {searchValue ? `No products found for "${searchValue}"` : "No products available"}
          </Typography>
        </Box>
      )}

      {/* Product Grid - 4 cards per row */}
      {!isLoading && data?.products && data.products.length > 0 && (
        <>
          <Grid container spacing={3}>
            {data.products.map((product) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={product.id || product._id}>
                <Paper
                  elevation={1}
                  onClick={() => handleProductClick(product.id || product._id)}
                  sx={{
                    width: "13.65rem", // Use 100% width to fit the grid container
                    maxWidth: "15.375rem", // Maximum width constraint
                    height: "15rem", // 240px converted to rem (240/16)
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 3,
                    },
                  }}
                >
                  {/* Product Image Container - No padding */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "11.25rem", // 180px converted to rem (180/16) - leaving 60px for text
                      overflow: "hidden",
                      position: "relative",
                      p: 0, // No padding for image container
                    }}
                  >
                    <Image
                      src="/placeholder.svg?height=180&width=246"
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>

                  {/* Product Info Container */}
                  <Box
                    sx={{
                      height: "3.75rem", // 60px converted to rem (60/16)
                      p: 1.5, // 12px padding
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                    }}
                  >
                    {/* Product ID */}
                    <Typography
                      sx={{
                        fontSize: "0.75rem", // 12px
                        color: "#737791",
                        fontFamily: "Poppins, sans-serif",
                        mb: 0.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: 1.2,
                      }}
                    >
                      Product ID: {product.uniqueId || (product.id || product._id).slice(0, 8)}
                    </Typography>

                    {/* Product Name */}
                    <Typography
                      sx={{
                        fontSize: "0.875rem", // 14px
                        color: "#1F2A44",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        lineHeight: 1.2,
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {data.totalPages && data.totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={data.totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="medium"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
